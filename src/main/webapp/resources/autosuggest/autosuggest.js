(function (mod) {
	if (typeof exports === 'object' && typeof module === 'object') { // CommonJS
		mod(
			require('codemirror/lib/codemirror'),
			require('codemirror/mode/markdown/markdown'),
			require('codemirror/addon/hint/show-hint')
		);
	}
	else if (typeof define === 'function' && define.amd) { // AMD
		define([
			'codemirror/lib/codemirror',
			'codemirror/mode/markdown/markdown',
			'codemirror/addon/hint/show-hint'
		], mod);
	}
	else { // Plain browser env
		mod(CodeMirror);
	}
})(function (CodeMirror) {
	'use strict';

	CodeMirror.defineOption('autoSuggest', [], function (cm, value, old) {

		cm.on('inputRead', function (cm, change) {

			Ext.each( value , function ( word ) {

				if( word.mode === "markdown" && change.text[0] === word.startChar ) {
					cm.showHint({
						completeSingle: false,
						hint: function ( cm , options ) {

							let cur = cm.getCursor(),
								token = cm.getTokenAt(cur),
								end = token.end,
								line = cm.getCursor().line,
								ch = cm.getCursor().ch,
								find = cm.findWordAt({ line: line, ch: ch }),
								B1 = cm.findWordAt({ line: line, ch: ch }).anchor.ch,
								B2 = cm.findWordAt({ line: line, ch: ch }).head.ch,
								str = cm.getRange({line: line ,ch: B1 }, { line: line,ch: B2 }),
								list = [],
								obj = {};

							// console.log( 'cur',cur );
							// console.log( 'token',token );
							// console.log( 'end',end );
							// console.log( 'line',line );
							// console.log( 'find',find );
							// console.log( 'ch',ch );
							// console.log( 'B1',B1 );
							// console.log( 'B2',B2 );
							// console.log( 'str',str );

							word.store.each( function ( record ) {

								if(  str.length === 1 && str === word.startChar ){
									obj = {
										text : word.startChar + record.get( "expression" ),
										displayText: record.get( "name" ) +
											"\n Ejemplo. \t" + record.get( "example" ) +"\n " +
											"Resumen. \t" + record.get( "description" ) + "\n\n"
									};

									obj.text = word.startChar == "#" ? obj.text + "[ ] " : " ";

									list.push( obj );
								}
								else if(  record.get( "name" ).toUpperCase().includes( str.toUpperCase() ) ){

									obj = {
										text : word.startChar + record.get( "expression" ),
										displayText: record.get( "name" ) +
											"\n Ejemplo. \t" + record.get( "example" ) +"\n" +
											"Resumen. \t" + record.get( "description" ) + "\n\n"
									};

									obj.text = word.startChar == "#" ? obj.text + "[ ] " : " ";

									list.push( obj );
								}
							});

							list.push({
								text : "",
								displayText: "Agregar nueva expresion"
							});

							return {
								list: list,
								from: CodeMirror.Pos( cur.line, token.start ),
								to: CodeMirror.Pos( cur.line, end )
							};
						}
					});
				}
			})
		});
	});
});
