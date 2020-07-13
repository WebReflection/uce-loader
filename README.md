# <em>µ</em>ce-loader

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

The `loader(path[,{container: document, extension: ".js"}])` is extremely simplified, but if you need anything more complex, please check [lazytag](https://github.com/WebReflection/lazytag#readme) out.
