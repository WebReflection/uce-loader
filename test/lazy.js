addEventListener(
  'DOMContentLoaded',
  function () {
    uceLoader({
      Template: customElements.get('uce-template'),
      on: function (name) {
        if (name !== 'uce-template') {
          var xhr = new XMLHttpRequest;
          var Template = this.Template;
          xhr.open('get', name + '.uce', true);
          xhr.send(null);
          xhr.onload = function () {
            document.body.appendChild(
              Template.from(xhr.responseText)
            );
          };
        }
      }
    });
  },
  {once: true}
);
