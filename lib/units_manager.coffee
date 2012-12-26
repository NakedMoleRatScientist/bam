class UnitsManager
  constructor:() ->
    @units = []
    @units.push(new Grunt(20,20,this))
    @units.push(new Enemy(20,0,this))

  run: () ->
    for u in @units
      u.act()

  select_target: (unit) ->
    if unit.align == 2
      find = 0
    else
      find = 2
    for u in @units
      if u.align == find
        return u
    return null

  exchange_fire: (attacker, target) ->
    strike = rand() * 10
    if strike > 5
      target.health -= rand() * 10
    cover = rand() * 10
    if cover > 5
      target.take_cover()
    if target.health > 0
      return "fire"
    else
      this.remove_target()
      return "find"