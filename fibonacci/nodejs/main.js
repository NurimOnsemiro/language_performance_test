function fibonacci(value){
  if(value === 0 || value === 1){
    return 1;
  }
  return fibonacci(value - 1) + fibonacci(value - 2);
}

let result;
let fibValue = 38;

for(let i=0;i<5;i++){
  console.time('alice');
  result = fibonacci(fibValue);
  console.timeEnd('alice');
  console.log(result);
}