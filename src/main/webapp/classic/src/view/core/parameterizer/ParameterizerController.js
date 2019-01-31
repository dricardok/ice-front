
/**
 * @Author Ing. Daniel Hernandez
 * Date November 1st, 2018 Mexico City
 * @Email daniel@extjs.mx
 *  This is the main class for the parameterizer's controller.
 * */

Ext.define('Ice.view.core.parameterizer.ParameterizerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.parameterizer',

	requires: [
		'Ext.form.field.Text',
		'Ext.layout.container.Fit',
		'Ext.layout.container.VBox',
		'Extmx.view.window.ModalWindow',
		'Ice.model.core.parameterizer.AccessModel',
		'Ice.view.core.parameterizer.panel.BlocksWizardSelecction',
		'Ice.view.core.parameterizer.panel.FunctionsGridPanel',
		'Ice.view.utils.Stack'
	],


	/**
     * start the editor when the container panel fires the afterrender event.
     * @param panel [Object] : the container where the editor will render and start.
     * */

    startEditor: function ( panel ) {

        let container = document.getElementById( panel.id ),
	        alertc = this.lookupReference('alert'),
            me = this;

		this.tree = '';

        this.editor = CodeMirror( function ( elt ) {
            container.parentNode.replaceChild( elt , container );
            },{
                mode:  'strings',
                lineNumbers: true,
                autofocus: true,
                autoCloseBrackets: true
            });

        this.editor.setSize( '100%' , '100%' );
        this.editor.on('pick', function ( selection ) {
	       if( Ext.isEmpty( selection.text ) ){
	       	    let window  = Ext.create('Extmx.view.window.ModalWindow',{
	       	    	width: 800,
		            height: 600
	            });
	       	    window.show();
	       }
        });

        this.editor.on('change', function ( cm , change ) {

            	if( change.text[0] == '#' ){
	        	    me.showFuntions();
	        }

            	if( change.text[0] == '@'){
            		me.showBlocks();
            	}

            	var line = me.editor.getCursor().line,
		        pos =  me.editor.getCursor().ch;

	        if( !me.validate() ){
	        	    alertc.update('<div style="text-align: center; color: #DC3545 ; margin: 0 10px 0 10px"> ' +
			            '<span class="fas fa-exclamation"></span> Error en la sintaxis' +
			            '</div>');
	        }
	        else{
		        alertc.update('<div style=" margin: 0 10px 0 10px; width: 100%" > ' +
			        '<span class="fas fa-code"></span>' +
			        '<span style="margin-left: 10px" >Linea: ' + line + '</span>' +
			        '<span style="margin-left: 10px" >Posición: ' + pos  + '</span>' +
			        '<span style="float: right; margin-right: 10px">' + me.editor.getValue().length + '</span>' +
			        '</div>');

	        }
        });

        if( Ext.isEmpty( me.json ) ){
	        Ext.Ajax.request({
		        async: false,
		        url: 'server/arbol.json',
		        method: 'POST',
		        success: function( response ){
			        me.json = Ext.decode( response.responseText );
		        }
	        });
        }

        if( !Ext.isEmpty( this.getView().rawvalue ) ){
	        this.insertText( this.getView().rawvalue );
        }
    },

	validate: function(){
    	var stack = Ext.create('Ice.view.utils.Stack'),
		    string = this.editor.getValue();

    	for( var i=0 ; i <= string.length ; i++ ){

    		if( string[ i ] === '(' || string[ i ] === '[' || string[ i ] === '{' ){
    			stack.push( string[ i ] );
		    }
    		else if( string[ i ] === ')' ){
			    if( stack.pop() !== '('){
				    return false;
			    }
		    }
		    else if( string[ i ] === ']' ){
			    if( stack.pop() !== '['){
				    return false;
			    }
		    }
		    else if( string[ i ] === '}' ){
			    if( stack.pop() !== '{'){
				    return false;
			    }
		    }
	    }

		this.updateTreeExp( string );

    	return !!stack.empty();
	},

    onSave: function ( btn ) {
        swal("Done!", "All files has been saved.", "success");
    },

	showFuntions: function ( ) {

    	var me = this;

		 var window = Ext.create('Extmx.view.window.ModalWindow',{
		 	    title: 'Funciones',
		 	    width: 800,
			    height: 600,
			    closable: true,
			    layout: {
		 	    	type: 'vbox',
				    align: 'stretch'
			    },
			    items:[{
		 	    	xtype:'textfield',
				    height: 50,
				    itemId: 'search',
				    enableKeyEvents: true,
				    selectOnFocus: true,
				    emptyText: 'Buscar',
				    listeners:{
					    change: function( textfield, newValue, oldValue ){

					    	    var store = window.down('#functionsgrid').getStore();

					    	    store.clearFilter();

					    	    store.filterBy( function ( record ) {
					    	        if( record.data.name.toUpperCase().includes( newValue.toUpperCase() ) ){
					    	            return true;
					    	        }
						        else if( record.data.expression.toUpperCase().includes( newValue.toUpperCase() ) ){
							        return true;
						        }
						        return false;
					    	    });
					    }
				    }
			    },{
				    xtype:'functionsgrid',
				    itemId: 'functionsgrid',
				    listeners:{
					    selection: function( record ){
				    		window.close();
						    me.insertText( record.data.expression + '; ' );
					    }
				    }
			    }],
			    listeners:{
		 	    	show: function( win ){
		 	    		win.down('#search').focus();
			        }
			    }
		 });

		 window.show();
	},

	showBlocks: function(){

		var me = this,
			window = Ext.create('Extmx.view.window.ModalWindow',{
			title: 'Bloques',
			width: 300,
			height: 600,
			closable: true,
			layout: 'fit',
			items:[{
				xtype:'blockswizard',
				listeners:{
					'selection': function( str ){
						window.close();
						me.insertText( str + ' ' );
					}
				}
			}]
		});

		window.show();
	},
	
	insertText: function ( str ) {
		let doc = this.editor.getDoc(),
			cursor = doc.getCursor(),
			pos = {
				line: cursor.line,
				ch: cursor.ch
			};
		doc.replaceRange( str, pos );
	},

	defineTable:  function( variable , tab ){

		var accessStore = this.lookupReference('accessgrid').getStore(),
			me = this;

		accessStore.each( function ( record ) {
			if( record.data.variable === variable ){
				me.mensajes.push( '<div style="margin-top: 5px; margin-left: '+ tab +'px">' +
					'<span> '+ variable +' := <span style="color: #0f9d58">'+  record.data.table + '</span>.' +
					'<span style="color: #0a6ebd">'+  record.data.attribute + '</span></span>'+
					'</div>' );

				Ext.each( record.data.accessKeys, function ( key ) {
					if( !Ext.isEmpty( key ) ){
						me.mensajes.push( '<div style="margin-top: 15px; margin-left: '+ ( tab + 10 ) +'px">' +
							'<span> '+ key.name +' := <span style="color: #0f9d58"> '+ key.expression +' </span>' +
							'</div>');

						var tokens = me.breakExpression( key.expression  );

						Ext.each( tokens, function ( token ) {
							me.treefn( token, ( tab + 30 ) );
						})
					}
				});
			}
		});
	},

	breakExpression: function( string ){

		var queue = [],
			isToken = false,
			isFuction = false,
			isAccessSupport = false,
			token = '';

		for( var i=0 ; i <= string.length ; i++ ){

			if( string[ i ] === '$' ){
				isToken = true;
			}

			if( string[ i ] === '#' ){
				isFuction = true;
			}

			if( string[ i ] === ']' ){

				if( isToken && !Ext.isEmpty( token ) ){
					queue.push( token );
					isToken = false;
					token = '';
				}

				queue.push( '~' );
			}

			if( string[ i ] === '$' ){
				isAccessSupport = true;
			}

			if( i === string.length ){
				if( isToken || isFuction || isAccessSupport ){
					isToken = false;
					isFuction = false;
					isAccessSupport = false;
					queue.push( token );
					token = '';
				}
			}

			if( string[ i ] === ' ' ||
				string[ i ] === '+' ||
				string[ i ] === ';' ||
				string[ i ] === ',' ||
				string[ i ] === '/' ||
				string[ i ] === ')' ||
				string[ i ] === ']' ||
				string[ i ] === '[' ||
				string[ i ] === '=' ||
				string[ i ] === '\n' ||
				string[ i ] === '*'
			){
				if( !Ext.isEmpty( token ) ){
					queue.push( token );
				}

				if( isFuction ){
					queue.push( '@' );
				}

				token = '';
				isToken = false;
				isFuction = false;
				isAccessSupport = false;
			}

			if( isToken || isFuction || isAccessSupport ){
				token += string[ i ];
			}

		}
		return queue;
	},

	updateTreeExp: function ( str ) {

    	var me = this,
		    tokens = this.breakExpression( str ),
		    msg = '<div class="tree" id="tree">',
	        level = 10,
	        showtables = false;

    	this.mensajes = [];

    	for( var i = 0 ; i < tokens.length ; i++  ){

    		if( tokens[ i ][ 0 ] === '@' ){
    			level += 20;
		    }
    		else if( tokens[ i ][ 0 ] === '$' && me.validateAccess( tokens[ i ] ) ){
			    this.defineTable( tokens[ i ] , level );
		    }
		    else if( tokens[ i ][ 0 ] === '$'  ){
			    this.treefn( tokens[i] , level );
		    }
    		else{
			    if( tokens[ i ][ 0 ] === '~' ){
					level -= 20;
			    }
			    this.treefn( tokens[i] , level );
		    }
	    }

	    for( var i = 0 ; i < this.mensajes.length ; i++ ){
    		msg += this.mensajes[ i ];
	    }

    	msg += '</div>';

	    this.tree = msg;

		this.lookupReference('tree').update( msg );
	},

	treefn: function (  token , tab ) {

    	if( token[0] === '$' ){
		    if( Ext.isEmpty( this.json.data.variables[ token ] ) ){
			    this.mensajes.push( '<div style="margin-top: 10px; margin-left: '+ tab +'px">' +
				    '<span>'+ token +'</span> := ' +
				    '<span style="font-weight: bold; color: #DC3545">SIN DEFINIR</span> ' +
				    '</div>' );
		    }
		    else{

			    var value = this.json.data.variables[ token ].value,
				    newTokens = this.breakExpression( value );

			    this.mensajes.push('<div style=" margin-top: 10px; margin-left: '+ tab +'px">' +
				    '<span style="color: dodgerblue;">'+ token +'</span> := ' +
				    '<span style="color: #0f9d58">'+ value +';</span></div>');

			    for( var i = 0 ; i < newTokens.length ; i++ ){
				    token = newTokens[ i ];
				    this.treefn( token , tab + 20 );
			    }
		    }
	    }
    	else if( token[0] === '#' ){
		    this.mensajes.push('<div style=" margin-top: 10px; margin-left: '+ tab +'px">' +
			    '<span style="color: #ff6f00;">'+ token +'[</span></div>');
	    }

	    else if( token[0] === '~' ){
		    this.mensajes.push('<div style=" margin-top: 10px; margin-left: '+ tab +'px">' +
			    '<span style="color: #ff6f00;">]</span></div>');
	    }



    	return  0;
	},

	printTree: function () {
		const element = document.getElementById('tree');
		html2canvas(element).then((canvas) => {

			const imgData = canvas.toDataURL('image/png'),
					doc = new jsPDF( 'p', 'pt', 'letter');

			doc.addImage( imgData ,'JPEG',20,20);
			doc.save('tree.pdf');
		});
	},

	supportTableAccess: function () {
		this.getView().fireEvent('showSupportTables', null );
	},

	getRawValue: function ( ) {
		return this.editor.getValue();
	},

	insertAccessRecord: function ( record ) {

    	 let store = this.lookupReference('accessgrid').getStore(),
		     index = store.find( 'variable' , record.variable ),
		     model = Ext.create('Ice.model.core.parameterizer.AccessModel',{
			     table: record.name,
			     attribute: record.attribute,
			     variable: record.variable,
			     accessKeys : record.accessKeys,
			     expression: record.expresion
		     });

    	 if( index >= 0 ){
    	 	store.removeAt( index );
		    store.add( model );
	     }
    	 else{
		     store.add( model );
	     }
	},

	validateAccess: function ( token ) {
		var accessStore = this.lookupReference('accessgrid').getStore(),
			find = false;

		accessStore.each( function ( record ) {
			if( record.data.variable === token ){
				find = true;
			}
		});

		return find
	},
	
	getValue: function () {
		let str = this.getRawValue(),
			accessStore = this.lookupReference('accessgrid').getStore();
		accessStore.each(function ( access ) {
			str = str.replace( access.data.variable , ' ' + access.data.expression + ' ' );
		});
	},

	getDictionary: function () {
		return this.json;
	}

});