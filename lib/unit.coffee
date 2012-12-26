class Unit
  constructor: (@x,@y) ->
    @speed = 1
    #0 for ally. 1 for neutral. 2 for enemy.
    @align = 0
    @queue = []
    @target = null
  empty_queue: () ->
    if @queue.length == 0
      @queue.push("find")
  act: () ->
    this.empty_queue()
    switch(@queue.pop())
      when "find"
        this.find()

  find: () ->
