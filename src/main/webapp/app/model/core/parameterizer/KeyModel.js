
Ext.define('Ice.model.core.parameterizer.KeyModel', {
    extend: 'Ext.data.Model',

	idProperty: 'id',

    fields: [

        { name: 'id',       type: 'int' },
        { name: 'num_key',  type: 'int' },
        { name: 'iconCls',  type: 'string' },
        { name: 'text',     type: 'string' }

    ]
});