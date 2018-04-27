
"use strict";
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

/* extend obj */
let extend = function(obj1, obj2) {
    
    if (!isVarType.isObject(obj1)) obj1 = {};
    if (!isVarType.isObject(obj2)) return obj1;

    for (let key in obj2) {
        obj1[key] = obj2[key] === undefined && obj1[key] || obj2[key];
    }

    return obj1;
}

function SimpleDialog(opts) {

    let that = this;

    let options = {
        $container: document.getElementsByTagName("body")[0],
        title: "Dialog Title!",
        hasTitle : false,
        type : "success",
        html : "",
        hasCancel: false,
        cancelBtn: "cancel",
        cancelCallback: null,
        hasSure: false,
        sureBtn: "sure",
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
  
            let t = e.target,
                cs = t.className;
            if (cs.indexOf("close") !== -1 && cs.indexOf("sure") !== -1 && cs.indexOf("cancel") !== -1) return;
            
            let {hasCancel, cancelCallback, hasSure, sureCallback} = that.options;
            if (cs.indexOf("cancel") !== -1 && hasCancel && cancelCallback) cancelCallback();
            if (cs.indexOf("sure") !== -1 && hasSure && sureCallback) sureCallback();

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

let showDialog = function(opts) {
    
    let auto = opts.auto;
    if (!auto) opts.hasClose = true;
    let dialog = new SimpleDialog(opts);
    dialog.showDialog();
}

let PARAMS = {
    "ws": 10,
    "hs": 10,
    "keys": ['a', 'm', 'r', 'u'],
    "onlykey": 'u',
    "cmd": ['a', 'd', 'w', 's'],
    "stages": ["Setup", "Play", "End"]
}

let KEYNUMS = {
    'a': 0,
    'm': 0,
    'r': 0,
    'u': 0
}

let USERSPACECOORD = null;
let ROBOTSPACECOORDLIST = [];

function Cell(opts) {
    
    let that = this;

    let options = {
        x: 0,
        y: 0
    };

    this.options = extend(options, opts);

    let cb = opts.callback;

    this.init(cb);
}

Cell.prototype = {
    init: function() {

        let that = this,
            opts = that.options,
            $cell = document.createElement("td");

        $cell.className += "cell ";

        $cell.innerHTML = "<input type='text' maxlength='1'/>"

        let $c = opts.$container;
        $c.append($cell);


        let isKey = function(key) {
      
            let keys = PARAMS.keys,
                len = keys.length;
            for(let i = 0; i < len; i++) {
                if (key == keys[i]) return true;
            }
            return false;
        }

        let $ipt = $cell.getElementsByTagName("input")[0];
        $cell.addEventListener("keydown", function(e) {
   
            let key = e.key,
                value = $ipt.value;

            let selTxt = window.getSelection().toString();

            if (value && value.length > 0 && !selTxt) return;
            if (isKey(selTxt)) {
                opts.key = '';
                KEYNUMS[selTxt] -= 1;
            }

            if (!isKey(key)) {
                showDialog({
                    html: `Error Input.Must Be One Of 'a','m','r','u'!`,
                    type: "error"
                });
            } else {

                if (key == PARAMS.onlykey && KEYNUMS[key] > 0) {
                    showDialog({
                        html: `Error Input, Only One 'u' is allowed!`,
                        type: "error"
                    });
                } else {
                    opts.key = key;
                    KEYNUMS[key] += 1;
                    
                }
                console.log(KEYNUMS)
            }     
        });
   

        $cell.addEventListener("keyup", function(e){
            let code = e.keyCode,
                key = opts.key;
            if (isKey(key) && !$ipt.value) {
                opts.key = '';
                KEYNUMS[key]--;
            } 
        });

        this.$cell = $cell;
        this.$ipt = $ipt;
    },
    update: function(v) {
        this.$ipt.value = v;
    },
    setReadOnly: function() {
        this.$ipt.readOnly = true
    }
}

// init table with 10 * 10 size
let STAGE = '',
    STAGENUM = 3,
    INITIDX = 0,
    $stage = document.getElementsByClassName("top")[0],
    $btn = document.getElementsByClassName("btn")[0],
    cells = new Array(),
    $table = document.getElementsByClassName("table")[0],
    $round = document.getElementsByClassName("round")[0],
    $numForMine = document.getElementsByClassName("numForMine")[0],
    $numForRS= document.getElementsByClassName("numForRS")[0];

let ROUND = 0;

let RoundAutoIncrement = function() {
    ROUND++;
    $round.innerHTML = ROUND;
}

let changeStage = function(idx) {

    if (idx != 0 && !idx || idx < 0) {
        showDialog({
           html: "Change Stage Error!",
           type: "error"
        });
        return;
    } else if (idx >= STAGENUM) {
        return;
    }

    STAGE = PARAMS.stages[idx];
    $stage.innerHTML = STAGE + " Stage";
    if (idx < STAGENUM - 1) {
        $btn.innerHTML = (PARAMS.stages[idx+1]).toLocaleUpperCase();
    } else {
        $btn.innerHTML = (PARAMS.stages[idx]).toLocaleUpperCase();
    }

    if (idx == 0) {
        let className = $table.className.replace('show','') + " hide";
        $table.className = className;
    } else {
        $table.className += " show";
    }

    INITIDX = idx;
}

let updateUserCoord = function() {
    
    if (arguments.length < 2) return;

    USERSPACECOORD = {
        x: arguments[0],
        y: arguments[1]
    };
}
let updateRobotCoordList = function() {

    if (arguments.length < 2) return;

    ROBOTSPACECOORDLIST.push({
        x: arguments[0],
        y: arguments[1]
    })
}

let init = function(p) {

    // init stage
    changeStage(INITIDX);

    // draw cells
    let ws = p.ws,
        hs = p.hs,
        $cells = document.getElementsByClassName("cells")[0];

    for (let i = 0; i < ws; i++) {

        let $row = document.createElement("tr");
        let row = new Array();
        for (let j = 0; j < hs; j++) {
            let cell = new Cell({
                x: i,
                y: j,
                $container: $row
            });

            row.push(cell);
        }
        $cells.append($row);
        cells.push(row);
    }
}

init(PARAMS);

let setCellsReadOnly = function() {
    let ws = PARAMS.ws,
        hs = PARAMS.hs;

    for (let i = 0; i < ws; i++) {
        for (let j = 0; j < hs; j++) {
            cells[i][j].setReadOnly();
        }
    }
}


$btn.addEventListener("click", function(e){
    switch(INITIDX) {
        case 0:
            let msg = '';
           if (KEYNUMS['u'] == 0){
                showDialog({
                    html: "Please Place A User Spaceship!",
                    type: "error"
                });
            } else if (KEYNUMS['m'] == 0) {
                changeStage(2);
                setCellsReadOnly();
                showDialog({
                    html: "No Mines Placed!",
                    type: "error"
                });
            } else if (KEYNUMS['r'] == 0) {
                changeStage(2);
                setCellsReadOnly();
                showDialog({
                    html: "No Robotic Spaceships Placed!",
                    type: "error"
                });
            } else {
                setCellsReadOnly();
                changeStage(1);
                RoundAutoIncrement();
            }
            break;
        case 1:
            break;
        default:
            break;
    }
});

document.addEventListener("keydown", function(e) {
    let key = e.key;

})