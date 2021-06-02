import {Worker} from 'worker_threads';
import path from 'path';

const N = 20000000;
const RANGE = 1000000000;
const NUM_THREADS = 16;

/** INFO: 파라미터 만큼 배열을 생성하고 랜덤값 입력 */
function generateRandomArray(numData){
    let sab = new SharedArrayBuffer(4 * numData);
    let arr = new Int32Array(sab);
    for(let i=0;i<numData;i++){
        arr[i] = Math.round(Math.random() * RANGE);
    }
    return sab;
}

function main(){
    let sab = generateRandomArray(N);
    let threadJobSize = N / NUM_THREADS;
    let cnt = 0;

    console.time('quicksort');
    for(let i=0;i<NUM_THREADS;i++){
        let myWorker = new Worker(path.join(process.cwd(), './src/worker.js'));
        let startPos = threadJobSize * i;
        let endPos = startPos + threadJobSize - 1;
        let data = {
            sab: sab,
            startPos: startPos,
            endPos: endPos
        };
        myWorker.postMessage(data);
        myWorker.on('message', value => {
            cnt++;
            if(cnt === NUM_THREADS){
                //INFO: 모든 작업 완료됨
                console.timeEnd('quicksort');
                // let arr = new Int32Array(sab);
                // console.log(arr);
                process.exit(0);
            }
        });
    }
}
main();