/* data type*/
let isVarType = function() {

    let types = ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"];
    for (let i in types) {
        let type = types[i];
        isVarType["is" + type] = function(data) {
            return !(!data) && Object.prototype.toString.call(data) === "[object " + type + "]";
        }
    }
}
isVarType();

let isValidNumber = function(data) {
    return !isNaN(Number(data));
}

let toNumber = function(data) {
    
    if (isVarType.isString(data)) {

        if (!isValidNumber(data)) throw new Error("data is String type, but not valid number style!");
        return Number(data);
    }
}

/* define game role class*/
function GameRole(role, totalMoney) {
    this.role  = role;
    this.totalMoney = totalMoney;
    this.init();
}

GameRole.prototype = {

    init: function(){
        
        let defaultMoney = 1500;
        this.totalMoney = this.totalMoney || defaultMoney;
    },
    addMoney: function(delta) {
        
        if (!isVarType.isNumber(delta)) {
            throw new Error("delta type is not Number from func addCoin!");
            return;
        }

        this.totalMoney += delta;
    },
    subMoney: function(delta) {

        if (!isVarType.isNumber(delta)) {
            throw new Error("delta type is not Number from func addCoin!");
            return;
        }

        let totalMoney = this.totalMoney;
        if (totalMoney < delta) return false;
        
        this.totalMoney -= delta;

        return true;
    },
    editFund: function(num, role) {

    }
}


let Dice = function( ) {

}

/* init two diff roles */
let role1 = new GameRole("role1"),
    role2 = new GameRole("role2");

