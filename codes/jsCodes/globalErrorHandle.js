/* 
 * Note that col & error are new to the HTML 5 spec and may not be 
 * supported in every browser.  It worked for me in Chrome.
*/
window.onerror = function(msg, url, line, col, error) {
	
	var errorMsg = "Error Msg: %c" + msg,
	    urlInfo = "\n%cUrl Info: " + url,
	    lineInfo = "\nError Line: %c" + line,
	    colInfo = !col ? "" : "\n%cError Column: %c" + col,
	    errorInfo = !error ? "" : "\n%cError: " + error.stack;
	
	console.log(errorMsg + 
			    urlInfo  +
			    lineInfo +
			    colInfo  +
			    errorInfo,
			    "color: #ff5030;","color: black;","color: #ff5030","color: black;","color: #ff5030","color: black;");

    // If you return true, then error alerts (like in older versions of 
    // Internet Explorer) will be suppressed.
    var suppressErrorAlert = true;
   
    return suppressErrorAlert;
};
