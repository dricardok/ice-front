
Ext.define('Ice.view.core.products.ProductsConfigTabPanel', {
    extend: 'Ext.tab.Panel',

    xtype: 'productsconfigpanel',


	requires: [
		'Ext.layout.container.Fit',
		'Ice.view.core.products.ProductsForm',
		'Ice.view.core.products.data.VariableDataGridPanel',
		'Ice.view.core.products.risk.RiskMainPanel'
	],

	margin: '10 10 0 10',

	defaults:{
    	layout: 'fit'
	},

	items:[{
        title:'Datos Generales',
        iconCls: 'x-fa fa-info',
		items:[{
			xtype:'productsgeneralinformation',
			title: 'Datos Generales',
			iconCls: 'x-fa fa-info'
		}]

    },{
        title:'Riesgos',
        iconCls: 'x-fa fa-exclamation-circle',
        items:[{
	        xtype:'riskmainpanel',
	        title: 'Situaciones de Riesgo',
	        iconCls: 'x-fa fa-exclamation-circle'
        }]
    },{
        title: 'Datos Variables',
		iconCls: 'x-fa fa-database',
		items:[{
			xtype:'variabledatagridpanel',
			title: 'Datos Variables',
			iconCls: 'x-fa fa-database',
			margin: '10 10 0 10'
		}]

    },{
        title: 'Datos Fijos',
		iconCls: 'far fa-clock'
    },{
        title: 'Roles',
		iconCls: 'fas fa-user'
    },{
        title: 'Conceptos Globales',
		iconCls: 'fas fa-globe-americas'
    },{
        title: 'Variables temporales',
		iconCls: 'far fa-clock'
    },{
        title: 'Reglas de validación',
		iconCls: 'fas fa-check-double'
    }]
});