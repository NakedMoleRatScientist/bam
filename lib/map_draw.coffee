mapDraw = (map,p5) ->
    p5.background(0)
    for height in [0..29]
      for width in [0..30]
        objects = map[height][width]
        unless objects.length == 0
          for o in objects
            if o.name == "floor"
              p5.fill(190,190,190) #gray
              p5.rect(width * 20,height * 20, 20, 20)
