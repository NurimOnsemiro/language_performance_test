
/** INFO: 파라미터 만큼 배열을 생성하고 랜덤값 입력 */
function generateRandomArray(numData){
    let arr = new Array(numData).fill(0);
    for(let i=0;i<numData;i++){
        arr[i] = Math.round(Math.random() * 100000000);
    }
    return arr;
}

function insertionSort(arr){
    let firstLength = arr.length;
    for(let i=0;i<firstLength;i++){
        let target = arr[i];
        for(let j=firstLength - 1;j>i;j--){
            if(target <= arr[j]) continue;
            let tmp = arr[j];
            arr[j] = target;
            target = tmp;
        }
        arr[i] = target;
    }
}

function main(){
    let numData = 100000;
    console.log('Start Insertion Sort; data size : ' + numData);
    for(let i=0;i<3;i++){
        let arr = generateRandomArray(numData);
        console.time('sort');
        insertionSort(arr);
        console.timeEnd('sort');
        console.log(arr[0], arr[numData - 1]);
    }
}
main();