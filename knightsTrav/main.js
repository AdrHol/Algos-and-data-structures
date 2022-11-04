const gameborad = {
    gameborad: [],

    buildGamebord() {
        for (let rowNum = 0; rowNum < 8; rowNum++) {
            let row = [];
            for (let col = 0; col < 8; col++) {
                let field = new node([col, rowNum]);
                row.push(field);
            }
            this.gameborad.push(row);
        }
    },
    getNode([col,row]) {
        try {
            return this.gameborad[row][col];
        }
        catch {
            return null;
        }
    },
    buildRoot() {
        this.gameborad.forEach(element => {
            element.forEach(fieldNode => {
                this.buildBranch(fieldNode);
            })
        })
    },
    buildBranch(root) {

        let knight = knightInstance.knightMoveList;
        knight.forEach((element, index) => {
            let [x, y] = element;
            let [a, b] = root.key;
            let newPos = [x + a, y + b];

            if (gameborad.getNode(newPos)) {
                root[`edge${index}`] = gameborad.getNode(newPos);
            }


        });

    }
}



// knight instance 

const knightInstance = {
    mark: "x",
    actualPosition: undefined,
    knightMoveList: [
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2]
    ]
}

// knightMoves([ax,ay], [bx,by])
function knightMoves(start, end) {
    const startNode = gameborad.getNode(start);
    const endNode = gameborad.getNode(end);
    let queue = [];
    let previous = new Map();
    let visited = new Set();
    queue.push({ node: startNode, dist: 0, path: [startNode.key] });
    while (queue.length > 0) {
        const node = queue.shift();
        if (!visited.has(node.node)) {
            visited.add(node.node);
            if (node.node == endNode) {
                return { shortest: node.dist, map: previous, path: node.path };
            }
            let edges = node.node.getEdges();
            edges.forEach(element => {
                queue.push({ node: element, dist: node.dist + 1, path: `${node.path} >> ${element.key}` });
                previous.set(node.node, element);
            })
        }
    }

};



class node {
    constructor(pos) {
        this.key = pos,
            this.occupied = false;
    }

    getEdges() {
        let edges = Object.getOwnPropertyNames(this);
        edges = edges.filter(function (element) {
            if (element !== 'key' && element !== 'occupied') {
                return true
            }
        })
        const edgeNodes = edges.map(element => {
            return this[`${element}`];

        })

        return edgeNodes;
    }
}

const render = {
    
    build(){
        const body = document.querySelector('body');

        body.innerHTML =  
        `
        <div class="container">
        <div class="board">
        </div>
        <div class="table">
        <ul class="data-list">
        <li class="data-list-item"><span class="li-label" id="start-label">Starting field:</span><span id="starting-field"></span></li>
        <li class="data-list-item"><span class="li-label" id="end-label">Destiantion field:</span><span id="end-field"></span></li>
        </ul>
        <ul class="path-list"></ul>
        </div>
        </div>
        `
        const board = document.querySelector('.board');
        board.addEventListener('click', function(e){

            boardHandler.set(e.target);
            
        })

    },
    board(){
        const board = document.querySelector('.board');
        const fields = document.createElement('div');
        fields.innerHTML = `
        <div class="field-legend-letters">
        <div class="letter">A</div>
        <div class="letter">B</div>
        <div class="letter">C</div>
        <div class="letter">D</div>
        <div class="letter">E</div>
        <div class="letter">F</div>
        <div class="letter">G</div>
        <div class="letter">H</div>
        </div>
        <div class="field-legend-numbers">
        <div class="letter">8</div>
        <div class="letter">7</div>
        <div class="letter">6</div>
        <div class="letter">5</div>
        <div class="letter">4</div>
        <div class="letter">3</div>
        <div class="letter">2</div>
        <div class="letter">1</div>
        </div>`
      
        for(let i = 7; i >= 0; i--){ 
            for(let j = 0; j < 8; j++){
                let field = document.createElement('div');
                if(i === 1 || (i % 2) !== 0){
                    if( j === 1 || (j % 2) !== 0 ){
                        field.classList.add('fieldblack');
                    }
                    if (j === 0 || (j % 2) === 0){
                        field.classList.add('fieldwhite');
                    }
                } else {
                    if( j === 1 || (j % 2) !== 0 ){
                        field.classList.add('fieldwhite');
                    }
                    if (j === 0 || (j % 2) === 0){
                        field.classList.add('fieldblack');
                    }
                }
            field.setAttribute('id', `[${j},${i}]`)
            fields.appendChild(field)
            }
        }
        board.innerHTML = fields.innerHTML;
    },
    clear(){
        const horse = document.querySelector('.horse');
        const finish = document.querySelector('.finish');
        const ul = document.querySelector('.path-list');
        const fields = document.querySelectorAll('.hello');

        ul.innerHTML = '';
        
        fields.forEach(element => {
            
            if(!element.contains(horse) && !element.contains(finish)){
                element.classList.remove('hello');
                element.textContent = '';
            }
        })
    }
}






const output = {
    path(knight, finish){
        let knightCords = [];
        let finishCords = [];
        let path;
        const ul = document.querySelector('.path-list');
        knightCords.push(Number(knight.id[1]));
        knightCords.push(Number(knight.id[3]));
        finishCords.push(Number(finish.id[1]));
        finishCords.push(Number(finish.id[3]));

        path = knightMoves(knightCords, finishCords).path;
        path = path.split(' >> ');

        render.clear();
    
            path.forEach((element, index) => {
                const getDom = document.getElementById(`[${element}]`);
                const translated = this.translate(element);
                getDom.classList.add('hello');
                if(index > 0 && index < path.length -1){
                    getDom.textContent = index;
                }

                if(index === 0){
                    const starting = document.querySelector('#starting-field');
                    starting.textContent = translated;
                } 
                if(index === path.length - 1){
                    const finish = document.querySelector('#end-field');
                    finish.textContent = translated;
                }
                const li = document.createElement('li');
                li.classList.add('path-node');
                li.textContent = `Step: ${index} -> ${translated}`;
                ul.appendChild(li);
            
        })
    },
    translate(cords){
        const xCords = ['A','B','C','D','E','F','G', 'H'];
        const yCords = [1,2,3,4,5,6,7,8];
        let result = '';

        result += xCords[cords[0]];
        result += yCords[cords[2]];

        return result;
        
    }
}





const boardHandler = {
    knight: undefined,
    finish: undefined,
    turn: 0,

    set(e){
        const img = document.createElement('img');

        if(this.turn === 0){
            img.classList.add('horse');
            img.src = './img/horse.svg';  
                if(this.knight === undefined){
                    this.knight = e;
                } else {
                    this.knight.innerHTML = '';
                    this.knight = e;
                }
             
            this.turn = 1;
        } else { 
            if(this.finish === undefined){
                this.finish = e;
            } else {
                this.finish.innerHTML = '';
                this.finish = e;
            }
            img.classList.add('finish');
            img.src = './img/finish.svg';
            this.turn = 0;
        }

      
        e.appendChild(img);
        
        if(this.knight && this.finish){
            output.path(this.knight, this.finish);
        }


    }
}


gameborad.buildGamebord();
gameborad.buildRoot();
render.build();
render.board();