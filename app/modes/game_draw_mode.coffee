class GameDrawMode
  constructor: (@p5) ->
  draw: (map) ->
    @p5.backgound(0)
    mapDraw(map,@p5)
  process: (mode) ->
    switch(mode.get_queue())
      when "update"
        this.draw(mode.map)