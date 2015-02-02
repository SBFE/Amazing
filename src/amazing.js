/**
 * @author xiaojue[designsor@gmail.com]
 * @fileoverview amazing tween
 * @date 20150202
 */

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

  function setToStyle(node,to){
    for(var i in to){
      node.style[i] = to[i];
    }
  }

  function getSourceStyle(node, style) {
    return (global.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle)[style];
  }

  function setStyle(node, source, to, t, duration, ease) {
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
        target = easeings[ease]((1 - (t / duration)).toFixed(1), duration - t, 0, curto - curso, duration);
        setvalue = parseInt(curso + target, 10);
        //setvalue = setvalue > curto ? curto: setvalue;
        setvalue += units;
      }
      node.style[i] = setvalue;
    }
  }

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

  function expand(pros) {
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
  }

  function configure(params) {
    return {
      node: params.node,
      source: params.source,
      to: params.to,
      ease: params.ease || 'swing',
      cb: params.callback
    };
  }

  function Amazing(params) {
    this.queueItem = configure(params);
    this.fps = params.fps || 60;
    this.duration = params.duration || 500;
    this.timer = null;
    this.isrun = false;
    this.end = false;
    this.playTime = this.stopTime = this.currFrame = 0;
    expand(this.queueItem.source);
    expand(this.queueItem.to);
  }

  function now() {
    return new Date().valueOf();
  }

  function setEnd() {
    this.isrun = false;
    this.end = true;
  }

  function run() {
    var item = this.queueItem,
    self = this;

    this.isrun = true;

    var t = this.endTime - now();
    if (this.currFrame === this.frames) {
      //有偏差->一次性设置成to得状态
      setToStyle(item.node,item.to);  
      if (item.cb) item.cb();
      setEnd.call(this);
      return;
    } else {
      this.timer = requestAnimationFrame(function() {
        run.call(self);
      });
    }
    this.currFrame++;
    setStyle(item.node, item.source, item.to, t, this.duration, item.ease);
  }

  Amazing.prototype = {
    constructor: Amazing,
    start: function(cb) {
      if (this.isrun || this.end) return;
      this.startTime = now();
      this.endTime = this.startTime + this.duration;
      this.frames = Math.ceil(this.duration * this.fps / 1000);
      run.call(this);
    },
    restart: function() {
      this.cancel();
      this.end = false;
      this.start();
    },
    play: function() {
      if (this.isrun || this.end) return;
      this.playTime = now();
      this.endTime = this.endTime - this.stopTime + this.playTime;
      this.stopTime = 0;
      run.call(this);
    },
    stop: function() {
      this.isrun = false;
      cancelAnimationFrame(this.timer);
      this.stopTime = now();
    },
    cancel: function() {
      this.currFrame = 0;
      cancelAnimationFrame(this.timer);
      setEnd.call(this);
    },
    reverse: function() {
      var to = clone(this.queueItem.to);
      var source = clone(this.queueItem.source);
      this.queueItem.source = to;
      this.queueItem.to = source;
      this.restart();
    }
  };

  function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
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

  global.Amazing = Amazing;

})(this);

