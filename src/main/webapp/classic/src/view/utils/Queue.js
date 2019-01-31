
Ext.define('Ice.view.utils.Queue', {

	queue: [],

	initComponent: function () {
		this.queue = [];
		this.callParent();
	},

	empty: function () {
		return !this.queue.length ;
	},

	push: function ( item ) {
		this.queue.push( item );
	},

	pop: function () {
		 return this.queue.shift();
	}
});