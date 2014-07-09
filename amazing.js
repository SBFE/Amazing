/**
 * @author xiaojue [designsor@gmail.com]
 * @date 20140623
 * @fileoverview amazing
 */

(function(global) {
  //utils
  var Arr = Array.prototype,
  Obj = Object,
  forEach = Arr.forEach ? function(arr, fn) {
    arr.forEach(fn);
  }: function(arr, fn) {
    for (var i = 0; i < arr.length; i++) fn(arr[i], i, arr);
  },
  filter = Arr.filter ? function(arr, fn) {
    return arr.filter(fn);
  }: function(arr, fn) {
    var ret = [];
    forEach(arr, function(item, i, arr) {
      if (fn(item, i, arr)) ret.push(item);
    });
    return ret;
  },
  map = Arr.map ? function(arr, fn) {
    return arr.map(fn);
  }: function(arr, fn) {
    var ret = [];
    forEach(arr, function(item, i, arr) {
      ret.push(fn(item, i, arr));
    });
    return ret;
  },
  keys = Obj.keys ? Obj.keys: function(o) {
    var ret = [];
    for (var p in o) {
      if (o.hasOwnProperty(p)) ret.push(p);
    }
    return ret;
  },
  indexOf = Arr.indexOf ? function(arr, selector) {
    return arr.indexOf(selector);
  }: function(arr, selector) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === selector) return i;
    }
    return - 1;
  },
  //http://easings.net/zh-cn
  easeing = {
    swing: function(x, t, b, c, d) {
      return this.easeInQuad(x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
      return - c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b; --t;
      return - c / 2 * (t * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
      return - c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return - c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
      return - c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
      return - c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
      return (t === 0) ? b: c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
      return (t == d) ? b + c: c * ( - Math.pow(2, - 10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
      if (t === 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b; --t;
      return c / 2 * ( - Math.pow(2, - 10 * t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
      return - c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return - c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t === 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * 0.3;
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      }
      else s = p / (2 * Math.PI) * Math.asin(c / a);
      return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t === 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * 0.3;
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      }
      else s = p / (2 * Math.PI) * Math.asin(c / a);
      return a * Math.pow(2, - 10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t === 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (!p) p = d * (0.3 * 1.5);
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      }
      else s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) return - 0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, - 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
      return c - this.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
      }
    },
    easeInOutBounce: function(x, t, b, c, d) {
      if (t < d / 2) return this.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
      return this.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
  },
  noop = function() {},
  timeout = function(w, a) {
    return w["webkitR" + a] || w["r" + a] || w["mozR" + a] || w["msR" + a] || w["oR" + a];
  } (window, "equestAnimationFrame") || function(callback) {
    setTimeout(callback, 16);
  },
  RGBA = /#(.)(.)(.)\b|#(..)(..)(..)\b|(\d+)%,(\d+)%,(\d+)%(?:,([\d\.]+))?|(\d+),(\d+),(\d+)(?:,([\d\.]+))?\b/,
  toRGBA = function(s) {
    var v = [0, 0, 0, 0];
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
  },
  _fxWH = function(o, n, to, fr, a, e) {
    if (! (o._fr >= 0)) o._fr = ! isNaN(fr = parseFloat(fr)) ? fr: a == "width" ? n.clientWidth: n.clientHeight;
    _fx._(o, n, to, o._fr, a, e);
  },
  _fx = {
    _: function(o, n, to, fr, a, e) {
      fr = parseFloat(fr) || 0;
      to = parseFloat(to) || 0;
      o.s[a] = (o.p >= 1 ? to: (o.p * (to - fr) + fr)) + o.u;
    },
    'width': _fxWH,
    'height': _fxWH,
    'opacity': function(o, n, to, fr, a, e) {
      if (isNaN(fr = fr || o._fr)) {
        fr = n.style;
        fr.zoom = 1;
        fr = o._fr = (/alpha\(opacity=(\d+)\b/i.exec(fr.filter) || {})[1] / 100 || 1;
      }
      fr *= 1;
      to = (o.p * (to - fr) + fr);
      n = n.style;
      if (a in n) {
        n[a] = to;
      } else {
        n.filter = to >= 1 ? "": "alpha(" + a + "=" + Math.round(to * 100) + ")";
      }
    },
    'color': function(o, n, to, fr, a, e, i, v) {
      if (!o.ok) {
        to = o.to = A.toRGBA(to);
        fr = o.fr = A.toRGBA(fr);
        if (to[3] === 0) {
          to = [].concat(fr);
          to[3] = 0;
        }
        if (fr[3] === 0) {
          fr = [].concat(to);
          fr[3] = 0;
        }
        o.ok = 1;
      }

      v = [0, 0, 0, o.p * (to[3] - fr[3]) + 1 * fr[3]];
      for (i = 2; i >= 0; i--) v[i] = Math.round(o.p * (to[i] - fr[i]) + 1 * fr[i]);

      if (v[3] >= 1 || A.rgbaIE) v.pop();

      try {
        o.s[a] = (v.length > 3 ? "rgba(": "rgb(") + v.join(",") + ")";
      } catch(e) {
        A.rgbaIE = 1;
      }
    }
  };

  function amazing(node) {
    this.node = node;
    this.queue = [];
    this.version = '0.0.1';
  }

  amazing.prototype = {
    constructor: amazing,
    easeing: easeing,
    animate: function(properties) {
      return this;
    },
    wait: function(timer) {
      return this;
    },
    pause: function() {
      return this;
    },
    begin: function() {
      return this;
    }
  };

  global.amazing = amazing;

})(this);

