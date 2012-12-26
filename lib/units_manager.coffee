class UnitsManager
  constructor:() ->
    @units = []
    @units.push(new Grunt(20,20,this))
    @units.push(new Enemy(20,0,this))
  select_target: (unit) ->
    if unit.align == 2
      find = 0
    else
      find = 2
    for u in units
      if u.align == find
        return u
    return null
