dirtyDraw = (p5,msg) ->
  objects = msg.map[msg.y][msg.x]
  if objects.length == 0
    p5.fill(0)
    p5.rect(msg.x * 20, msg.y * 20, 20, 20)
    return
  for m in objects
    if m.name == "floor"
      floorDraw(p5,locate)
