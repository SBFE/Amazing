/**
 * @author xiaojue[designsor@gmail.com]
 * @fileoverview amazing tween
 * @date 20150202
 */

(function(global, doc, undef) {

  var beforeStyle = ['webkit', 'Moz', 'ms', 'O', ''];

  function getProStyleName(pro) {
    var el = doc.createElement('p');
    for (var i = 0; i < beforeStyle.length; i++) {
      var style = beforeStyle[i] ? beforeStyle[i] + pro: pro.charAt(0).toLowerCase() + pro.slice(1);
      if (null !== el.style[style]) return style;
    }
    return undef;
  }

  var Ts = getProStyleName('Transform');

  var hasCss3 = function() {
    if (!global.getComputedStyle || ! Ts) return false;
    return true;
  } ();


  // Parse strings looking for color tuples [255,255,255]
  function getRGB(color) {
    var result;

    // Check if we're already dealing with an array of colors
    if (color && color.constructor == Array && color.length == 3) return color;

    // Look for rgb(num,num,num)
    result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color);
    if (result) {
      return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
    }

    // Look for rgb(num%,num%,num%)
    result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color);
    if (result) {
      return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
    }

    // Look for #a0b1c2
    result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color);
    if (result) {
      return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
    }

    // Look for #fff
    result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color);
    if (result) {
      return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
    }

    // Look for rgba(0, 0, 0, 0) == transparent in Safari 3
    result = /rgba\(0, 0, 0, 0\)/.exec(color);
    if (result) {
      return colors['transparent'];
    }

    // Otherwise, we're most likely dealing with a named color
    return colors[color.toLowerCase()];
  }

  var colors = {
    aqua: [0, 255, 255],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    black: [0, 0, 0],
    blue: [0, 0, 255],
    brown: [165, 42, 42],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgrey: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkviolet: [148, 0, 211],
    fuchsia: [255, 0, 255],
    gold: [255, 215, 0],
    green: [0, 128, 0],
    indigo: [75, 0, 130],
    khaki: [240, 230, 140],
    lightblue: [173, 216, 230],
    lightcyan: [224, 255, 255],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    navy: [0, 0, 128],
    olive: [128, 128, 0],
    orange: [255, 165, 0],
    pink: [255, 192, 203],
    purple: [128, 0, 128],
    violet: [128, 0, 128],
    red: [255, 0, 0],
    silver: [192, 192, 192],
    white: [255, 255, 255],
    yellow: [255, 255, 0],
    transparent: [255, 255, 255]
  };

  function setToStyle(node, to) {
    for (var i in to) {
      node.style[i] = to[i];
    }
  }

  function getStyle(node) {
    if (getComputedStyle) {
      var css = getComputedStyle(node),
      rules = {};
      for (var i = 0; i < css.length; i++) {
        rules[css[i]] = css.getPropertyValue(css[i]);
      }
      return rules;
    } else {
      return node.currentStyle;
    }
  }

  function getSourceStyle(node, style) {
    return (global.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle)[style];
  }

  function setStyle(node, source, to, t, duration, ease) {
    source = source ? source: {};
    var curto, curso, target, setvalue, units;
    var x = (1 - (t / duration)).toFixed(1);
    var fn = Amazing.easings ? Amazing.easings[ease] : easings[ease];
    for (var i in to) {
      if (!source[i]) {
        source[i] = getSourceStyle(node, i);
      }
      //判断透明度,opacity,color,width,height:auto -> 需要修复
      if ((/color/i).test(i)) {
        //只转换一次,做标记
        curso = getRGB(source[i]);
        curto = getRGB(to[i]);
        target = {};
        target.r = Math.abs(fn(x, duration - t, curso[0], curto[0] - curso[0], duration));
        target.g = Math.abs(fn(x, duration - t, curso[1], curto[1] - curso[1], duration));
        target.b = Math.abs(fn(x, duration - t, curso[2], curto[2] - curso[2], duration));
        node.style[i] = 'rgb(' + parseInt(target.r, 10) + ',' + parseInt(target.g, 10) + ',' + parseInt(target.b, 10) + ')';
      } else if ((/opacity/i).test(i)) {
        curso = source[i] * 100;
        curto = to[i] * 100;
        target = fn(x, duration - t, curso, curto - curso, duration);
        target = Math.min((target / 100).toFixed(1), 1);
        if (i.toLowerCase() !== 'opacity') {
          target = 'alpha(opacity=' + (target * 100) + ');';
          node.style['filter'] = target;
        } else {
          node.style[i] = target;
        }
      } else {
        units = ((/\d(\D+)$/).exec(to[i]) || (/\d(\D+)$/).exec(source[i]) || [0, 0])[1]; //units (px, %)
        curso = parseInt(source[i], 10);
        curto = parseInt(to[i], 10);
        target = fn(x, duration - t, curso, curto - curso, duration);
        target += units;
        node.style[i] = target;
      }
    }
  }

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

  //https://gist.github.com/paulirish/1579671 
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && ! global.requestAnimationFrame; ++x) {
    global.requestAnimationFrame = global[vendors[x] + 'RequestAnimationFrame'];
    global.cancelAnimationFrame = global[vendors[x] + 'CancelAnimationFrame'] || global[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!global.requestAnimationFrame) {
    global.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = setTimeout(function() {
        callback(currTime + timeToCall);
      },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!global.cancelAnimationFrame) {
    global.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  var exts = ['Top', 'Left', 'Bottom', 'Right'];

  function fixMP(fixname, val, pros) {
    for (var i = 0; i < exts.length; i++) {
      pros[fixname + exts[i]] = val;
    }
  }

  function getPx(node, style, val) {
    var s = style.toLowerCase();
    var oldval = getSourceStyle(node, s);
    var ret;
    node.style[s] = val;
    ret = node['client' + style];
    node.style[s] = oldval;
    return ret;
  }

  function fixWidth(val, node) {
    var px = getPx(node, 'Width', val);
    return px + 'px';
  }

  function fixHeght(val, node) {
    var px = getPx(node, 'Height', val);
    return px + 'px';
  }

  function expand(pros, node) {
    //font,background直接翻译成backgroundColor 简写不支持
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
    if (pros.width && ! hasCss3) pros.width = fixWidth(pros.width, node);
    if (pros.height && ! hasCss3) pros.height = fixHeght(pros.height, node);
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
    this.props = {};
    //把原始的和设置的source合并
    for (var i in this.queueItem.to) {
      var style = this.queueItem.to[i];
      if (!this.queueItem.source[i]) this.queueItem.source[i] = getSourceStyle(this.queueItem.node, i);
    }
    expand(this.queueItem.source, this.queueItem.node);
    expand(this.queueItem.to, this.queueItem.node);
    setToStyle(this.queueItem.node, this.queueItem.source);
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
      setToStyle(item.node, item.to);
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
    resume: function() {
      if (this.isrun || this.end) return;
      this.playTime = now();
      this.endTime = this.endTime - this.stopTime + this.playTime;
      this.stopTime = 0;
      run.call(this);
    },
    pause: function() {
      this.isrun = false;
      cancelAnimationFrame(this.timer);
      this.stopTime = now();
    },
    cancel: function() {
      this.currFrame = 0;
      cancelAnimationFrame(this.timer);
      setEnd.call(this);
    }
  };

  if (hasCss3) {

    function setProperty(prop, val) {
      this.props[prop] = val;
    }

    function setVendorPreperty(prop, val) {
      setProperty.call(this, '-webkit-' + prop, val);
      setProperty.call(this, '-moz-' + prop, val);
      setProperty.call(this, '-ms-' + prop, val);
      setProperty.call(this, '-o-' + prop, val);
    }

    function setCss3Style(item) {
      for (var prop in this.props) {
        item.node.style[prop] = this.props[prop];
      }
    }

    Amazing.prototype = {
      constructor: Amazing,
      start: function() {
        var item = this.queueItem,
        self = this;
        this.startTime = now();
        this.endTime = this.startTime + this.duration;
        for (var i in item.to) {
          this.props[i] = item.to[i];
        }
        setVendorPreperty.call(this, 'transition-duration', this.duration);
        setVendorPreperty.call(this, 'transition-timing-function', item.ease);
        setCss3Style.call(this, item);
        self.after = setTimeout(function() {
          self.queueItem.cb && self.queueItem.cb();
        },
        this.duration);
      },
      restart: function() {
        setToStyle(this.queueItem.node, this.queueItem.source);
        this.cancel();
        this.start();
      },
      resume: function() {
        var item = this.queueItem,
        self = this;
        setVendorPreperty.call(this, 'transition-duration', this.endTime - this.stopTime);
        setVendorPreperty.call(this, 'transition-timing-function', item.ease);
        setCss3Style.call(this, item);
        self.after = setTimeout(function() {
          self.queueItem.cb && self.queueItem.cb();
        },
        this.endTime - this.stopTime);
        this.stopTime = 0;
      },
      pause: function() {
        var el = this.queueItem.node;
        var current = {};
        for (var i in this.queueItem.to) {
          current[i] = getComputedStyle(el)[i];
        }
        this.cancel();
        setToStyle(el, current);
        this.stopTime = now();
      },
      cancel: function() {
        var el = this.queueItem.node;
        clearTimeout(this.after);
        el.style.webkitTransitionDuration = el.style.mozTransitionDuration = el.style.msTransitionDuration = el.style.oTransitionDuration = '';
        //触发回流重置动画
        el.clientLeft = el.clientLeft;
      }
    };
  }

  Amazing.prototype.reverse = function() {
    var to = clone(this.queueItem.to);
    var source = clone(this.queueItem.source);
    this.queueItem.source = to;
    this.queueItem.to = source;
    this.restart();
  };

  var easings = {
    swing: function(x, t, b, c, d) {
      return this.easeInQuad(x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
      return c * (t /= d) * t + b;
    }
  };

  global.Amazing = Amazing;

})(this, document);
