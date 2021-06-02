import {threadId, parentPort} from 'worker_threads';

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

let tmp = parentPort.on('message', data => {
    let sab = data.sab;
    let startPos = data.startPos;
    let endPos = data.endPos;

    let arr = new Int32Array(sab);

    quickSort(arr, startPos, endPos);

    parentPort.postMessage(threadId);
});

