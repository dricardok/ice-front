
Ext.define('Ice.store.core.products.blocks.BlocksStore', {
    extend: 'Ext.data.Store',

	autoLoad: true,

	alias: 'store.blocks',

	proxy: {
		type: 'ajax',
		url: 'server/blocks.json',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}

});