(function() {
  var Bullet, Camera, Commander, DefenseScenario, Enemy, Floor, GameDrawMode, GameKeyMode, GameMode, GameOverDrawMode, GameOverKeyMode, GameOverMode, Grunt, Map, MenuDrawMode, MenuKeyMode, MenuMode, Mode, ModeManager, TargetRandomSelect, TargetSelectSimple, TestSelectionDrawMode, TestSelectionMode, TextList, TextListDraw, TextOptions, TextOptionsDraw, Unit, UnitsManager, boxedText, bulletDraw, dirtyDraw, floorDraw, frameRateDraw, instructionDraw, mapDraw, menu, randomOpsAddsub, titleDraw, truncateDecimals, unitDraw,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  unitDraw = function(unit, p5) {
    p5.noStroke();
    if (unit.pinned > 0) {
      p5.fill(211, 211, 211);
    } else {
      p5.fill(255);
    }
    return p5.text(unit.name, unit.x * 20 + 7, unit.y * 20 + 15);
  };

  Mode = (function() {

    function Mode() {
      this.queue = [];
    }

    Mode.prototype.run = function() {};

    Mode.prototype.get_queue = function() {
      if (this.queue.length !== 0) return this.queue.pop();
      return false;
    };

    Mode.prototype.process = function(result) {};

    return Mode;

  })();

  ModeManager = (function() {

    function ModeManager(p5) {
      this.p5 = p5;
      this.initialize("Menu");
    }

    ModeManager.prototype.initialize = function(name) {
      this.logic = eval("new " + name + "Mode(this)");
      this.graphic_start(name);
      return this.key_start(name);
    };

    ModeManager.prototype.initialize_with_data = function(name, data) {
      this.logic = eval("new " + name + "Mode(this,data)");
      this.graphic_start(name);
      return this.key_start(name);
    };

    ModeManager.prototype.graphic_start = function(name) {
      return this.graphic = eval("new " + name + "DrawMode(this.p5)");
    };

    ModeManager.prototype.key_start = function(name) {
      return this.key = eval("new " + name + "KeyMode(this.p5)");
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

  dirtyDraw = function(p5, msg) {
    var m, objects, _i, _len, _results;
    p5.fill(0);
    p5.rect(msg.x * 20, msg.y * 20, 20, 20);
    objects = msg.map[msg.y][msg.x];
    _results = [];
    for (_i = 0, _len = objects.length; _i < _len; _i++) {
      m = objects[_i];
      if (m.name === "floor") {
        _results.push(floorDraw(p5, locate));
      } else if (m.name === "Bullet") {
        _results.push(bulletDraw(p5, m.x, m.y));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Unit = (function() {

    function Unit(x, y) {
      this.x = x;
      this.y = y;
      this.speed = 1;
      this.align = 0;
      this.queue = [];
      this.target = null;
      this.health = 100;
      this.pinned = 0;
      this.charge = 0;
      this.target_action = TargetSelectSimple;
    }

    Unit.prototype.empty_queue = function() {
      if (this.queue.length === 0) return this.queue.push("find");
    };

    Unit.prototype.cover_countdown = function() {
      if (this.pinned > 0) {
        return this.pinned -= 1;
      } else {
        this.manager.game.update_unit(this);
        return this.queue.pop();
      }
    };

    Unit.prototype.act = function() {
      this.empty_queue();
      switch (this.queue[this.queue.length - 1]) {
        case "find":
          return this.find();
        case "aim":
          return this.aim();
        case "pinned":
          return this.cover_countdown();
        case "fire":
          return this.fire();
      }
    };

    Unit.prototype.aim = function() {
      if (this.target.health < 0) {
        this.charge = 0;
        this.queue.pop();
        this.queue.push("find");
        return;
      }
      if (this.charge === 0) {
        return this.charge = 20;
      } else {
        this.charge -= 1;
        if (this.charge === 0) return this.queue.push("fire");
      }
    };

    Unit.prototype.find = function() {
      this.target = this.target_action.call(void 0, this, this.manager.units);
      if (this.target !== null) {
        this.queue.pop();
        return this.queue.push("aim");
      }
    };

    Unit.prototype.fire = function() {
      this.queue.pop();
      return this.queue.push(this.manager.exchange_fire(this.target));
    };

    Unit.prototype.take_cover = function() {
      if (this.pinned > 0) {
        return this.pinned += 1;
      } else {
        this.pinned += 30;
        this.manager.game.update_unit(this);
        return this.queue.push("pinned");
      }
    };

    return Unit;

  })();

  mapDraw = function(map, p5) {
    var height, o, objects, width, _results;
    p5.background(0);
    _results = [];
    for (height = 0; height <= 29; height++) {
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (width = 0; width <= 39; width++) {
          objects = map[height][width];
          if (objects.length !== 0) {
            _results2.push((function() {
              var _i, _len, _results3;
              _results3 = [];
              for (_i = 0, _len = objects.length; _i < _len; _i++) {
                o = objects[_i];
                if (o.name === "floor") {
                  _results3.push(floorDraw(p5, {
                    x: width,
                    y: height
                  }));
                } else {
                  _results3.push(void 0);
                }
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

  UnitsManager = (function() {

    function UnitsManager(game, scenario) {
      this.game = game;
      this.units = [];
      this.friendly = 0;
      this.hits = 0;
      this.missed = 0;
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

    UnitsManager.prototype.remove_target = function(target) {
      this.units = this.units.filter(function(x) {
        return x !== target;
      });
      return console.log("Survivor: " + this.units[0].name);
    };

    UnitsManager.prototype.add_unit = function(name, x, y) {
      var unit;
      unit = eval("new " + name + "(x,y,this)");
      this.units.push(unit);
      if (unit.align === 0) this.friendly += 1;
      return this.game.update_unit(unit);
    };

    UnitsManager.prototype.calculate_shot = function(target) {
      if (target.pinned > 0) return 8;
      return 5;
    };

    UnitsManager.prototype.exchange_fire = function(target) {
      var chance, cover, strike;
      if (target.health < 0) return "find";
      strike = Math.random() * 10;
      chance = this.calculate_shot(target);
      if (strike > chance) {
        target.health -= Math.random() * 10;
        this.hits += 1;
        console.log("target " + target.name + " is shot!");
      } else {
        this.missed += 1;
        this.game.bullet_add(target);
      }
      cover = Math.random() * 10;
      if (cover > 5) {
        console.log(target.name + " tooks cover!");
        target.take_cover();
      }
      if (target.health > 0) {
        return "aim";
      } else {
        if (target.align === 0) this.friendly -= 1;
        this.game.dirty_redraw(target);
        console.log(target.name + " is killed!");
        this.remove_target(target);
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

  truncateDecimals = function(n) {
    return Math[n < 0 ? 'ceil' : 'floor'](n);
  };

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

    Map.prototype.add_bullet = function(target) {
      var bullet, object;
      bullet = new Bullet(target.x, target.y);
      object = bullet.get_location();
      this.map[object.y][object.x].push(bullet);
      return bullet;
    };

    return Map;

  })();

  randomOpsAddsub = function(initial, change) {
    if (Math.random() * 10 > 5) {
      initial -= change;
    } else {
      initial += change;
    }
    return initial;
  };

  frameRateDraw = function(p5) {
    this.p5 = p5;
    this.p5.fill(0);
    this.p5.noStroke();
    this.p5.rect(200, 0, 50, 20);
    this.p5.fill(255);
    return this.p5.text("FPS: " + Math.floor(this.p5.__frameRate), 200, 15);
  };

  TextListDraw = (function() {

    function TextListDraw(p5, x, y, size) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.size = size;
      this.offset_y = 0;
    }

    TextListDraw.prototype.draw = function(texts) {
      var data, y, _i, _len, _results;
      this.p5.textFont("Monospace", this.size);
      y = this.y;
      _results = [];
      for (_i = 0, _len = texts.length; _i < _len; _i++) {
        data = texts[_i];
        this.p5.text(data, this.x, y);
        _results.push(y += this.size);
      }
      return _results;
    };

    return TextListDraw;

  })();

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

  TextList = (function() {

    function TextList() {
      this.texts = [];
    }

    TextList.prototype.add_text = function(text) {
      return this.texts.push(text);
    };

    return TextList;

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

  GameOverMode = (function(_super) {

    __extends(GameOverMode, _super);

    function GameOverMode(manager, data) {
      this.manager = manager;
      this.data = data;
      GameOverMode.__super__.constructor.call(this);
      this.texts = new TextList();
      this.texts.add_text("Framed elapsed: " + this.data.frames);
      this.texts.add_text("Hits: " + this.data.hits);
      this.texts.add_text("Missed: " + this.data.missed);
      this.texts.add_text("Total fired: " + (this.data.hits + this.data.missed));
      this.queue.push({
        name: "draw",
        texts: this.texts.texts
      });
    }

    return GameOverMode;

  })(Mode);

  TestSelectionMode = (function(_super) {

    __extends(TestSelectionMode, _super);

    function TestSelectionMode(manager) {
      this.manager = manager;
      TestSelectionMode.__super__.constructor.call(this);
    }

    return TestSelectionMode;

  })(Mode);

  GameDrawMode = (function() {

    function GameDrawMode(p5) {
      this.p5 = p5;
    }

    GameDrawMode.prototype.initial_draw = function(mode) {
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

    GameDrawMode.prototype.cleanup = function(msg) {
      return dirtyDraw(this.p5, msg);
    };

    GameDrawMode.prototype.draw_unit = function(msg) {
      dirtyDraw(this.p5, msg);
      if (msg.unit.health > 0) return unitDraw(msg.unit, this.p5);
    };

    GameDrawMode.prototype.draw_bullet = function(msg) {
      return bulletDraw(this.p5, msg.x, msg.y);
    };

    GameDrawMode.prototype.process = function(mode) {
      var msg;
      msg = mode.get_queue();
      switch (msg.name) {
        case "initialize":
          return this.initial_draw(mode);
        case "unit":
          return this.draw_unit(msg);
        case "dirty":
          return this.cleanup(msg);
        case "bullet":
          return this.draw_bullet(msg);
      }
    };

    return GameDrawMode;

  })();

  MenuMode = (function() {

    function MenuMode(manager) {
      this.manager = manager;
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
          return this.manager.initialize_with_data("Game", "Defense");
      }
    };

    return MenuMode;

  })();

  MenuDrawMode = (function() {

    function MenuDrawMode(p5) {
      this.p5 = p5;
      this.texts = new TextOptionsDraw(this.p5, 300, 250, 18);
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

  GameOverDrawMode = (function() {

    function GameOverDrawMode(p5) {
      this.p5 = p5;
      this.texts = new TextListDraw(this.p5, 100, 100, 18);
    }

    GameOverDrawMode.prototype.draw = function(texts) {
      this.p5.background(0);
      return this.texts.draw(texts);
    };

    GameOverDrawMode.prototype.process = function(mode) {
      var msg;
      msg = mode.get_queue();
      switch (msg.name) {
        case "draw":
          return this.draw(msg.texts);
      }
    };

    return GameOverDrawMode;

  })();

  GameOverKeyMode = (function() {

    function GameOverKeyMode(p5) {
      this.p5 = p5;
    }

    GameOverKeyMode.prototype.key_pressed = function() {};

    return GameOverKeyMode;

  })();

  GameMode = (function() {

    function GameMode(manager, scenario) {
      this.manager = manager;
      this.map = new Map(40, 30);
      this.queue = [
        {
          name: "initialize"
        }
      ];
      this.units = new UnitsManager(this, scenario);
      this.scenario = eval("new " + scenario + "Scenario(this.units,this)");
      this.frame = 0;
    }

    GameMode.prototype.run = function() {
      this.units.run();
      this.scenario.run(this.frame);
      return this.frame += 1;
    };

    GameMode.prototype.initialize_over = function() {
      var data;
      data = {
        frames: this.frame,
        hits: this.units.hits,
        missed: this.units.missed
      };
      return this.manager.initialize_with_data("GameOver", data);
    };

    GameMode.prototype.get_queue = function() {
      if (this.queue.length !== 0) return this.queue.pop();
      return false;
    };

    GameMode.prototype.update_unit = function(unit) {
      return this.queue.push({
        name: "unit",
        unit: unit,
        map: this.map.map,
        x: unit.x,
        y: unit.y
      });
    };

    GameMode.prototype.dirty_redraw = function(target) {
      return this.queue.push({
        name: "dirty",
        x: target.x,
        y: target.y,
        map: this.map.map
      });
    };

    GameMode.prototype.bullet_add = function(target) {
      var location;
      location = this.map.add_bullet(target);
      return this.queue.push({
        name: "bullet",
        x: location.x,
        y: location.y
      });
    };

    GameMode.prototype.process = function(result) {};

    return GameMode;

  })();

  TestSelectionDrawMode = (function() {

    function TestSelectionDrawMode(p5) {
      this.p5 = p5;
    }

    TestSelectionDrawMode.prototype.process = function(mode) {
      var msg;
      return msg = mode.get_queue();
    };

    return TestSelectionDrawMode;

  })();

  GameKeyMode = (function() {

    function GameKeyMode(p5) {
      this.p5 = p5;
    }

    GameKeyMode.prototype.key_pressed = function() {};

    return GameKeyMode;

  })();

  TargetRandomSelect = function(unit, list) {
    var find;
    if (unit.align === 2) {
      find = 0;
    } else {
      find = 2;
    }
    list = list.filter(function(x) {
      return x.align === find;
    });
    if (list.length === 0) {
      return null;
    } else {
      return list[Math.floor(Math.random() * list.length)];
    }
  };

  TargetSelectSimple = function(unit, list) {
    var find, u, _i, _len;
    if (unit.align === 2) {
      find = 0;
    } else {
      find = 2;
    }
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      u = list[_i];
      if (u.align === find) return u;
    }
    return null;
  };

  Floor = (function() {

    function Floor() {
      this.name = "floor";
    }

    return Floor;

  })();

  Commander = (function(_super) {

    __extends(Commander, _super);

    function Commander(x, y, manager) {
      this.manager = manager;
      this.name = "C";
      Commander.__super__.constructor.call(this, x, y);
      this.target_action = TargetRandomSelect;
    }

    return Commander;

  })(Unit);

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

  Bullet = (function() {

    function Bullet(x, y) {
      var rand_x, rand_y;
      x *= 20;
      y *= 20;
      rand_x = Math.random() * 10 + 1;
      rand_y = Math.random() * 10 + 1;
      this.x = randomOpsAddsub(x, rand_x);
      this.y = randomOpsAddsub(y, rand_y);
      this.name = "Bullet";
    }

    Bullet.prototype.get_location = function() {
      return {
        x: truncateDecimals(this.x / 20),
        y: truncateDecimals(this.y / 20)
      };
    };

    return Bullet;

  })();

  Grunt = (function(_super) {

    __extends(Grunt, _super);

    function Grunt(x, y, manager) {
      this.manager = manager;
      this.name = "G";
      Grunt.__super__.constructor.call(this, x, y);
      this.target_action = TargetRandomSelect;
    }

    return Grunt;

  })(Unit);

  titleDraw = function(p5) {
    p5.textFont("monospace", 30);
    return p5.text("BAM!", 300, 100);
  };

  floorDraw = function(p5, locate) {
    p5.fill(190, 190, 190);
    return p5.rect(locate.x * 20, locate.y * 20, 20, 20);
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

  bulletDraw = function(p5, x, y) {
    this.p5 = p5;
    p5.fill(255, 255, 0);
    return p5.rect(x, y, 2, 2);
  };

  DefenseScenario = (function() {

    function DefenseScenario(units, game) {
      this.units = units;
      this.game = game;
      this.units.add_unit("Grunt", 20, 29);
      this.units.add_unit("Grunt", 10, 29);
      this.units.add_unit("Commander", 5, 29);
      this.units.add_unit("Grunt", 30, 29);
      this.waves = 0;
    }

    DefenseScenario.prototype.generate_enemy = function() {
      var spawn;
      spawn = truncateDecimals(Math.random() * 30);
      return this.units.add_unit("Enemy", spawn, 0);
    };

    DefenseScenario.prototype.advance_wave = function() {
      var enemies, i, _results;
      this.waves += 1;
      enemies = truncateDecimals(Math.random() * 3) + 1;
      _results = [];
      for (i = 1; 1 <= enemies ? i <= enemies : i >= enemies; 1 <= enemies ? i++ : i--) {
        _results.push(this.generate_enemy());
      }
      return _results;
    };

    DefenseScenario.prototype.run = function(frame) {
      if (frame % 1000 === 0) this.advance_wave();
      if (this.units.friendly === 0) return this.game.initialize_over();
    };

    return DefenseScenario;

  })();

}).call(this);
