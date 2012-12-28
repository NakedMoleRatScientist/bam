class GameMode
  constructor:(@mode) ->
    @map = new Map(40,30)
    @queue = [(name: "initialize")]
    @units = new UnitsManager(this)
  run: () ->
    @units.run()
  get_queue: () ->
    if @queue.length != 0
      return @queue.pop()
    false
  note_death: (target) ->
    @queue.push((name: "death", x: target.x, y: target.y, map: @map.map))
  bullet_add: (target) ->
    @queue.push((name: "bullet", x: target.x, y: target.y))
  process: (result) ->