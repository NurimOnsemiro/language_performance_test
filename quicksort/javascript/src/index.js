
/** INFO: 파라미터 만큼 배열을 생성하고 랜덤값 입력 */
function generateRandomArray(numData){
    let arr = new Array(numData).fill(0);
    for(let i=0;i<numData;i++){
        arr[i] = Math.round(Math.random() * 100000000);
    }
    return arr;
}

function quickSort(arr){
    let queue = [];
    queue.push(0, arr.length - 1);

    while(queue.length !== 0){
        let low = queue.shift();
        let high = queue.shift();
        //console.log(`low : ${low}, high : ${high}`);
        //INFO: 하나밖에 없으면 정렬 불필요
        if(low === high) continue;
        let arrLength = high - low + 1;
        let pivot = low;
        let mid = low;

        if(arrLength > 2) {
            //INFO: 2개 이상인 경우
            let tmpMid = Math.round((low+high) / 2);
            //INFO: low, mid, high 중 중간값을 정해야 함
            let tmpArr = [low, tmpMid, high];
            tmpArr.sort((a,b) => {return arr[a]-arr[b]});
            pivot = tmpArr[1];
        } else {
            //INFO: 2개 밖에 없는 경우
            if(arr[low] > arr[high]){
                let tmp = arr[low];
                arr[low] = arr[high];
                arr[high] = tmp;
            }
            continue;
        }

        //INFO: 최소 3개는 있다고 확정할 수 있음

        //INFO: pivot을 가장 왼쪽으로 이동
        {
            let tmp = arr[low];
            arr[low] = arr[pivot];
            arr[pivot] = tmp;
            pivot = low;
        }

        let i = low+1, j=high;
        while(true){
            while(i < j && arr[i] <= arr[pivot]){
                i++;
            }
            while(j > i && arr[j] > arr[pivot]){
                j--;
            }
            if(i >= j){
                //INFO: 더이상 교환할 것이 없다
                if(i > low){
                    //INFO: 하나라도 증가했으면 교환
                    let tmp = arr[i-1];
                    arr[i-1] = arr[pivot];
                    arr[pivot] = tmp;
                    mid = i-1;
                } else {
                    //INFO: 피봇보다 큰 값밖에 없으면 피봇이 중간값이 된다
                    mid = pivot;
                }
                break;
            }

            {
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }

        //INFO: low~mid 까지 정렬하고, mid+1~high까지 정렬해야 한다
        queue.push(low);
        queue.push(mid);
        queue.push(mid+1);
        queue.push(high);
    }
}

function main(){
    let numData = 100000;
    console.log('Start Quick Sort; data size : ' + numData);
    for(let i=0;i<1;i++){
        let arr = generateRandomArray(numData);
        console.time('sort');
        quickSort(arr);
        console.timeEnd('sort');
    }
}
main();