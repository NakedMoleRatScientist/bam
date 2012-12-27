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
      true
    false

  act: () ->
    this.empty_queue()
    switch(@queue[@queue.length - 1]
      when "find"
        this.find()
      when "pinned"
        this.cover_countdown()
      when "fire"
        this.fire()

  find: () ->
    @target = @manager.select_target(this)
    if @target != null
      @queue.push("fire")

  fire: () ->
    @queue.push @manager.exchange_fire(@target)

  take_cover: () ->
    if @pinned > 0
      @pinned += 1
    else
      @pinned += 10
      @queue.push("pinned")
