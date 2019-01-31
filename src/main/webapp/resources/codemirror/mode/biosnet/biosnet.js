// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("../../lib/codemirror"), require("../css/css"));
	else if (typeof define == "function" && define.amd) // AMD
		define(["../../lib/codemirror", "../css/css"], mod);
	else // Plain browser env
		mod(CodeMirror);
})(function(CodeMirror) {
	"use strict";

	CodeMirror.defineSimpleMode("strings", {
		start: [
			{regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
			{regex: /'(?:[^\\]|\\.)*?(?:'|$)/, token: "string"},
			{regex: /&[a-zA-Z0-9]*/, token: "string"},
			{regex: /@[a-zA-Z0-9]*.[a-zA-Z0-9]*/, token: "keywordt"},
			{regex: /\$[a-zA-Z0-9]*/, token: "keywordv"},
			{regex: /#[a-zA-Z0-9]*/, token: "keywordf"},
			{regex: /\[/, token: "keyopen"},
			{regex: /]/, token: "keyopen"},
			{regex: /\(/, token: "keyopen"},
			{regex: /\)/, token: "keyopen"},
			{regex: /{/, token: "keyopen"},
			{regex: /}/, token: "keyopen"}

		]
	});
});
