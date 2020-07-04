class Main {
  static long fibonacci(long value){
    if(value == 0 || value == 1){
      return 1;
    }
    return fibonacci(value - 1) + fibonacci(value - 2);
  }
  public static void main(String[] args) {
    long fibValue = 38;
    System.out.println("fibValue: " + fibValue);
    for(int i=0;i<5;i++){
      long startTime = System.currentTimeMillis();
      long result = fibonacci(fibValue);
      long endTime = System.currentTimeMillis();
      System.out.println("result: " + result);
      System.out.println("elapsed time:" + (endTime - startTime) + "ms");
    }
  }
}