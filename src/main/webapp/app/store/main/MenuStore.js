
Ext.define('Ice.store.main.MenuStore', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

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
        url: Urls.getMenu,
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }

});