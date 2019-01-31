/**
 *  @class Ice.model.icereport.IceReportModel
 *  @author Ing. Daniel Hernández
 *  date December 1st, 2018
 * */
Ext.define('Ice.model.icereport.IceReportModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    idProperty: 'id_template',

    fields:[{
        name: "id_template", type: "int"
    },{
        name: "nombre", mapping: "nombre_template", type: "string"
    },{
        name:"descrip", mapping: "descripcion_template", type: "string"
    },{
        name: "json", type: "string"
    }],

    proxy: {

        type: 'rest',

        api: {
            create  : Urls.report.createReport,
            read    : Urls.report.getAll,
            update  : Urls.report.updateReport,
            destroy : Urls.report.deleteReport
        },

        actionMethods:{
            create: 'POST',
            read: 'GET',
            update:'PUT',
            destroy:'DELETE'
        },

        noCache: false,
        limitParam: '',
        pageParam: '',
        startParam: '',

        reader: {
            type: 'json',
            rootProperty: 'items'
        },

        writer:{
            writeAllFields: true
        }
    }
});