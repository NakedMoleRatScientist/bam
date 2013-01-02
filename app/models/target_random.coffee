TargetRandomFire = (unit,list) ->
  if unit.align == 2
    find = 0
  else
    find = 2
  list = list.filter (x) -> x.align == find
  if list.length == 0
    return null
  else
    return list[Math.floor(Math.random() * list.length)]
