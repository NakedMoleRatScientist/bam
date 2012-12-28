dirtyDraw = (p5,map,locate) ->
  for m in map[locate.y][locate.x]
    if o.name == "floor"
      floorDraw(p5,locate)
    else
      p5.fill(0)
      p5.rect(locate.x * 20, locate.y * 20, 20, 20)