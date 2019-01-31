
Ext.define('Ice.view.icereport.panel.IceReportGridPanel', {
    extend: 'Extmx.AbstractGridPanel',

    xtype:'reportsgridpanel',

    height: '100%',

    requires: [],

    storeClass: 'Ice.store.icereport.IceReportStore',

    crudBtns: true,

    selModel:{
        mode: 'SINGLE'
    },

    edittooltip : 'Editar el Reporte',
    deletetooltip: 'Eliminar el Reporte',

    getColumns: function(){
        return [
            { dataIndex: 'id_template', flex: 1 , renderer: function ( value , meta , record ) {
                    let data = record.data,
                        srt = '';

                    if( !Ext.isEmpty( data.nombre_template )){
                        srt += '<div style="font-size: 12pt;">'+
                            data.nombre_template + '</div>';
                    }
                    else{
                        srt += '<div style="font-size: 12pt;"> Reporte ' +
                            data.id_template + '</div>';
                    }

                    if( !Ext.isEmpty( data.descripcion_template ) ){
                        srt += '<div style="font-size: 11pt; margin-top: 10px; margin-bottom: 10px">' +
                            data.descripcion_template +'</div>';
                    }

                    return srt;
                }}
        ];
    },

    getTbar: function () {
        return [{
	        text: 'Nuevo<br>Reporte',
	        iconCls: 'x-fa fa-2x fa-plus',
	        tooltip: 'Crear Nuevo Reporte',
	        iconAlign: 'top',
	        cls: 'success-btn',
	        height: 70,
	        width: 80,
            margin: '0 0 30 20',
            handler: function(){
                let grid = this.up().up();
                grid.fireEvent('addReport');
            }
        }];
    },

    deleteRecord: function( btn ){
        this.fireEvent('deleteReport', btn.record );
    },

    editRecord: function ( btn ) {
        this.fireEvent('editReport', btn.record );
    }
});