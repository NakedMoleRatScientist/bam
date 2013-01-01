TargetSelectSimple = (unit,list) ->
  if unit.align == 2
    find = 0
  else
    find = 2
  for u in list
    if u.align == find
      return u
    return null