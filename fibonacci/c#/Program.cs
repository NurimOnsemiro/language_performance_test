using System;
using System.Diagnostics;

namespace ConsoleApp1
{
    class Program
    {
        static long fibonacci(long value)
        {
            if (value == 0 || value == 1)
            {
                return 1;
            }
            return fibonacci(value - 1) + fibonacci(value - 2);
        }

        public static void Main(string[] args)
        {
            int fibValue = 45;
            Console.WriteLine("fibValue: " + fibValue);
            
            for (int i = 0; i < 5; i++)
            {
                Stopwatch sw = new Stopwatch();
                sw.Start();
                long result = fibonacci(fibValue);
                sw.Stop();
                Console.WriteLine("result: " + result);
                Console.WriteLine("time:" + sw.ElapsedMilliseconds.ToString() + "ms");
            }
        }
    }
}
