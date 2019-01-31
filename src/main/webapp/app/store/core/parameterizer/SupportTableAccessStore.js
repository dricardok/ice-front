
Ext.define('Ice.store.core.parameterizer.SupportTableAccessStore', {
    extend: 'Ext.data.Store',

	alias: 'store.SupportTableAccessStore',

	requires: [
		'Ice.model.core.parameterizer.AccessModel'
	],

	model: 'Ice.model.core.parameterizer.AccessModel',

});