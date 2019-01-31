
Ext.define('Ice.view.core.parameterizer.panel.SearchFunctionPanel', {
    extend: 'Ext.panel.Panel',

    xtype: 'searchfunctionpanel',

	requires: [
		'Ext.form.field.Text',
		'Ext.layout.container.VBox',
		'Ice.view.core.parameterizer.panel.FunctionsGridPanel'
	],

	title: 'Funciones',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items:[{
		xtype:'textfield',
		height: 50,
		itemId: 'search',
		selectOnFocus: true,
		emptyText: 'Buscar'
	},{
		xtype:'functionsgrid',
	}],
});