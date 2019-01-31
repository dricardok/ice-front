/**
 * Created by eleon on 11/27/18.
 */
Ext.define('Ice.view.main.MainPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.mainpanel',

	requires: [
		'Ext.form.Panel',
		'Extmx.view.window.FormWindow'
	],


	onMenuLoad: function( store, records ){

        let record = records[ 0 ],
            panel = this.lookupReference('mainCardPanel');
        this.index = 0;
        this.menuItems = {};
        this.menuItems[ record.data.id  ] = true ;

        panel.insert(0,{
            id: record.data.id,
            xtype: record.data.xtype,
            cls: 'maincard'
        });

        panel.setActiveItem(0);

	    this.changeToolbarTitle( record.data.iconCls , record.data.text );

        let tree = this.lookupReference('navigationTreeList');
        tree.setSelection( record );

		Ext.ariaWarn = Ext.emptyFn;
    },

    onNavigationTreeSelectionChange: function ( tree , record  ) {

        let node = record.data,
            panel = this.lookupReference('mainCardPanel');

        if( Ext.isEmpty( this.menuItems[ node.id ] ) ){
            this.index++;
            this.menuItems[ node.id  ] = true ;
            panel.insert( this.index ,{
                id: node.id,
                xtype: node.xtype,
                cls: 'ice-shadow'
            });
        }
        panel.setActiveItem( node.id );
	    this.changeToolbarTitle( node.iconCls , node.text );
    },

    changewidth: function () {

        let refs = this.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainCardPanel,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 0 : 250;

        navigationList.setWidth( new_width );
        refs.leftpanel.setWidth( new_width );
        navigationList.setMicro( collapsing );

        Ext.resumeLayouts(); // do not flush the layout here...

        // No animation for IE9 or lower...
        wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
        wrapContainer.updateLayout();

        if( collapsing ){
            refs.searchfield.hide();
        }
        else{
            refs.searchfield.show();
        }


    },

    changeToolbarTitle: function( icon, msg ){

        let title = this.lookupReference('toolbartitle'),
            str = '<div style="color: #FAFAFA; font-size: 16pt">' +
                    '<span class="'+ icon +'" style="margin: 0 10px 0 20px"></span>' +
                    '<span>'+ msg +'</span>' +
                '</div>';

        title.update( str );
    },

    search: function ( textfield, newValue ) {

        let tree = this.lookupReference('navigationTreeList'),
            store = tree.getStore();

        store.clearFilter();

        if( newValue.length >= 3 ){
            store.filter({
                property: 'text',
                value: newValue,
                exactMatch: false,
                caseSensitive: false
            });
        }
    },

	bugmanager: function () {

        let form = Ext.create('Ext.form.Panel',{
		        modelClass: 'Ice.model.poc.PolicyModel'
            }),
            window = Ext.create('Extmx.view.window.FormWindow',{
            width: 800,
            height: 600,
            form: form
        });

        window.show();
	}
});