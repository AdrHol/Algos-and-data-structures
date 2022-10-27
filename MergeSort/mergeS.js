function mergeSort(arr){
    let result = []; 
    let left= [];
    let right = [];
    if (arr.length <= '1'){
            if (arr[0] === undefined){
                arrr[0] = '';
            }
        return result = arr;
    }
       else {
        let leftArr = arr.slice(0, Math.round(arr.length/2));
        let rightArr = arr.slice(Math.round(arr.length/2) , arr.length);

        left = mergeSort(leftArr);
        right = mergeSort(rightArr);
    }
    
        let leftSideLenght = left.length;
        let rightSideLenght = right.length;
        let i = 0;
        let j = 0;
         
        while (i < leftSideLenght && j < rightSideLenght ) {
            if (left[i] <= right[j]){
            result.push(left[i++]);
        }
        if (left[i] > right[j]){
            result.push(right[j++]);
        }
        }

        if (i < leftSideLenght){
            for (let n = i; n < leftSideLenght; n++){
            result.push(left[n]);
        }
        } else if (j < rightSideLenght){
            for (let n = j; n < rightSideLenght; n++){
            result.push(right[n]);
        }        
   };

   return result;
}


console.log (mergeSort([2,4,3,2,1,3,4,5]));
