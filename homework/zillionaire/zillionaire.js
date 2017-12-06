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

    let that = this;

    let options = {
        $container: document.getElementsByTagName("body")[0],
        title: "Dialog Title!",
        hasTitle : false,
        type : "success",
        html : "",
        hasCancel: false,
        cancelBtn: "取消",
        cancelCallback: null,
        hasSure: false,
        sureBtn: "确定",
        sureCallback:null,
        auto: false,
        delay: 2000,
        hasClose: false
    };

    this.options = extend(options, opts);
    this.$container = options.$container;
    this.possessions = [];
    this.init();
}
SimpleDialog.prototype = {
    init: function(){

        let that = this,
            $dialog = document.createElement("dialog");
        $dialog.className += "dialog ";
        
        $dialog.addEventListener("click", function(e){
  
            let t = e.target.parentElement,
                cs = t.className;
            if (cs.indexOf("close") !== -1 && cs.indexOf("sure") !== -1 && cs.indexOf("cancel") !== -1) return;
            
            let {hasCancel, cancelCallback, hasSure, sureCallback} = that.options;
            if (hasCancel && cancelCallback) cancelCallback();
            if (hasSure && sureCallback) sureCallback();

            that.hide();
        });
        this.$dialog = $dialog;        
    },
    show: function(){

        this.$dialog.className += " show";
    },
    hide: function(){

        let $dialog = this.$dialog;
        $dialog.className = $dialog.className.replace("show", "");
    },
    showDialog: function() {

        let {auto, delay} = this.options,
            that = this;
        this.$container.append(this.getInnerDialogNode());
        this.show();

        let timer = 0;
        if (auto) timer = setTimeout(function(){
            that.hide();
            clearTimeout(timer);
        }, delay);
    },
    getInnerDialogNode: function() {

        let {hasTitle, title, type, html, hasClose, hasCancel, cancelBtn, hasSure, sureBtn} = this.options;

        let renderOpBtnHTML = function(){
            let sureBtnHTML = `<button class='sure'>${sureBtn}</button>`,
                cancelBtnHTML = `<button class='cancel'>${cancelBtn}</button>`;
            
            return (hasCancel || hasSure) ? `<div class="op-btns"> ${sureBtnHTML}${cancelBtnHTML}</div>` : "";
        }

        let renderCloseHTML = function() {
            return hasClose ? `<span class="close"><i>|</i><i>|</i></span>` : "";
        }
       
        let HTML = `<p class=${hasTitle && "title"}>${hasTitle ? title : ""}</p>
                <div class="dialog-main">${html ? html : ""}</div>
                ${renderOpBtnHTML()}
                ${renderCloseHTML()}
            `;
        
        let $dialog = this.$dialog;
        $dialog.innerHTML = HTML;
        $dialog.className += type;

        return $dialog;
    }, 
    cancel: function(){
        this.hide();
    },
    sure: function(){

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


let Dice = function(role) {
    let colors = ["#f0e68cc2", ""]
}

let showDialog = function(opts) {
    
    let auto = opts.auto;
    if (!auto) opts.hasClose = true;
    let dialog = new SimpleDialog(opts);
    dialog.showDialog();
}


function Building(type, fee, toll, role) {

    this.type = type;
    this.fee  = fee;
    this.toll = toll;
    this.ower = role;
}
Building.prototype = {
    collectToll: function(role) {

        if (!isVarType.isObject(role) || !(role instanceof GameRole)) {
            showDialog({html: "Role type error!>", auto: false});
        }

        let fee  = this.fee,
            ower = this.ower;
        let subFeeRlt = role.subMoney(fee);

        let collectTolledTip = `<span class="warning">You give toll to ${ower.role} ${fee} money!</span>`;

        if (subFeeRlt) {
            ower.addMoney(fee);
            
            showDialog({
                html: collectTolledTip,
                auto: true
            })
        } else {
            //处理破产相关
           // showDialog({html: `${role.role} has not enough money`, auto: false});
        }
    }
}

/* props */
let PROPS = [
    {
        type : "Movie Theater", 
        fee  : 350, 
        toll : 40
    },{
        type : "Private House", 
        fee  : 80, 
        toll : 10
    },
    {
        type : "Amusement Park", 
        fee  : 300, 
        toll : 35
    },
    {
        type : "Thrift Shop", 
        fee  : 120, 
        toll : 15
    },
    {
        type : "Flower Shop", 
        fee  : 140, 
        toll : 15
    },
    {
        type : "Coffee", 
        fee  : 250, 
        toll : 30
    },
    {
        type : "Hostel", 
        fee  : 200, 
        toll : 25
    },
    {
        type : "Apartment", 
        fee  : 100, 
        toll : 15
    },
    
    {
        type : "Hotel", 
        fee  : 400, 
        toll : 45
    },
    {
        type : "Lucky Apartment", 
        fee  : 90, 
        toll : 15
    },
    {
        type : "Antique Shop", 
        fee  : 150, 
        toll : 15
    }
]

/* init Grid */
let latticeNumInRow = 10,
    latticeNumInColumn = 4;
let GRID = (function(){

    var grid = new Array(4);
    
    /* Top Row */
    let topRow = grid[0] = new Array[latticeNumInRow];
    
    /* Right Column */
    let rightColumn = grid[1] = new Array[latticeNumInColumn];
    
    /* Bottom Row */
    let bottomRow = grid[2] = new Array[latticeNumInRow];

    /* Left Column */
    let leftColumn =  grid[3] = new Array[latticeNumInColumn];
})();


/* init two diff roles */
let role1 = new GameRole("role1"),
role2 = new GameRole("role2");

