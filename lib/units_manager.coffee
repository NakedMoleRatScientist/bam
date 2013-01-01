class UnitsManager
  constructor:(@game,scenario) ->
    @units = []
    @friendly = 0
  #Stats
    @hits = 0
    @missed = 0

  run: () ->
    for u in @units
      u.act()

  remove_target: (target) ->
    @units = @units.filter (x) -> x != target
    console.log("Survivor: " + @units[0].name)

  add_unit: (name,x,y) ->
    unit = eval("new " + name + "(x,y,this)" )
    @units.push(unit)
    if unit.align == 0
      @friendly += 1
    @game.update_unit(unit)

#Unit actions

  select_target: (unit) ->
     TargetSelectSimple(unit,@units)


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
      @hits += 1
      console.log("target " + target.name + " is shot!")
    else
      @missed += 1
      @game.bullet_add(target)
    cover = Math.random() * 10
    if cover > 5
      console.log(target.name + " tooks cover!")
      target.take_cover()
    if target.health > 0
      return "aim"
    else
      if target.align == 0
        @friendly -= 1
      @game.dirty_redraw(target)
      console.log(target.name + " is killed!")
      this.remove_target(target)
      return "find"