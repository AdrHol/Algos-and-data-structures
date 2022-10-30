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
    delete(value){
        this.root = this.deleteRec(value, this.root);
    }
    deleteRec(value, root){
        if(root.data > value){
            root.left = this.deleteRec(value, root.left);
        } else if (root.data < value){
            root.right = this.deleteRec(value, root.right);
        } else {
            if(root.left == null){
                return root.right;
            }else if (root.right == null){
                return root.left;
            } else {
                let value = this.min(root.right);
                this.delete(value);
                root.data = value; 
            }
        }

        return root;
    }
    min(root){
        if (root.left == null){
            return root.data;
        } else {
            return this.min(root.left);
        }
    }

    find(value, root = this.root){
            if(root.data === value) return root;

            if(root.data > value){
                return this.find(value, root.left);
            } else {
                return this.find(value, root.right);
            }
        }
    levelOrder(arg = undefined){
        let orderQueue = new queue();
        orderQueue.push(this.root);

        if(!arg){
            return orderQueue.eval();
        } else {
            let arr = orderQueue.eval();
            let func = arg;
            arr.forEach(element => {
                return func(element);
            })
        }
    }
    inorder(arg = undefined){
// TODO: FUNCTION BODY
    }
    preorder(arg = undefined){
// TODO: FUNCTION BODY
    }
    postorder(arg = undefined){
// TODO: FUNCTION BODY
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


  class queue {
      constructor(arr = []){
          this.evalList = arr
          this.result = [];
      }
      push(value){
          this.evalList.push(value);
      }
      eval(){
       while(this.evalList.length > 0){
            let first = this.evalList.shift();

            if(first == null){
                continue;
            } else {
                this.result.push(first);
                this.evalList.push(first.left);
                this.evalList.push(first.right);
            }

            
        }
        return this.result;
      }
  }


