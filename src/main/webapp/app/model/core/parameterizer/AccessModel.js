/**
 * Created by danie on 28/01/2019.
 */
Ext.define('Ice.model.core.parameterizer.AccessModel', {
    extend: 'Ext.data.Model',

	idProperty: 'variable',

	fields: [
		{ name: 'table',       type: 'string' },
		{ name: 'attribute',   type: 'string' },
		{ name: 'variable',    type: 'string' },
		{ name: 'accessKeys',  type: 'auto' },
		{ name: 'expression',  type: 'string' },
		{ name: 'recalculate', type: 'boolean', defaultValue: false }
	]
});