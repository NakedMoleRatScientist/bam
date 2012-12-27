class GameMode
  constructor:(@mode) ->
    @map = new Map(20,30)
    @queue = [(name: "initialize")]
    @units = new UnitsManager(this)
  run: () ->
    @units.run()
  get_queue: () ->
    if @queue.length != 0
      return @queue.pop()
    false
  draw_units: () ->
    @queue.push((name: "units"))
  note_death: (target) ->
    @queue.push((name: "death", x: target.x, y: target.y))
  process: (result) ->