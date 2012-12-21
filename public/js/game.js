(function() {
  var GameDrawMode, GameKeyMode, GameMode, Map, MenuDrawMode, MenuKeyMode, MenuMode, ModeManager, TextOptions, TextOptionsDraw, Unit, boxedText, frameRateDraw, instructionDraw, mapDraw, menu, titleDraw;

  MenuKeyMode = (function() {

    function MenuKeyMode(p5) {
      this.p5 = p5;
    }

    MenuKeyMode.prototype.key_pressed = function() {
      console.log(this.p5.key.code);
      switch (this.p5.key.code) {
        case 115:
          return "down";
        case 119:
          return "up";
        case 10:
          return "select";
        default:
          return false;
      }
    };

    MenuKeyMode.prototype.mouse_pressed = function(state) {};

    return MenuKeyMode;

  })();

  GameDrawMode = (function() {

    function GameDrawMode(p5) {
      this.p5 = p5;
    }

    GameDrawMode.prototype.draw = function(object) {};

    GameDrawMode.prototype.process = function(mode) {};

    return GameDrawMode;

  })();

  MenuMode = (function() {

    function MenuMode(mode) {
      this.mode = mode;
      this.options = new TextOptions();
      this.options.add_text(["New Game", "Test Arena"]);
      this.queue = [];
      this.queue.push("update");
    }

    MenuMode.prototype.get_queue = function() {
      if (this.queue.size !== 0) return this.queue.pop();
      return false;
    };

    MenuMode.prototype.process = function(result) {
      switch (result) {
        case "down":
          this.options.increase();
          return this.queue.push("update");
        case "up":
          this.options.decrease();
          return this.queue.push("update");
        case "select":
          return this.mode.initialize("Game");
      }
    };

    return MenuMode;

  })();

  MenuDrawMode = (function() {

    function MenuDrawMode(p5) {
      this.p5 = p5;
      this.texts = new TextOptionsDraw(this.p5, 300, 250, 18);
      this.size = 0;
    }

    MenuDrawMode.prototype.draw = function(object) {
      this.p5.background(0);
      titleDraw(this.p5);
      this.texts.draw(object.options, object.pointer);
      return instructionDraw(this.p5);
    };

    MenuDrawMode.prototype.process = function(mode) {
      switch (mode.get_queue()) {
        case "update":
          return this.draw(mode.options);
      }
    };

    return MenuDrawMode;

  })();

  GameMode = (function() {

    function GameMode(mode) {
      this.mode = mode;
      this.map = new Map(100, 100);
    }

    GameMode.prototype.get_queue = function() {};

    GameMode.prototype.process = function(result) {};

    return GameMode;

  })();

  GameKeyMode = (function() {

    function GameKeyMode(p5) {
      this.p5 = p5;
    }

    GameKeyMode.prototype.key_pressed = function() {};

    return GameKeyMode;

  })();

  Unit = (function() {

    function Unit() {}

    return Unit;

  })();

  titleDraw = function(p5) {
    p5.textFont("monospace", 30);
    return p5.text("BAM!", 300, 100);
  };

  instructionDraw = function(p5) {
    this.p5 = p5;
    boxedText(this.p5, 500, 100, "w");
    this.p5.text(" - up", 515, 100);
    boxedText(this.p5, 500, 120, "s");
    this.p5.text(" - down", 515, 120);
    boxedText(this.p5, 600, 110, "Enter");
    return this.p5.text(" - select", 650, 110);
  };

  ModeManager = (function() {

    function ModeManager(p5) {
      this.p5 = p5;
      this.initialize("Menu");
    }

    ModeManager.prototype.initialize = function(name) {
      var p5;
      p5 = this.p5;
      this.logic = eval("new " + name + "Mode(this)");
      this.graphic = eval("new " + name + "DrawMode(p5)");
      return this.key = eval("new " + name + "KeyMode(p5)");
    };

    ModeManager.prototype.draw = function() {
      return this.graphic.process(this.logic);
    };

    ModeManager.prototype.pressed = function() {
      var result;
      result = this.key.key_pressed();
      return this.logic.process(result);
    };

    return ModeManager;

  })();

  mapDraw = function(map, p5) {
    var end_x, end_y, height, item, objects, result, results, width, x, y, _ref, _results;
    p5.background(0);
    results = map.map;
    end_y = map.camera.y + 30 - 1;
    end_x = map.camera.x + 40 - 1;
    _results = [];
    for (height = _ref = map.camera.y; _ref <= end_y ? height <= end_y : height >= end_y; _ref <= end_y ? height++ : height--) {
      _results.push((function() {
        var _ref2, _results2;
        _results2 = [];
        for (width = _ref2 = map.camera.x; _ref2 <= end_x ? width <= end_x : width >= end_x; _ref2 <= end_x ? width++ : width--) {
          x = 20 * (width - map.camera.x);
          y = 20 * (height - map.camera.y);
          objects = results[height][width];
          p5.noStroke();
          if (objects.length !== 0) {
            _results2.push((function() {
              var _i, _len, _results3;
              _results3 = [];
              for (_i = 0, _len = objects.length; _i < _len; _i++) {
                item = objects[_i];
                _results3.push(result = determineRectDraw(item, x, y, p5));
              }
              return _results3;
            })());
          } else {
            _results2.push(void 0);
          }
        }
        return _results2;
      })());
    }
    return _results;
  };

  TextOptionsDraw = (function() {

    function TextOptionsDraw(p5, x, y, size) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.size = size;
      this.offset_y = 0;
    }

    TextOptionsDraw.prototype.draw = function(texts, pointer) {
      var data, pointer_y, y, _i, _len;
      this.p5.textFont("Monospace", this.size);
      y = this.y + this.offset_y;
      for (_i = 0, _len = texts.length; _i < _len; _i++) {
        data = texts[_i];
        this.p5.text(data, this.x, y);
        y += this.size;
      }
      pointer_y = this.y + this.offset_y + (pointer * this.size);
      if (texts.length > 0) {
        this.p5.ellipse(this.x - 20, pointer_y - (this.size / 2), 10, 10);
      }
      return this.offset_y = 0;
    };

    return TextOptionsDraw;

  })();

  boxedText = function(p5, x, y, text) {
    var t;
    t = p5.text(text, x, y);
    p5.noFill();
    p5.stroke();
    return p5.rect(x - 3, y - p5.textAscent() - 3, p5.textWidth(text) + 3, p5.textAscent() + 3);
  };

  Map = (function() {

    function Map(width, height) {
      this.width = width;
      this.height = height;
      this.setup();
    }

    Map.prototype.setup = function() {
      this.map = [];
      this.size_map();
      return this.camera = new Camera();
    };

    Map.prototype.size_map = function() {
      var x, y, _ref, _results;
      _results = [];
      for (y = 0, _ref = this.height - 1; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        this.map.push(new Array(this.width));
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (x = 0, _ref2 = this.width - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
            _results2.push(this.map[y][x] = []);
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    return Map;

  })();

  frameRateDraw = function(p5) {
    this.p5 = p5;
    this.p5.fill(0);
    this.p5.noStroke();
    this.p5.rect(200, 0, 50, 20);
    this.p5.fill(255);
    return this.p5.text("FPS: " + Math.floor(this.p5.__frameRate), 200, 15);
  };

  TextOptions = (function() {

    function TextOptions() {
      this.options = [];
      this.pointer = 0;
      this.length = 0;
    }

    TextOptions.prototype.add_text = function(text) {
      var t, _i, _len;
      for (_i = 0, _len = text.length; _i < _len; _i++) {
        t = text[_i];
        this.options.push(t);
      }
      return this.length = this.options.length;
    };

    TextOptions.prototype.increase = function() {
      if (this.pointer < (this.length - 1)) {
        return this.pointer += 1;
      } else {
        return this.pointer = 0;
      }
    };

    TextOptions.prototype.decrease = function() {
      if (this.pointer === 0) {
        return this.pointer = this.length - 1;
      } else {
        return this.pointer -= 1;
      }
    };

    TextOptions.prototype.clean = function() {
      return this.options = [];
    };

    TextOptions.prototype.selected = function() {
      return this.options[this.pointer];
    };

    return TextOptions;

  })();

  menu = function(p5) {
    p5.setup = function() {
      p5.size(800, 600);
      p5.background(0);
      return this.mode = new ModeManager(p5);
    };
    p5.keyPressed = function() {
      return this.mode.pressed();
    };
    return p5.draw = function() {
      frameRateDraw(p5);
      return this.mode.draw();
    };
  };

  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    canvas.focus();
    return processing = new Processing(canvas, menu);
  });

}).call(this);
