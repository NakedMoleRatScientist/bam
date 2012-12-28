truncateDecimals = (n) ->
  Math[if n < 0 then 'ceil' else 'floor'](n)