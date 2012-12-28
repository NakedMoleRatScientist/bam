randomOpsAddsub = (initial, change) ->
  if Math.random() * 10 > 5
    initial -= change
  else
    initial += change
  initial