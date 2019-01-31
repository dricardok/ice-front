/**
 * Panel principal para la configuracioón de los productos en su variación de árbol
 */
Ext.define('Ice.view.core.products.ProductsConfigTreePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'productstreepanelconfig',

	requires: [
		'Ext.button.Button',
		'Ext.layout.container.Card',
		'Ext.layout.container.HBox',
		'Ext.list.Tree',
		'Ext.panel.Panel',
		'Ice.store.core.products.ProductsMenuStore',
		'Ice.view.core.products.ProductsConfigTreePanelController'
	],

	controller: 'productsconfigtreepanel',

	layout: {
    	type: 'hbox',
		align: 'stretch'
	},

    initComponent: function(){

	    var store = Ext.create('Ice.store.core.products.ProductsMenuStore',{
		    listeners:{
			    scope: this,
			    load: function( store , records ){
				    this.getController().onMenuLoad( store, records );
			    }
		    }
	    });

	    Ext.apply( this, {
		    items: [{
		    	xtype:'panel',
			    reference: 'leftpanel',
			    items:[{
				    xtype:'treelist',
				    margin: '10 10 0 0',
				    header: false,
				    reference: 'leftNavigationTreeList',
				    store: store,
				    width: 250,
				    ui: 'treepa',
				    expanderFirst: false,
				    expanderOnly: false,
				    rootVisible: false,
				    listeners: {
					    selectionchange: 'onNavigationTreeSelectionChange',
				    }
			    }]
		    },{
		    	xtype: 'panel',
			    bodyStyle: 'background-color: #ede8e8',
			    width: 10,
			    items: [{
		    		xtype: 'button',
				    margin:'270 0 0 0',
				    handler: 'changewidth',
				    width: 5,
				    height: 40,
				    iconCls: 'x-fa fa-caret-left',
				    reference: 'buttonf'
			    }]
		    },{
		    	xtype: 'panel',
			    flex: 1,
			    reference: 'maincontainer',
			    margins: '0 0 0 0',
			    layout: 'card'
		    }]
        });

        this.callParent();
    }
});