package main

import (
	"fmt"
	"math"
	"math/rand"
	"os"
	"strconv"
	"sync"
	"time"
)

type Stack struct {
	items []int
}

func (s *Stack) Push(item int) {
	s.items = append(s.items, item)
}

func (s *Stack) Pop() int {
	dLen := len(s.items)
	if dLen == 0 {
		return -1
	}
	item, items := s.items[dLen-1], s.items[0:dLen-1]
	s.items = items
	return item
}

func (s *Stack) Empty() bool {
	dLen := len(s.items)
	if dLen == 0 {
		return true
	} else {
		return false
	}
}

func quickSort(wg *sync.WaitGroup, arr []int, startPos int, endPos int) {
	defer wg.Done()

	stk := Stack{}

	low := startPos
	high := endPos
	var pivot int
	var tmp int
	var i int
	var j int
	stk.Push(high)
	stk.Push(low)
	for stk.Empty() == false {
		low = stk.Pop()
		high = stk.Pop()
		curLength := high - low + 1
		if low >= high {
			continue
		}
		if curLength > 2 {
			tmpMid := int(math.Round(float64((low + high)) / 2))
			if arr[low] > arr[high] {
				if arr[low] > arr[tmpMid] {
					if arr[tmpMid] > arr[high] {
						pivot = tmpMid
					} else {
						pivot = high
					}
				} else {
					pivot = low
				}
			} else {
				if arr[high] > arr[tmpMid] {
					if arr[tmpMid] > arr[low] {
						pivot = tmpMid
					} else {
						pivot = low
					}
				} else {
					pivot = high
				}
			}
			tmp = arr[high]
			arr[high] = arr[pivot]
			arr[pivot] = tmp
			pivot = high
		} else {
			if arr[low] > arr[high] {
				tmp = arr[low]
				arr[low] = arr[high]
				arr[high] = tmp
			}
			continue
		}

		pivot = arr[high]
		i = low - 1
		j = high
		for true {
			for true {
				i++
				if arr[i] >= pivot {
					break
				}
			}
			for true {
				j--
				if arr[j] <= pivot {
					break
				}
			}
			if i >= j {
				break
			}
			tmp = arr[i]
			arr[i] = arr[j]
			arr[j] = tmp
		}
		tmp = arr[i]
		arr[i] = arr[high]
		arr[high] = tmp

		stk.Push(high)
		stk.Push(i + 1)
		stk.Push(i - 1)
		stk.Push(low)
	}
}

func main() {
	if len(os.Args) != 4 {
		panic("argv : JOB_SIZE MAX_VALUE NUM_THREADS")
	}

	//INFO: 데이터 개수
	jobSize, _ := strconv.Atoi(os.Args[1])
	//INFO: 데이터 최대 값
	maxValue, _ := strconv.Atoi(os.Args[2])
	//INFO: 스레드 개수
	numThreads, _ := strconv.Atoi(os.Args[3])
	var PrintCount int = 100

	//INFO: 값이 저장되는 배열
	arr := make([]int, jobSize)

	for i := 0; i < jobSize; i++ {
		arr[i] = rand.Intn(maxValue)
	}

	println("jobSize :", jobSize, ", maxValue :", maxValue, ", numThreads :", numThreads)

	var newWg sync.WaitGroup
	newWg.Add(numThreads)

	threadJobSize := jobSize / numThreads

	println("quicksort START")
	startTime := time.Now()
	for i := 0; i < numThreads; i++ {
		startPos := threadJobSize * i
		endPos := startPos + threadJobSize - 1
		//println("i: ", i, ", startPos: ", startPos, ", endPos: ", endPos)
		go quickSort(&newWg, arr, startPos, endPos)
	}
	newWg.Wait()
	elapsedTime := time.Since(startTime)
	println("quicksort END")
	d2 := elapsedTime / time.Millisecond
	et := float64(d2) / 1000.0

	fmt.Printf("elapsed time : %f sec\n", et)

	term := jobSize / PrintCount
	for i := 0; i < jobSize; i += term {
		println(arr[i])
	}

	filePath := "./result_go.txt"
	writeFile, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		panic(filePath + " file open failed")
	}
	defer writeFile.Close()
	var elapsedTimeStr string
	elapsedTimeStr = fmt.Sprintf("%f\n", et)
	if _, err := writeFile.WriteString(elapsedTimeStr); err != nil {
		panic(filePath + " file write failed")
	}
}
