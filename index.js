self.uceLoader = (function (exports) {
  'use strict';

  // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
  var ignore = /^(?:annotation-xml|color-profile|font-face(?:|-format|-name|-src|-uri)|missing-glyph)$/i;
  var loaded = new Set();
  /**
   * Start observing a document, or a specific container, and automatically
   * download once Custom Elements from a specific path
   * @param {string} path where to find custom elements files
   * @param {{container:Node, extension:string}} [options] optional configuration
   * with `container`, `document` by default, and `extension`, `".js"` by default
   * @returns {MutationObserver} the disconnect-able `container` observer
   */

  var index = (function (path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var ext = options.extension || '.js';
    var target = options.container || document;
    var ownerDocument = target.ownerDocument || target;

    var load = function load(mutations) {
      for (var i = 0, length = mutations.length; i < length; i++) {
        for (var addedNodes = mutations[i].addedNodes, j = 0, _length = addedNodes.length; j < _length; j++) {
          var node = addedNodes[j];

          if (node.querySelectorAll) {
            var is = (node.getAttribute('is') || node.tagName).toLowerCase();

            if (0 < is.indexOf('-') && !loaded.has(is) && !ignore.test(is)) {
              loaded.add(is);
              var js = ownerDocument.createElement('script');
              js.async = true;
              js.src = path.replace(/\/?$/, '/') + is + ext;
              ownerDocument.head.appendChild(js);
            }

            crawl(node.querySelectorAll('*'));
          }
        }
      }
    };

    var crawl = function crawl(addedNodes) {
      load([{
        addedNodes: addedNodes
      }]);
    };

    crawl(ownerDocument == target ? target.querySelectorAll('*') : [target]);
    var observer = new MutationObserver(load);
    observer.observe(target, {
      subtree: true,
      childList: true
    });
    return observer;
  });

  exports.default = index;

  return exports;

}({}).default);
