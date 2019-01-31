
Ext.define('Ice.store.core.products.coverages.ConceptsStore', {
    extend: 'Ext.data.Store',

	alias: 'store.concepts',

	requires: [
		'Ice.model.core.products.coverages.ConceptsModel'
	],

	model: 'Ice.model.core.products.coverages.ConceptsModel',

	data: { items: [
			{
				id: 1 ,
				name: "Prevencion de la salud",
				fecha_ini: "2010/05/10",
				fecha_fin:"2010/05/20",
				orden: 5 ,
				concepto: "CT002001",
				nombre: "PN PREV SALUD",
				comportamiento: "OBLIATORIO",
				condicion: ""
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