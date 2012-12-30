class DefenseScenario
  constructor: (@manager) ->
    @manager.add_unit("Grunt",20,29)
    @manager.add_unit("Grunt",10,29)
    @manager.add_unit("Commander",5,29)
    @waves = 0
    this.generate_enemy()
  generate_enemy: () ->
    spawn = Math.random() * 30
    @manager.add_unit("Enemy",spawn,0)