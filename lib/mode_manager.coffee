class ModeManager
  constructor: (@p5) ->
    this.initialize("Menu")
  initialize: (name) ->
    @logic = eval "new " + name + "Mode()"
    @graphic = eval "new " + name + "DrawMode(@p5)"
    @key = eval "new " + name + "KeyMode(@p5)"
  draw: () ->
    @draw.process(@menu)
