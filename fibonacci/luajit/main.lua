function fiboniacci(value)
  if (value == 0 or value == 1) then
    return 1
  end

  return fiboniacci(value - 1) + fiboniacci(value - 2)
end

fibValue = 38
for i=1,5 do
  start_time = os.clock()
  result = fiboniacci(fibValue)
  end_time = os.clock()

  elapsed_time = end_time - start_time

  print("elapsed_time: " .. elapsed_time .. "sec");
  print("result: " .. result)
end