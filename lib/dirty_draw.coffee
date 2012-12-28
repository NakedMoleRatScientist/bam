dirtyDraw = (p5,map,locate) ->
  for m in map[locate.y][locate.x]
    if o.name == "floor"
      floorDraw(p5)