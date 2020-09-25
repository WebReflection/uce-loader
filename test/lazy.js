addEventListener(
  'DOMContentLoaded',
  function () {
    uceLoader('.', {
      loader: function (path, name) {
        if (name !== 'uce-template') {
          var xhr = new XMLHttpRequest;
          xhr.open('get', path + name + '.uce', true);
          xhr.send(null);
          xhr.onload = function () {
            document.body.appendChild(
              customElements.get('uce-template')
                            .from(xhr.responseText)
            );
          };
        }
      }
    });
  },
  {once: true}
);
