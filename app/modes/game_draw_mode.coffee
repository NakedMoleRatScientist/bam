class GameDrawMode
  constructor: (@p5) ->
  draw: (map) ->
    @p5.background(0)
    mapDraw(map,@p5)
    gruntDraw(5,5,@p5)
  process: (mode) ->
    switch(mode.get_queue())
      when "update"
        this.draw(mode.map.map)