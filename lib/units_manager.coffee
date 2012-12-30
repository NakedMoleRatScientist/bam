class UnitsManager
  constructor:(@game) ->
    @units = []
    @units.push(new Grunt(20,20,this))
    @units.push(new Enemy(20,0,this))
  #Stats
    @frame = 0
    @hits = 0

  run: () ->
    for u in @units
      u.act()
    @frame += 1
    this.game_over()

  game_over: () ->
    if @units.length == 1
      @game.initialize_over()

  select_target: (unit) ->
    if unit.align == 2
      find = 0
    else
      find = 2
    for u in @units
      if u.align == find
        return u
    return null

  remove_target: (target) ->
    @units = @units.filter (x) -> x != target
    console.log("Survivor: " + @units[0].name)
  #Individuals taking cover are much harder to shoot at than those who have no cover
  calculate_shot: (target) ->
    if target.pinned > 0
      return 8
    5

  exchange_fire: (target) ->
    strike = Math.random() * 10
    chance = this.calculate_shot(target)
    if strike > chance
      target.health -= Math.random() * 10
      @hit += 1
      console.log("target " + target.name + " is shot!")
    else
      @game.bullet_add(target)
    cover = Math.random() * 10
    if cover > 5
      console.log(target.name + " tooks cover!")
      target.take_cover()
    if target.health > 0
      return "aim"
    else
      @game.dirty_redraw(target)
      console.log(target.name + " is killed!")
      this.remove_target(target)
      return "find"