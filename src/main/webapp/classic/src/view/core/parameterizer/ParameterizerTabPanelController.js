
Ext.define('Ice.view.core.parameterizer.ParameterizerTabPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.parameterizertabpanel',

	requires: [
		'Ext.fx.Anim',
		'Extmx.view.window.ModalWindow',
		'Ice.view.core.parameterizer.panel.supporttables.SupportPanel'
	],

	showSupportTables: function ( access ) {

	    let me = this,
		    panel = this.lookupReference('parameterizerpanel'),
		    dictionary = panel.getDictionary(),
		    window = Ext.create('Extmx.view.window.ModalWindow',{
			    title: 'Tablas de Apoyo',
			    iconCls: 'fas fa-table',
			    width: 800,
			    height: 600,
			    cls:'winHeaderClass',
			    resizable: true,
			    closable: true,
			    maximizable: true,
			    items:[{
				    xtype:'supportpanel',
				    access: access,
				    dictionary: dictionary,
				    listeners: {
					    access: function( record ){
						    window.destroy();
						    panel.insertAccessRecord( record );
					    }
				    }
			    }]
	        });

		Ext.create('Ext.fx.Anim',{
			target: window,
			duration: 800,
			from:{
				y:-2000
			},
			to:{
				y:50
			},
			listeners: {
				beforeanimate:function(){
					window.show();
				}
			}
		});

    }


});