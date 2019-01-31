
Ext.define('Ice.view.core.products.ProductsTabPanel', {
    extend: 'Ext.tab.Panel',

    xtype:'productstabpanel',

    requires: [
        'Ext.layout.container.Fit',
        'Ice.view.core.products.ProductsController',
        'Ice.view.core.products.ProductsGridPanel'
    ],

    layout:'fit',

    controller: 'products',

    items:[{
        title:'Lista de productos',
        xtype:'productsgridpanel',
        listeners:{
            'addProduct': function(){
                this.up().getController().addProduct();
            }
        }

    }]

});