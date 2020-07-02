import time

def fibonacci(value):
  if value == 0 or value == 1:
    return 1
  return fibonacci(value - 1) + fibonacci(value - 2)

fibValue = 38

for i in range(0, 5):
  print('start fibonacci')
  start = time.time()
  result = fibonacci(fibValue)
  end = time.time()
  print('result(', i, '): ', result)
  print('elapsed time: ', end - start, 's')