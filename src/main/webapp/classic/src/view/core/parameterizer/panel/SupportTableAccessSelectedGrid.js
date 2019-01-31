
Ext.define('Ice.view.core.parameterizer.panel.SupportTableAccessSelectedGrid', {
    extend: 'Ext.grid.Panel',

    xtype:'supportableaccessselectedgrid',

	requires: [
		'Ice.store.core.parameterizer.SupportTableAccessStore'
	],

	store:{
    	type:'SupportTableAccessStore'
	},

    initComponent: function () {

    	let me = this;

    	Ext.apply( this, {
		    columns:[{
			    text:'Variable',
			    dataIndex: 'variable',
			    width: 150
		    },{
			    text:'Tabla',
			    dataIndex: 'table',
			    flex: 1
		    },{
			    text:'Atributo',
			    dataIndex: 'attribute',
			    width: 150
		    },{ width: 80 , aling: 'center', renderer: function ( value, meta , record ) {

				    var id = Ext.id();

				    Ext.defer(function () {
					    Ext.widget('button', {
						    renderTo: id,
						    iconCls: 'x-fa fa-pencil' ,
						    tooltip: 'Editar Acceso' ,
						    cls:'info-btn',
						    height: 30,
						    width: 40,
						    //scope: me,
						    margin: '5 0 5 0',
						    record: record,
						    handler: function(){
						    	me.fireEvent('editaccess',record);
						    }
					    });
				    }, 50);

				    return Ext.String.format('<div id="{0}"></div>', id);
			    }}]
	    });
    	this.callParent();
    }
});