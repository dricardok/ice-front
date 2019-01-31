
Ext.define('Ice.view.core.parameterizer.panel.BlocksWizardSelecction', {
    extend: 'Ext.panel.Panel',

    xtype: 'blockswizard',

	requires: [
		'Ext.container.Container',
		'Ext.form.field.Text',
		'Ext.layout.container.Card',
		'Ext.layout.container.VBox',
		'Ice.view.core.parameterizer.panel.BlocksAttributesGridPanel',
		'Ice.view.core.parameterizer.panel.BlocksGridPanel',
		'Ice.view.core.parameterizer.panel.BlocksWizardController'
	],

	layout: 'card',

	controller: 'blockswizard',

    initComponent: function () {

    	var me = this;

    	Ext.apply( this, {

		    items:[{
			    xtype:'container',
			    layout:{
				    type:'vbox',
				    align: 'stretch'
			    },
			    items:[{
				    xtype:'textfield',
				    height: 50,
				    itemId: 'search_blocks',
				    enableKeyEvents: true,
				    selectOnFocus: true,
				    emptyText: 'Buscar',
				    listeners:{
					    change: function( textfield, newValue, oldValue ){

						    var store = me.down('#blocksgrid').getStore();

						    store.clearFilter();

						    store.filterBy( function ( record ) {

						        if( record.data.name.toUpperCase().includes( newValue.toUpperCase() ) ){
						        	return true;
						        }
							    return record.data.bloque.toUpperCase().includes(newValue.toUpperCase());

						    });
					    }
				    }
			    },{
				    xtype:'blocksgrid',
				    flex: 1,
				    itemId: 'blocksgrid',
				    listeners:{
					     selection: 'selectBlock'
				    }
			    }]
		    },{
			    xtype:'container',
			    layout:{
				    type:'vbox',
				    align: 'stretch'
			    },
			    items:[{
				    xtype:'textfield',
				    height: 50,
				    itemId: 'search_attributes',
				    enableKeyEvents: true,
				    selectOnFocus: true,
				    emptyText: 'Buscar',
				    listeners:{
					    change: function( textfield, newValue, oldValue ){

						    var store = me.down('#blocksattributes').getStore();

						    store.clearFilter();

						    store.filterBy( function ( record ) {
							    console.log( record );
							    return record.data.name.toUpperCase().includes( newValue.toUpperCase() );
						    });
					    }
				    }
			    },{
				    xtype:'blocksattributesgrid',
				    flex: 1,
				    reference: 'blocksattributes',
				    itemId: 'blocksattributes',
				    listeners:{
					     selection: 'selectAttribute'
				    },
				    bbar:[{
				    	text:'Regresar',
					    iconCls: 'fas fa-arrow-left',
					    cls:'info-btn',
					    handler: 'returnToBlocks'
				    }]
			    }]
		    }]


	    });


    	this.callParent();
    }

});