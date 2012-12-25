mapDraw = (map,p5) ->
    p5.background(0)
    for height in [0..29]
      for width in [0..30]
        console.log("height: " + height)
        if map[height][width] == 1
          p5.fill(190,190,190) #gray
          p5.rect(width * 20,height * 20, 20, 20)
