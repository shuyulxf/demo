for(var i = 0; i < 100; i++) {
	console.log(i);
}
console.log(this)
//webworker use postMessage to send data
postMessage(i);