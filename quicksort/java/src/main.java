import java.util.Stack;

class Main {
    public static int[] generateRandomArray(int numData) {
        int[] arr = new int[numData + 1];
        for (int i = 0; i < numData; i++) {
            arr[i] = (int) Math.round(Math.random() * (double) numData);
        }
        return arr;
    }

    public static void quickSort(int[] arr, int start, int end) {
        Stack<Integer> stack = new Stack<Integer>();
        int low = start, high = end;
        int pivot, tmp;
        int i, j;
        stack.push(high);
        stack.push(low);
        while (stack.size() != 0) {
            low = stack.pop();
            high = stack.pop();
            int curLength = high - low + 1;
            if (low >= high) {
                continue;
            }

            if (curLength > 2) {
                int tmpMid = (int) Math.round((low + high) >> 1);
                pivot = arr[low] > arr[high]
                        ? (arr[low] > arr[tmpMid] ? (arr[tmpMid] > arr[high] ? tmpMid : high) : low)
                        : (arr[high] > arr[tmpMid] ? (arr[tmpMid] > arr[low] ? tmpMid : low) : high);

                tmp = arr[high];
                arr[high] = arr[pivot];
                arr[pivot] = tmp;

                pivot = high;
            } else {
                if (arr[low] > arr[high]) {
                    tmp = arr[low];
                    arr[low] = arr[high];
                    arr[high] = tmp;
                }
                continue;
            }

            pivot = arr[high];
            i = low - 1;
            j = high;
            while (true) {
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

            stack.push(high);
            stack.push(i + 1);
            stack.push(i - 1);
            stack.push(low);
        }
    }

    public static void main(String[] args) {
        int numData = 100000000;
        System.out.println("Start Sorting");
        for (int i = 0; i < 1; i++) {
            long beforeTime = System.currentTimeMillis();
            int[] arr = generateRandomArray(numData);
            long afterTime = System.currentTimeMillis();
            long secDiffTime = (afterTime - beforeTime);
            System.out.println("mem time");
            System.out.println((double) secDiffTime / 1000);

            beforeTime = System.currentTimeMillis();
            quickSort(arr, 0, numData - 1);
            afterTime = System.currentTimeMillis();
            secDiffTime = (afterTime - beforeTime);
            System.out.println("quicksort time");
            System.out.println((double) secDiffTime / 1000);
            // for (int j = 0; j < numData; j++) {
            // System.out.print(arr[j] + " ");
            // }
        }
    }
}