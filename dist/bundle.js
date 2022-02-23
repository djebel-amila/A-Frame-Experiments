/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/animate-rotation.js":
/*!********************************************!*\
  !*** ./src/components/animate-rotation.js ***!
  \********************************************/
/***/ (() => {

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

/***/ }),

/***/ "./src/components/animate-scale.js":
/*!*****************************************!*\
  !*** ./src/components/animate-scale.js ***!
  \*****************************************/
/***/ (() => {

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

/***/ }),

/***/ "./src/components/cursor-listener.js":
/*!*******************************************!*\
  !*** ./src/components/cursor-listener.js ***!
  \*******************************************/
/***/ (() => {

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

/***/ }),

/***/ "./src/components/hover-highlighter.js":
/*!*********************************************!*\
  !*** ./src/components/hover-highlighter.js ***!
  \*********************************************/
/***/ (() => {

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


/***/ }),

/***/ "./src/components/hover-scaledown.js":
/*!*******************************************!*\
  !*** ./src/components/hover-scaledown.js ***!
  \*******************************************/
/***/ (() => {

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

/***/ }),

/***/ "./src/components/listen-to.js":
/*!*************************************!*\
  !*** ./src/components/listen-to.js ***!
  \*************************************/
/***/ (() => {

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

/***/ }),

/***/ "./src/components/toggle-events.js":
/*!*****************************************!*\
  !*** ./src/components/toggle-events.js ***!
  \*****************************************/
/***/ (() => {

// Component to toggle an event.
AFRAME.registerComponent('toggle-events', {
    multiple: true,
    
    schema: {
        sourceEvt: {type: 'string', default: 'click'},
        evt1: {type: 'string'},
        evt2: {type: 'string'}
    },

    init: function () {
      this.state = 0;
      this.el.addEventListener(this.data.sourceEvt,  evt => {
        if (this.state == 0) {
            this.el.dispatchEvent(new Event(this.data.evt1))
            this.state = 1;
        }
        else {
            this.el.dispatchEvent(new Event(this.data.evt2))
            this.state = 0;
        }
      });
    }
  });

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_animate_rotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/animate-rotation */ "./src/components/animate-rotation.js");
/* harmony import */ var _components_animate_rotation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_animate_rotation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_animate_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/animate-scale */ "./src/components/animate-scale.js");
/* harmony import */ var _components_animate_scale__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_animate_scale__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_cursor_listener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/cursor-listener */ "./src/components/cursor-listener.js");
/* harmony import */ var _components_cursor_listener__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_cursor_listener__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_hover_highlighter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/hover-highlighter */ "./src/components/hover-highlighter.js");
/* harmony import */ var _components_hover_highlighter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_hover_highlighter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_hover_scaledown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/hover-scaledown */ "./src/components/hover-scaledown.js");
/* harmony import */ var _components_hover_scaledown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_hover_scaledown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_toggle_events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/toggle-events.js */ "./src/components/toggle-events.js");
/* harmony import */ var _components_toggle_events_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_toggle_events_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_listen_to_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/listen-to.js */ "./src/components/listen-to.js");
/* harmony import */ var _components_listen_to_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_listen_to_js__WEBPACK_IMPORTED_MODULE_6__);
//import './components/emit-when-near';
//import './components/on-event-set';








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRCQUE0QjtBQUM1QyxjQUFjLDZCQUE2QjtBQUMzQyxpQkFBaUI7QUFDakIsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7QUN6QkQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1QyxjQUFjLDZCQUE2QjtBQUMzQyxpQkFBaUI7O0FBRWpCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLEtBQUs7O0FBRUw7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7OztBQ3pCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7Ozs7Ozs7OztBQ3hCSDtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdDQUFnQztBQUM5QyxnQkFBZ0IsOEJBQThCO0FBQzlDLGNBQWM7QUFDZCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7Ozs7Ozs7Ozs7O0FDdkNIO0FBQ0E7QUFDQSxrQkFBa0IsMkJBQTJCO0FBQzdDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7Ozs7Ozs7OztBQzNCSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksaUNBQWlDO0FBQzdDLGVBQWUsaUJBQWlCO0FBQ2hDLGFBQWE7QUFDYixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7Ozs7Ozs7OztBQ2JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUNBQWlDO0FBQ3JELGVBQWUsZUFBZTtBQUM5QixlQUFlO0FBQ2YsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7Ozs7O1VDdkJIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDdUM7QUFDSDtBQUNFO0FBQ0U7QUFDRjtBQUNDO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtcm90YXRpb24uanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLXNjYWxlLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvY3Vyc29yLWxpc3RlbmVyLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvaG92ZXItaGlnaGxpZ2h0ZXIuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9ob3Zlci1zY2FsZWRvd24uanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9saXN0ZW4tdG8uanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy90b2dnbGUtZXZlbnRzLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2FuaW1hdGUtcm90YXRpb24nLCB7XG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgXG4gICAgc2NoZW1hOiB7XG4gICAgICAgIHNwZWVkOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDEwfSxcbiAgICAgICAgYXhlOiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICd4J30sXG4gICAgICAgIGFjdGl2ZToge3R5cGU6ICdpbnQnLCBkZWZhdWx0OiAwfVxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5zcGVlZClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lbC5vYmplY3QzRC5yb3RhdGlvbikgKi9cbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIH0sXG5cbiAgICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5hY3RpdmU9PT0xKXtcbiAgICAgICAgICAgIHRoaXMuZWwub2JqZWN0M0Qucm90YXRpb25bdGhpcy5kYXRhLmF4ZV0gPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoZWxhcHNlZCAvIHRoaXMuZGF0YS5zcGVlZCk7XG4gICAgICAgIH1cbiAgICB9XG59KSIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnYW5pbWF0ZS1zY2FsZScsIHtcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBzY2hlbWE6IHtcbiAgICAgICAgZmFjdG9yOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDF9LFxuICAgICAgICBheGU6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ3gnfSxcbiAgICAgICAgYWN0aXZlOiB7dHlwZTogJ2ludCcsIGRlZmF1bHQ6IDB9XG5cbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB9LFxuXG4gICAgdGljazogZnVuY3Rpb24gKGVsYXBzZWQpIHtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmRhdGEuYWN0aXZlPT09MSl7XG4gICAgICAgICAgICB0aGlzLmVsLm9iamVjdDNELnNjYWxlW3RoaXMuZGF0YS5heGVdID0gMSArICh0aGlzLmRhdGEuZmFjdG9yKSAqICgoTWF0aC5zaW4oKGVsYXBzZWQpIC8gMjAwKSkgLyAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSkiLCIvLyBDb21wb25lbnQgdG8gY2hhbmdlIHRvIGEgc2VxdWVudGlhbCBjb2xvciBvbiBjbGljay5cbkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnY3Vyc29yLWxpc3RlbmVyJywge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBsYXN0SW5kZXggPSAtMTtcbiAgICAgIHZhciBTV0lUQ0ggPSBbMSwwXTtcbiAgICBcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZWwuY29tcG9uZW50c1tcImFuaW1hdGUtcm90YXRpb25cIl0pO1xuXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgIGV2dCA9PiB7XG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY29tcG9uZW50cyB0byBwYXJzZSB0aG9zZSB3aXRoIGEg4oCcYWN0aXZl4oCdIHBhcmFtZXRlclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmVsLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbFN0YXRlID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoa2V5KS5hY3RpdmU7XG4gICAgICAgICAgICAvLyBpZiAoYWN0dWFsU3RhdGUgIT0gMCAmNiBhY3R1YWxTdGF0ZSAhPSAxKSBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIMOpcXVpdmFsZW50IMOg4oCmXG4gICAgICAgICAgICBpZiAoYWN0dWFsU3RhdGUgPT0gMCB8fCBhY3R1YWxTdGF0ZSA9PSAxKXtcbiAgICAgICAgICAgICAgICAvLyBzd2l0Y2ggc3RhdGUgZnJvbSAwIHRvIDEgb3IgMSB0byAwXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoa2V5LCAnYWN0aXZlJywgYWN0dWFsU3RhdGUgPyAwIDogMSkgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhrZXksIHRoaXMuZWwuZ2V0QXR0cmlidXRlKGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnSSB3YXMgY2xpY2tlZCBhdDogJywgZXZ0LmRldGFpbC5pbnRlcnNlY3Rpb24ucG9pbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTsiLCIvL1RoaXMgY29tcG9uZW50IHRyYW5zZm9ybXMgdGhlIGNvbG9yLCBvcGFjaXR5IGFuZCBzY2FsZSBvZiBlbnRpdHkgKHN1cHBvc2VkbHkpXG5BRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2hvdmVyLWhpZ2hsaWdodGVyJywge1xuICAgIHNjaGVtYToge1xuICAgICAgY29sb3I6IHt0eXBlOiAnY29sb3InLCBkZWZhdWx0OiAnd2hpdGUnfSxcbiAgICAgIG9wYWNpdHk6IHt0eXBlOiAnbnVtYmVyJywgZGVmYXVsdDogJy41J30sXG4gICAgICBzY2FsZToge3R5cGU6ICd2ZWMzJywgZGVmYXVsdDogJzIsIDIsIDInfVxuICAgIH0sXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZWw7XG4gICAgICAvKiBzdG9ja2VyIGxlcyBldmVudCBsaXN0ZW5lcnMgZXQgbGV1ciBtZXRob2RlIHBvdXIgbGVzIGVubGV2ZXIgYXZlYyBsZSBjb21wb25lbnQsIHBvdXIgw6l2aXRlciBsZSBtZW1vcnkgbGVhayBsb3JzcXXigJlvbiBs4oCZZW5sw6h2ZSAqL1xuICAgICAgdGhpcy5oYW5kbGVyT25FbnRlciA9IGV2dCA9PiB0aGlzLm9uRW50ZXIoZXZ0KTtcbiAgICAgIHRoaXMuaGFuZGxlck9uTGVhdmUgPSBldnQgPT4gdGhpcy5vbkxlYXZlKGV2dCk7XG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5oYW5kbGVyT25FbnRlcik7XG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5oYW5kbGVyT25MZWF2ZSk7XG4gICAgfSxcbiAgICBvbkVudGVyOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBsZXQgY3Vyc29yID0gZXZ0LmRldGFpbC5jdXJzb3JFbDtcbiAgICAgIHRoaXMuc2F2ZWRDb2xvciA9IGN1cnNvci5nZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiKS5jb2xvcjtcbiAgICAgIHRoaXMuc2F2ZWRPcGFjaXR5ID0gY3Vyc29yLmdldEF0dHJpYnV0ZShcIm1hdGVyaWFsXCIpLm9wYWNpdHk7XG4gICAgICB0aGlzLnNhdmVkU2NhbGUgPSBjdXJzb3IuZ2V0QXR0cmlidXRlKFwic2NhbGVcIik7XG4gICAgICBjdXJzb3Iuc2V0QXR0cmlidXRlKFwibWF0ZXJpYWxcIiwgXCJjb2xvclwiLCB0aGlzLmRhdGEuY29sb3IpO1xuICAgICAgY3Vyc29yLnNldEF0dHJpYnV0ZShcIm1hdGVyaWFsXCIsIFwib3BhY2l0eVwiLCB0aGlzLmRhdGEub3BhY2l0eSk7XG4gICAgICBjdXJzb3Iuc2V0QXR0cmlidXRlKFwic2NhbGVcIiwgdGhpcy5kYXRhLnNjYWxlKTtcbiAgICB9LFxuXG5cbiAgICBvbkxlYXZlOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBsZXQgY3Vyc29yID0gZXZ0LmRldGFpbC5jdXJzb3JFbDtcbiAgICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiLCBcImNvbG9yXCIsIHRoaXMuc2F2ZWRDb2xvcik7XG4gICAgICBjdXJzb3Iuc2V0QXR0cmlidXRlKFwibWF0ZXJpYWxcIiwgXCJvcGFjaXR5XCIsIHRoaXMuc2F2ZWRPcGFjaXR5KTtcbiAgICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJzY2FsZVwiLCBbdGhpcy5zYXZlZFNjYWxlXSk7XG4gICAgfSxcblxuICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZWw7XG4gICAgICAvKiBlbmxldmVyIGxlcyBldmVudCBsaXN0ZW5lcnMgZXQgbGV1ciBtZXRob2RlIHBvdXIgbGVzIGVubGV2ZXIgYXZlYyBsZSBjb21wb25lbnQsIHBvdXIgw6l2aXRlciB1biBtZW1vcnkgbGVhayAqL1xuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuaGFuZGxlck9uRW50ZXIpO1xuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuaGFuZGxlck9uTGVhdmUpO1xuICAgIH1cbiAgfSk7XG4iLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2hvdmVyLXNjYWxlZG93bicsIHtcbiAgICBzY2hlbWE6IHtcbiAgICAgIHNjYWxlZG93bjoge3R5cGU6ICdudW1iZXInLCBkZWZhdWx0OiAxfSxcbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmVsO1xuICAgICAgLyogc3RvY2tlciBsZXMgZXZlbnQgbGlzdGVuZXJzIGV0IGxldXIgbWV0aG9kZSBwb3VyIGxlcyBlbmxldmVyIGF2ZWMgbGUgY29tcG9uZW50LCBwb3VyIMOpdml0ZXIgbGUgbWVtb3J5IGxlYWsgbG9yc3F14oCZb24gbOKAmWVubMOodmUgKi9cbiAgICAgIHRoaXMuaGFuZGxlck9uRW50ZXIgPSBldnQgPT4gdGhpcy5vbkVudGVyKGV2dCk7XG4gICAgICB0aGlzLmhhbmRsZXJPbkxlYXZlID0gZXZ0ID0+IHRoaXMub25MZWF2ZShldnQpO1xuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuaGFuZGxlck9uRW50ZXIpO1xuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuaGFuZGxlck9uTGVhdmUpO1xuICAgIH0sXG4gICAgb25FbnRlcjogZnVuY3Rpb24gKGV2dCkge1xuICAgICAgbGV0IGN1cnNvciA9IGV2dC5kZXRhaWwuY3Vyc29yRWw7XG4gICAgICB0aGlzLnNhdmVkQ29sb3IgPSBjdXJzb3IuZ2V0QXR0cmlidXRlKFwibWF0ZXJpYWxcIikuY29sb3I7XG4gICAgICBjdXJzb3Iuc2V0QXR0cmlidXRlKFwibWF0ZXJpYWxcIiwgXCJjb2xvclwiLCB0aGlzLmRhdGEuY29sb3IpO1xuICAgIH0sXG4gICAgb25MZWF2ZTogZnVuY3Rpb24gKGV2dCkge1xuICAgICAgbGV0IGN1cnNvciA9IGV2dC5kZXRhaWwuY3Vyc29yRWw7XG4gICAgICBjdXJzb3Iuc2V0QXR0cmlidXRlKFwibWF0ZXJpYWxcIiwgXCJjb2xvclwiLCB0aGlzLnNhdmVkQ29sb3IpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5lbDtcbiAgICAgIC8qIGVubGV2ZXIgbGVzIGV2ZW50IGxpc3RlbmVycyBldCBsZXVyIG1ldGhvZGUgcG91ciBsZXMgZW5sZXZlciBhdmVjIGxlIGNvbXBvbmVudCwgcG91ciDDqXZpdGVyIHVuIG1lbW9yeSBsZWFrICovXG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5oYW5kbGVyT25FbnRlcik7XG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5oYW5kbGVyT25MZWF2ZSk7XG4gICAgfVxuICB9KTsiLCIvLyBDb21wb25lbnQgdG8gbGlzdGVuIHRvIG90aGVyIGV2ZW50cy5cbkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnbGlzdGVuLXRvJywge1xuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIHNjaGVtYToge1xuICAgICAgZXZ0OiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICdjbGljayd9LFxuICAgICAgdGFyZ2V0OiB7dHlwZTogJ3NlbGVjdG9yJ30sXG4gICAgICBlbWl0OiB7dHlwZTogJ3N0cmluZyd9XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRhdGEudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5kYXRhLmV2dCwgZXZ0ID0+IHtcbiAgICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCh0aGlzLmRhdGEuZW1pdCkpO1xuICAgICAgfSlcbiAgICB9XG4gIH0pOyIsIi8vIENvbXBvbmVudCB0byB0b2dnbGUgYW4gZXZlbnQuXG5BRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ3RvZ2dsZS1ldmVudHMnLCB7XG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgXG4gICAgc2NoZW1hOiB7XG4gICAgICAgIHNvdXJjZUV2dDoge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAnY2xpY2snfSxcbiAgICAgICAgZXZ0MToge3R5cGU6ICdzdHJpbmcnfSxcbiAgICAgICAgZXZ0Mjoge3R5cGU6ICdzdHJpbmcnfVxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnN0YXRlID0gMDtcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEuc291cmNlRXZ0LCAgZXZ0ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCh0aGlzLmRhdGEuZXZ0MSkpXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQodGhpcy5kYXRhLmV2dDIpKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vaW1wb3J0ICcuL2NvbXBvbmVudHMvZW1pdC13aGVuLW5lYXInO1xyXG4vL2ltcG9ydCAnLi9jb21wb25lbnRzL29uLWV2ZW50LXNldCc7XHJcbmltcG9ydCAnLi9jb21wb25lbnRzL2FuaW1hdGUtcm90YXRpb24nO1xyXG5pbXBvcnQgJy4vY29tcG9uZW50cy9hbmltYXRlLXNjYWxlJztcclxuaW1wb3J0ICcuL2NvbXBvbmVudHMvY3Vyc29yLWxpc3RlbmVyJztcclxuaW1wb3J0ICcuL2NvbXBvbmVudHMvaG92ZXItaGlnaGxpZ2h0ZXInO1xyXG5pbXBvcnQgJy4vY29tcG9uZW50cy9ob3Zlci1zY2FsZWRvd24nO1xyXG5pbXBvcnQgJy4vY29tcG9uZW50cy90b2dnbGUtZXZlbnRzLmpzJztcclxuaW1wb3J0ICcuL2NvbXBvbmVudHMvbGlzdGVuLXRvLmpzJztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9