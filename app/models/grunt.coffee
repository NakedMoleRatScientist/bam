class Grunt extends Unit
  constructor: (x,y,@manager) ->
    @name = "G"
    super(x,y)
    @target_action = TargetRandomSelect