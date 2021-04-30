
/** INFO: 파라미터 만큼 배열을 생성하고 랜덤값 입력 */
function generateRandomArray(numData){
    let arr = new Array(numData).fill(0);
    for(let i=0;i<numData;i++){
        arr[i] = Math.round(Math.random() * 100000000);
    }
    return arr;
}

function quickSort(arr){
    let firstLength = arr.length;
    let low = 0, mid = Math.round(firstLength / 2), high = firstLength - 1;
    let pivot = Math.round((arr[low] + arr[mid] + arr[high]) / 3);
}

function main(){
    let numData = 100000;
    console.log('Start Quick Sort; data size : ' + numData);
    for(let i=0;i<1;i++){
        let arr = generateRandomArray(numData);
        console.time('sort');
        quickSort(arr);
        console.timeEnd('sort');
        console.log(arr[0], arr[numData - 1]);
    }
}
main();