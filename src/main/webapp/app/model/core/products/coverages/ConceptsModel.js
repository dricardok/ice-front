
Ext.define('Ice.model.core.products.coverages.ConceptsModel', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: 'id',      type: 'int' },
		{ name: 'fecha_ini',      type: 'date' },
		{ name: 'fecha_fin',      type: 'date' },
		{ name: 'orden',      type: 'int' },
		{ name: 'concepto',      type: 'string' },
		{ name: 'nombre',      type: 'string' },
		{ name: 'comportamiento',      type: 'string' },
		{ name: 'condicion',      type: 'string' },
	]
});