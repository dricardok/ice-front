
Ext.define('Ice.store.core.products.support.SupportTablesStore', {
    extend: 'Ext.data.Store',

	autoLoad: true,

	alias: 'store.supporttables',

	proxy: {
		type: 'ajax',
		url: 'server/support.json',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
});