function generateRandomArray(numData){
    let arr = new Array(numData).fill(0);
    for(let i=0;i<numData;i++){
        arr[i] = Math.round(Math.random() * 100000000);
    }
    return arr;
}

function selectionSort(arr){
    let firstLength = arr.length;
    for(let i=0;i<firstLength;i++){
        for(let j=i+1;j<firstLength;j++){
            if(arr[i] <= arr[j]) continue;
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
}

function main(){
    let numData = 100000;
    for(let i=0;i<3;i++){
        let arr = generateRandomArray(numData);
        console.time('selectionSort');
        selectionSort(arr);
        console.timeEnd('selectionSort');
    }
}
main();