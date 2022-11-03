// gameborad,

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
    getNode([col, row]) {
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
                queue.push({ node: element, dist: node.dist + 1, path: `${node.path} => ${element.key}` });
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

export default gameborad;