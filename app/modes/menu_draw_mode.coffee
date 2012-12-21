class MenuDrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,300,250,18)
    @size = 0
  draw: (object) ->
    @p5.background(0)
    titleDraw(@p5)
    @texts.draw(object.options,object.pointer)
    instructionDraw(@p5)
  process: (mode) ->
    switch(mode.get_queue())
      when "update"
        this.draw(mode.options)