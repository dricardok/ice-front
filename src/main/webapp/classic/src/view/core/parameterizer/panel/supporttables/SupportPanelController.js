
Ext.define('Ice.view.core.parameterizer.panel.supporttables.SupportPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.supportpanel',

	requires: [
		'Ice.model.core.parameterizer.KeyModel',
		'Ice.view.core.parameterizer.ParameterizerPanel'
	],

	init: function() {
        this.record = {};
        this.editors = {};

        let access = this.getView().access,
	        me = this,
	        textfield = this.lookupReference('variable');

        if( !Ext.isEmpty( access ) ){
        	    console.log( access );
	        this.record.name = access.data.table;
	        this.record.keys = [];
	        Ext.each( access.data.accessKeys, function ( key ) {
	        	    let value = !Ext.isEmpty( key ) ? { nombre : key.name , expression: key.expression } : key;
	        	    if( !Ext.isEmpty( value )) me.record.keys.push( value );
	        });
        	    textfield.setValue( access.data.variable.substring(4, access.data.variable.length ));
	        textfield.disable();
        	    this.attributeSelected({ data:{ nombre: access.data.attribute }} );
        }
    },

	tableSelected: function ( record ) {
        this.record.name = record.data.nombre;
        this.record.keys = record.data.llaves;
	    let store = this.lookupReference('attributes').getStore();
	    store.removeAll();
	    Ext.each( record.data.columnas , function ( column ) {
		    store.add( column );
	    });
        this.changePage( 1 );
	},

    attributeSelected: function( record ){
	    let index = 1;
	    const store = this.lookupReference('accesskeysgridpanel').getStore(),
            editors = this.lookupReference('editors'),
            me = this;
	    this.record.attribute = record.data.nombre;
	    store.removeAll();
	    Ext.each( this.record.keys , function ( key ) {
		    let model = Ext.create('Ice.model.core.parameterizer.KeyModel');
		    model.set('num_key', index ,{convert :false , dirty : false} );
		    model.set('iconCls', "x-fa fa-key" ,{convert :false , dirty : false} );
		    model.set('text', key.nombre  ,{convert :false , dirty : false});
		    store.add( model );
		    if( Ext.isEmpty( me.editors[ index ] ) ){
			    editors.insert( index, {
				    json: me.getView().dictionary,
				    xtype: 'parameterizerpanel',
				    reference: 'key' + index,
				    rawvalue: key.expression,
				    showSupportTables: false,
				    showGeneralInfoPanel: false,
				    showSaveBtn: false
			    });
			    me.editors[ index ] = true;
            }
		    index++;
	    });
	    editors.setActiveItem( 1 );
	    this.changePage( 2 );
    },

	keyClick: function( table, record, meta ){
		const editors = this.lookupReference('editors');
		editors.setActiveItem( record.data.num_key );
    },

	changePage: function ( id ) {
      this.getView().setActiveItem( id );
	},

    save: function () {
        const refs = this.getReferences(),
            me = this;
        if( refs.variable.isValid() ){
	        let keys = [null,null,null,null,null],
		        store = refs.accesskeysgridpanel.getStore(),
		        expression = "supportTable.getValue('" + this.record.name + "', '" + this.record.name + "."
			        + this.record.attribute + "'";

	        this.record.variable = '$STA' + refs.variable.getValue();
	        store.each(function ( record ) {
		        let index = record.data.num_key;
		        keys[ index - 1 ] = {
			        "name" : record.data.text,
			        "pos": record.data.num_key,
			        "expression": me.lookupReference( 'key' + index ).getRawValue()
		        };
	        });
	        this.record.accessKeys = keys;
	        Ext.each( keys, function ( atr ) {
		        if( !Ext.isEmpty( atr )){
			        expression += ",'"+ atr.expression +"'";
		        }
		        else{
			        expression += ","+ atr ;
		        }
	        });
	        expression += ") ";
	        this.record.expresion = expression;

	        me.getView().fireEvent('access', this.record );
        }
    },
});