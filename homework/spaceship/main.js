
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
    "stages": ["Setup", "Play", "End"],
    "moves": {
        'a' : {x: 0, y: -1},
        'd' : {x: 0, y: 1},
        'w' : {x: -1, y: 0},
        's' : {x: 1, y: 0}
    },
    "robotMoves": [
        {x: -1,y: -1},
        {x: -1, y: 1},
        {x: 1, y: -1},
        {x: 1, y: 1},
        {x: 0, y: -1},
        {x: 0, y: 1},
        {x: -1, y: 0},
        {x: 1, y: 0}
    ]
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

    this.x = options.x;
    this.y = options.y;

    let cb = opts.callback;

    this.init();
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
            
            if (INITIDX != 0) return;

            let key = e.key,
                value = $ipt.value;

            let selTxt = window.getSelection().toString();

            if (value && value.length > 0 && !selTxt) return;
            if (isKey(selTxt)) {
                that.key = '';
                KEYNUMS[selTxt] -= 1;
                if (selTxt == 'r') that.updateRobotCoordList(that, true);
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
                    that.key = key;
                    KEYNUMS[key] += 1;
                    if (key == 'r') that.updateRobotCoordList();
                    else if(key == 'u') that.updateUserCoord();
                }
                console.log(KEYNUMS)
            }     
        });
   

        $cell.addEventListener("keyup", function(e){
            let code = e.keyCode,
                key = that.key;
            if (isKey(key) && !$ipt.value) {
                that.key = '';
                KEYNUMS[key]--;
                if (key == 'r') that.updateRobotCoordList(true);
            } 
        });

        this.$cell = $cell;
        this.$ipt = $ipt;
    },
    updateUserCoord: function() {

        USERSPACECOORD = this;
    },
    updateRobotCoordList: function() {

        var len = arguments.length;
        if (len <= 0) {
            ROBOTSPACECOORDLIST.push(this);
        } else {
            if (arguments[0]) {
                var item = this,
                    l = ROBOTSPACECOORDLIST.length;
                for (var i = 0; i < l; i++) {
                    if (item == ROBOTSPACECOORDLIST[i]) {
                        ROBOTSPACECOORDLIST.splice(i, 1);
                    }
                }
            }
        }
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

var ROUND = 0,
    TURN = 0; // TURN has two value 0 and 1. 0 is the user turn, 0 is the robot turn.

var updateRound = function() {
    ROUND++;
    $round.innerHTML = ROUND;
}
var updateMineNum = function() {
    KEYNUMS['m']--;
    $numForMine.innerHTML = KEYNUMS['m'];
}
var updateRSNum = function() {
    KEYNUMS['r']--;
    $numForRS.innerHTML = KEYNUMS['r'];
}
var initStatus = function() {
    if (INITIDX == 0) {
        let className = $table.className.replace('show','') + " hide";
        $table.className = className;
    } else {
        $table.className += " show";
        var $tip = document.getElementsByClassName("tip")[0];
        $tip.className = $tip.className.replace("hide", '');
    }
    $round.innerHTML = ROUND;
    $numForMine.innerHTML = KEYNUMS['m'];
    $numForRS.innerHTML = KEYNUMS['r'];
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

    INITIDX = idx;
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
    initStatus();
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
                setCellsReadOnly();
                showDialog({
                    html: "No Mines Placed!",
                    type: "error"
                });
                changeStage(2);
                initStatus();
                updateRound();
                showResult();
            } else if (KEYNUMS['r'] == 0) {
                
                setCellsReadOnly();
                showDialog({
                    html: "No Robotic Spaceships Placed!",
                    type: "error"
                });
                changeStage(2);
                initStatus();
                updateRound();
                showResult();
            } else {
                setCellsReadOnly();
                changeStage(1);
                initStatus();
                updateRound();
            }
            
            break;
        case 1:
            changeStage(2);
            showResult();
            break;
        default:
            break;
    }
});

var isValidPos = function(x, y) {

    var  ws = PARAMS.ws,
         hs = PARAMS.hs;

    if (x < 0 || x >= ws || y < 0 || y >= hs) return false;
    return true;
}
var showResult = function() {

    var msg = " Win!";
    if (USERSPACECOORD == null && ROBOTSPACECOORDLIST.length != 0) {
        msg = "Robot" + msg;
    } else if (USERSPACECOORD != null && ROBOTSPACECOORDLIST.length == 0){
        msg = "User" + msg;
    } else {
        msg = "Draw!";
    }

    showDialog({
        html: msg,
        type: "error"
    });

}
var move = function(d, cell) {

    var dx = d.x, 
        dy = d.y,
        x = cell.x,
        y = cell.y,
        k = cell.key;
    
    if (!isValidPos(x + dx, y + dy)) {
        showDialog({
            html: "You Will be Outside The Grid, Your Op Fialed!",
            type: "error"
        });
        TURN = 1; 
        robotMove(d);

        return;
    }

    

    var moveU = function() {
        var ks = k.split(" ");
        if (ks.length > 1) {
            cell.key = ks[0];
            cell.$ipt.value = ks[0];
            k = ks[1];
        } else {
            cell.key = '';
            cell.$ipt.value = '';
        }
    }

    var nx = x + dx,
        ny = y + dy;
    var des = cells[nx][ny],
        dk = des.key;
    var hasMove = false;
    if (!dk) {
        des.key = 'u';
        des.$ipt.value = 'u';
        moveU();
        hasMove = true;
    } else if(dk == 'm' || dk == 'M') {
        var nKey = dk.toLocaleUpperCase() + " " + k;
        des.key = nKey;
        des.$ipt.value = nKey;
        moveU();
        updateMineNum();
        hasMove = true;
        if (dk == 'm') {
            var moves = PARAMS.moves;
            for (var mn in moves) {
                var move = moves[mn];
                var tx = move.x + nx,
                    ty = move.y + ny;
                if (isValidPos(tx, ty)) {
                    var tc = cells[tx][ty],
                        tk = tc.key;
                    if (tk == 'r' || tk == 'a') {
                        if (tk == 'r') {
                            updateRSNum();
                            tc.updateRobotCoordList(true);
                        }
                        tc.key = '';
                        tc.$ipt.value = '';
                    } 
                }
            }

            if (ROBOTSPACECOORDLIST.length == 0) {
                changeStage(2);
            }
        }
    } else if (dk == 'r') {
        cell.key = '';
        cell.$ipt.value = '';
        USERSPACECOORD = null;
        changeStage(2);
    }

    if (INITIDX == 2) {
        showResult();
        return;
    }
    if (!hasMove) {
        changeStage(2);
        showResult();
    }

    des.updateUserCoord();
    TURN = 1; 
    debugger;
    robotMove(d); 

    if (KEYNUMS['m'] == 0) {
        changeStage(2);
        showResult();
    }
    if(INITIDX != 2) updateRound();
}

var robotMove = function(d) {
    
    var rsl = ROBOTSPACECOORDLIST.length,
        rbms = PARAMS.robotMoves,
        rml = rbms.length,
        hasMove = false;
        
    for (var i = 0; i < rsl; i++) {

        var rs = ROBOTSPACECOORDLIST[i],
            rk = rs.key;
        var flag = false;
        for (var j = 0; j < rml; j++) {
            var rm = rbms[j],
                mx = rm.x,
                my = rm.y,
                x = rs.x,
                y = rs.y,
                nx = x + mx,
                ny = y + my;

            if (!isValidPos(nx, ny)) {
                continue;
            }
            var des = cells[nx][ny],
                dk = des.key;
            if (dk && dk.indexOf('u') != -1) {
                USERSPACECOORD = null;
                if (dk.indexOf('M') != -1) {
                    updateRSNum();
                    rs.updateRobotCoordList(true);
                    rsl--; i--;
                    rs.key = '';
                    rs.$ipt.value = '';
                    des.key = 'M';
                    des.$ipt.value = 'M';
                } else {
                    des.key = '';
                    des.$ipt.value = '';
                }
                changeStage(2);
                flag = true;
                hasMove = true;
            }
        }
        
        for (var j = 0; j < rml && !flag; j++) {
            var rm = rbms[j],
                mx = rm.x,
                my = rm.y,
                x = rs.x,
                y = rs.y,
                nx = x + mx,
                ny = y + my;

            if (!isValidPos(nx, ny)) {
                continue;
            }
            var des = cells[nx][ny],
                dk = des.key;
            if (dk && dk.indexOf('m') != -1) {
                des.key = rk;
                des.$ipt.value = rk;
                rs.key = '';
                rs.$ipt.value = '';
                updateMineNum();
                if (KEYNUMS['m'] == 0) {
                    changeStage(2);
                }
                flag = true;
                hasMove = true;
            }
        }
        
        for (var j = 0; j < rml && !flag; j++) {
            var rm = rbms[j],
                mx = rm.x,
                my = rm.y,
                x = rs.x,
                y = rs.y,
                nx = x + mx,
                ny = y + my;

            if (!isValidPos(nx, ny)) {
                continue;
            }
            var des = cells[nx][ny],
                dk = des.key;
            if (!dk) {
                
                for (var k = 0; k < rml && !flag; k++) {
                    var rmk = rbms[k],
                        mxk = rmk.x,
                        myk = rmk.y,
                        dx = des.x,
                        dy = des.y,
                        nxk = dx + mxk,
                        nyk = dy + myk;
                    if (!isValidPos(nxk, nyk)) {
                        continue;
                    }
                    var desk = cells[nxk][nyk],
                        dkk = desk.key;
                    if (dkk && dkk.indexOf('M') != -1) {
                        rs.updateRobotCoordList(true);
                        rsl--; i--;
                        rs.key == '';
                        rs.$ipt.value = '';
                        flag = true;
                        hasMove = true;
                        if (ROBOTSPACECOORDLIST.length == 0) changeStage(2);
                    }
                }
            }
        }
        for (var j = 0; j < rml && !flag; j++) {
            var rm = rbms[j],
                mx = rm.x,
                my = rm.y,
                x = rs.x,
                y = rs.y,
                nx = x + mx,
                ny = y + my;

            if (!isValidPos(nx, ny)) {
                continue;
            }
            var des = cells[nx][ny],
                dk = des.key;
            if (!dk) {
                rs.key = '';
                rs.$ipt.value = '';
                des.key = rk;
                des.$ipt.value = rk;
                ROBOTSPACECOORDLIST.splice(i, 1, des);
                flag = true;
                hasMove = true;
            }
        }
    
    }
    if (hasMove = false) changeStage(2);

    TURN = 0;
    if (INITIDX == 2) {
        showResult();
        return;
    }
}

document.addEventListener("keydown", function(e) {
    
    if (TURN != 0 || INITIDX != 1) return;

    let key = e.key,
        moves = PARAMS.moves;

    switch(key) {
        case 'a': case 'd': case 'w':case 's':
            move(moves[key], USERSPACECOORD);
            break;
        default:
            showDialog({
                html: "You should type one of letters 'a','d','w','s'!",
                type: "error"
            });
            break;
    }
});