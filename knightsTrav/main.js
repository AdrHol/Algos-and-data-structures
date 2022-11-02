// gameborad,

const gameborad = {
   gameborad: [],

   buildGamebord(){
       for (let rowNum = 0; rowNum < 8; rowNum++){
        let row = [];
            for (let col = 0; col < 8; col++){
                let field = new node([col, rowNum]);
                row.push(field);
            }
        this.gameborad.push(row);
       }
   },
   getNode([col,row]){
       try {
        return this.gameborad[row][col];
       }
       catch{
        return null;
       }
   },
   buildRoot(){
       this.gameborad.forEach(element => {
           element.forEach(fieldNode => {
            buildBranch(fieldNode);
           })
       })
   }
}



// knight instance 

const knightInstance = {
    mark: "x",
    actualPosition: undefined,
    knightMoveList: [
        [1,2],
        [2,1],
        [2,-1],
        [1,-2],
        [-1,-2],
        [-2,-1],
        [-2,1],
        [-1,2]
    ]
}
// travail algo

// knightMoves([0,0], end)
function knightMoves(start, end){
   let root = gameborad.getNode(start);

   function searchRec(root, end){
     if(root.key === end) {return root.key};
     if(root.key === undefined) return;

     let properties = Object.getOwnPropertyNames(root)

     for(let key of properties){
         if (key !== 'key' && key !== 'occupied'){
             console.log(root.key);
             searchRec(root.key, end);
         }
     }
   }
   
   return searchRec(root, end);


};


function buildBranch(root){

   let knight = knightInstance.knightMoveList;
   knight.forEach((element, index) => {
       let [x,y] = element;
       let [a,b] = root.key;
       let newPos = [x+a, y+b];

       if(gameborad.getNode(newPos)){
        root[`edge${index}`] = gameborad.getNode(newPos);
       }
       
       
   });
  
}

// check possible moves and set reference to them 
    // if node.key === end => return node.key 
    // else check possible moves from this node (except done one)
        //if node.key === end => return node.key 
        // else check possible moves from this node (except done one)
            //if node.key === end => return node.key 
                // else check possible moves from this node (except done one)


class node {
    constructor(pos){
        this.key = pos,
        this.occupied = false;
    }
}





gameborad.buildGamebord()