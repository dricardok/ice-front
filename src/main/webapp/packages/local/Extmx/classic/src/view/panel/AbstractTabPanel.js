
Ext.define('Extmx.view.panel.AbstractTabPanel', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Ext.layout.container.Fit',
        'Extmx.view.controller.BaseController'
    ],

    defaults: {
        layout: 'fit'
    },

    controller: 'base',

    initComponent: function () {

        var me = this;

        Ext.apply( this, {
            items: me.getItems(),
            tbar: me.getTbar()
        });

        this.callParent();
    },

    getItems: Ext.emptyFn,
    getTbar: Ext.emptyFn
});