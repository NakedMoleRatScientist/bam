class GameOverMode extends Mode
  constructor: (@manager,@data) ->
    super()
    @options = new TextOptions()
    @options.add_text(["Framed elapsed: " + @data.frame])
    @queue.push("draw")
