unitDraw = (name,x,y,p5) ->
  p5.fill(255)
  p5.text(name,(x + 1) * 20, (y + 1) * 20)