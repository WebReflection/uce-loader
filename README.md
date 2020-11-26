# <em>µ</em>ce-loader

<sup>**Social Media Photo by [Guillaume Bolduc](https://unsplash.com/@guibolduc) on [Unsplash](https://unsplash.com/)**</sup>

A minimalistic, framework agnostic, lazy Custom Elements loader.

### Example

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
  loader({
    // by default it's document
    container: document.body,
    // invoked per each new custom-element name found
    on(newTag) {
      const js = document.createElement('script');
      js.src = `js/components/${newTag}.js`;
      document.head.appendChild(js);
    }
  });
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

If `loader({container: document, on(tagName){}})` API is too simplified, feel free to check [lazytag](https://github.com/WebReflection/lazytag#readme) out.

### About ShadowDOM

If your components use `attachShadow` and internally use custom elements that should be lazy loaded, be sure the `shadowRoot` is observed.

```js
const shadowRoot = this.attachShadow({mode: any});
loader({
    container: shadowRoot,
    on(newTag) {
      // ... load components
    }
  });
```
