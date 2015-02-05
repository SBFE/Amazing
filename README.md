### Amazing
---

A javascript animation class.

Amazing use CSS3 transition in advanced browser and has been backward compatibility.

-

### Usage

```html
<script src="amazing.js"></script>
<script src="easings.js"></script> <!-- optional -->
```

```js
var animation = new Amazing({
    node:document.getElementById('animation'),
    source:{
      width:'10%',
      opacity:0.2,
      height:'auto'
    },
    to:{
     'font-size':'40px',
     opacity:1,
     color:'#000',
     'background-color':'blue',
     width:'auto',
     height:'300px'
    },
    duration:4000,
    callback:function(){
      console.log('animation end');
    }
  });

//API
/**
* animation.start();
* animation.pause();
* animation.resume();
* animation.cancel();
* animation.reverse();
*/

```

### License

MIT License
