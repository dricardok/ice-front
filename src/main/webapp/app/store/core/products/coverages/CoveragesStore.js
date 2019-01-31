
Ext.define('Ice.store.core.products.coverages.CoveragesStore', {
	extend: 'Ext.data.Store',

	alias: 'store.coverages',

	requires: [
		'Ice.model.core.products.coverages.CoveragesModel'
	],

	model: 'Ice.model.core.products.coverages.CoveragesModel',

	data: { items: [
			{
				id: 420 ,
				name: "Prevencion de la salud",
			},{
				id: 430 ,
				name: "Matenimiento de la salud",
			},{
				id: 606 ,
				name: "Ayuda de maternidad",
			},{
				id: 607 ,
				name: "Ayuda de maternidad",
			},{
				id: 608 ,
				name: "Servicios Auxiliares",
			},{
				id: 609 ,
				name: "Servicios Odontologicos",
			},{
				id: 611 ,
				name: "Hospitalizacion",
			},{
				id: 613 ,
				name: "Hospitalizacion",
			},{
				id: 614 ,
				name: "Hospitalizacion",
			},{
				id: 615 ,
				name: "Hospitalizacion",
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