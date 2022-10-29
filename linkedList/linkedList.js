class linkedList {
    constructor(data, head = null){
        this.data = data;
        this.head = head;
        this.tail = null; 

    }
    append(value){
        let newNode = new node(value);
        if (this.head === null){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.setNextNode(newNode);
            this.tail = newNode;
        }
    }
    prepend(value){
        let newNode = new node(value);
        if (this.node === null){
            this.head = newNode;
        } else {
            newNode.setNextNode(this.head);
            this.head = newNode;
        }
    }
    size(){
        let currentNode = this.head;
        let count = 0;
        while(currentNode){
            count++;
            currentNode = currentNode.next;
        }

        return count;
        
    }
    at(index){
        let currentNode = null;
        for (let i = 0; i <= index; i++){
            if (i === 0){
                currentNode = this.head;
            } else {
                if(currentNode.next !== null) {
                    currentNode = currentNode.next;
                } else {
                    throw 'Given index is empty';
                }
        };
        }
    return currentNode;
    }
    pop(){
        if (this.tail){
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        }
    }
    contains(value){
        let currentNode = this.head;
        if (this.head.data === value) return true;
            while(currentNode.next){
                if (currentNode.data === value){
                    return true;
                } else {
                    currentNode = currentNode.next;
                } 
            }
            if (currentNode.next === null && currentNode.data === value) {
                return true;
            } else {
                return false;
            }
        
    }
    find(value){
        let size = this.size();
        let currentNode = null;
        for (let i = 0; i < size; i++){
            if (this.at(i).data === value){
                currentNode = i;
            }
        }
        return currentNode;
    }
    toString(){
        let currentNode = this.head;
        let result = '';
        while(currentNode){
            result += `(${currentNode.data}) => `;
            
            currentNode = currentNode.next;
        }
        result += 'null';
        return result;
    }
    insertAt(value, index){
        let newNode = new node(value);
        let currentNode = this.at(index);
        let prevNode = this.at(index - 1);
        newNode.setNextNode(currentNode);
        prevNode.next = newNode;
    
    }
    removeAt(index){
        let targetNode = this.at(index);
        targetNode.prev.next = targetNode.next;
        targetNode.next.prev = targetNode.prev;

    }
}

class node {
    constructor(data, next = null, prev = null){
        this.data = data;
        this.next = next;
        this.prev = prev;
    }

    setNextNode(node){
        if (this.next == null){
            this.next = node;
            node.prev = this;

        } else {
            this.next.setNextNode(node);
        }
       
    }
    
}