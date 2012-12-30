class GameOverMode extends Mode
  constructor: (@manager,@data) ->
    super()
    @texts = new TextList()
    @texts.add_text("Framed elapsed: " + @data.frames)
    @texts.add_text("Hits: " + @data.hits)
    @texts.add_text("Missed: " + @data.missed)
    @texts.add_text("Total fired: " + (@data.hits + @data.missed))
    @queue.push((name: "draw", texts: @texts.texts))
