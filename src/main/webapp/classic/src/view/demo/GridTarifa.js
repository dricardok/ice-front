
Ext.define('Ice.view.demo.GridTarifa', {
    extend: 'Ext.grid.Panel',

    xtype:'gridtarificacionpoc',

    height: 300,
    width: 800,

    margin: '20 20 20 20',

    hidden: true,

    requires: [
        'Ext.data.Store'
    ],

    title: 'Tarifas',

    columns: [
        {
            text: 'Situación',
            dataIndex: 'nmsituac',
            width: 100,
        },{
            text: 'Cobertura',
            dataIndex: 'dsgarant',
            flex: 1
        },{
            text: 'Monto',
            width: 150,
            dataIndex: 'ptimport',
            renderer: function ( value ) {
                return go.money( value );
            }
        }
    ],

    initComponent: function () {

        let store = Ext.create('Ext.data.Store',{
            fields:[ 'nmsituac', 'cdgarant', 'dsgarant','ptimport']
        });

        Ext.apply( this, {
            store: store
        });

        this.callParent();
    }


});