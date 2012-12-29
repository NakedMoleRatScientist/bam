class GameOverMode extends Mode
  constructor: (@manager,@data) ->
    super()
    @options = new TextOptions()
    @options.add_text(["Framed elapsed: " + @data.frames])
    @queue.push("draw")
