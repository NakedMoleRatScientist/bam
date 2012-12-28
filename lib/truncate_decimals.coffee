truncateDecimals = (n) ->
  Math[n < 0 ? 'ceil' : 'floor'](n)