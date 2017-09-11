var isWebWorkerSupportted = function() {
	return window.Worker ? true : false;
}

var WebWorker = function(url) {
	if (!isWebWorkerSupportted() || !url) return null;
	return new Worker(url);
}