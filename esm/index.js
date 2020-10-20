// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
const ignore = /^(?:annotation-xml|color-profile|font-face(?:|-format|-name|-src|-uri)|missing-glyph)$/i;
const loaded = new Set;

const {ORDERED_NODE_SNAPSHOT_TYPE} = XPathResult;
const evaluator = new XPathEvaluator;
const expression = evaluator.createExpression(
  './/*[@is or contains(name(),"-")]',
  null
);

const add = (options, node) => {
  const is = (node.getAttribute('is') || node.tagName).toLowerCase();
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
export default options => {
  const target = options.container || document;
  const bound = all.bind(options);
  bound([{
    addedNodes: document == target ?
                  target.documentElement.children : [target]
  }]);
  const observer = new MutationObserver(bound);
  observer.observe(target, {subtree: true, childList: true});
  return observer;
};

function all(mutations) {
  for (let i = 0, {length} = mutations; i < length; i++) {
    for (let
      {addedNodes} = mutations[i],
      j = 0, {length} = addedNodes; j < length; j++
    ) {
      const node = addedNodes[j];
      if (node.getAttribute)
        add(this, node);
      for (let
        result = expression.evaluate(node, ORDERED_NODE_SNAPSHOT_TYPE, null),
        {snapshotLength} = result,
        k = 0; k < snapshotLength; k++
      )
        add(this, result.snapshotItem(k));
    }
  }
}
