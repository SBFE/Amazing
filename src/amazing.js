(function(global) {
  var easeings = {
    swing: function(x, t, b, c, d) {
      return this.easeInQuad(x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
      return c * (t /= d) * t + b;
    }
  };

  var setStyle = function(node, source, to, t, duration) {
    for (var i in to) {
      if(!source[i]){
         source[i] = (global.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle)[i];
      }
      var units = ((/\d(\D+)$/).exec(to[i]) || (/\d(\D+)$/).exec(source[i]) || [0, 0])[1];  //units (px, %)
      var curto = parseInt(to[i],10);
      var curso = parseInt(source[i],10);
      var target = easeings['swing']((1 - (t / duration)).toFixed(1), duration - t, 0, curto - curso, duration);
      var setvalue = parseInt(curso + target, 10);
      setvalue = setvalue > curto ? curto : setvalue;
      setvalue += units;
      node.style[i] = setvalue;
    }
  };

  var anim = function(cb) {
    var item = queue.shift();
    var endTime = new Date().valueOf() + item.duration;
    var _ = function() {
      var now = new Date().valueOf();
      var t = endTime - now;
      setStyle(item.node, item.source, item.to, t, item.duration);
      if (t < 0) {
        cb(item);
      } else {
        setTimeout(_, 16);
      }
    };
    _();
  };

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
    //console.log(item.to);
  };

  var queue = [];

  var amazing = function(node, params, callback) {
    var queueItem = {
      node: node,
      source: params.source,
      to: params.to,
      duration: params.duration || 500,
      ease: params.ease || 'swing',
      cb: callback
    };
    batch(queueItem);
    queue.push(queueItem);
    anim(function(item) {
      var next = queue.shift();
      if (next) anim(next);
      else callback();
    });
  };
  global.amazing = amazing;
})(this);

