
Ext.define('Ice.view.core.parameterizer.ParameterizerTabPanel', {
    extend: 'Ext.tab.Panel',

    xtype: 'parameterizertabpanel',

	controller: 'parameterizertabpanel',

	requires: [
		'Ext.layout.container.Fit',
		'Ice.view.core.parameterizer.ParameterizerPanel',
		'Ice.view.core.parameterizer.ParameterizerTabPanelController'
	],

	items:[{
        title: 'Expresion',
        iconCls: 'fas fa-code',
        layout: 'fit',
        items:[{
            xtype:'parameterizerpanel',
	        reference: 'parameterizerpanel',
	        listeners:{
            	    showSupportTables: 'showSupportTables',
	        }
        }]
    }]


});