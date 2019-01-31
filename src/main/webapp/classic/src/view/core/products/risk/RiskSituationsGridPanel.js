
Ext.define('Ice.view.core.products.risk.RiskSituationsGridPanel', {
	extend: 'Extmx.AbstractGridPanel',

	xtype:'riskgridpanel',

	requires: [
		'Ext.form.Panel',
		'Ext.form.field.Text',
		'Ext.layout.container.VBox'
	],

	storeClass: 'Ice.store.core.products.risks.RiskSituationsStore',

	crudBtns: true,


	getTbar: function () {
		return [{
			text: 'Agregar<br>Riesgo',
			iconCls: 'x-fa fa-2x fa-plus',
			tooltip: 'Presiona para agregar una nueva situación de riesgo',
			iconAlign: 'top',
			cls: 'success-btn',
			height: 70,
			width: 80,
			margin: '0 0 20 0',
			handler: function () {
				let grid = this.up().up();
				grid.fireEvent('addRisk');
			}
		},{
			text: 'Datos<br>Variables',
			reference: 'variabledatabtn',
			iconCls: 'x-fa fa-2x fa-database',
			tooltip: 'Presiona para ver los datos variables de este producto',
			iconAlign: 'top',
			cls: 'info-btn',
			height: 70,
			width: 80,
			disabled: true,
			margin: '5 10 0 10',
			handler: function () {
				let grid = this.up().up();
				grid.fireEvent('variabledata');
			}
		},{
			text: 'Planes',
			reference: 'planbtn',
			iconCls: 'x-fa fa-2x fa-list',
			tooltip: 'Presiona para ver los planes de este producto',
			iconAlign: 'top',
			disabled: true,
			cls: 'info-btn',
			height: 70,
			width: 80,
			margin: '0 0 0 0',
			handler: function () {
				let grid = this.up().up();
				grid.fireEvent('planpanel');
			}
		}]
	},

	getColumns: function () {
		return [{
			dataIndex: 'name',
			flex: 1,
			renderer: function ( value , metaData , record ) {
				return '<div>' +
					'<span style="font-size: 12pt">' + record.data.name + '</span>' +
					'</div>';
			}
		}];
	},

	easySearchForm: function () {

		return {
			xtype: 'form',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items:[{
				xtype: 'textfield',
				fieldLabel: 'Buscar Riesgo',
				labelAlign: 'top',
				emptyText: 'Nombre + ENTER',
				width: 200
			}]
		}
	},

	onRowSelection: function ( grid , record ) {
		this.fireEvent('rowselection', record );
	}
});