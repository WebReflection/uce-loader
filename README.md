# <em>µ</em>ce-loader

<sup>**Social Media Photo by [Guillaume Bolduc](https://unsplash.com/@guibolduc) on [Unsplash](https://unsplash.com/)**</sup>

A minimalistic, framework agnostic, lazy Custom Elements loader.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <script type="module">
  // <script src="//unpkg.com/uce-loader"> or ...
  import loader from '//unpkg.com/uce-loader?module';

  // will load every custom elements via the path
  loader('js/components');
  // js/components/compo-nent.js
  // js/components/what-ever.js
  // which will bring in also
  // js/components/whatever-else.js
  </script>
</head>
<body>
  <compo-nent></compo-nent>
  <hr>
  <what-ever></what-ever>
</body>
</html>
```

The `loader(path[,{container: document, extension: ".js", loader(path, name){}}])` is extremely simplified, but if you need anything more complex, please check [lazytag](https://github.com/WebReflection/lazytag#readme) out.

If `options` has a `loader` callback, it will be invoked once per each element found in the container.

```js
// will load js/view/compo-nent.uce
loader("js/view/", {
  loader(path, name) {
    fetch(path + name + ".uce")
      .then((b) => b.text())
      .then(definition => {
        document.body.appendChild(
          customElements.get('uce-template')
                        .from(definition)
        );
      })
  }
});
```
