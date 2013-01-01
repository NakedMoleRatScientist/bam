class DefenseScenario
  constructor: (@manager) ->
    @manager.add_unit("Grunt",20,29)
    @manager.add_unit("Grunt",10,29)
    @manager.add_unit("Comg mander",5,29)
    @manager.add_unit("Grunt",30,29)
    @waves = 0

  generate_enemy: () ->
    spawn = truncateDecimals(Math.random() * 30)
    @manager.add_unit("Enemy",spawn,0)

  advance_wave: () ->
    @waves += 1
    enemies = truncateDecimals(Math.random() * 3) + 1
    for i in [1..enemies]
      this.generate_enemy()

  run: (frame) ->
    if frame % 1000 == 0
      console.log("wave: " + @waves)
      this.advance_wave()