class Unit
  constructor: (@x,@y) ->
    @speed = 1
    #0 for ally. 1 for neutral. 2 for enemy.
    @align = 0
    @queue = []
    @target = null
    @health = 100
    @override = 0
  empty_queue: () ->
    if @queue.length == 0
      @queue.push("find")

  pinned_down: () ->
    if @override > 0
      @override -= 1
      true
    false

  act: () ->
    if this.pinned_down() != true
      this.empty_queue()
      switch(@queue.pop())
        when "find"
          this.find()
        when "fire"
          this.fire()

  find: () ->
    @target = @manager.select_target(this)
    if @target != null
      @queue.push("fire")

  fire: () ->
    @queue.push @manager.exchange_fire(@target)

  take_cover: () ->
    @override += 100