
Ext.define('Ice.store.core.products.ProductsMenuStore', {
	extend: 'Ext.data.TreeStore',

	storeId: 'ProductsNavigationTree',

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
	}],

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: Urls.getProductsMenu,
		reader: {
			type: 'json',
			rootProperty: 'items'
		}
	}
});