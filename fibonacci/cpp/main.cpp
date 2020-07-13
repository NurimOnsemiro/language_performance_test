#include <iostream>
#include "HourMeter.h"
using namespace std;

long long fibonacci(long long value) {
    if (value == 0 || value == 1) {
        return 1;
    }
    return fibonacci(value - 1) + fibonacci(value - 2);
};

int main() {
    printf("START\n");

    long long fibValue{ 45 };
    HourMeter hm;
    hm.startMeasure();
    long long result = fibonacci(fibValue);
    hm.endMeasure();

    printf("value: %lld\n", result);

    printf("END\n");

    return 0;
}
