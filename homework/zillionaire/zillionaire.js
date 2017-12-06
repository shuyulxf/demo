/* get data */
let isMac = (function(){
    return navigator.userAgent.indexOf("Mac OS X") !== -1;
})();
let osTypeClass = "windows";
if (isMac) osTypeClass = "mac";
document.getElementsByTagName("body")[0].className += osTypeClass;
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

let extend = function(obj1, obj2) {
    
    if (!isVarType.isObject(obj1)) obj1 = {};
    if (!isVarType.isObject(obj2)) return obj1;

    for (let key in obj2) {
        obj1[key] = obj2[key] === undefined && obj1[key] || obj2[key];
    }

    return obj1;
}

/* simple dialog */
function SimpleDialog(opts) {

    this.$container = opts.$container;
    let options = {
        title: "Dialog Title!",
        hasTitle : true,
        type : "success",
        html : ""
    };

    this.options = extend(options, opts);
}
SimpleDialog.prototype = {

    show: function() {

        this.$container.append(this.getInnerDialogNode());
    },
    getInnerDialogNode: function() {

        let {hasTitle, title, type, html} = this.options;
        let HTML = `<p class=${hasTitle && "title"}>${hasTitle ? title : ""}</p>
                <div class="dialog-main">${html}</div>
                <span class="close">
                    <i>|</i>
                    <i>|</i>
                </span>
            `;

        let $dialog = document.createElement("dialog");
        $dialog.innerHTML = HTML;
        $dialog.className += "show dialog " + type;

        return $dialog;
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


let Dice = function() {

}

/* init two diff roles */
let role1 = new GameRole("role1"),
    role2 = new GameRole("role2");

let dialog = new SimpleDialog({
    $container: document.getElementsByTagName("body")[0],
    html: "dddsdddddddd",
    hasTitle: false
});
dialog.show();