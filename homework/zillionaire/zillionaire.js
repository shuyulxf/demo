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

/* extend obj */
let extend = function(obj1, obj2) {
    
    if (!isVarType.isObject(obj1)) obj1 = {};
    if (!isVarType.isObject(obj2)) return obj1;

    for (let key in obj2) {
        obj1[key] = obj2[key] === undefined && obj1[key] || obj2[key];
    }

    return obj1;
}

/* generate random */
let random = function(start, end) {
    
    return Math.floor(Math.random() * (end - start) + start);
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

/* define game role class*/
function GameRole($parent, role, imgUrl, totalMoney) {
    this.role  = role;
    this.roleImg = (function(){
        let img =  new Image();
        img.src = imgUrl;
        img.className = "role-img ";
        return img;
    })();
    this.imgPos = {};
    this.totalMoney = totalMoney;
    this.curPos = 0;
    this.$parent = $parent;
    this.$self = null;
    this.possessions = {};
    this.clockwise = false;
    this.init();
}
GameRole.prototype = {
    renderFundTable: function() {

        let that = this;

        let renderPossesions = function() {
            let possessions = that.possessions,
            count = 0;
    
            for( let key in possessions) {
                count++;
            }
        
            let html = "";
            if (count){
                html = `<tr><td rowspan="${count}">Posessions</td>`
                let i = 0;
                for( let key in possessions) {
                    
                    html += `<td>Pos Name</td><td>${key}</td>`;
                    if (i !== 0) {
                        html = "<tr>" + html;
                    }
                    html += "</tr>";
                }
            }

            return html;
        }
        let innerHTML = `
            <thead>
                <tr>
                    <td>Role</td>
                    <td colspan="2">${this.role}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total Coins</td>
                    <td colspan="2">${this.totalMoney}</td>
                </tr>
                ${renderPossesions()}
            </tbody>
        `; 
        let $table; 
        if (!this.$self){
            $table = document.createElement("table");
            this.$parent.appendChild($table);
            this.$self = $table;
        } else $table = this.$self;

        $table.innerHTML = innerHTML;
    },
    init: function(){
        
        let defaultMoney = 1500;
        this.totalMoney = this.totalMoney || defaultMoney;
        let that = this;
        this.renderFundTable();
    },
    updateImgPos(pos) {
        let left = pos.left,
            top = pos.top;
       
        if (left !== undefined){
            this.roleImg.style.left = left + "px";
            this.imgPosLeft = left;
        }
        if (top !== undefined) {
            this.roleImg.style.top = top + "px";
            this.imgPos.left = top;
        }
        
    },
    getImgPos(){
        return this.imgPos;
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
    updatePos: function(pos) {

        this.curPos = pos;
    },
    alterDirection: function() {
        this.clockwise = true;
    },
    highLight: function() {

        let $self = this.$self;
        $self.className += " highlight";
    },
    removeHighLight: function() {
        let $self = this.$self;
        $self.className = $self.className.replace(/highlight/g, "");
    },
    updateFunds: function(building) {
        this.possessions[building.type] = building.value;
    }
}


let Dice = function($parent) {
    this.$self = null;
    this.$parent = $parent;
    this.cur = 1;
    this.init();
}
Dice.prototype = {
    render: function(r) {
        
        let html = `
                <div class="dice-area">${r}</div>
            `;
        let $self = this.$self;
        if (!$self) {
            $self = document.createElement("div");
            this.$self = $self;
        }
       
        $self.innerHTML = html;
    },
    init: function() {
        let r = random(1, 6);
        this.cur = r;
        this.render(r);
        this.$parent.appendChild(this.$self);
    },
    roll: function(role, cb) {
        
        let r = random(10, 20);
        let timer = 0,
            $self = this.$self,
            that = this;

        let idx = this.cur,
            v = 0;
        timer = setInterval(function(){
            v = idx % 6 == 0 ? 6 : idx % 6;
            that.render(v);
            if (++idx > r) {
                clearInterval(timer);
                that.cur = v;
                cb && cb(role, v);
            }
        }, 100);

    }
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
    showBroken: function(role){
        showDialog({html: `<div style='color: red;width: 400px; height: 200px; padding-top: 100px;'>${role.role} Has Broken!</div>`, auto: false});
    },
    collectToll: function(role) {

        if (!isVarType.isObject(role) || !(role instanceof GameRole)) {
            showDialog({html: "Role type error!>", auto: false});
        }

        let {toll, ower} = this;
        let subFeeRlt = role.subMoney(toll);

        let collectTolledTip = `You give toll to<span class='font-hightlight'> ${ower.role} ${toll}</span> money!`;

        if (subFeeRlt) {
            ower.addMoney(toll);
            ower.renderFundTable();
            showDialog({
                html: collectTolledTip,
                auto: true
            });
            role.renderFundTable();
        } else {
            showBroken(role);         
        }
    },
    buildDialog: function(cb, prop) {

        let {type, toll, fee, ower} = this;
        let that = this;
        let html = `
                <p><span>Toll :</span><span>${toll}</span></p>
                <p><span>Fee :</span><span>${fee}</span></p>
            `;
        showDialog({
            title: type,
            hasTitle : true,
            html: html,
            auto: false, 
            hasCancel: true,
            hasSure: true,
            sureBtn: "buy",
            sureCallback:null,
            hasClose: true,
            cancelCallback: function() {
                cb();
            },
            sureCallback: function() {
                let rlt = ower.subMoney(fee);
                if (rlt) {
                    ower.updateFunds({
                        type: type,
                        value: that
                    });
                    ower.renderFundTable();
                    prop.building = that;
                    cb();
                    showDialog({
                        auto: true,
                        html: `<span class="font-hightlight ">${ower.role}</span> Has Buy <span class="font-hightlight ">${type}!</span>`
                    });
                    let $el = prop.$el;
                    let tip = document.createElement("div");
                    tip.innerHTML = `
                            ${ower.role}'s<br>
                            ${type}
                        `;
                    tip.className = "tip";
                    $el.appendChild(tip);
                } else {
                    showBroken(role);     
                }
            }
        })
    }
}

/* props */
let BUILDINGPROPS = [
    {
        type : "Movie Theater", 
        toll  : 350, 
        fee : 40
    },{
        type : "Private House", 
        toll : 80, 
        fee  : 10
    },
    {
        type : "Amusement Park", 
        toll  : 300, 
        fee : 35
    },
    {
        type : "Thrift Shop", 
        toll  : 120, 
        fee : 15
    },
    {
        type : "Flower Shop", 
        toll  : 140, 
        fee : 15
    },
    {
        type : "Coffee", 
        toll  : 250, 
        fee : 30
    },
    {
        type : "Hostel", 
        toll  : 200, 
        fee : 25
    },
    {
        type : "Apartment", 
        toll  : 100, 
        fee : 15
    },
    
    {
        type : "Hotel", 
        toll  : 400, 
        fee : 45
    },
    {
        type : "Lucky Apartment", 
        toll  : 90, 
        fee : 15
    },
    {
        type : "Antique Shop", 
        toll  : 150, 
        fee : 15
    },
    {
        type : "Bookstore", 
        toll  : 200, 
        fee : 20
    },
    {
        type : "Fast Food Restaurant", 
        toll  : 300, 
        fee : 30
    }, 
    {
        type : "Barber Shop", 
        toll  : 250, 
        fee : 20
    },
    {
        type : "School", 
        toll  : 400, 
        fee : 50
    },
    {
        type : "Railway Station", 
        toll  : 250, 
        fee : 20
    },
    {
        type : "Company", 
        toll  : 500, 
        fee : 60
    },
    {
        type : "Airport Station", 
        toll  : 600, 
        fee : 70
    }
]

function Grid(latticeNumInRow, latticeNumInColumn, roles) {
    this.latticeNumInRow = latticeNumInRow;
    this.latticeNumInColumn = latticeNumInColumn; 
    this.init(roles);
}
Grid.prototype = {
    init: function(roles) {

        let latticeNumInRow = this.latticeNumInRow,
            latticeNumInColumn = this.latticeNumInColumn,
            $playBox = document.getElementsByClassName("play-box")[0];

        /* init parents */
        $latticeParents = new Array(4);
        $latticeParents[0] = $playBox.getElementsByClassName("part-1")[0];
        $latticeParents[1] = $playBox.querySelector(".part-2 .part-2-right ul");
        $latticeParents[2] = $playBox.getElementsByClassName("part-3")[0];
        $latticeParents[3] = $playBox.querySelector(".part-2 .part-2-left ul");
        this.$latticeParents = $latticeParents;

        var grid = new Array(latticeNumInRow * 2 + latticeNumInColumn * 2),
            that = this,
            idx = 0;
        let getBuildingLatticeInfos = function(props, BUILDINGPROPS, start, end, $parent) {
            
            for (let i = start; i <= end; i++) {

                let opts = BUILDINGPROPS[i];
                props.push({
                    type : "building",
                    allowBuildingInfo : opts,
                    $el  : that.renderBuildingLattice($parent, opts, idx),
                    buildingObj : null
                });
                idx++;
            }
        }

        let $firstLatticeParent = $latticeParents[0];
        let props = [
            {   /* start lattice*/
                type : "start",
                $el  : that.renderStartLattice($firstLatticeParent)
            }
        ]
        getBuildingLatticeInfos(props, BUILDINGPROPS, 0, 1, $firstLatticeParent);
        props.push({   /* start lattice*/
            type : "prison",
            $el  : that.renderPrisonLattice($firstLatticeParent),
            hasBuilding: false
        });
        getBuildingLatticeInfos(props, BUILDINGPROPS, 2, 4, $firstLatticeParent);
        props.push({   /* start lattice*/
            type : "award",
            $el  : that.renderAwardLattice($firstLatticeParent),
            amount: 100,
            hasBuilding: false
        });
        getBuildingLatticeInfos(props, BUILDINGPROPS, 5, 5, $firstLatticeParent);


        let $secondLatticeParent = $latticeParents[1];
        getBuildingLatticeInfos(props, BUILDINGPROPS, 6, 6, $secondLatticeParent);
        props.push({   /* start lattice*/
            type : "prison",
            $el  : that.renderPrisonLattice($secondLatticeParent),
            hasBuilding: false
        });
        getBuildingLatticeInfos(props, BUILDINGPROPS, 7, 8, $secondLatticeParent);
       

        let reverse = function($parent) {

            let $items = $parent.getElementsByTagName("li");
            let len = $items.length;
            let df = document.createDocumentFragment();
            for (let i = len - 1; i >= 0; i--) {
                df.appendChild($items[i]);
            }

            $parent.innerHTML = "";
            $parent.appendChild(df);
        }

        let $thirdLatticeParent = $latticeParents[2];
        props.push({   /* start lattice*/
            type : "award",
            $el  : this.renderAwardLattice($thirdLatticeParent),
            amount: 100
        });
        getBuildingLatticeInfos(props, BUILDINGPROPS, 9, 10, $thirdLatticeParent);
        props.push({   /* start lattice*/
            type : "prison",
            $el  : this.renderPrisonLattice($thirdLatticeParent)
        });
        getBuildingLatticeInfos(props, BUILDINGPROPS, 11, 12, $thirdLatticeParent);
        props.push({   /* start lattice*/
            type : "award",
            $el  : this.renderAwardLattice($thirdLatticeParent),
            amount: 100
        });
        getBuildingLatticeInfos(props, BUILDINGPROPS, 13, 14, $thirdLatticeParent);
        reverse($thirdLatticeParent);


        let $fouthLatticeParent = $latticeParents[3];
        props.push({   /* start lattice*/
            type : "prison",
            $el  : this.renderPrisonLattice($fouthLatticeParent)
        });
        getBuildingLatticeInfos(props, BUILDINGPROPS, 15, 17, $fouthLatticeParent);
        reverse($fouthLatticeParent);

        this.props = props;
        this.renderPerson(0, roles);
    },
    renderPerson: function(curIdx, roles) {
        
        let lattice = this.props[curIdx];
        let len = roles.length;
        for (let i = 0; i < len; i++) {
            let role = roles[i];
            let img = role.roleImg;
            let pos = 2 + i * 26;
            role.updateImgPos({left:pos});
            lattice.$el.appendChild(img);
        }
    },
    reRenderPerson: function(curIdx, preIdx, role) {
        let cur = this.props[curIdx],
            pre = this.props[preIdx];

        let img = role.roleImg;
        let pos = 13;
        role.updateImgPos({left:pos});
        this.removePerson(preIdx, role);
        cur.$el.appendChild(img);
    },
    removePerson: function(curIdx, role) {
        let cur = this.props[curIdx];
        cur && cur.$el && cur.$el.removeChild(role.roleImg);
    },
    renderStartLattice: function($parent) {

        let $item = document.createElement("li"),
            innerHTML = `<i class="start">START</i>`;
        $item.className = "type-start type-color-1";
        $item.innerHTML = innerHTML;

        $parent.appendChild($item);

        return $item;
    },
    renderBuildingLattice: function($parent, opts, i) {

        let colors = [3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 6],
            $item = document.createElement("li"),
            innerHTML = ``;
        $item.className = "type-building type-color-" + colors[i];
        $item.innerHTML = innerHTML;

        $parent.appendChild($item);

        return $item;
    },
    renderAwardLattice: function($parent) {

        let $item = document.createElement("li"),
        innerHTML = `+100$`;
        $item.className = "type-award type-color-2";
        $item.innerHTML = innerHTML;

        $parent.appendChild($item);

        return $item;
    },
    renderPrisonLattice: function($parent) {

        let $item = document.createElement("li"),
        innerHTML = `REST!`;
        $item.className = "type-prison type-color-1";
        $item.innerHTML = innerHTML;

        $parent.appendChild($item);

        return $item;
    },
    move: function(role, steps, cb, REST) {
        let curPos = role.curPos,
            clockwise = role.clockwise,
            props = this.props,
            len = props.length,
            signal = 1,
            prevPos = 0,
            interval = 200;
    
        if (!clockwise) {
            curPos += len;
            signal = -1;
        }
        let that = this;
        let step = 1;

        let updateRoleFun = function(prop, role) {
            let {type} = prop;
            
            switch(type) {
                case "award":
                    role.addMoney(prop.amount);
                    role.renderFundTable();
                    showDialog({
                        auto: true,
                        html: `<span class='font-hightlight'>${role.role}</span> Earn <span class='font-hightlight'>${prop.amount}</span>$ Money`
                    })
                    break;
                case "building":
                    let {building, allowBuildingInfo} = prop;
                    if(building && building.ower !== role) {
                        building.collectToll(role);
                    } 
                    break;
                
            }
        }
        
        let timer = setTimeout(function(){
            prevPos = curPos % len;
            curPos = (curPos + signal);
            curPos = (curPos < 0 ? curPos + len : curPos) % len;
            let prop = props[curPos];
            that.reRenderPerson(curPos, prevPos, role);

            updateRoleFun(prop, role);
            timer = setTimeout(arguments.callee,interval);
            
            if (++step > steps) {
                clearInterval(timer);
                let {building, type, allowBuildingInfo} = prop;
                
                if (type === "building" && !building && allowBuildingInfo) {
                    let {fee, toll} = allowBuildingInfo;
                    let building = new Building(allowBuildingInfo.type, fee, toll, role);
                    building.buildDialog(cb, prop);
                } else {
                    cb();
                }

                if (type === "prison") {
                    if (REST.length != 0) REST.pop();
                    else REST.push(role);
                    showDialog({
                        html: `<span class="font-hightlight">${role.role}</span> <span style="color: #87d0f3;">Is In Prison! You Will Rest For A Turn!</span>`,
                        type: "error",
                        auto: true
                    })
                }
                role.updatePos(curPos);
            }
        }, interval);

        
    }
}

/* init Grid */
let latticeNumInRow = 10,
    latticeNumInColumn = 4;

/* init two diff roles */
let $roles = document.getElementsByClassName("roles")[0];
let roles = [new GameRole($roles, "User", "user.png"), new GameRole($roles, "Robot", "robot.png")];
let GRID = new Grid(latticeNumInRow, latticeNumInColumn, roles);

let isRobot = function(role) {
    return role.role === "Robot";
}

let rollDiceTurn = 0,
    dice = null;
    
let REST = new Array();

let init = function() {

    let r = random(0, 2);
    rollDiceTurnRole = roles[r];
    rollDiceTurnRole.alterDirection();
    rollDiceTurnRole.highLight();
    
    let getNextRole = function() {
        
        rollDiceTurnRole = roles[0] === rollDiceTurnRole ? roles[1] : roles[0]; 
        while(REST.length > 0) {
            let role = REST.shift();
            if (role === rollDiceTurnRole) {
                rollDiceTurnRole = roles[0] === role ? roles[1] : roles[0];  
            }
            else break;
        }

        return rollDiceTurnRole;
    }
    let updateRollDiceTurnRole = function() {
        rollDiceTurnRole.removeHighLight();
        rollDiceTurnRole = getNextRole();
        rollDiceTurnRole.highLight();
        if (!isRobot(rollDiceTurnRole)) $diceBtn.className = $diceBtn.className.replace(/disabled/g, "");
        else $diceBtn.className += " disabled";
        setTimeout(function(){
            robotPlay();
        }, 2000);  
    }

    let robotPlay = function(){
        if (isRobot(rollDiceTurnRole)) {
            $diceBtn.className += " disabled";
            play(rollDiceTurnRole);
        }
    }

    let $diceBtn = document.querySelector(".dice-btn"),
        dice = new Dice(document.querySelector(".play-box .part-2-center"));

    let play = function(role) {

        let playHelper = function(role, steps) {
            
            GRID.move(role, steps, function() {
                updateRollDiceTurnRole();
            }, REST);
        }

        dice.roll(role, function(role, steps){playHelper(rollDiceTurnRole, steps);});
        
    }


    robotPlay();
    $diceBtn.addEventListener("click", function(e) {
        
        let t = e.target;
        if (isRobot(rollDiceTurnRole) || t.className.indexOf("disabled") !== -1) return;
        play(rollDiceTurnRole);
    });

    
   // dice2 = new Dice(roles[1], document.querySelector(".play-box .part-2-center"));

    showDialog({
        html: `<div style='width: 200px; height: 50px;line-height: 50px; color: #333;'>Random choose the role <span class="font-hightlight"> ${rollDiceTurnRole.role}</span></div>`,
        auto: true,
        type: "warning"
    });
}
init();

