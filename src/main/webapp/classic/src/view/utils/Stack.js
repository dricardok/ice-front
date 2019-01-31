
Ext.define('Ice.view.utils.Stack', {

    index : 0,
    stack: [],

    initComponent: function () {
        this.index = 0;
        this.stack = [];
        this.callParent();
    },

    empty: function () {
        return !( this.index > 0 ) ;
    },

    push: function ( item ) {
        this.stack[ this.index++ ] = item;
    },

    pop: function () {
        return this.stack[ --this.index ];
    },

    print: function () {

        for( var i = 0 ; i < this.index ; i++ ){
            console.log('#', this.stack[ i ] , "#" );
        }
        console.log('#######')
    }

});