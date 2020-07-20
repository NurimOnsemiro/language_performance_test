#include <iostream>
#include <future>
#include "hourmeter.h"
using namespace std;

long long fibonacci(long long value) {
    if (value == 0 || value == 1) {
        return 1;
    }
    return fibonacci(value - 1) + fibonacci(value - 2);
};

void runSingleThread() {
    long long fibValue;
    while (true) {
        printf("Enter the Fibonacci number to calculate.\nNumber:");
        scanf("%lld", &fibValue);
        printf("Fibonacci number: %lld\n", fibValue);
        HourMeter hm;
        hm.startMeasure();
        long long result = fibonacci(fibValue);
        hm.endMeasure();
        printf("value: %lld\n", result);
    }
}

void runMultiThread() {
    long long fibValue;
    const int numCores = static_cast<int>(std::thread::hardware_concurrency());
    future<long long> thr[32];
    while (true) {
        printf("Enter the Fibonacci number to calculate.\nNumber:");
        scanf("%lld", &fibValue);
        printf("Fibonacci number: %lld\n", fibValue);

        HourMeter hm;
        hm.startMeasure();

        for (int i = 0; i < numCores; i++) {
            thr[i] = async(launch::async, fibonacci, fibValue);
        }

        for (int i = 0; i < numCores; i++) {
            thr[i].get();
        }

        hm.endMeasure();
    }
}

int main() {
    runSingleThread();
    //runMultiThread();

    printf("Exit\n");

    return 0;
}
