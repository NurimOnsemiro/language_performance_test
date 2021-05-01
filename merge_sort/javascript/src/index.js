
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

    let a = low, b = mid + 1;
    let pos = low;
    while(true){
        if(arr[a] < arr[b]){
            brr[pos++] = arr[a++];
        } else if(arr[a] > arr[b]){
            brr[pos++] = arr[b++];
        } else {
            //INFO: 같음
            brr[pos++] = arr[a++];
            brr[pos++] = arr[b++];
        }
        if(a > mid) break;
        else if(b > high) break;
    }
    while(a <= mid) brr[pos++] = arr[a++];
    while(b <= high) brr[pos++] = arr[b++];
    
    for(let i=low;i<=high;i++) arr[i] = brr[i];
}

let brr = null;
function main(){
    let numData = 25000000;
    console.log('Start Merge Sort; data size : ' + numData);
    brr = new Array(numData).fill(0);
    for(let i=0;i<3;i++){
        let arr = generateRandomArray(numData);
        console.time('mergesort');
        mergeSort(arr, 0, numData - 1);
        console.timeEnd('mergesort');
        console.log(arr[0], arr[numData - 1]);
    }
}
main();