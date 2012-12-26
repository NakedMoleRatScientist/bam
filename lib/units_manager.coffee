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

  remove_target: (target) ->
    @units = @units.filter(x) -> x == target

  exchange_fire: (attacker, target) ->
    strike = Math.random() * 10
    if strike > 5
      console.log("BAM")
      target.health -= Math.random() * 10
    cover = Math.random() * 10
    if cover > 5
      target.take_cover()
    if target.health > 0
      return "fire"
    else
      this.remove_target(target)
      return "find"