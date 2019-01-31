
Ext.define('Ice.view.core.products.risk.RiskMainPanel', {
    extend: 'Ext.panel.Panel',

    xtype: 'riskmainpanel',

	requires: [
		'Ext.layout.container.Card',
		'Ice.view.core.products.coverages.ConceptsGridPanel',
		'Ice.view.core.products.coverages.CoveragesGridPanel',
		'Ice.view.core.products.data.VariableDataGridPanel',
		'Ice.view.core.products.plans.PlansGridPanel',
		'Ice.view.core.products.risk.RiskController',
		'Ice.view.core.products.risk.RiskSituationsGridPanel'
	],

	layout: 'card',

	margin: '5 5 5 5',

	controller: 'risk',

    items:[{
        xtype: 'riskgridpanel',
	    listeners:{
		    variabledata: 'showVariableDataPanel',
		    planpanel: 'showPlanPanel',
		    rowselection: 'rowselection'
	    }
    },{
    	xtype: 'variabledatagridpanel',
	    returnBtn: true,
	    reference: 'variablepanel',
	    listeners:{
		    return: 'returnRiskList'
	    }
    },{
	    xtype: 'plansgridpanel',
	    reference: 'planpanel',
	    returnBtn: true,
	    listeners:{
		    return: 'returnRiskList',
		    showcoverages: 'showCoveragesPanel',
		    rowselection: 'planSelection'
	    }
    },{
	    xtype: 'coveragesgridpanel',
	    reference: 'coveragespanel',
	    returnBtn: true,
	    listeners:{
		    return: 'showPlanPanel',
		    showConcepts: 'showConceptsPanel'
	    }
    },{
	    xtype: 'conceptsgridpanel',
	    reference: 'concepts',
	    returnBtn: true,
	    listeners:{
		    return: 'showCoveragesPanel',
		    showExpEditor: 'showExpEditor'
	    }
    }]
});