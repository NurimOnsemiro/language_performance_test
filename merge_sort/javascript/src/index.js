
function generateRandomArray(numData){
    let arr = new Array(numData).fill(0);
    for(let i=0;i<numData;i++){
        arr[i] = Math.round(Math.random() * 100000000);
    }
    return arr;
}

function mergeSort(arr, low, high){
    if(low === high){
        //INFO: 비교 데이터가 하나밖에 없음
        return;
    } else if(high - low === 1){
        //INFO: 두개밖에 없음
        if(arr[low] > arr[high]){
            //INFO: 좌측이 더 큰 값이면 교환
            let tmp = arr[low];
            arr[low] = arr[high];
            arr[high] = tmp;
        }
        return;
    }

    //INFO: 비교 데이터가 세 개 이상이면 쪼갠다
    let mid = Math.round((low + high) / 2);
    
    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);

    let p = low, a = low, b = mid + 1;
    let tmp = Number.MAX_VALUE;
    while(p <= high){
        let aSwap = false;
        let bSwap = false;
        if(tmp > arr[b]){
            let tp = tmp;
            tmp = arr[b];
            arr[b] = tp;
            bSwap = true;
        }
        //INFO: tmp가 arr[b]보다 항상 작다
        if(a <= mid && arr[a] > tmp){
            let tp = tmp;
            tmp = arr[a];
            arr[a] = tp;
            aSwap = true;
        } else if (p !== a){
            let tp = tmp;
            tmp = arr[a];
            arr[a] = tp;
        }
        //INFO: arr[a]가 tmp보다 항상 작다
        p++;
        if(aSwap === true) a++;
        if(aSwap !== true && bSwap === true){
            b++;
        }
    }
}

function main(){
    let numData = 10000;
    for(let i=0;i<1;i++){
        let arr = generateRandomArray(numData);
    }
}
main();