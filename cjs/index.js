'use strict';
// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
const ignore = /^(?:annotation-xml|color-profile|font-face(?:|-format|-name|-src|-uri)|missing-glyph)$/i;
const loaded = new Set;

/**
 * Start observing a document, or a specific container, and automatically
 * download once Custom Elements from a specific path
 * @param {{container:Node, on:function}} configuration
 * with `container`, `document` by default, and `extension`, `".js"` by default
 * @returns {MutationObserver} the disconnect-able `container` observer
 */
module.exports = (options) => {
  const target = options.container || document;
  const load = mutations => {
    for (let i = 0, {length} = mutations; i < length; i++) {
      for (let
        {addedNodes} = mutations[i],
        j = 0, {length} = addedNodes; j < length; j++
      ) {
        const node = addedNodes[j];
        const {children, getAttribute, tagName} = node;
        if (getAttribute) {
          const is = (getAttribute.call(node, 'is') || tagName).toLowerCase();
          if (0 < is.indexOf('-') && !loaded.has(is) && !ignore.test(is)) {
            loaded.add(is);
            options.on(is);
          }
          crawl(children);
        }
      }
    }
  };
  const crawl = addedNodes => { load([{addedNodes}]) };
  crawl(document == target ? target.documentElement.children : [target]);
  const observer = new MutationObserver(load);
  observer.observe(target, {subtree: true, childList: true});
  return observer;
};
