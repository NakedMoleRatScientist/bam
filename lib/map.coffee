class Map
  constructor: (@width, @height) ->
    this.setup()
  setup: () ->
    @map = []
    this.size_map()
    @camera = new Camera()
  size_map: () ->
    for y in [0..@height - 1]
      @map.push(new Array(@width))
      for x in [0..@width - 1]
        @map[y][x] = []