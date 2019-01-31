
Ext.define('Ice.view.core.products.data.VariableDataGridPanel', {
	extend: 'Extmx.AbstractGridPanel',

	xtype:'variabledatagridpanel',

	requires: [],

	storeClass: 'Ice.store.core.products.variabledata.VariableStore',

	crudBtns: true,
	searchBtns: false,

	returnBtn: false,

	getTbar: function () {

		let tbar =  [{
			text: 'Agregar<br>Variable',
			iconCls: 'x-fa fa-2x fa-plus',
			tooltip: 'Crear nueva variable',
			iconAlign: 'top',
			cls: 'success-btn',
			height: 70,
			width: 80,
			margin: '0 0 0 0',
			handler: function () {
				let grid = this.up().up();
				grid.fireEvent('addProduct');
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
				let required = record.data.required ? '<div style="color: red; font-size: 10pt"> Obligatorio </div>' : '';

				return '<div>' +
					'<div style="font-size: 12pt">' + record.data.name + '</div>' +
					required +
					'</div>';
			}
		},{
			text: 'Tipo de Dato',
			dataIndex: 'type',
			flex: 1,
			align: 'center',
			renderer: function ( value , metaData , record ) {

				let srt = '';

				switch ( value ) {
					case 1: srt = 'Alfanumérico'; break;
					case 2: srt = 'Numérico'; break;
					case 3: srt = 'Porcentaje'; break;
					default: srt = 'Fecha'; break;
				}

				return '<div>' +
					'<div style="font-size: 12pt">' + srt + '</div>' +
					'<div style="font-size: 12pt">Min: ' + record.data.min + ' Max: ' + record.data.max + '</div>' +
					'</div>';
			}
		},{
			text: 'Editable',
			dataIndex: 'editable',
			align: 'center',
			flex: 1,
			renderer: function ( value , metaData , record ) {
				let srt = '<div style="margin-top: 15px">';
				srt += value ? '<span class="x-fa fa-2x fa-check-square"></span>' :
					'<span class="x-fa fa-2x fa-square"></span>';
				srt += '</div>';
				return srt;
			}
		},{
			text: 'Desplegable',
			dataIndex: 'showable',
			align: 'center',
			flex: 1,
			renderer: function ( value , metaData , record ) {
				let srt = '<div style="margin-top: 15px">';
				srt += value ? '<span class="x-fa fa-2x fa-check-square"></span>' :
					'<span class="x-fa fa-2x fa-square"></span>';
				srt += '</div>';
				return srt;
			}
		},{
			text: 'Tarificable',
			dataIndex: 'chargeable',
			align: 'center',
			flex: 1,
			renderer: function ( value , metaData , record ) {
				let srt = '<div style="margin-top: 15px">';
				srt += value ? '<span class="x-fa fa-2x fa-check-square"></span>' :
					'<span class="x-fa fa-2x fa-square"></span>';
				srt += '</div>';
				return srt;
			}
		},{
			text: 'Aparece en <br>Endosos',
			dataIndex: 'endorsement',
			align: 'center',
			flex: 1,
			renderer: function ( value , metaData , record ) {
				let srt = '<div style="margin-top: 15px">';
				srt += value ? '<span class="x-fa fa-2x fa-check-square"></span>' :
					'<span class="x-fa fa-2x fa-square"></span>';
				srt += '</div>';
				return srt;
			}
		},{
			text: 'Repetido en <br>Situaciones',
			dataIndex: 'repeated',
			align: 'center',
			flex: 1,
			renderer: function ( value , metaData , record ) {
				let srt = '<div style="margin-top: 15px">';
				srt += value ? '<span class="x-fa fa-2x fa-check-square"></span>' :
					'<span class="x-fa fa-2x fa-square"></span>';
				srt += '</div>';
				return srt;
			}
		}];
	}
});