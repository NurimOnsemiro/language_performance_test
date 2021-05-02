extern crate rand;

use rand::Rng;
use std::time::SystemTime;

const NUM_DATA: usize = 1000000;

static mut stack: [u32; NUM_DATA] = [0; NUM_DATA];
static mut top: u32 = 0;

unsafe fn init_stack() {
    top = 0;
}

unsafe fn push(val: u32) {
    if top < NUM_DATA as u32 {
        stack[top as usize] = val;
        top += 1;
    }
}

unsafe fn pop() -> u32 {
    if top != 0 {
        top -= 1;
        return stack[top as usize];
    } else {
        return 0;
    }
}

unsafe fn is_stack_empty() -> u32 {
    if top != 0 {
        return 0;
    } else {
        return 1;
    }
}

unsafe fn quick_sort(arr: &mut [u32], start: u32, end: u32) {
    //let mut stack: Vec<u32> = Vec::new();
    let mut low: u32 = start;
    let mut high: u32 = end;
    let mut pivot: u32;
    let mut tmp: u32;
    let mut i: i32;
    let mut j: i32;

    //println!("start: {}, end: {}", start, end);

    // stack.push(high);
    // stack.push(low);
    push(high);
    push(low);
    //println!("stack size: {}", stack.len());
    while is_stack_empty() == 0 {
        //low = stack.pop().unwrap();
        //high = stack.pop().unwrap();
        low = pop();
        high = pop();
        //println!("low: {}, high: {}", low, high);
        let mut cur_length: u32 = high - low + 1;
        if low >= high {
            continue;
        }

        if cur_length > 2 {
            let mut tmp_mid: u32 = (low + high) >> 1;
            //println!("tmp_mid: {}", tmp_mid);
            if arr[low as usize] > arr[high as usize] {
                if arr[low as usize] > arr[tmp_mid as usize] {
                    if arr[tmp_mid as usize] > arr[high as usize] {
                        pivot = tmp_mid;
                    } else {
                        pivot = high;
                    }
                } else {
                    pivot = low;
                }
            } else {
                if arr[high as usize] > arr[tmp_mid as usize] {
                    if arr[tmp_mid as usize] > arr[low as usize] {
                        pivot = tmp_mid;
                    } else {
                        pivot = low;
                    }
                } else {
                    pivot = high;
                }
            }

            tmp = arr[high as usize];
            arr[high as usize] = arr[pivot as usize];
            arr[pivot as usize] = tmp;

            pivot = high;
        } else {
            if arr[low as usize] > arr[high as usize] {
                tmp = arr[low as usize];
                arr[low as usize] = arr[high as usize];
                arr[high as usize] = tmp;
            }
            continue;
        }

        //println!("test");

        pivot = arr[high as usize];
        //println!("pivot: {}", pivot);
        i = low as i32 - 1;
        //println!("i: {}", i);
        j = high as i32;
        //println!("i: {}, j: {}", i, j);
        while true {
            while true {
                i += 1;
                if arr[i as usize] >= pivot {
                    break;
                }
            }
            while true {
                j -= 1;
                if arr[j as usize] <= pivot {
                    break;
                }
            }
            if i >= j {
                break;
            }
            tmp = arr[i as usize];
            arr[i as usize] = arr[j as usize];
            arr[j as usize] = tmp;
        }

        tmp = arr[i as usize];
        arr[i as usize] = arr[high as usize];
        arr[high as usize] = tmp;

        //stack.push(high);
        //stack.push(i as u32 + 1);
        //stack.push(i as u32 - 1);
        //stack.push(low);

        push(high);
        push(i as u32 + 1);
        push(i as u32 - 1);
        push(low);
    }
}

fn main() {
    println!("a0");
    unsafe {
        init_stack();
    }
    println!("a1");
    let now = SystemTime::now();
    let mut rng = rand::thread_rng();

    let mut arr: [u32; NUM_DATA] = [0; NUM_DATA];

    println!("a2");

    for i in 1..NUM_DATA {
        arr[i] = rng.gen();
    }

    println!("a3");

    unsafe {
        quick_sort(&mut arr, 0, NUM_DATA as u32 - 1);
    }

    println!("a4");

    //println!("first:{}, last: {}", arr[0], arr[NUM_DATA - 1]);

    match now.elapsed() {
        Ok(elapsed) => {
            // it prints '2'
            println!("elapsed time : {}", elapsed.as_secs());
        }
        Err(e) => {
            // an error occurred!
            println!("Error: {:?}", e);
        }
    }
}
