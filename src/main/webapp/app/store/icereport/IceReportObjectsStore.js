

Ext.define('Ice.store.icereport.IceReportObjectsStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    autoLoad: true,

    proxy: {
        type: 'rest',
        url : Urls.report.getObjs,
        noCache: false,
        limitParam: '',
        pageParam: '',
        startParam: '',
        reader: {
            type: 'json',
            rootProperty: 'Objetos'
        }
    }

});