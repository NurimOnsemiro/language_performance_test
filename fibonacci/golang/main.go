package main
import (
	"time"
)
func fibonacci(value int) int {
	if value == 0 || value == 1 {
		return 1
	}
	return fibonacci(value-1) + fibonacci(value-2)
}
func main() {
	fibValue := 45
	for i:=0;i<5;i++ {
		startTime := time.Now()
		result := fibonacci(fibValue)
		elapsedTime := time.Since(startTime)
		d2 := elapsedTime / time.Millisecond
		println("time: ", d2, ", result: ", result)
	}
}