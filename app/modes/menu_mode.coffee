class MenuMode
  constructor:(@manager) ->
    @options = new TextOptions()
    @options.add_text(["New Game", "Test Arena"])
    @queue = []
    @queue.push "update"
  run: () ->
  get_queue: () ->
    if @queue.size != 0
      return @queue.pop()
    return false
  process: (result) ->
    switch(result)
      when "down"
        @options.increase()
        @queue.push "update"
      when "up"
        @options.decrease()
        @queue.push "update"
      when "select"
        @manager.initialize_with_data("Game","defense")