dirtyDraw = (p5,msg) ->
  p5.fill(0)
  p5.rect(msg.x * 20, msg.y * 20, 20, 20)
  objects = msg.map[msg.y][msg.x]
  console.log(objects.length)
  for m in objects
    if m.name == "floor"
      floorDraw(p5,locate)
    else if m.name == "Bullet"
      bulletDraw(p5,m.x,m.y)
