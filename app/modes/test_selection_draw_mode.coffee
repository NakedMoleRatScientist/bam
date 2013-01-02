class TestSelectionDrawMode
  constructor: (@p5) ->
  process: (mode) ->
    msg = mode.get_queue()