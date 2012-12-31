class DefenseScenario
  constructor: (@manager) ->
    @manager.add_unit("Grunt",20,29)
    @manager.add_unit("Grunt",10,29)
    @manager.add_unit("Commander",5,29)
    @waves = 0
    this.generate_enemy()
  generate_enemy: () ->
    spawn = truncateDecimals(Math.random() * 30)
    console.log(spawn)
    @manager.add_unit("Enemy",spawn,0)