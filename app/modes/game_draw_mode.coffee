class GameDrawMode
  constructor: (@p5) ->
  initial_draw: (mode) ->
    @p5.background(0)
    mapDraw(mode.map.map,@p5)
    for u in mode.units.units
      unitDraw(u,@p5)

  cleanup: (msg) ->
    dirtyDraw(@p5,msg)

  draw_unit: (msg) ->
    dirtyDraw(@p5,msg)
    unitDraw(msg.unit,@p5)

  draw_bullet: (msg) ->
    bulletDraw(@p5,msg.x,msg.y)

  process: (mode) ->
    msg = mode.get_queue()
    switch(msg.name)
      when "initialize"
        this.initial_draw(mode)
      when "unit"
        this.draw_unit(msg)
      when "death"
        this.cleanup(msg)
      when "bullet"
        this.draw_bullet(msg)