
Ext.define('Ice.view.core.products.coverages.ConceptsGridPanel', {
	extend: 'Extmx.AbstractGridPanel',

	xtype:'conceptsgridpanel',

	requires: [],

	storeClass: 'Ice.store.core.products.coverages.ConceptsStore',

	crudBtns: true,
	searchBtns: false,
	returnBtn: false,

	getTbar: function () {

		let tbar =  [{
			text: 'Agregar<br>Concepto',
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
			text: 'Editar<br>Expresion',
			iconCls: 'fas fa-2x fa-clipboard-list',
			tooltip: 'Presione para agregar un nuevo plan',
			iconAlign: 'top',
			cls: 'info-btn',
			height: 70,
			width: 90,
			margin: '0 10 10 0',
			handler: function () {
				let grid = this.up().up();
				grid.fireEvent('showExpEditor');
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
			dataIndex: 'nombre',
			flex: 2,
			renderer: function ( value , metaData , record ) {
				return '<div style="font-size: 12pt">' + record.data.name + '</div>';
			}
		}];
	}
});