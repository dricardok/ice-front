
Ext.define('Ice.view.core.products.ProductsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.products',

	requires: [
		'Ext.layout.container.Fit',
		'Ice.view.core.products.ProductsConfigTreePanel'
	],

	addProduct: function () {
        let panel = this.getView();

        panel.insert( 1 , {
            title: 'Nuevo Producto',
	        layout: 'fit',
            items:[{
	            xtype: 'productstreepanelconfig'
            }],
	        //xtype: 'productsconfigpanel',
            closable: true
        });

        panel.setActiveItem(1);
    }
});