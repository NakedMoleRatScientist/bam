class GameOverMode extends Mode
  constructor: (@manager) ->
    super()
    @queue = []

  run: () ->

  get_queue: () ->
    if @queue.size != 0
      return @queue.pop()
    false

  process: (result) ->
