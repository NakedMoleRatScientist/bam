class GameOverDrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,100,100,18)

  draw: (object) ->
    @p5.background(0)

  process: (mode) ->