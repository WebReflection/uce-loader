addEventListener(
  'DOMContentLoaded',
  function () {
    uceLoader({
      on: function (name) {
        if (name !== 'uce-template') {
          var self = this;
          if (!self.queue) {
            self.queue = [name];
            var script = document.createElement('script');
            script.src = '//unpkg.com/uce-template';
            document.body.appendChild(script).onload = function () {
              self.Template = customElements.get('uce-template');
              for (var i = 0; i < self.queue.length; i++)
                self.loader(self.queue[i]);
            };
          }
          else if (self.Template) {
            var xhr = new XMLHttpRequest;
            xhr.open('get', name + '.uce', true);
            xhr.send(null);
            xhr.onload = function () {
              document.body.appendChild(
                self.Template.from(xhr.responseText)
              );
            };
          }
          else
            self.queue.push(name);
        }
      }
    });
  },
  {once: true}
);
