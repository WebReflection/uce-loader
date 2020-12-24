self.uceLoader = (function (exports) {
  'use strict';

  // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
  var ignore = /^(?:annotation-xml|color-profile|font-face(?:|-format|-name|-src|-uri)|missing-glyph)$/i;
  var loaded = new Set();
  /**
   * @typedef {Object} Options
   * @prop {Node} [container=document] - where to monitor Custom Elements
   * @prop {function} on - a callback invoked per each new Custom Element
   */

  /**
   * Start observing a document, or a specific container, and automatically
   * download once Custom Elements from a specific path.
   * @param {Options} options configuration options
   * @returns {MutationObserver} the disconnect-able `container` observer
   */

  var index = (function (options) {
    var target = options.container || document;

    var load = function load(mutations) {
      for (var i = 0, length = mutations.length; i < length; i++) {
        for (var addedNodes = mutations[i].addedNodes, j = 0, _length = addedNodes.length; j < _length; j++) {
          var node = addedNodes[j];
          var children = node.children,
              getAttribute = node.getAttribute,
              tagName = node.tagName;

          if (getAttribute) {
            var is = (getAttribute.call(node, 'is') || tagName).toLowerCase();

            if (0 < is.indexOf('-') && !loaded.has(is) && !ignore.test(is)) {
              loaded.add(is);
              customElements.get(is) || options.on(is);
            }

            crawl(children);
          }
        }
      }
    };

    var crawl = function crawl(addedNodes) {
      load([{
        addedNodes: addedNodes
      }]);
    };

    crawl([document == target ? target.documentElement : target]);
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
