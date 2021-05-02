const USE_FIX_ARR = true;

/** INFO: 파라미터 만큼 배열을 생성하고 랜덤값 입력 */
function generateRandomArray(numData){
    let arr;
    if(USE_FIX_ARR){
        let arrBuffer = new ArrayBuffer(4 * numData);
        arr = new Int32Array(arrBuffer);
    } else {
        arr = new Array(numData).fill(0);
    }
    for(let i=0;i<numData;i++){
        arr[i] = Math.round(Math.random() * numData);
    }
    return arr;
}

function quickSort(arr, start, end){
    let stack = [];
    let low = start, high = end;
    let pivot, tmp;
    let i, j;
    stack.push(high);
    stack.push(low);
    while(stack.length !== 0){
        low = stack.pop();
        high = stack.pop();
        let curLength = high - low + 1;
        if(low >= high){
            //INFO: 한개밖에 없으면 continue
            continue;
        }

        if(curLength > 2) {
            //INFO: 2개 이상인 경우
            let tmpMid = Math.round((low+high) >> 1);
            //INFO: low, mid, high 중 중간값을 정해야 함
            pivot = arr[low] > arr[high] ? (arr[low] > arr[tmpMid] ? (arr[tmpMid] > arr[high] ? tmpMid : high) : low) : (arr[high] > arr[tmpMid] ? (arr[tmpMid] > arr[low] ? tmpMid : low) : high);

            {//SWAP
                tmp = arr[high];
                arr[high] = arr[pivot];
                arr[pivot] = tmp;
            }

            pivot = high;
        } else {
            //INFO: 2개 밖에 없는 경우
            if(arr[low] > arr[high]){
                //SWAP
                tmp = arr[low];
                arr[low] = arr[high];
                arr[high] = tmp;
            }
            continue;
        }

        //INFO: 피봇
        pivot = arr[high];
        i = low - 1;
        j = high;
        while(true){
            while(arr[++i] < pivot);
            while(arr[--j] > pivot);
            if(i >= j) break;
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        tmp = arr[i];
        arr[i] = arr[high];
        arr[high] = tmp;

        stack.push(high);
        stack.push(i+1);
        stack.push(i-1);
        stack.push(low);
    }
}

function main(){
    let numData = 20000000;
    let dataSizeGap = 5000000;

    for(let j=0;j<1;j++){
        for(let i=0;i<3;i++){
            console.time('mem');
            let arr = generateRandomArray(numData);
            console.timeEnd('mem');
            console.log('Start Quick Sort; data size : ' + numData);
            console.time('quick_sort');
            quickSort(arr, 0, numData - 1);
            console.timeEnd('quick_sort');
            //console.log(arr);
        }
        numData += dataSizeGap;
    }
}
main();