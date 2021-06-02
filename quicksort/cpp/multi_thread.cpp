#include <iostream>
#include <memory>
#include <array>
#include <random>
#include <stack>
#include <thread>

#include "hourmeter.h"

using namespace std;

#define N 20000000
#define RANGE 1000000000
#define NUM_THREADS 16
#define REPEAT 5

void quickSort(int arr[N], const int& start, const int& end) {
    int pivot, tmp;
    int i, j;
    int low, high;

    stack<int> stk;
    
    low = start;
    high = end;
    stk.push(high);
    stk.push(low);
    while (!stk.empty()) {
        low = stk.top();
        stk.pop();
        high = stk.top();
        stk.pop();

        if (low >= high) {
            continue;
        }
        int curLength = high - low + 1;
        int pivot;

        if (curLength > 2) {
            int tmpMid = (low + high) / 2;
            pivot = arr[low] > arr[high] ? (arr[low] > arr[tmpMid] ? (arr[tmpMid] > arr[high] ? tmpMid : high) : low) : (arr[high] > arr[tmpMid] ? (arr[tmpMid] > arr[low] ? tmpMid : low) : high);
            {
                tmp = arr[high];
                arr[high] = arr[pivot];
                arr[pivot] = tmp;
            }
            pivot = high;
        }
        else {
            if (arr[low] > arr[high]) {
                tmp = arr[low];
                arr[low] = arr[high];
                arr[high] = tmp;
            }
            continue;
        }

        //INFO: 데이터가 최소 두개
        pivot = arr[high];
        i = low - 1;
        j = high;
        while (1) {
            while (arr[++i] < pivot);
            while (arr[--j] > pivot);
            if (i >= j)
                break;
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }

        tmp = arr[i];
        arr[i] = arr[high];
        arr[high] = tmp;

        stk.push(high);
        stk.push(i + 1);
        stk.push(i - 1);
        stk.push(low);
    }
}

void main() {

	HourMeter hm;
	//INFO: 시드값을 얻기 위한 random_device 생성
	random_device rd;
	//INFO: random_device를 통해 난수 생성엔진을 초기화한다.
	mt19937 gen(rd());
	//INFO: 균등 분포 정의
	uniform_int_distribution<int> dis(0, RANGE);

    double timeSum = 0.0;

    for (int j = 0; j < REPEAT; j++) {
        int* arr = new int[N];

        for (int i = 0; i < N; i++) {
            arr[i] = dis(gen);
        }

        int threadJobSize = N / NUM_THREADS;
        printf("threadJobSize : %d\n", threadJobSize);

        thread thr[NUM_THREADS];

        hm.startMeasure();
        for (int i = 0; i < NUM_THREADS; i++) {
            int startPos = threadJobSize * i;
            int endPos = startPos + threadJobSize - 1;
            thr[i] = thread(quickSort, arr, startPos, endPos);
        }

        for (int i = 0; i < NUM_THREADS; i++) {
            if (thr[i].joinable()) {
                thr[i].join();
            }
        }

        hm.endMeasure();
        timeSum += hm.getLatestDuration();

        /*for (int i = 0; i < N; i++) {
            printf("%d ", arr[i]);
        }
        printf("\n");*/
        //printf("time : %lf\n", hm.getLatestDuration());

        delete[] arr;
    }

    printf("average : %lf\n", timeSum / REPEAT);
}