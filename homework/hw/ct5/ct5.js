var lang;

$(document).ready(function(){

	if(localStorage.langSettings) { // if langSettings exists...
		lang = localStorage.langSettings; // recall the last language set
	} else {
		lang = "en"; // Otherwise, initialise with English
	}
	
	// Hide all languages...
	$('div:lang(en)').hide();
	$('div:lang(es)').hide();
	$('div:lang(de)').hide();

	// Then, show the language set:
	$('div:lang(' + lang + ')').show();
	
	
	$('#enTrans').click(function(){
		$('div[lang]').hide();
		localStorage.langSettings = "en";
		$('div:lang(en)').show();
	});
	$('#esTrans').click(function(){
		$('div[lang]').hide();
		localStorage.langSettings = "es";
		$('div:lang(es)').show();
	});
	$('#deTrans').click(function(){
		$('div[lang]').hide();
		localStorage.langSettings = "de";
		$('div:lang(de)').show();
	});
	
});