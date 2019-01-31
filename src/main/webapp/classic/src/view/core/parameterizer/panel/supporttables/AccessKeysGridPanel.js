
Ext.define('Ice.view.core.parameterizer.panel.supporttables.AccessKeysGridPanel', {
    extend: 'Ext.grid.Panel',

    xtype: 'accesskeysgridpanel',

	requires: [
		'Ext.data.Store',
		'Ice.model.core.parameterizer.KeyModel'
	],

	model:'Ice.model.core.parameterizer.KeyModel',

	columns: [{
        dataIndex: 'text',
		width: 200,
		renderer: function ( table, meta, record ) {
			return '<div style="margin-top: 10px; margin-bottom: 10px; text-align: left">' +
				'<span class="'+record.data.iconCls+'"></span>'+
				'<span style="margin-left: 10px">'+ record.data.text +'</span>'+
				'</div>';
		}
    }],

    initComponent: function () {

        const store = Ext.create('Ext.data.Store',{
	        fields: [{
		        name: 'num_key', type:'int'
	        },{
		        name:'iconCls', type: 'string'
	        },{
		        name:"text", type:"string"
	        }]
        });

        Ext.apply( this, {
            store: store
        });

        this.callParent();
    }
});