
menu = (p5) ->


  p5.setup = () ->
    p5.size(800, 600)
    p5.background(0)
    @menu = new MenuMode()
    @menu_draw = new MenuDrawMode(p5)
    @menu_key = new MenuKeyMode(p5)

  p5.keyPressed = () ->
    result = @menu_key.key_pressed()
    @menu.process(result)

  p5.draw = () ->
    frameRateDraw(p5)
    @menu_draw.process(@menu.get_queue())

$(document).ready ->
  canvas = document.getElementById "processing"
  canvas.focus()
  processing = new Processing(canvas, menu)
