class TextListDraw
  constructor: (@p5,@x,@y,@size) ->
    @offset_y = 0
  draw: (texts) ->
    @p5.textFont("Monospace",@size)
    y = @y
    for data in texts
      @p5.text(data,@x,y)
      y += @size
