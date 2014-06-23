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
  //https://gist.github.com/cms/369133
  getStyle = function(el, styleProp) {
    var value, defaultView = el.ownerDocument.defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
      // sanitize property name to css notation (hypen separated words eg. font-Size)
      styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
      return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) { // IE
      // sanitize property name to camelCase
      styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
        return letter.toUpperCase();
      });
      value = el.currentStyle[styleProp];
      // convert other units to pixels on IE
      if ((/^\d+(em|pt|%|ex)?$/i).test(value)) {
        return (function(value) {
          var oldLeft = el.style.left,
          oldRsLeft = el.runtimeStyle.left;
          el.runtimeStyle.left = el.currentStyle.left;
          el.style.left = value || 0;
          value = el.style.pixelLeft + "px";
          el.style.left = oldLeft;
          el.runtimeStyle.left = oldRsLeft;
          return value;
        })(value);
      }
      return value;
    }
  },
  requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(function() {
      callback();
    },
    16);
  },
  _animItems = [],
  _timerAnim = function() {

  },
  _removeAnim = function(finished, item) {
    item.callback(finished, item.elm);
  },
  _anim = function(elm, properties, options) {
    //检查elm是否已经存在动画,存在的就过滤掉
    var props = {};
    var hasAnim = filter(_animItems, function(item) {
      return item.elm == elm;
    });

    if (hasAnim.length) {
      forEach(hasAnim, function(item, index) {
        //停止所有elm正在执行的动画,执行callback
        _removeAnim(false, item);
      });
    }

    for(var property in properties){
      //需要修正单位，color值
      props[property] = {
        currentProperty:getStyle(elm,property),
        endProperty:properties[property]
      };
    }

    _animItems.push({
      elm: elm,
      properties: props,
      callback: options.callback || noop,
      duration: options.duration || 400
    });

    requestAnimFrame(_timerAnim);
  };

  function amazing() {
    this.map = {};
    this.version = '0.0.1';
  }

  amazing.prototype = {
    constructor: amazing,
    easeing: easeing,
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
    },
    animate: _anim
  };
  global.amazing = amazing;
})(this);

