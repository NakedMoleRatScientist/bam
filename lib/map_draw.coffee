mapDraw = (map,p5) ->
    p5.background(0)
    for height in [0..39]
      for width in [0..29]
        if map[height][width] == 1
          p5.fill(190,190,190) #gray
          p5.rect(x * 20,y * 20, 20, 20)