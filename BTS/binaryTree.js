class binaryTree { 
    constructor(initialArr = null){
        this.root = initialArr;
    }

    sort(){
     let set = new Set();
     this.root.forEach(element => {
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

        let array = [];
        
        function inorderRec(root){

            if(root === null) return; 

            inorderRec(root.left);
            array.push(root);
            inorderRec(root.right);
        };

        inorderRec(this.root);

        if(!arg){
            return array;
        } else {
            let func = arg;
            array.forEach(element => {
                return func(element);
            })
        }

    }
    preorder(arg = undefined){
        let array = [];
        
        function preorderRec(root){

            if(root === null) return; 

            array.push(root);
            preorderRec(root.left);
            preorderRec(root.right);
        };

        preorderRec(this.root);

        if(!arg){
            return array;
        } else {
            let func = arg;
            array.forEach(element => {
                return func(element);
            })
        }

    }
    postorder(arg = undefined){
        let array = [];
        
        function postorderRec(root){

            if(root === null) return; 

            postorderRec(root.left);
            postorderRec(root.right);
            array.push(root);
        };

        postorderRec(this.root);

        if(!arg){
            return array;
        } else {
            let func = arg;
            array.forEach(element => {
                return func(element);
            })
        }

    }
    height(node){
        function count(root){
            if (root.left === null && root.right === null) return 1;

            if(root.left === null){
                return count(root.right) + 1;
            }
            if(root.right === null ){
                return count(root.left) + 1;
            }
            if(root.right && root.left){

                let right = (count(root.right) + 1);
                let left = (count(root.left) + 1);

                if(right > left){
                    return right;
                } else {
                    return left;
                }
            }
        }
        return count(node);
    }

    depth(target){

        function recursive(node, target){

        
            if(node.data === target.data){
                console.log('found');
                return 0;
            }
            if(target.data > node.data){
                return recursive(node.right, target) + 1;
            } else if (target.data < node.data) {
                return recursive(node.left, target) + 1;
            }
        }

        return recursive(this.root, target);
 
    }

    isBalanced(){
        let left = this.height(this.root.left);
        let right = this.height(this.root.right);

        if(Math.abs(left - right) > 1){
            return false;
        } else {
            return true;
        }
        
    }

    rebalance(){
        let sortedArray = [];
        this.inorder(function(element){
            sortedArray.push(element.data);
        });
        this.root = sortedArray;
        this.buildTree();
        console.log('Done !');

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


