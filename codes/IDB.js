function IDB(dbName, version) {
	this.dbName = dbName;
	this.version = version;
	this.dbs = null;
}

IDB.prototype = {
	init: function (upgradeCallback, successCallback, errorCallback) {
		var db = this.db,
		    dbName = this.dbName,
		    version = this.version;
		if (!dbName || typeof dbName != "string") 
			throw TypeError("DB name type is error!");
		if (!version || !(typeof version == "string") || !(typeof version == "number")) 
			throw TypeError("DB version type is error!");

		if (!db) {
			var openRequest = indexedDB.open(dbName, version)
			openRequest.onupgradeneeded = function(e) {
				upgradeCallback(e.target.result)
			}
			openRequest.onsuccess = function(e) {
				db = this.db = e.target.result;
				successCallback(db);
			}
			openRequest.onerror = function(e) {
				errorCallback(db)
			}
			openRequest.onblock = function(e) {
				
			}
		}
	}
}