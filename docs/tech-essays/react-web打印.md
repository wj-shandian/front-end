# web 打印

我是通过 iframe 方式 然后定制化样式 打印

```js
const printRef = useRef(null);
const print = (id) => {
  // 创建 节点 和 iframe
  const el = document.getElementById("payment-order-print");
  const iframe = document.createElement("IFRAME");
  let doc = null;
  iframe.setAttribute(
    "style",
    "position:absolute;width:0px;height:0px;left:500px;top:500px;"
  );
  document.body.appendChild(iframe);
  printRef.current = iframe;
  doc = iframe.contentWindow.document;
  // 引入打印的专有CSS样式，根据实际修改
  // doc.write('<LINK rel="stylesheet" type="text/css" href="css/print.css">');
  let css = `<style>
        @media print {
            @page {
                size: A4 portrait;
                msn-footer: none;
            }
        }
    </style>`;
  doc.write(css + el.innerHTML);
  doc.close();
  // 获取iframe的焦点，从iframe开始打印
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
};

useEffect(() => {
  return () => {
    document.body.removeChild(printRef.current);
  };
}, []);

return (
  <div style={{ display: "none" }}>
    <div id="payment-order-print">
      {/* 打印内容 可以根据自己的需求 开发页面 填充样式*/}
    </div>
  </div>
);
```

部分打印相关 css

```css
@media print {
  @page {
    /* A4 设置大小 可以设置成 其他尺寸  portrait（意思是竖向） landscape （意思是横向） auto（意思是浏览器控制）*/
    size: A4 portrait;
    /*去除页眉*/
    margin-top: 0;
    /*去除页脚*/
    margin-bottom: 0;
    /*都去掉*/
    margin: 0;
  }
}
```

`
