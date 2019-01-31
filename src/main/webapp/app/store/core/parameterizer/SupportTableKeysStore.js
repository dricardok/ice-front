
Ext.define('Ice.store.core.parameterizer.SupportTableKeysStore', {
	extend: 'Ext.data.TreeStore',

	fields: [{
		name: 'id', type:'string'
	},{
		name:'xtype', type: 'string'
	},{
		name:'iconCls', type: 'string'
	},{
		name:"text", type:"string"
	},{
		name:"leaf", type: "boolean"
	}]
});