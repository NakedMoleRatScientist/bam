class GameMode
  constructor:(@manager,scenario) ->
    @map = new Map(40,30)
    @queue = [(name: "initialize")]
    @units = new UnitsManager(this,scenario)
    @scenario = eval("new " + scenario + "Scenario(this.units,this)")
    @frame = 0
  run: () ->
    @units.run()
    @scenario.run(@frame)
    @frame += 1

  initialize_over: () ->
    data = (frames: @units.frame, hits: @units.hits, missed: @units.missed)
    @manager.initialize_with_data("GameOver", data)

  get_queue: () ->
    if @queue.length != 0
      return @queue.pop()
    false

  update_unit: (unit) ->
    @queue.push((name: "unit", unit: unit, map: @map.map , x: unit.x, y: unit.y))

  dirty_redraw: (target) ->
    @queue.push((name: "dirty", x: target.x, y: target.y, map: @map.map))

  bullet_add: (target) ->
    location = @map.add_bullet(target)
    @queue.push((name: "bullet", x: location.x, y: location.y))

  process: (result) ->