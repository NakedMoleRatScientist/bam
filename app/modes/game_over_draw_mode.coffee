class GameOverDrawMode
  constructor: (@p5) ->
    @texts = new TextListDraw(@p5,100,100,18)

  draw: (texts) ->
    @p5.background(0)
    @texts.draw(texts)

  process: (mode) ->
    msg = mode.get_queue()
    switch(msg.name)
      when "draw"
        this.draw(mode.options)