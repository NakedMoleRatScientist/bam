class GameDrawMode
  constructor: (@p5) ->
  draw: (map) ->
  process: (mode) ->
    switch(mode.get_queue())
      when "update"
        this.draw(mode.map)