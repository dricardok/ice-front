
Ext.define('Ice.view.core.products.ProductsConfigTreePanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.productsconfigtreepanel',

    init: function() {
		this.id = Ext.id();
    },

	onNavigationTreeSelectionChange: function ( tree , record  ) {
    	if( !Ext.isEmpty( record )){
		    let node = record.data,
			    panel = this.lookupReference('maincontainer');

		    if( Ext.isEmpty( this.menuItems[ node.id ] ) ){
			    this.index++;
			    this.menuItems[ node.id  ] = true ;
			    panel.insert( this.index ,{
				    id: node.id + this.id,
				    xtype: node.xtype
			    });
		    }
		    panel.setActiveItem( node.id + this.id );
		    //this.changeToolbarTitle( node.iconCls , node.text );
	    }
	},

	onMenuLoad: function( store, records ){

		let record = records[ 0 ],
			panel = this.lookupReference('maincontainer');
		this.index = 0;
		this.menuItems = {};
		this.menuItems[ record.data.id  ] = true ;

		panel.insert(0,{
			id: record.data.id + this.id,
			xtype: record.data.xtype,
		});

		panel.setActiveItem(0);

		//this.changeToolbarTitle( record.data.iconCls , record.data.text );

		let tree = this.lookupReference('leftNavigationTreeList');
		tree.setSelection( record );
	},

	changewidth: function () {

		let refs = this.getReferences(),
			navigationList = refs.leftNavigationTreeList,
			wrapContainer = refs.maincontainer,
			collapsing = !navigationList.getMicro(),
			new_width = collapsing ? 60 : 250,
			icon = collapsing ? 'x-fa fa-caret-right': 'x-fa fa-caret-left';

			refs.buttonf.setIconCls( icon );

		navigationList.setWidth( new_width );
		refs.leftpanel.setWidth( new_width );
		navigationList.setMicro( collapsing );

		Ext.resumeLayouts(); // do not flush the layout here...

		// No animation for IE9 or lower...
		wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
		wrapContainer.updateLayout();

	},

});