
/** INFO: 파라미터 만큼 배열을 생성하고 랜덤값 입력 */
function generateRandomArray(numData){
    let arr = new Array(numData).fill(0);
    for(let i=0;i<numData;i++){
        arr[i] = Math.round(Math.random() * 100000000);
    }
    return arr;
}

/** INFO: 버블정렬 */
function bubbleSort(arr){
    let firstLength = arr.length - 1;
    //INFO: 배열 전체 개수만큼 반복
    for(let i=0;i<firstLength;i++){
        let secondLength = firstLength - i;
        for(let j=0;j<secondLength;j++){
            if(arr[j] <= arr[j+1]) continue;
            let tmp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = tmp;
        }
    }
}

function main(){
    let numData = 100000;
    console.log('Start Bubble Sort; data size : ' + numData);
    for(let i=0;i<1;i++){
        let arr = generateRandomArray(numData);
        console.time('bubblesort');
        bubbleSort(arr);
        console.timeEnd('bubblesort');
    }
}
main();