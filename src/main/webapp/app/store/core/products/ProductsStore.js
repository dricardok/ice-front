

Ext.define('Ice.store.core.products.ProductsStore', {
    extend: 'Ext.data.Store',

    alias: 'store.products',

    requires: [
        'Ice.model.core.products.ProductsModel'
    ],

    model: 'Ice.model.core.products.ProductsModel',

    data: { items: [
            {
                key: 420 ,
                name: "Seguro de Autos",
                description: "Éste es un producto de autos" ,
                icon:"x-fa fa-user"
            },{
                key: 430 ,
                name: "Gastos Médicos Mayores",
                description: "Esta es un producto de Gastos Medicos" ,
                icon:"x-fa fa-user"
            },{
                key: 606 ,
                name: "Responsabilidad Civil",
                description: "Esta es un producto de responsabilidad cilvil" ,
                icon:"x-fa fa-user"
            }
        ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});