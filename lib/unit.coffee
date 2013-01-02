class Unit
  constructor: (@x,@y) ->
    @speed = 1
    #0 for ally. 1 for neutral. 2 for enemy.
    @align = 0
    @queue = []
    @target = null
    @health = 100
    @pinned = 0
    @charge = 0
    @target_action = TargetSelectSimple

  empty_queue: () ->
    if @queue.length == 0
      @queue.push("find")

  cover_countdown: () ->
    if @pinned > 0
      @pinned -= 1
    else
      @manager.game.update_unit(this)
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
    if @target.health < 0
      @charge = 0
      @queue.pop()
      @queue.push("find")
      return
    if @charge == 0
      @charge = 20
    else
      @charge -= 1
      if @charge == 0
        @queue.push("fire")

  find: () ->
    @target = @target_action.call(undefined, this, @manager.units)
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
      @pinned += 30
      @manager.game.update_unit(this)
      @queue.push("pinned")
