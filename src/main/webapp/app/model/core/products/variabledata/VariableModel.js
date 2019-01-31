
Ext.define('Ice.model.core.products.variabledata.VariableModel', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: 'name',     type: 'string' },
		{ name: 'id',      type: 'int' },
		{ name: 'type',      type: 'int' },
		{ name: 'min',      type: 'int' },
		{ name: 'max',      type: 'int' },
		{ name: 'required',      type: 'boolean' },
		{ name: 'editable',      type: 'boolean' },
		{ name: 'showable',      type: 'boolean' },
		{ name: 'chargeable',      type: 'boolean' },
		{ name: 'endorsement',      type: 'boolean' },
		{ name: 'repeated',      type: 'boolean' },
		{ name: 'father',      type: 'int' },
		{ name: 'value',      type: 'int' },
	]
});