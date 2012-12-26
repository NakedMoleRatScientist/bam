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
    @override -= 1
  act: () ->
    this.pinned_down()
    this.empty_queue()
    switch(@queue.pop())
      when "find"
        this.find()

  find: () ->
    @target = @manager.select_target(this)
    @queue.push("fire")

  fire: () ->
    @manager.exchange_fire(@target)

  take_cover: () ->
    @override += 100