AFRAME.registerComponent('animate-scale', {
    multiple: true,
    schema: {
        factor: {type: 'number', default: 1},
        axe: {type: 'string', default: 'x'},
        active: {type: 'int', default: 0}

    },
    init: function () {
        
    },

    remove: function () {
    },

    update: function () {
    },

    tick: function (elapsed) {
        
        if (this.data.active===1){
            this.el.object3D.scale[this.data.axe] = 1 + (this.data.factor) * ((Math.sin((elapsed) / 200)) / 10);
        }
        
    }
})