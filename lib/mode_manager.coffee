class ModeManager
  constructor: (@p5) ->
    this.initialize("Menu")
  initialize: (name) ->
    p5 = @p5
    @logic = eval("new " + name + "Mode(this)")
    @graphic = eval("new " + name + "DrawMode(p5)")
    @key = eval("new " + name + "KeyMode(p5)")

  initialize_with_data: (name,data) ->
    @logic = eval("new " + name + "Mode(this,data)")
    graphic_start(name)
    @key = eval("new " + name + "KeyMode(p5)")

  graphic_start: (name) ->
    @graphic = eval("new " + name + "DrawMode(this.p5)")


  draw: () ->
    @graphic.process(@logic)
  pressed: () ->
    result = @key.key_pressed()
    @logic.process(result)
  run: () ->
    @logic.run()