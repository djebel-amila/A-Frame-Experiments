// Component to change to a sequential color on click.
AFRAME.registerComponent('cursor-listener', {
    init: function () {
      var lastIndex = -1;
      var SWITCH = [1,0];
    
      // console.log(this.el.components["animate-rotation"]);

      this.el.addEventListener('click',  evt => {
        // loop through all components to parse those with a “active” parameter
        for (const key in this.el.components) {
            const actualState = this.el.getAttribute(key).active;
            // if (actualState != 0 &6 actualState != 1) continue;
            // équivalent à…
            if (actualState == 0 || actualState == 1){
                // switch state from 0 to 1 or 1 to 0
                this.el.setAttribute(key, 'active', actualState ? 0 : 1) 
            }
            // console.log(key, this.el.getAttribute(key));
        }
        
        // console.log('I was clicked at: ', evt.detail.intersection.point);
      });
    }
  });