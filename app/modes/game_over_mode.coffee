class GameOverMode extends Mode
  constructor: (@manager,@data) ->
    super()
    @options = new TextOptions()
    @options.add_text(["Framed elapsed: " + @data.frames])
    @options.add_text(["Hits: " + @data.hits])
    @options.add_text(["Missed: " + @data.missed])
    @queue.push("draw")
