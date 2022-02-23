AFRAME.registerComponent('hover-scaledown', {
    schema: {
      scaledown: {type: 'number', default: 1},
    },
    init: function () {
      let target = this.el;
      /* stocker les event listeners et leur methode pour les enlever avec le component, pour éviter le memory leak lorsqu’on l’enlève */
      this.handlerOnEnter = evt => this.onEnter(evt);
      this.handlerOnLeave = evt => this.onLeave(evt);
      target.addEventListener("mouseenter", this.handlerOnEnter);
      target.addEventListener("mouseleave", this.handlerOnLeave);
    },
    onEnter: function (evt) {
      let cursor = evt.detail.cursorEl;
      this.savedColor = cursor.getAttribute("material").color;
      cursor.setAttribute("material", "color", this.data.color);
    },
    onLeave: function (evt) {
      let cursor = evt.detail.cursorEl;
      cursor.setAttribute("material", "color", this.savedColor);
    },
    remove: function () {
      let target = this.el;
      /* enlever les event listeners et leur methode pour les enlever avec le component, pour éviter un memory leak */
      target.removeEventListener("mouseenter", this.handlerOnEnter);
      target.removeEventListener("mouseleave", this.handlerOnLeave);
    }
  });