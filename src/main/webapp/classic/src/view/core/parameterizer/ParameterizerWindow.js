
Ext.define('Ice.view.core.parameterizer.ParameterizerWindow', {
    extend: 'Ext.window.Window',

	requires: [
		'Ext.layout.container.Fit',
		'Ice.view.core.parameterizer.ParameterizerTabPanel'
	],

	modal: true,
    closable: true,
    resizable: true,

	cls: 'borderpanel',

    title: 'Editor de Expresiones',
	iconCls: 'fas fa-code',

	cls:'winHeaderClass',

	width: 1200,
	height: 600,
	maximizable: true,
	layout: 'fit',
	items:[{
		xtype: 'parameterizertabpanel'
	}]


});