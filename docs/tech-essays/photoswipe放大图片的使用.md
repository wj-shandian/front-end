## 简介

[官网地址：](https://photoswipe.com/)

一款可以可以放大图片的插件。操作简单

## 引入依赖包

`npm install photoswipe`

## 使用

```js
const PhotoSwipe = require("photoswipe");
const PhotoSwipeUI_Default = require("photoswipe/dist/photoswipe-ui-default");
require("photoswipe/dist/photoswipe.css");
require("photoswipe/dist/default-skin/default-skin.css");
```

引入相关样式和 api

```js
<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

        <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button class="pswp__button pswp__button--share" title="Share"></button>

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                <!-- element will get class pswp__preloader--active when preloader is running -->
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>

</div>
```

引入相关 dom 节点，只需要再你需要的页面引入即可，不会影响页面的结构

在 js 操作中获取图片的 dom 节点，给图片添加点击事件。

```js
var pswpElement = document.querySelectorAll(".pswp")[0]; //上面添加的dom节点

var items = [
  {
    src: "https://placekitten.com/600/400", //获取图片的src
    w: 600, // 原始大小
    h: 400,
  },
  {
    src: "https://placekitten.com/1200/900",
    w: 1200, // 放大后的大小
    h: 900,
  },
];

// define options (if needed)
var options = {
  // optionName: 'option value'
  // for example:
  index: 0, // start at first slide
};

// Initializes and opens PhotoSwipe
var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
gallery.init();
```

官网 demo 地址：https://photoswipe.com/documentation/getting-started.html

当我们获取到的是图片数组时，在 vue 中不能直接遍历 dom，需要转换一下。

```js
let img = pswpElement.getElementsByTagName("img");
let arr1 = [].slice.call(img); //转化获取的dom节点数组
arr1.forEach((item) => {
  item.addEventListener("click", (e) => {
    this.openPhotoSwipe(e); //调用上面的js函数 传入节点获取src
  });
});
```

## 多张图的时候使用方法

引入下面的函数，并传入 dom 节点

```js
  mounted () {
    this.$nextTick(() => {
    //   document.getElementById('contentScroll').addEventListener('mousewheel', (event) => {
    //     event.stopPropagation()
    //   })
      this.initPhotoSwipeFromDOM('.my-gallery')
    })
  },
......
initPhotoSwipeFromDOM (gallerySelector) {
      // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
      var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes
        var numNodes = thumbElements.length
        var items = []
        var figureEl
        var linkEl
        var size
        var item

        for (var i = 0; i < numNodes; i++) {
          figureEl = thumbElements[i] // <figure> element

          // include only element nodes
          if (figureEl.nodeType !== 1) {
            continue
          }

          linkEl = figureEl.children[0] // <a> element

          size = linkEl.getAttribute('data-size').split('x')

          // create slide object
          item = {
            src: linkEl.getAttribute('href'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
          }

          if (figureEl.children.length > 1) {
            // <figcaption> content
            item.title = figureEl.children[1].innerHTML
          }

          if (linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
            item.msrc = linkEl.children[0].getAttribute('src')
          }

          item.el = figureEl // save link to element for getThumbBoundsFn
          items.push(item)
        }

        return items
      }

      // find nearest parent element
      var closest = function closest (el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn))
      }

      // triggers when user clicks on thumbnail
      var onThumbnailsClick = function (e) {
        e = e || window.event
        e.preventDefault ? e.preventDefault() : e.returnValue = false

        var eTarget = e.target || e.srcElement

        // find root element of slide
        var clickedListItem = closest(eTarget, function (el) {
          return (el.tagName && el.tagName.toUpperCase() === 'FIGURE')
        })

        if (!clickedListItem) {
          return
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode
        var childNodes = clickedListItem.parentNode.childNodes
        var numChildNodes = childNodes.length
        var nodeIndex = 0
        var index

        for (var i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue
          }

          if (childNodes[i] === clickedListItem) {
            index = nodeIndex
            break
          }
          nodeIndex++
        }

        if (index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe(index, clickedGallery)
        }
        return false
      }

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1)
        var params = {}

        if (hash.length < 5) {
          return params
        }

        var vars = hash.split('&')
        for (var i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue
          }
          var pair = vars[i].split('=')
          if (pair.length < 2) {
            continue
          }
          params[pair[0]] = pair[1]
        }

        if (params.gid) {
          params.gid = parseInt(params.gid, 10)
        }

        return params
      }
```

html 结构

```js
<div class="more-img my-gallery" v-else>
      <figure itemprop="associatedMedia" itemscope v-for="(item,index) in imgListData" :key="index">
        <a :href="item.image_big" itemprop="contentUrl" data-size="100%x100%">
            <img :src="item.image_small" itemprop="thumbnail" alt="Image description" />
        </a>
      </figure>
     </div>
```
