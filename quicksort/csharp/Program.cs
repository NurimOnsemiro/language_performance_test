using System;
using System.Diagnostics;
using System.Collections.Generic;

namespace csharp
{
    class Program
    {
        public static int[] generateRandomArray(int numData)
        {
            int[] arr = new int[numData + 1];
            var rand = new Random();            
            for (int i = 0; i < numData; i++)
            {
                arr[i] = rand.Next(numData);
            }
            return arr;
        }

        public static void quickSort(int[] arr, int start, int end)
        {
            Stack<int> stack = new Stack<int>();
            int low = start, high = end;
            int pivot, tmp;
            int i, j;
            stack.Push(high);
            stack.Push(low);
            while (stack.Count != 0)
            {
                low = stack.Pop();
                high = stack.Pop();
                int curLength = high - low + 1;
                if (low >= high)
                {
                    continue;
                }

                if (curLength > 2)
                {
                    int tmpMid = (int)Math.Round((double)((low + high) >> 1), MidpointRounding.AwayFromZero);
                    pivot = arr[low] > arr[high]
                            ? (arr[low] > arr[tmpMid] ? (arr[tmpMid] > arr[high] ? tmpMid : high) : low)
                            : (arr[high] > arr[tmpMid] ? (arr[tmpMid] > arr[low] ? tmpMid : low) : high);

                    tmp = arr[high];
                    arr[high] = arr[pivot];
                    arr[pivot] = tmp;

                    pivot = high;
                }
                else
                {
                    if (arr[low] > arr[high])
                    {
                        tmp = arr[low];
                        arr[low] = arr[high];
                        arr[high] = tmp;
                    }
                    continue;
                }

                pivot = arr[high];
                i = low - 1;
                j = high;
                while (true)
                {
                    while (arr[++i] < pivot)
                        ;
                    while (arr[--j] > pivot)
                        ;
                    if (i >= j)
                        break;
                    tmp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tmp;
                }

                tmp = arr[i];
                arr[i] = arr[high];
                arr[high] = tmp;

                stack.Push(high);
                stack.Push(i + 1);
                stack.Push(i - 1);
                stack.Push(low);
            }
        }

        static void Main(string[] args)
        {
            int numData = 100000000;
            Console.WriteLine("Start sorting");
            for(int i = 0; i < 1; i++)
            {
                var stopwatch = new Stopwatch();
                stopwatch.Start();
                int[] arr = generateRandomArray(numData);
                stopwatch.Stop();
                Console.WriteLine(stopwatch.Elapsed);

                stopwatch.Start();
                quickSort(arr, 0, numData - 1);
                stopwatch.Stop();
                Console.WriteLine(stopwatch.Elapsed);
                //for (int j = 0; j < numData; j++)
                //{
                //    Console.Write(arr[j] + " ");
                //}
            }
        }
    }
}
