Amazing
=======

Amazing effect framework library

一个管理css特效和结构依赖特效的核心core，它小巧轻便，不依赖任何框架库，可根据使用者要求定制，或扩展。

---

Usage

```
var test = new Amazing(document.getElementById("test"));
test.animate({
  to:{
    width:"10px"
  }
  source:{
    width:"0px" //默认或指定
  },
  duration:5000,
  easing:"easeInCubic"
}).wait(1000).animate({to:{width:"50%"}});

//也可以中途暂停和继续动画
test.pause();
test.begin();

```
