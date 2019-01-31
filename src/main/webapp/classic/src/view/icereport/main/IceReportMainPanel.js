
Ext.define('Ice.view.icereport.main.IceReportMainPanel', {
    extend: 'Ext.panel.Panel',

    xtype:'icereport',

    requires: [
        'Ext.layout.container.Card',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.ux.statusbar.StatusBar',
        'Ice.view.icereport.main.IceReportController',
        'Ice.view.icereport.panel.IceReportGridPanel'
    ],

    layout:'card',

    controller: 'icereport',

    frame: true,

    initComponent: function(){

        let me = this;

        Ext.apply( this, {

            tbar:[{
                reference:'hidetoolpanel',
	            cls:'info-btn',
	            height: 40,
	            width: 50,
                margin: '10 10 10 10',
                handler: 'hidetoolpanel',
                iconCls: 'x-fa fa-eye',
                hidden: true,

            },'->',{
                text:'Cancelar',
                iconCls: 'x-fa fa-2x fa-ban',
                reference: 'cancelbtn',
                hidden: true,
                width: 100,
                height: 40,
                cls:'danger-bnt',
                margin: '10 10 10 0',
                handler:'returnToGrid'
            },{
                text:'Guardar',
                iconCls: 'x-fa fa-2x fa-save',
                hidden: true,
                width: 100,
                height: 40,
                reference:'savebtn',
                cls:'success-btn',
                handler:'saveReport'
            }],

            items:[{
                xtype: 'reportsgridpanel',
                reference: 'reportsgrid',
                layout:'fit',
                listeners:{
                    'addReport': function(){
                        me.getController().showReporterEditor();
                    },
                    'editReport': function( record ){
                        me.getController().editReport( record );
                    },
                    'deleteReport': function( record ){
                        me.getController().deleteReport( record );
                    }
                }
            },{
                xtype:'panel',
                height: 850,
                reference:'editor',
                listeners:{
                    //afterrender: 'startReporter'
                },
                bbar: Ext.create('Ext.ux.StatusBar', {
                    id: 'my-status',
                    reference:'statusbar'
                })
            }]
        });

        this.callParent();
    },
});