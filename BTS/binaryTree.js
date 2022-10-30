class binaryTree { 
    constructor(initalArr = null){
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

        function decomposition(arr){
             if (arr.length === 1) {
            return new node(arr[0], null, null);
        } else if (arr.length === 2 ){
            return new node(arr[0], null , decomposition([arr[1]]));
        } else {
            let mid = Math.floor(arr.length/2);
            let left = arr.slice(0, mid);
            let right = arr.slice(mid + 1, arr.length);
            return new node(arr[mid], decomposition(left), decomposition(right));
        }
        }
        this.root = decomposition(sortedArray);
    }
    insert(value){
      if (this.root === null) throw 'Root is empty';
        
        function rec(value, root){
            if (root === null){
                root = new node(value, null, null);
                return root;
            }
            if(value < root.data){
                root.left = rec(value, root.left);
            } else if (value > root.data){
                root.right = rec(value,root.right);
            }
            return root;
        }

      this.root = rec(value, this.root);


    }

}

class node {
    constructor(data, left = null, right = null){
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
