class GameMode
  constructor:(@mode) ->
    @map = new Map(20,30)
    @queue = ["update"]
  get_queue: () ->
  process: (result) ->