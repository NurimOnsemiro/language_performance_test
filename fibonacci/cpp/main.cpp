#include <iostream>
#include "HourMeter.h"
using namespace std;
int fibonacci(const int value) {
	if (value == 0 || value == 1) {
		return 1;
	}
	return fibonacci(value - 1) + fibonacci(value - 2);
};
void main() {
	HourMeter hm;
	int fibValue{ 38 };

	for(int i=0;i<5;i++){
		printf("fibValue: %d\n", fibValue);
		hm.startMeasure();
		int result = fibonacci(fibValue);
		hm.endMeasure();
		printf("value: %d\n", result);
	}
}