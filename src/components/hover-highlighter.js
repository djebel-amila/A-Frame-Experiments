//This component transforms the color, opacity and scale of entity (supposedly)
AFRAME.registerComponent('hover-highlighter', {
    schema: {
      color: {type: 'color', default: 'white'},
      opacity: {type: 'number', default: '.5'},
      scale: {type: 'vec3', default: '2, 2, 2'}
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
      this.savedOpacity = cursor.getAttribute("material").opacity;
      this.savedScale = cursor.getAttribute("scale");
      cursor.setAttribute("material", "color", this.data.color);
      cursor.setAttribute("material", "opacity", this.data.opacity);
      cursor.setAttribute("scale", this.data.scale);
    },


    onLeave: function (evt) {
      let cursor = evt.detail.cursorEl;
      cursor.setAttribute("material", "color", this.savedColor);
      cursor.setAttribute("material", "opacity", this.savedOpacity);
      cursor.setAttribute("scale", [this.savedScale]);
    },

    remove: function () {
      let target = this.el;
      /* enlever les event listeners et leur methode pour les enlever avec le component, pour éviter un memory leak */
      target.removeEventListener("mouseenter", this.handlerOnEnter);
      target.removeEventListener("mouseleave", this.handlerOnLeave);
    }
  });
