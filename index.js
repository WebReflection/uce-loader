self.uceLoader = (function (exports) {
  'use strict';

  // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
  var ignore = /^(?:annotation-xml|color-profile|font-face(?:|-format|-name|-src|-uri)|missing-glyph)$/i;
  var loaded = new Set();
  var _XPathResult = XPathResult,
      ORDERED_NODE_SNAPSHOT_TYPE = _XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
  var evaluator = new XPathEvaluator();
  var expression = evaluator.createExpression('.//*[@is or contains(name(),"-")]', null);

  var add = function add(options, node) {
    var is = (node.getAttribute('is') || node.tagName).toLowerCase();

    if (!loaded.has(is) && 0 < is.indexOf('-') && !ignore.test(is)) {
      loaded.add(is);
      options.on(is);
    }
  };
  /**
   * Start observing a document, or a specific container, and automatically
   * download once Custom Elements from a specific path
   * @param {{container:Node, on:function}} configuration
   * with `container`, `document` by default, and `extension`, `".js"` by default
   * @returns {MutationObserver} the disconnect-able `container` observer
   */


  var index = (function (options) {
    var target = options.container || document;
    var bound = all.bind(options);
    bound([{
      addedNodes: document == target ? target.documentElement.children : [target]
    }]);
    var observer = new MutationObserver(bound);
    observer.observe(target, {
      subtree: true,
      childList: true
    });
    return observer;
  });

  function all(mutations) {
    for (var i = 0, length = mutations.length; i < length; i++) {
      for (var addedNodes = mutations[i].addedNodes, j = 0, _length = addedNodes.length; j < _length; j++) {
        var node = addedNodes[j];
        if (node.getAttribute) add(this, node);

        for (var result = expression.evaluate(node, ORDERED_NODE_SNAPSHOT_TYPE, null), snapshotLength = result.snapshotLength, k = 0; k < snapshotLength; k++) {
          add(this, result.snapshotItem(k));
        }
      }
    }
  }

  exports.default = index;

  return exports;

}({}).default);
