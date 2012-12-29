class Mode
  constructor: () ->
    @queue = []

  run: () ->

  get_queue: () ->
    if @queue.size != 0
      return @queue.pop()
    false

  process: (result) ->