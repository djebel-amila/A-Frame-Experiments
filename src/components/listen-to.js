// Component to listen to other events.
AFRAME.registerComponent('listen-to', {
    multiple: true,
    schema: {
      evt: {type: 'string', default: 'click'},
      target: {type: 'selector'},
      emit: {type: 'string'}
    },
    init: function () {
      this.data.target.addEventListener(this.data.evt, evt => {
        this.el.dispatchEvent(new Event(this.data.emit));
      })
    }
  });