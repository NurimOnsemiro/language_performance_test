//const assert = require("assert");
const myModule = require("..");
//assert.strictEqual(myModule.add(1, 2), 3);
//console.log("ok");

function main(){
    // for(let i=0;i<1;i++){
    //     console.time('bubblesort');
    //     myModule.startBubbleSort(100000);
    //     console.timeEnd('bubblesort');
    // }
}
main();

// 'use strict';
// const fs = require('fs');
// const { WASI } = require('wasi');
// const wasi = new WASI({
//   args: process.argv,
//   env: process.env,
//   preopens: {
//     '/sandbox': './'
//   }
// });
// const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

// (async () => {
//   const wasm = await WebAssembly.compile(fs.readFileSync('./build/optimized.wasm'));
//   const instance = await WebAssembly.instantiate(wasm, importObject);

//   console.log('a1');
//   wasi.start(instance);
//   console.log('a2');
// })();