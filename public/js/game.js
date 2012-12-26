(function() {
  var Camera, Enemy, GameDrawMode, GameKeyMode, GameMode, Grunt, Map, MenuDrawMode, MenuKeyMode, MenuMode, ModeManager, TextOptions, TextOptionsDraw, Unit, UnitsManager, boxedText, frameRateDraw, instructionDraw, mapDraw, menu, titleDraw, unitDraw,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  unitDraw = function(unit, p5) {
    p5.fill(255);
    return p5.text(unit.name, (unit.x + 1) * 20, (unit.y + 1) * 20);
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

    ModeManager.prototype.run = function() {
      return this.logic.run();
    };

    return ModeManager;

  })();

  Unit = (function() {

    function Unit(x, y) {
      this.x = x;
      this.y = y;
      this.speed = 1;
      this.align = 0;
      this.queue = [];
      this.target = null;
      this.health = 100;
      this.override = 0;
    }

    Unit.prototype.empty_queue = function() {
      if (this.queue.length === 0) return this.queue.push("find");
    };

    Unit.prototype.pinned_down = function() {
      if (this.override > 0) return this.override -= 1;
    };

    Unit.prototype.act = function() {
      this.pinned_down();
      this.empty_queue();
      switch (this.queue.pop()) {
        case "find":
          return this.find();
      }
    };

    Unit.prototype.find = function() {
      this.target = this.manager.select_target(this);
      return this.queue.push("fire");
    };

    Unit.prototype.fire = function() {
      return this.manager.exchange_fire(this.target);
    };

    Unit.prototype.take_cover = function() {
      return this.override += 100;
    };

    return Unit;

  })();

  mapDraw = function(map, p5) {
    var height, width, _results;
    p5.background(0);
    _results = [];
    for (height = 0; height <= 29; height++) {
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (width = 0; width <= 30; width++) {
          if (map[height][width] === 1) {
            p5.fill(190, 190, 190);
            _results2.push(p5.rect(width * 20, height * 20, 20, 20));
          } else {
            _results2.push(void 0);
          }
        }
        return _results2;
      })());
    }
    return _results;
  };

  UnitsManager = (function() {

    function UnitsManager() {
      this.units = [];
      this.units.push(new Grunt(20, 20, this));
      this.units.push(new Enemy(20, 0, this));
    }

    UnitsManager.prototype.run = function() {
      var u, _i, _len, _ref, _results;
      _ref = this.units;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        _results.push(u.act());
      }
      return _results;
    };

    UnitsManager.prototype.select_target = function(unit) {
      var find, u, _i, _len, _ref;
      if (unit.align === 2) {
        find = 0;
      } else {
        find = 2;
      }
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.align === find) return u;
      }
      return null;
    };

    UnitsManager.prototype.exchange_fire = function(attacker, target) {
      var cover, strike;
      strike = rand() * 10;
      if (strike > 5) target.health -= rand() * 10;
      cover = rand() * 10;
      if (cover > 5) target.take_cover();
      if (target.health > 0) {
        return "fire";
      } else {
        this.remove_target();
        return "find";
      }
    };

    return UnitsManager;

  })();

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
      var x, y, _ref, _ref2;
      for (y = 0, _ref = this.height - 1; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        this.map.push(new Array(this.width));
        for (x = 0, _ref2 = this.width - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
          this.map[y][x] = 0;
        }
      }
      return this.map[0][0] = 1;
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

  Camera = (function() {

    function Camera() {
      this.x = 0;
      this.y = 0;
    }

    Camera.prototype.move = function(x, y) {
      this.x += x;
      if (this.x < 0 || this.x > 60) this.x -= x;
      this.y += y;
      if (this.y < 0 || this.y > 70) return this.y -= y;
    };

    return Camera;

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
      this.mode.run();
      return this.mode.draw();
    };
  };

  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    canvas.focus();
    return processing = new Processing(canvas, menu);
  });

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

    GameDrawMode.prototype.draw = function(mode) {
      var u, _i, _len, _ref, _results;
      this.p5.background(0);
      mapDraw(mode.map.map, this.p5);
      _ref = mode.units.units;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        _results.push(unitDraw(u, this.p5));
      }
      return _results;
    };

    GameDrawMode.prototype.process = function(mode) {
      switch (mode.get_queue()) {
        case "update":
          return this.draw(mode);
      }
    };

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

    MenuMode.prototype.run = function() {};

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
      this.map = new Map(20, 30);
      this.queue = ["update"];
      this.units = new UnitsManager();
    }

    GameMode.prototype.run = function() {
      return this.units.run();
    };

    GameMode.prototype.get_queue = function() {
      if (this.queue.size !== 0) return this.queue.pop();
      return false;
    };

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

  Enemy = (function(_super) {

    __extends(Enemy, _super);

    function Enemy(x, y, manager) {
      this.manager = manager;
      this.name = "E";
      Enemy.__super__.constructor.call(this, x, y);
      this.align = 2;
    }

    return Enemy;

  })(Unit);

  Grunt = (function(_super) {

    __extends(Grunt, _super);

    function Grunt(x, y, manager) {
      this.manager = manager;
      this.name = "G";
      Grunt.__super__.constructor.call(this, x, y);
    }

    return Grunt;

  })(Unit);

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

}).call(this);
