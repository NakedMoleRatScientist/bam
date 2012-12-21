class MenuMode
  constructor:() ->
    @options = new TextOptions()
    @options.add_text(["New Game", "Test Arena"])
    @queue = []
    @queue.push "update"
  get_queue: () ->
    if @queue.size != 0
      return @queue.pop()
    return false
  process: (result) ->
    if result == "down"
      @options.increase()
      @queue.push "down"