
Ext.define('Ice.view.core.products.fields.BusinessLineCombobox', {

    extend: 'Ext.form.field.ComboBox',

    xtype: 'businesslinecombo',

    requires: [
        'Ext.data.Store'
    ],

    initComponent: function () {

        var states = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data : [
                {"id":1, "name":"DAÑOS"},
                {"id":2, "name":"BENEFICIOS"},
                {"id":3, "name":"INFRAESTRUCTURA"},
                {"id":4, "name":"FIANZAS"},
                {"id":5, "name":"LINEAS COMERCIALES"},
                {"id":6, "name":"LINEAS PERSONALES"},
                {"id":7, "name":"GENERALES"},
                {"id":8, "name":"ALIADOS"}
            ]
        });

        Ext.apply( this, {

            fieldLabel: 'Linea de Negocio',
            store: states,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name'
        });

        this.callParent();
    }

});