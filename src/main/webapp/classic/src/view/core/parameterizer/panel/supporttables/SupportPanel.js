
Ext.define('Ice.view.core.parameterizer.panel.supporttables.SupportPanel', {
    extend: 'Ext.panel.Panel',

    xtype:'supportpanel',

	requires: [
		'Ext.container.Container',
		'Ext.form.field.Text',
		'Ext.layout.container.Card',
		'Ext.layout.container.HBox',
		'Ext.panel.Panel',
		'Ext.toolbar.Fill',
		'Ice.view.core.parameterizer.panel.TablesGridPanel',
		'Ice.view.core.parameterizer.panel.supporttables.AccessKeysGridPanel',
		'Ice.view.core.parameterizer.panel.supporttables.AtributtesGridSelection',
		'Ice.view.core.parameterizer.panel.supporttables.SupportPanelController'
	],

	layout: 'card',

	controller: 'supportpanel',

	tbar:[{
		xtype:'textfield',
		fieldLabel: 'Nombre del Acceso',
		allowBlank: false,
		height: 50,
		width: 300,
		reference: 'variable',
		selectOnFocus: true,
		margin: '10 0 10 0'
	}],

    bbar: ['->',{
        text:'Anterior',
	    iconCls: 'fas fa-arrow-left',
	    cls: 'info-btn'
    },{
        text: 'Siguiente',
	    iconCls: 'fas fa-arrow-right',
	    cls: 'info-btn'
    },{
        text: 'Guardar',
	    cls: 'success-btn',
	    iconCls: 'fas fa-save',
	    handler:'save'
    }],

    items:[{
        xtype:'tablesgridpanel',
	    listeners:{
		    selection: 'tableSelected'
	    }
    },{
	    xtype:'attributesselection',
	    reference: 'attributes',
	    listeners:{
		    selection: 'attributeSelected'
	    }
    },{
        //aqui van los editores de llaves disponibles
	    xtype:'panel',
	    layout:{
	    	type: 'hbox',
		    align: 'stretch'
	    },
	    items:[{
		    xtype:'accesskeysgridpanel',
		    header: false,
		    reference: 'accesskeysgridpanel',
		    width: 200,
		    margin: '20 0 0 0',
		    listeners: {
			    rowclick: 'keyClick'
		    }
	    },{
	    	xtype: 'panel',
		    reference: 'editors',
		    width: 600,
		    layout: 'card',
		    items: [{
	    		xtype: 'container'
		    }]
	    }]
    }]
});