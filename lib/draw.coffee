
menu = (p5) ->


  p5.setup = () ->
    p5.size(800, 600)
    p5.background(0)
    @menu = new MenuMode()
    @menu_draw = new MenuDrawMode(p5)

  p5.draw = () ->
    frameRateDraw(p5)
    @menu_draw.process(@menu)

$(document).ready ->
  canvas = document.getElementById "processing"
  canvas.focus()
  processing = new Processing(canvas, menu)
