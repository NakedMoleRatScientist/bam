class ModeManager
  constructor: (@p5) ->
    this.initialize("Menu")
  initialize: (name) ->
    p5 = @p5
    @logic = eval("new " + name + "Mode()")
    @graphic = eval("new " + name + "DrawMode(p5)")
    @key = eval("new " + name + "KeyMode(p5)")
  draw: () ->
    @graphic.process(@menu)
  pressed: () ->
    result = @key.key_pressed()
    @menu.process(result)
