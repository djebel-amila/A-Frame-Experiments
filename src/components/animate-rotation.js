AFRAME.registerComponent('animate-rotation', {
    multiple: true,
    
    schema: {
        speed: {type: 'number', default: 10},
        axe: {type: 'string', default: 'x'},
        active: {type: 'int', default: 0}
    },

    init: function () {
        /* console.log(this.data.speed)
        console.log(this.el.object3D.rotation) */
    },

    remove: function () {
    },

    update: function () {
    },

    tick: function (elapsed, dt) {
        if (this.data.active===1){
            this.el.object3D.rotation[this.data.axe] = THREE.MathUtils.degToRad(elapsed / this.data.speed);
        }
    }
})