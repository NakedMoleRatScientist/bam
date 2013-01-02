class Commander extends Unit
  constructor: (x,y,@manager) ->
    @name = "C"
    super(x,y)
    @target_action = TargetRandomSelect