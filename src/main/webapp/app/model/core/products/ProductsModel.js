
Ext.define('Ice.model.core.products.ProductsModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'name',     type: 'string' },
        { name: 'key',      type: 'int' },
        { name: 'description',    type: 'string' },
        { name: 'icon',    type: 'string' },
    ]
});