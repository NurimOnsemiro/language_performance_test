
// As of AssemblyScript 0.10.0, adding `import "wasi"`, will automatically
// import WASI bindings, and add some nice defaults for compiling to WASI.
import "wasi";

// Import Console (for writing to stdout), and FileSystem (for reading/writing files)
// from "as-wasi". An API for working with WASI in AssemblyScript much easier.
import { Console, Time, Date } from "as-wasi";

// Print out hello world!
// This will handle writing to stdout for us using the WASI APIs (e.g fd_write)
Console.log("Hello World!\n");

// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

function generateRandomArray(numData: i32): Int32Array{
  let arr = new Int32Array(numData).fill(0);
  for(let i=0;i<numData;i++){
    arr[i] = i32(Math.round(Math.random() * 100000000));
  }
  return arr;
}

/** INFO: 버블정렬 */
function bubbleSort(arr: Int32Array): void{
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

function startBubbleSort(numData: i32): void{
  let arr = generateRandomArray(numData);
  bubbleSort(arr);
}

let time = Date.now();
startBubbleSort(100000);
time = Date.now() - time;
Console.log(time.toString() + "\n");