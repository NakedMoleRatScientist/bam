class Bullet
  constructor: (x,y) ->
    x *= 20
    y *= 20
    rand_x = Math.random() * 10 + 1
    rand_y = Math.random() * 10 + 1
    @x = randomOpsAddsub(x, rand_x)
    @y = randomOpsAddsub(y, rand_y)
