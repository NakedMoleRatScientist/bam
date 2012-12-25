class UnitsManager
  constructor:() ->
    @units = []
    @units.push(new Grunt(20,20))
    @units.push(new Enemy(20,0))