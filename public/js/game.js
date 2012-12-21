(function() {
  var MenuDrawMode, MenuMode, TextOptions, TextOptionsDraw, frameRateDraw, menu, titleDraw;

  MenuMode = (function() {

    function MenuMode() {
      this.options = new TextOptions();
      this.options.add_text(["New Game", "Test Arena"]);
      this.queue = [];
      this.queue.push("update");
    }

    MenuMode.prototype.get_queue = function() {
      if (this.queue.size !== 0) return this.queue.pop();
      return false;
    };

    return MenuMode;

  })();

  MenuDrawMode = (function() {

    function MenuDrawMode(p5) {
      this.p5 = p5;
      this.texts = new TextOptionsDraw(this.p5, 300, 250, 18);
      this.size = 0;
    }

    MenuDrawMode.prototype.draw = function() {
      this.p5.background(0);
      return titleDraw(this.p5);
    };

    MenuDrawMode.prototype.process = function(mode) {
      if (mode.get_queue() === "update") return this.draw(mode.options);
    };

    return MenuDrawMode;

  })();

  titleDraw = function(p5) {
    p5.textFont("monospace", 30);
    return p5.text("BAM!", 300, 100);
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
      this.menu = new MenuMode();
      return this.menu_draw = new MenuDrawMode(p5);
    };
    return p5.draw = function() {
      frameRateDraw(p5);
      return this.menu_draw.process(this.menu);
    };
  };

  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    canvas.focus();
    return processing = new Processing(canvas, menu);
  });

}).call(this);
