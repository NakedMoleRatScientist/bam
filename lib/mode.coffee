class Mode
  constructor: () ->
    @queue = []

  run: () ->

  get_queue: () ->
    if @queue.length != 0
      return @queue.pop()
    false

  process: (result) ->