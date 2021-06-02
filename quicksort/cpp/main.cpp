//#include <stdio.h>
//#include <time.h>
//#include <stdlib.h>
//
//#define N 20000000
//#define R 100000
//#define STKSIZE N
//
////unsigned int arr[N];
//int* arr = nullptr;
//
//int top = 0;
//int* stack = nullptr;
////int stack[STKSIZE];
//
//void init_stack() {
//    top = 0;
//}
//
//void push(int i) {
//    if (top < STKSIZE)
//        stack[top++] = i;
//    else {
//        printf("stack full\n");
//        exit(0);
//        return;
//    }
//}
//
//int pop() {
//    if (top != 0)
//        return stack[--top];
//    else
//        return 0;
//}
//
//int isStackEmpty() {
//    if (top != 0)
//        return 0;
//    else
//        return 1;
//}
//
//void quickSort() {
//    int pivot, tmp;
//    int i, j;
//    int low, high;
//    init_stack();
//    low = 0;
//    high = N - 1;
//    push(high);
//    push(low);
//    while (!isStackEmpty()) {
//        low = pop();
//        high = pop();
//        if (low >= high) {
//            continue;
//        }
//        int curLength = high - low + 1;
//        int pivot;
//
//        if (curLength > 2) {
//            int tmpMid = (low + high) / 2;
//            pivot = arr[low] > arr[high] ? (arr[low] > arr[tmpMid] ? (arr[tmpMid] > arr[high] ? tmpMid : high) : low) : (arr[high] > arr[tmpMid] ? (arr[tmpMid] > arr[low] ? tmpMid : low) : high);
//            {
//                tmp = arr[high];
//                arr[high] = arr[pivot];
//                arr[pivot] = tmp;
//            }
//            pivot = high;
//        }
//        else {
//            if (arr[low] > arr[high]) {
//                tmp = arr[low];
//                arr[low] = arr[high];
//                arr[high] = tmp;
//            }
//            continue;
//        }
//
//        //INFO: 데이터가 최소 두개
//        pivot = arr[high];
//        i = low - 1;
//        j = high;
//        while (1) {
//            while (arr[++i] < pivot);
//            while (arr[--j] > pivot);
//            if (i >= j)
//                break;
//            tmp = arr[i];
//            arr[i] = arr[j];
//            arr[j] = tmp;
//        }
//
//        tmp = arr[i];
//        arr[i] = arr[high];
//        arr[high] = tmp;
//
//        push(high);
//        push(i + 1);
//        push(i - 1);
//        push(low);
//    }
//}
//
//void main() {
//    srand(time(NULL));
//
//    stack = new int[STKSIZE];
//
//    clock_t start, end;
//
//    for (int i = 0; i < 3; i++) {
//        top = 0;
//        start = clock();
//        arr = new int[N];
//        for (int i = 0; i < N; i++) {
//            arr[i] = (rand() * (rand() + 1)) % N;
//        }
//        end = clock();
//        printf("mem time : %lf\n", (double)(end - start) / CLOCKS_PER_SEC);
//
//        start = clock();
//        quickSort();
//        end = clock();
//        printf("quicksort time : %lf\n", (double)(end - start) / CLOCKS_PER_SEC);
//
//        delete[] arr;
//    }
//
//    delete[] stack;
//}