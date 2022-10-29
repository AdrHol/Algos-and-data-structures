class binaryTree { 
    constructor(initalArr){
        this.arr = initalArr;
        this.root = null;
    }

    sort(){
     let set = new Set();
     this.arr.forEach(element => {
         set.add(element);
     });
     let sortedArray = Array.from(set);
        sortedArray = sortedArray.sort(function(a,b){
        return ((a <= b)? -1 : 1);
     })
     return sortedArray;
    }

    buildTree(){
        let sortedArray = this.sort();

        function bigRecursion(arr){
             if (arr.length === 1) {
            return new node(arr[0], null, null);

        } else if (arr.length === 2 ){
            return new node(arr[1], bigRecursion([arr[0]]), null);
        } else {
            let mid = Math.floor(arr.length/2);
            let left = arr.slice(0, mid);
            let right = arr.slice(mid + 1, arr.length);
            
            return new node(arr[mid], bigRecursion(left), bigRecursion(right));

        }
        }
        console.log(sortedArray);
        this.root = bigRecursion(sortedArray);

    }
}




class node {
    constructor(data, left, right){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}


prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
