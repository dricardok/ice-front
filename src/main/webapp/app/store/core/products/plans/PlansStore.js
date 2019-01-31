
Ext.define('Ice.store.core.products.plans.PlansStore', {
	extend: 'Ext.data.Store',

	alias: 'store.plans',

	requires: [
		'Ice.model.core.products.plans.PlansModel'
	],

	model: 'Ice.model.core.products.plans.PlansModel',

	data: { items: [
			{
				id: 420 ,
				name: "Plus 100",
			},{
				id: 430 ,
				name: "Plus 1000",
			},{
				id: 606 ,
				name: "Salud 5000",
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