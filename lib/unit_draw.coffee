unitDraw = (unit,p5) ->
  if unit.pinned > 0
    p5.fill(211,211,211)
  else
    p5.fill(255)
  p5.text(unit.name,unit.x * 20 + 7, unit.y * 20 + 15)