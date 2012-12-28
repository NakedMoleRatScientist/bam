mapDraw = (map,p5) ->
    p5.background(0)
    for height in [0..29]
      for width in [0..39]
        objects = map[height][width]
        unless objects.length == 0
          for o in objects
            if o.name == "floor"
              floorDraw(p5,(x: width, y: height))