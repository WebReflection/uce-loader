self.uceLoader=function(e){"use strict";const t=/^(?:annotation-xml|color-profile|font-face(?:|-format|-name|-src|-uri)|missing-glyph)$/i,n=new Set;return e.default=e=>{const o=e.container||document,r=o=>{for(let r=0,{length:a}=o;r<a;r++)for(let{addedNodes:a}=o[r],c=0,{length:d}=a;c<d;c++){const o=a[c],{children:r,getAttribute:d,tagName:i}=o;if(d){const a=(d.call(o,"is")||i).toLowerCase();0<a.indexOf("-")&&!n.has(a)&&!t.test(a)&&(n.add(a),e.on(a)),s(r)}}},s=e=>{r([{addedNodes:e}])};s(document==o?o.querySelectorAll("*"):[o]);const a=new MutationObserver(r);return a.observe(o,{subtree:!0,childList:!0}),a},e}({}).default;
