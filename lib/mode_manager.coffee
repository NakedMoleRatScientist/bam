class ModeManager
  constructor: (@p5) ->
    this.initialize("Menu")
  initialize: (name) ->
    @logic = eval("new " + name + "Mode(this)")
    this.graphic_start(name)
    this.key_start(name)

  initialize_with_data: (name,data) ->
    @logic = eval("new " + name + "Mode(this,data)")
    this.graphic_start(name)
    this.key_start(name)

  graphic_start: (name) ->
    @graphic = eval("new " + name + "DrawMode(this.p5)")

  key_start: (name) ->
    @key = eval("new " + name + "KeyMode(this.p5)")

  draw: () ->
    @graphic.process(@logic)
  pressed: () ->
    result = @key.key_pressed()
    @logic.process(result)
  run: () ->
    @logic.run()