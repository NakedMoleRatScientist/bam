class Unit
  constructor: (@x,@y) ->
    @speed = 1
    #0 for ally. 1 for neutral. 2 for enemy.
    @align = 0
  act: () ->