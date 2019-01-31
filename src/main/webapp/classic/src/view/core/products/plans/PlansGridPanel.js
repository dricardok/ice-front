
Ext.define('Ice.view.core.products.plans.PlansGridPanel', {
	extend: 'Extmx.AbstractGridPanel',

	xtype:'plansgridpanel',

	requires: [],

	storeClass: 'Ice.store.core.products.plans.PlansStore',

	crudBtns: true,
	searchBtns: false,

	returnBtn: false,

	getTbar: function () {

		let tbar =  [{
			text: 'Agregar<br>Plan',
			iconCls: 'x-fa fa-2x fa-plus',
			tooltip: 'Presione para agregar un nuevo plan',
			iconAlign: 'top',
			cls: 'success-btn',
			height: 70,
			width: 80,
			margin: '0 10 10 0',
			handler: function () {
				let grid = this.up().up();
				grid.fireEvent('addProduct');
			}
		},{
			text: 'Coberturas',
			reference: 'coveragesBtn',
			iconCls: 'fas fa-2x fa-car-crash',
			tooltip: 'Presione para agregar un nuevo plan',
			iconAlign: 'top',
			cls: 'info-btn',
			height: 70,
			width: 85,
			margin: '0 0 0 0',
			disabled: true,
			handler: function () {
				let grid = this.up().up();
				grid.fireEvent('showcoverages');
			}
		}];

		if( this.returnBtn ){
			tbar.push('->');
			tbar.push({
				text: 'Regresar',
				iconCls: 'x-fa fa-2x fa-arrow-left',
				tooltip: 'Crear nueva variable',
				iconAlign: 'top',
				cls: 'info-btn',
				height: 70,
				width: 90,
				margin: '0 10 0 0',
				handler: function () {
					let grid = this.up().up();
					grid.fireEvent('return');
				}
			});
		}

		return tbar;
	},

	getColumns: function () {
		return [{
			text: 'Nombre',
			dataIndex: 'name',
			flex: 2,
			renderer: function ( value , metaData , record ) {
				return '<div style="font-size: 12pt">' + record.data.name + '</div>';
			}
		}];
	},

	onRowSelection: function ( grid , record ) {
		this.fireEvent('rowselection', record );
	}
});