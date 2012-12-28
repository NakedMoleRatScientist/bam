class Bullet
  constructor: (x,y) ->
    x *= 20
    y *= 20
    rand_x = Math.random() * 10 + 1
    rand_y = Math.random() * 10 + 1
    @x = randomOpsAddsub(x, rand_x)
    @y = randomOpsAddsub(y, rand_y)
  get_location: () ->
    (x: truncateDecimals(@x / 20), y: truncateDecimals(@y / 20))