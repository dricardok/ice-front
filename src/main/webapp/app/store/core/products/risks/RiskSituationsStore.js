
Ext.define('Ice.store.core.products.risks.RiskSituationsStore', {
	extend: 'Ext.data.Store',

	alias: 'store.risksituatios',

	requires: [
		'Ice.model.core.products.risks.RiskSituationsModel'
	],

	model: 'Ice.model.core.products.risks.RiskSituationsModel',

	data: { items: [
			{
				id: 420 ,
				name: "RC EMPRESARIAL",
			},{
				id: 430 ,
				name: "HOTELES",
			},{
				id: 606 ,
				name: "ESTACIONAMIENTOS Y TALLERES",
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