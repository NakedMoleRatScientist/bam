class GameMode
  constructor:(@mode) ->
    @map = new Map(20,30)
    @queue = ["update"]
    @units = new UnitsManager()
  get_queue: () ->
    if @queue.size != 0
      return @queue.pop()
    false
  process: (result) ->