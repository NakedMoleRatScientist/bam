class MenuDrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,300,250,18)
    @size = 0
  draw: () ->
    @p5.background(0)
    titleDraw(@p5)
 #   @texts.draw(object.options,object.pointer)
  #  instructionDraw(@p5)
  process: (mode) ->
    if mode.get_queue() == "update"
      this.draw(mode.options)