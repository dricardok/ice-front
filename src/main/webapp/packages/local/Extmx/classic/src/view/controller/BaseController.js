/**
 * Created by eleon on 11/26/18.
 */
Ext.define('Extmx.view.controller.BaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.base',

    requires: [
        'Ext.layout.container.Fit'
    ],


    init: Ext.emptyFn,

    /**
     * add new tab with the component in the param
     * Params item Object : the config obj for the new tab
     * */
    addNewItem: function ( item ) {
        var tabpanel = this.getView();

        tabpanel.insert( 1, {
            title: item.title,
            closable: item.closable,
            xtype: item.xtype,
            layout: 'fit'
        });

    }
});