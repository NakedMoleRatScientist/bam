class DefenseScenario
  constructor: (@manager) ->
    @manager.add_unit("Grunt",20,29)
    @manager.add_unit("Grunt",10,29)
    @manager.add_unit("Commander",5,29)