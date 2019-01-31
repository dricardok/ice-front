
Ext.define('Ice.view.main.MainPanel', {
    extend: 'Ext.panel.Panel',

	requires: [
		'Ext.container.Container',
		'Ext.form.Panel',
		'Ext.form.field.Text',
		'Ext.layout.container.Card',
		'Ext.layout.container.HBox',
		'Ext.layout.container.VBox',
		'Ext.list.Tree',
		'Ext.panel.Panel',
		'Ext.toolbar.Fill',
		'Ice.store.main.MenuStore',
		'Ice.view.main.MainPanelController'
	],

	controller: 'mainpanel',

    layout: {
        type:'vbox',
        align: 'stretch'
    },

    bodyStyle:'background-color: #FAFAFA',

	bbar: ['->',{
    	xtype:'container',
		margin: '0 10 0 0',
		html: 'Made with <span class="fas fa-heart" style="color: red"></span>  © 2019'
	}],

    initComponent: function(){

        let store = Ext.create('Ice.store.main.MenuStore',{
            listeners:{
                scope: this,
                load: function( store , records ){
                    this.getController().onMenuLoad( store, records );
                }
            }
        });

        Ext.apply( this , {
            items:[{
	            xtype:'toolbar',
	            height: 60,
	            cls: 'toolbar',
	            ui: 'toolbar',
	            items:[{
		            iconCls:'x-fa fa-2x fa-bars',
		            cls:'menu-btn',
		            width: 35,
		            height: 35,
		            margin:'0 0 0 10',
		            handler: 'changewidth'
	            },{
		            xtype: 'container',
		            reference: 'toolbartitle'
	            },'->',{
		            xtype: 'container',
		            html:'<div>' +
			            '<span><img src="../../../../resources/biosnet/img/profile.jpg" class="user-img-min"></span>' +
			            '</div>'
	            },{
		            cls:'menu-btn',
		            menu: [{
			            text: 'Sing Out',
			            iconCls: 'x-fa fa-sign-out'
		            },{
			            text: 'Reportar un problema',
			            iconCls: 'fas fa-bug',
                        handler: 'bugmanager'
                    }]
	            },
	            ]
            },{
                xtype:'panel',
                bodyStyle:'background-color: #ECF3F7',
                flex: 1,
                layout:{
                    type:'hbox',
                    align:'stretch'
                },
                items:[{
	                xtype: 'panel',
	                width: 0,
	                reference: 'leftpanel',
	                cls:'leftpanel',
	                layout: {
		                type:'vbox',
		                align: 'stretch'
	                },
	                items:[{
		                xtype:'form',
		                bodyStyle:'background-color: #FAFAFA',

		                height: 50,
		                items:[{
			                xtype:'textfield',
			                width: 250,
			                height: 50,
			                emptyText: 'Buscar...',
			                selectOnFocus: true,
			                hidden: true,
			                reference: 'searchfield',
			                listeners:{
				                change: 'search' //( this, newValue, oldValue, eOpts )
			                }
		                }]
	                },{
		                xtype:'treelist',
		                header: false,
		                reference: 'navigationTreeList',
		                store: store,
		                flex: 1,
		                ui: 'nav',
		                expanderFirst: false,
		                expanderOnly: false,
		                rootVisible: false,
		                listeners: {
			                selectionchange: 'onNavigationTreeSelectionChange',
		                }
	                }]
                },{
                    xtype:'panel',
                    flex: 1,
                    cls: 'borderpanel',
                    bodyStyle:'opacity: 0.9;',
                    reference: 'mainCardPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    },
                    padding: '15 15 15 15'
                }]
            }]
        });

        this.callParent();
    }
});