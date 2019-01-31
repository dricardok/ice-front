
Ext.define('Ice.model.core.parameterizer.ExpressionModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'expression',     type: 'string' },
        { name: 'supportTableAccess' , type: 'auto', defaultValue: [] }
    ]

});