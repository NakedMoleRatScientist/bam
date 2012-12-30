class Commander extends Unit
  constructor: (x,y,@manager) ->
    @name = "C"
    super(x,y)