
Ext.define('Ice.store.icereport.IceReportStore', {
    extend: 'Ext.data.Store',

    alias: 'store.reporters',

    requires: [
        'Ice.model.icereport.IceReportModel'
    ],

    autoLoad: true,
    autoSync: true,

    sorters: 'id_template',

    model: 'Ice.model.icereport.IceReportModel'
});