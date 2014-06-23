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
  };
  function noop() {}
  function amazing() {
    this.map = {};
    this.version = '0.0.1';
  }
  amazing.prototype = {
    constructor: amazing,
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
  global.amazing = amazing;
})(this);

