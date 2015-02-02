(function(global) {
  var easeings = {
    swing: function(x, t, b, c, d) {
      return this.easeInQuad(x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
      return c * (t /= d) * t + b;
    }
  };

  var RGBA = /#(.)(.)(.)\b|#(..)(..)(..)\b|(\d+)%,(\d+)%,(\d+)%(?:,([\d\.]+))?|(\d+),(\d+),(\d+)(?:,([\d\.]+))?\b/;
  var toRGBA = function(s, v) {
    v = [0, 0, 0, 0];
    s.replace(/\s/g, "").replace(RGBA, function(i, a, b, c, f, g, h, l, m, n, o, w, x, y, z) {
      h = [a + a || f, b + b || g, c + c || h];
      p = [l, m, n];

      for (i = 0; i < 3; i++) {
        h[i] = parseInt(h[i], 16);
        p[i] = Math.round(p[i] * 2.55);
      }

      v = [h[0] || p[0] || w || 0, h[1] || p[1] || x || 0, h[2] || p[2] || y || 0, o || z || 1];
    });
    return v;
  };

  function getSourceStyle(node, style) {
    return (global.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle)[style];
  }

  var setStyle = function(node, source, to, t, duration) {
    source = source ? source: {};
    var curto, curso, target, setvalue, units;
    for (var i in to) {
      if (!source[i]) {
        source[i] = getSourceStyle(node, i);
      }
      //判断透明度，color
      if ((/color/i).test(i)) { //只转换一次,做标记
        curto = toRGBA(to[i]);
        curso = toRGBA(source[i]);
        if (curto[3] === 0) {
          curto = [].concat(curso);
          curto[3] = 0;
        }
        if (curso[3] === 0) {
          curso = [].concat(curto);
          curso[3] = 0;
        }
      } else {
        units = ((/\d(\D+)$/).exec(to[i]) || (/\d(\D+)$/).exec(source[i]) || [0, 0])[1]; //units (px, %)
        curto = parseInt(to[i], 10);
        curso = parseInt(source[i], 10);
        target = easeings['easeInQuad']((1 - (t / duration)).toFixed(1), duration - t, 0, curto - curso, duration);
        setvalue = parseInt(curso + target, 10);
        setvalue = setvalue > curto ? curto: setvalue;
        setvalue += units;
      }
      node.style[i] = setvalue;
    }
  };

  function events() {
    this.map = {};
  }

  events.prototype = {
    constructor: events,
    trigger: function(name, args) {
      var self = this,
      cbs = this.map[name];
      if (cbs) {
        forEach(cbs, function(fn) {
          fn.apply(this, args);
        });
      }
    },
    on: function(name, cb) {
      if (this.map[name]) {
        this.map[name].push(cb);
      } else {
        this.map[name] = [cb];
      }
    }
  };

  //https://gist.github.com/paulirish/1579671 
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && ! window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  var exts = ['Top', 'Left', 'Bottom', 'Right'];

  function fixMP(fixname, val, pros) {
    for (var i = 0; i < exts.length; i++) {
      pros[fixname + exts[i]] = val;
    }
  }

  var expand = function(pros) {
    var fixs = {
      'margin': function(val) {
        fixMP('margin', val, pros);
      },
      'padding': function(val) {
        fixMP('padding', val, pros);
      },
      'border': function(val) {
        for (var i = 0; i < exts.length; i++) {
          pros['border' + exts[i] + 'Wdith'] = val;
        }
      },
      'borderRadius': function(val) {
        for (var i = 0; i < exts.length; i++) {
          pros['margin' + exts[i] + 'Radius'] = val;
        }
      }
    };
    for (var pro in pros) {
      if (fixs[pro]) {
        var value = pros[pro];
        fixs[pro](value);
        delete pros[pro];
      }
    }
  };

  var batch = function(item) {
    expand(item.source);
    expand(item.to);
  };

  var configure = function(params) {
    return {
      node: params.node,
      source: params.source,
      to: params.to,
      duration: params.duration || 500,
      ease: params.ease || 'swing',
      cb: params.callback
    };
  };

  function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" != typeof obj) return obj;
    var copy;
    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; ++i) {
        copy[i] = clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  function Amazing(params) {
    this.events = new events();
    this.queueItem = configure(params);
    this.fps = 60;
    this.currFrame = 0;
    this.duration = params.duration;
    this.timer = null;
    this.playTime = 0;
    this.stopTime = 0;
    this.started = false;
    batch(this.queueItem);
  }

  function now(){
    return new Date().valueOf(); 
  }

  Amazing.prototype = {
    constructor: Amazing,
    stop: function() {
      var self = this;
      if(!self.started) return;
      cancelAnimationFrame(self.timer);
      self.stopTime = now();
    },
    run: function() {
      var item = this.queueItem,
      self = this;
      if(!self.started) return;

      self.t = self.endTime - now();
      if (self.currFrame >= self.frames) {
        if (item.cb) item.cb();
        self.events.trigger('end');
        self.started = false;
        return;
      } else {
        self.timer = requestAnimationFrame(function() {
          self.run();
        });
      }
      self.currFrame++;
      setStyle(item.node, item.source, item.to, self.t, self.duration);
      self.events.trigger('move', [self.t, item.source, item.to]);
    },
    play:function(){
      var self = this;
      if(!self.started) return;
      self.playTime = now();
      self.endTime = self.endTime - self.stopTime + self.playTime;
      self.stopTime = 0;
      self.run(); 
    },
    replay: function() {
      var self = this;
      self.currFrame = 0;
      cancelAnimationFrame(self.timer);
      self.start();
    },
    start: function() {
      var item = this.queueItem,
      self = this;
      self.startTime = now();
      self.endTime = self.startTime + self.duration;
      self.frames = Math.ceil(self.duration * self.fps / 1000);
      this.started = true;
      self.run();
    }
  };

  global.Amazing = Amazing;

})(this);

