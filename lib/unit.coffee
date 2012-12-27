class Unit
  constructor: (@x,@y) ->
    @speed = 1
    #0 for ally. 1 for neutral. 2 for enemy.
    @align = 0
    @queue = []
    @target = null
    @health = 100
    @pinned = 0
  empty_queue: () ->
    if @queue.length == 0
      @queue.push("find")

  cover_countdown: () ->
    if @pinned > 0
      @pinned -= 1
    else
      @queue.pop()

  act: () ->
    this.empty_queue()
    switch(@queue[@queue.length - 1])
      when "find"
        this.find()
      when "aim"
        this.aim()
      when "pinned"
        this.cover_countdown()
      when "fire"
        this.fire()

  aim: () ->
    if @aim == 0
      @aim = 5
    else
      @aim -= 1
      if @aim == 0
        @queue.push("fire")

  find: () ->
    @target = @manager.select_target(this)
    if @target != null
      @queue.pop()
      @queue.push("aim")

  fire: () ->
    @queue.pop()
    @queue.push @manager.exchange_fire(@target)

  take_cover: () ->
    if @pinned > 0
      @pinned += 1
    else
      @pinned += 10
      @queue.push("pinned")
