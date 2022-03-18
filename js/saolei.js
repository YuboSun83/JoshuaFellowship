function Mine(tr, td, mineNum){
    this.tr = tr; //row number
    this.td = td; //colum number
    this.mineNum = mineNum // mine number

    this.squares = []; // contain cell information. show number, mine or end. 2D
    this.tds = []; //save all cells' DOM
    this.surplusMine = mineNum; //mine left.
    this.allRight = false; //check if it is win or not

    this.parent = document.querySelector('.gameBox');
}

Mine.prototype.randomNumber = function(){
    var square = new Array(this.tr*this.td); // initialize an new array, size equal to number of boxes
    for(var i = 0; i < square.length; i ++){
        square[i] = i;
    }

    square.sort(function(){
        return 0.5-Math.random();
    })
    console.log(square);
    return square.slice(0, this.mineNum);
}

Mine.prototype.init = function() {
    // this.randomNumber();
    var rn = this.randomNumber();
    console.log(rn);
    var n = 0;

    for(var i = 0; i < this.tr; i ++){
        this.squares[i] = [];
        for(var j = 0; j < this.td; j ++){
            // this.squares[i][j] = 0;
            if(rn.indexOf(n ++) != -1){
                this.squares[i][j] = 
                {
                    type : 'mine',
                    x : j,
                    y : i
                }
            }else{
                this.squares[i][j] =
                {
                    type : 'number',
                    x : j,
                    y : i,
                    value : 0
                }
            }
        }
    }
    // console.log(this.squares);
    this.updateNum();
    this.createDom();

    this.parent.oncontextmenu = function(){
        return false;
    }

    this.mineNumDom = document.querySelector('.mineNum');
    this.surplusMine = this.mineNum;
    this.mineNumDom.innerHTML = this.surplusMine;

}

// create a table
Mine.prototype.createDom = function() {
    var This = this;
    var table = document.createElement('table');

    for(var i = 0; i < this.tr; i ++){
        var domTr = document.createElement('tr');
        this.tds[i] = [];

        for(var j = 0; j < this.td; j ++){
            var domTd = document.createElement('td');
            // domTd.innerHTML = 0;
            
            domTd.pos = [i, j]; //save
            domTd.onmousedown = function(){
                This.play(event, this); // 'This' is real object. 'this' is td
            };
            this.tds[i][j] = domTd; 

            // if(this.squares[i][j].type == 'mine'){
            //     domTd.className = 'mine';
            // }

            // if(this.squares[i][j].type == 'number'){
            //     domTd.innerHTML = this.squares[i][j].value;
            // }

            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }
    
    this.parent.innerHTML = '';
    this.parent.appendChild(table);
}

Mine.prototype.getAround = function(square){
    var x = square.x;
    var y = square.y;
    var result = []; // return the cell's position

    for(var i = x - 1; i <= x + 1; i ++){
        for(var j = y - 1; j <= y + 1; j ++){
            if(
                i < 0 || //left border
                j < 0 || //top border
                i > this.td -1 || //right border
                j > this.tr -1 || //bottom border
                (i == x && j == y) || //itself
                this.squares[j][i].type == 'mine' //mine surrounder
            ){
                continue;
            }

            result.push([j,i]);

        }
    }
    return result;
}

// update the value
Mine.prototype.updateNum = function(){
    for(var i = 0; i < this.tr; i ++){
        for(var j = 0; j < this.td; j ++){
            if(this.squares[i][j].type == 'number'){
                continue;
            }
            var num =  this.getAround(this.squares[i][j]);

            for(var k = 0; k < num.length; k ++){
                this.squares[num[k][0]][num[k][1]].value += 1;
            }
        }
    }
    console.log(this.squares);
}

Mine.prototype.play = function(ev, obj){
    
    var This = this;
    
    if(ev.which == 1 && obj.className != 'flag'){
    
        // left click
        // console.log(obj);
        var cl = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eigth'];
        var curSquare = this.squares[obj.pos[0]][obj.pos[1]];
        // console.log(curSquare);

        if(curSquare.type == 'number'){
            obj.innerHTML = curSquare.value;
            obj.className = cl[curSquare.value];

            if(curSquare.value == 0){

                obj.innerHTML = '';

                function getAllZero(square) {
                    var around = This.getAround(square); //get array contain cells

                    for(var i = 0; i < around.length; i ++){
                        var x = around[i][0];
                        var y = around[i][1];

                        This.tds[x][y].className = cl[This.squares[x][y].value];

                        if(This.squares[x][y].value == 0){

                            if(!This.tds[x][y].check){
                                This.tds[x][y].check = true;
                                getAllZero(This.squares[x][y]);
                            }
                        }else{
                            This.tds[x][y].innerHTML = This.squares[x][y].value;
                        }
                    }
                }
                getAllZero(curSquare);
            }
        }else{
            this.gameOver(obj);
        }
    }

    if(ev.which == 3){
        if(obj.className && obj.className != 'flag'){
            return;
        }

        obj.className = obj.className == 'flag'? '' : 'flag'; //change class

        if(this.squares[obj.pos[0]][obj.pos[1]].type == 'mine'){
            this.allRight = true;            
        }else{
            this.allRight = false;
        }

        if(obj.className == 'flag'){
            this.mineNumDom.innerHTML = --this.surplusMine;
        }else{
            this.mineNumDom.innerHTML = ++this.surplusMine;
        }

        if(this.surplusMine == 0){
            if(this.allRight){
                alert('恭喜你，游戏通过');
            }else{
                alert('游戏失败');
                this.gameOver();
            }
        }
    }
}

Mine.prototype.gameOver = function(clickTd) {

    for(var i = 0; i < this.tr; i ++){
        for(var j = 0; j < this.td; j ++){
            if(this.squares[i][j].type == 'mine'){
                this.tds[i][j].className = 'mine';
            }
            this.tds[i][j].onmousedown = null;
        }
    }
    if(clickTd){
        clickTd.style.backgroundColor = 'red';
    }

}

// button operation
var btns = document.querySelectorAll('.level button');
var mine = null;
var ln = 0;
var arr = [[9, 9, 10], [16, 16, 40], [28, 28, 99]];

for(let i = 0; i < btns.length - 1; i ++){
    btns[i].onclick = function(){
        btns[ln].className = '';
        this.className = 'active';
        mine = new Mine(...arr[i]);
        mine.init();

        ln = i;
    }
}

btns[0].onclick();
btns[3].onclick = function(){
    mine.init();
}; 

// var mine = new Mine(28, 28, 99);
// mine.init();

// console.log(mine.getAround(mine.squares[0][0]));