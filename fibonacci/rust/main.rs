//rustc ./main.rs
use std::time::{Instant};

fn fib(value: i32) -> i32 {
  if value == 0 || value == 1 {
      return 1;
  }
  return fib(value - 1) + fib(value - 2);
}

fn main() {
  let fib_value= 38;
  for _n in 0..5 {
    println!("start. fib_value {}", fib_value);
    let start_time = Instant::now();
    let a: i32 = fib(fib_value);
    let end_time = Instant::now();
    let elapsed_time = end_time.duration_since(start_time);
    println!("{:?}", elapsed_time);
    println!("{}", a);
  }
}