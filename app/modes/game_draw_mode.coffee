class GameDrawMode
  constructor: (@p5) ->
  draw: (mode) ->
    @p5.background(0)
    mapDraw(mode.map.map,@p5)
  process: (mode) ->
    switch(mode.get_queue())
      when "update"
        this.draw(mode)