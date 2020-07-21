// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
const ignore = /^(?:annotation-xml|color-profile|font-face(?:|-format|-name|-src|-uri)|missing-glyph)$/i;
const loaded = new Set;

/**
 * Start observing a document, or a specific container, and automatically
 * download once Custom Elements from a specific path
 * @param {string} path where to find custom elements files
 * @param {{container:Node, extension:string}} [options] optional configuration
 * with `container`, `document` by default, and `extension`, `".js"` by default
 * @returns {MutationObserver} the disconnect-able `container` observer
 */
export default (path, options = {}) => {
  const ext = options.extension || '.js';
  const target = options.container || document;
  const ownerDocument = target.ownerDocument || target;
  const load = mutations => {
    for (let i = 0, {length} = mutations; i < length; i++) {
      for (let
        {addedNodes} = mutations[i],
        j = 0, {length} = addedNodes; j < length; j++
      ) {
        const node = addedNodes[j];
        if (node.querySelectorAll) {
          const is = (node.getAttribute('is') || node.tagName).toLowerCase();
          if (0 < is.indexOf('-') && !loaded.has(is) && !ignore.test(is)) {
            loaded.add(is);
            const js = ownerDocument.createElement('script');
            js.async = true;
            js.src = path.replace(/\/?$/, '/') + is + ext;
            ownerDocument.head.appendChild(js);
          }
          crawl(node.querySelectorAll('*'));
        }
      }
    }
  };
  const crawl = addedNodes => { load([{addedNodes}]) };
  crawl(ownerDocument == target ? target.querySelectorAll('*') : [target]);
  const observer = new MutationObserver(load);
  observer.observe(target, {subtree: true, childList: true});
  return observer;
};
