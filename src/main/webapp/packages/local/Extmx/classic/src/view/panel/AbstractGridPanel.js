/**
 *
 * @Class Extmx.view.panel.AbstractGridPanel
 * Author Ing. Daniel Hernandez
 * Date wednesday, November 7, 2018 Mexico City
 *
 * */
Ext.define('Extmx.view.panel.AbstractGridPanel', {
    extend: 'Ext.grid.Panel',

    alternateClassName: 'Extmx.AbstractGridPanel',

	requires: [
		'Ext.toolbar.Paging',
		'Ext.ux.ProgressBarPager'
	],

	//Defines the class and the config obj of the grid
    storeClass: '',
    storeConfig: {},

    crudBtns: false,

    editRecordMethod: '',
    edittooltip : 'edit',
    editIconCls: 'x-fa fa-pencil',
    deletetooltip: 'delete',
    deleteIconCls: 'x-fa fa-trash',

    searchBtns: true,

    initComponent: function () {
        var store = this.generateStore(),
            me = this;

        Ext.apply( this , {
            columns: this.getConfigColumns(),
            store: store,
            tbar: this.getCompleteTbar(),
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 25,
                plugins: new Ext.ux.ProgressBarPager()
            },
	        listeners: {
            	rowclick: function ( grid, record ) {
		            me.onRowSelection( grid, record );
	            }
	        }
        });

        this.relayEvents( store , ['load'] );
        this.callParent();
    },
    /**
     * getColumns: Object[]
     * Private method to get the columns of the grid
     * @Params none
     * */
    getColumns: Ext.emptyFn,

    getConfigColumns: function(){

        var me = this,
            columns = this.getColumns() || [];

        if( this.crudBtns ){
            columns.push({ width: 80 , aling: 'center', renderer: function ( value, meta , record ) {

                    var id = Ext.id();
                    Ext.defer(function () {
                        Ext.widget('button', {
                            renderTo: id,
                            iconCls: me.editIconCls ,
                            tooltip: me.edittooltip ,
                            cls:'info-btn',
                            height: 40,
                            width: 50,
                            scope: me,
                            margin: '10 0 10 0',
                            record: record,
                            handler: me.editRecord
                        });
                    }, 50);

                    return Ext.String.format('<div id="{0}"></div>', id);
                }});

            columns.push({ width: 80 , renderer: function ( value, meta , record ) {
                    var id = Ext.id();
                    Ext.defer(function () {
                        Ext.widget('button', {
                            renderTo: id,
                            iconCls: me.deleteIconCls,
                            tooltip: me.deletetooltip,
                            cls:'danger-bnt',
                            height: 40,
                            width: 50,
                            scope: me,
                            record: record,
                            margin: '10 0 10 0',
                            handler: me.deleteRecord
                        });
                    }, 50);

                    return Ext.String.format('<div id="{0}"></div>', id);
                }});
        }

        return columns;
    },

    /**
     * generateStore: Object
     * Private method to get an instance of the store class
     * @params none
     * */
    generateStore: function () {
        return Ext.create( this.storeClass , this.storeConfig );
    },

    getTbar: Ext.emptyFn,

    getCompleteTbar: function(){

        var tbar = this.getTbar(),
            easyForm = this.easySearchForm();

        if( this.searchBtns ){

            tbar.push({
	            text: 'Permisos<br>de usuario',
	            iconCls: 'x-fa fa-2x fa-lock',
	            tooltip: 'Muestra los permisos relacionados éste módulo',
	            iconAlign: 'top',
	            cls: 'info-btn',
	             height: 70,
	             width: 80,
	            margin: '0 0 0 10',
	            handler: function () {

	            }
            });

	        tbar.push('->');

	        tbar.push( easyForm );

	        tbar.push({
		        text: 'Búsqueda<br>Avanzada',
		        iconCls: 'x-fa fa-2x fa-search',
		        tooltip: 'Muestra el formulario para realizar una búsqueda avanzada',
		        iconAlign: 'top',
		        cls: 'info-btn',
		        // height: 40,
		        // width: 40,
		        margin: '0 10 0 0',
		        handler: function () {

		        }
	        });
        }

        return tbar;
    },

    easySearchForm: Ext.emptyFn,

    editRecord: Ext.emptyFn,

    deleteRecord: Ext.emptyFn,

	onRowSelection: Ext.emptyFn

});