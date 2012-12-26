class Enemy extends Unit
  constructor: (x,y,@manager) ->
    @name = "E"
    super(x,y)
    @align = 2
