/** Copyright 2013 mocking@gmail.com * http://github.com/relay/anim

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

(function(global){

//http://easings.net/zh-cn
var easeing = {
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
};

var anim = function(A) {

A = function(n, g, t, e) {
  var a, o, c,
    q = [],
    cb = function(i) {
      //our internal callback function maintains a queue of objects 
      //that contain callback info. If the object is an array of length
      //over 2, then it is parameters for the next animation. If the object
      //is an array of length 1 and the item in the array is a number,
      //then it is a timeout period, otherwise it is a callback function.
      if(i = q.shift()) i[1] ?
          A.apply(this, i).anim(cb) :
          i[0] > 0 ? setTimeout(cb, i[0]*1000) : (i[0](), cb())
    };

  if(n.charAt) n = document.getElementById(n);

  //if the 1st param is a number then treat it as a timeout period.
  //If the node reference is null, then we skip it and run the next callback
  //so that we can continue with the animation without throwing an error.
  if(n > 0 || !n) g = {}, t = 0, cb(q = [[n || 0]]);

  //firefox don't allow reading shorthand CSS styles like "margin" so
  //we have to expand them to be "margin-left", "margin-top", etc.
  //Also, expanding them allows the 4 values to animate independently 
  //in the case that the 4 values are different to begin with.
  expand(g, {padding:0, margin:0, border:"Width"}, [T, R, B, L]);
  expand(g, {borderRadius:"Radius"}, [T+L, T+R, B+R, B+L]);

  //if we animate a property of a node, we set a unique number on the
  //node, so that if we run another animation concurrently, it will halt
  //the first animation. This is needed so that if we animate on mouseover
  //and want to reverse the animation on mouseout before the mouseover
  //is complete, they won't clash and the last animation prevails.
  ++mutex;

  for(a in g) {
    o = g[a];
    if(!o.to && o.to !== 0) o = g[a] = {to: o};  //shorthand {margin:0} => {margin:{to:0}}

    A.defs(o, n, a, e);  //set defaults, get initial values, selects animation fx
  }

  A.iter(g, t*1000, cb);

  return {
    //this allows us to queue multiple animations together in compact syntax
    anim: function() {
      q.push([].slice.call(arguments));
      return this
    }
  }
};

var T="Top", R="Right", B="Bottom", L="Left",
  mutex = 1,

  //{border:1} => {borderTop:1, borderRight:1, borderBottom:1, borderLeft:1}
  expand = function(g, dim, dir, a, i, d, o) {
    for(a in g) {  //for each animation property
      if(a in dim) {
        o = g[a];
        for(i = 0; d = dir[i]; i++)  //for each dimension (Top, Right, etc.)
          //margin => marginTop
          //borderWidth => borderTopWidth
          //borderRadius => borderTopRadius
          g[a.replace(dim[a], "") + d + (dim[a] || "")] = {
            to:(o.to === 0) ? o.to : (o.to || o), fr:o.fr, e:o.e
          };
        delete g[a];
      }
    }
  },

  timeout = function(w, a) {
    return w["webkitR"+a] || w["r"+a] || w["mozR"+a] || w["msR"+a] || w["oR"+a]
  }(window, "equestAnimationFrame");

A.defs = function(o, n, a, e, s) {
  s = n.style;
  o.a = a;  //attribute
  o.n = n;  //node
  o.s = (a in s) ? s : n;  //= n.style || n
  o.e = o.e || e;  //easing

  o.fr = o.fr || (o.fr === 0 ? 0 : o.s == n ? n[a] :
        (window.getComputedStyle ? getComputedStyle(n, null) : n.currentStyle)[a]);

  o.u = (/\d(\D+)$/.exec(o.to) || /\d(\D+)$/.exec(o.fr) || [0, 0])[1];  //units (px, %)

  //which animation fx to use. Only color needs special treatment.
  o.fn = /color/i.test(a) ? A.fx.color : (A.fx[a] || A.fx._);

  //the mutex is composed of the animating property name and a unique number
  o.mx = "anim_" + a;
  n[o.mx] = o.mxv = mutex;
  if(n[o.mx] != o.mxv) o.mxv = null;  //test expando
};

A.iter = function(g, t, cb) {
  var _, i, o, p, e,
    z = +new Date + t,

  _ = function(now) {
    i = z - (now || new Date().getTime());

    if(i < 50) {
      for(o in g)
        o = g[o],
        o.p = 1,
        o.fn(o, o.n, o.to, o.fr, o.a, o.e);

      cb && cb()

    } else {

      i = i/t;

      for(o in g) {
        o = g[o];

        if(o.n[o.mx] != o.mxv) return;  //if mutex not match then halt.

        e = o.e;
        p = i;
        
        if(e) p = easings[e]();
        else p = easings['swing']();
        o.p = p;
        o.fn(o, o.n, o.to, o.fr, o.a, o.e)
      }
      timeout ? timeout(_) : setTimeout(_, 20, 0)
    }
  }
  _();
};

A.fx = {  //CSS names which need special handling

  _: function(o, n, to, fr, a, e) {  //for generic fx
    fr = parseFloat(fr) || 0,
    to = parseFloat(to) || 0,
    o.s[a] = (o.p >= 1 ? to : (o.p*(to - fr) + fr)) + o.u
  },

  width: function(o, n, to, fr, a, e) {  //for width/height fx
    if(!(o._fr >= 0))
      o._fr = !isNaN(fr = parseFloat(fr)) ? fr : a == "width" ? n.clientWidth : n.clientHeight;
    A.fx._(o, n, to, o._fr, a, e)
  },

  opacity: function(o, n, to, fr, a, e) {
    if(isNaN(fr = fr || o._fr))
      fr = n.style,
      fr.zoom = 1,
      fr = o._fr = (/alpha\(opacity=(\d+)\b/i.exec(fr.filter) || {})[1]/100 || 1;
    fr *= 1;
    to = (o.p*(to - fr) + fr);
    n = n.style;
    if(a in n) {
      n[a] = to
    } else {
      n.filter = to >= 1 ? "" : "alpha(" + a + "=" + Math.round(to*100) + ")"
    }
  },

  color: function(o, n, to, fr, a, e, i, v) {
    if(!o.ok) {
      to = o.to = A.toRGBA(to);
      fr = o.fr = A.toRGBA(fr);
      if(to[3] == 0) to = [].concat(fr), to[3] = 0;
      if(fr[3] == 0) fr = [].concat(to), fr[3] = 0;
      o.ok = 1
    }

    v = [0, 0, 0, o.p*(to[3] - fr[3]) + 1*fr[3]];
    for(i=2; i>=0; i--) v[i] = Math.round(o.p*(to[i] - fr[i]) + 1*fr[i]);

    if(v[3] >= 1 || A.rgbaIE) v.pop();

    try {
      o.s[a] = (v.length > 3 ? "rgba(" : "rgb(") + v.join(",") + ")"
    } catch(e) {
      A.rgbaIE = 1
    }
  }
};
A.fx.height = A.fx.width;

A.RGBA = /#(.)(.)(.)\b|#(..)(..)(..)\b|(\d+)%,(\d+)%,(\d+)%(?:,([\d\.]+))?|(\d+),(\d+),(\d+)(?:,([\d\.]+))?\b/;
A.toRGBA = function(s, v) {
  v = [0, 0, 0, 0];
  s.replace(/\s/g, "").replace(A.RGBA, function(i, a,b,c, f,g,h, l,m,n,o, w,x,y,z) {
    var h = [a+a||f, b+b||g, c+c||h], p = [l, m, n];

    for(i=0; i<3; i++) h[i] = parseInt(h[i], 16), p[i] = Math.round(p[i]*2.55);

    v = [h[0]||p[0]||w||0,  h[1]||p[1]||x||0,  h[2]||p[2]||y||0,  o||z||1]
  });
  return v
};

return A
}();

})(this);
