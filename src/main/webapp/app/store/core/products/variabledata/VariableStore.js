
Ext.define('Ice.store.core.products.variabledata.VariableStore', {
	extend: 'Ext.data.Store',

	alias: 'store.variables',

	requires: [
		'Ice.model.core.products.variabledata.VariableModel'
	],

	model: 'Ice.model.core.products.variabledata.VariableModel',

	data: { items: [
			{
				id: 420 ,
				name: "SEXO",
                type: 1,
                min: 2,
                max: 20,
				required: true,
				editable: false,
				showable: true,
				chargeable: true,
				endorsement: true,
				repeated: true,
				father: 1,
				value: 1

			},{
				id: 430 ,
				name: "F NACIMIENTO",
				type: 3,
				min: 2,
				max: 20,
				required: false,
				editable: true,
				showable: true,
				chargeable: false,
				endorsement: true,
				repeated: true,
				father: 1,
				value: 1
			},{
				id: 606 ,
				name: "CODIGO POSTAL",
				type: 2,
				min: 2,
				max: 20,
				required: true,
				editable: false,
				showable: true,
				chargeable: false,
				endorsement: true,
				repeated: false,
				father: 1,
				value: 1
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
