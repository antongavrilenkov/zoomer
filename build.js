'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Zoomer Component (test home work, don't use it in production)
 * @author Anton Gavrilenkov <antongavrilenkov@gmail.com>
 */
var Zoomer = function () {
    /**
     * Define default class parameters.
     */
    function Zoomer() {
        var zoomerId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'zoomer';

        _classCallCheck(this, Zoomer);

        this.addComponentHtmlToDOM(zoomerId);

        // Define Image Container and Image nodes variables.
        this.imageContainer = document.querySelector('.zoomer__img-container');
        this.image = document.querySelector('.zoomer__image');

        // Define a default image state.
        this.imageState = {
            zoomed: false,
            clientX: null,
            clientY: null
        };

        // Zoom In and Zoom Out buttons
        this.zoomInButton = document.getElementById("zoomer__zoom-in-button");
        this.zoomOutButton = document.getElementById("zoomer__zoom-out-button");

        // Define a default zoom ratio.
        this.zoomRatio = 3;

        // Initialize Zoomer component.
        this.initComponent();
    }

    /**
     * Create DOM element from HTML string helper.
     * @param {string} htmlString
     */


    _createClass(Zoomer, [{
        key: 'createElementFromHTML',
        value: function createElementFromHTML(htmlString) {
            var div = document.createElement('div');
            div.innerHTML = htmlString.trim();

            // Change this to div.childNodes to support multiple top-level nodes
            return div.firstChild;
        }

        /**
         * Add Zommer component HTML to DOM.
         * @param {string} zoomerId
         */

    }, {
        key: 'addComponentHtmlToDOM',
        value: function addComponentHtmlToDOM(zoomerId) {
            // Create Document Fragment.
            var fragment = document.createDocumentFragment();

            // Append Image Container and Zoom In and Zoom Out buttons to Document Fragment.
            var zoomerImageContainer = '\n            <div class="zoomer__img-container">\n                <img class="zoomer__image" src="https://bonobos-prod-s3.imgix.net/products/18158/original/SHIRT_ShortSleeve_ZebraRun_JetBlack_hero1.jpg?w=1200" alt="">\n            </div>';
            var zoomerControls = '\n            <div class="zoomer__controls">\n                <button id="zoomer__zoom-in-button"></button>\n                <button disabled id="zoomer__zoom-out-button"></button>\n            </div>';
            fragment.appendChild(this.createElementFromHTML(zoomerImageContainer));
            fragment.appendChild(this.createElementFromHTML(zoomerControls));

            // Append Document Fragment to Document.
            document.getElementById(zoomerId).appendChild(fragment);
        }

        /**
         * Set Image Position on Zoomer class initialisation.
         */

    }, {
        key: 'initImagePosition',
        value: function initImagePosition() {
            var leftPosition = -(this.imageContainer.offsetWidth - this.image.width) / 2;
            this.imageContainer.scrollLeft = leftPosition;
        }

        /**
         * Update Image Position after Zoom In button or Zoom Out button was clicked.
         */

    }, {
        key: 'updateImgPosition',
        value: function updateImgPosition() {
            // Set horizontal image position.
            var scrollLeft = -(this.imageContainer.offsetWidth - this.image.width) / 2;
            this.imageContainer.scrollLeft = scrollLeft;

            // Set vertical image position.
            var scrollTop = -(this.imageContainer.offsetHeight - this.image.height) / 2;
            if (this.image.height > this.imageContainer.offsetHeight && !this.imageState.zoomed) {
                scrollTop = 0;
            }
            this.imageContainer.scrollTop = scrollTop;
        }

        /**
         * When you click on a zoom in button, an image zoom in.
         */

    }, {
        key: 'onZoomInHandler',
        value: function onZoomInHandler() {
            // Memorize image width and height parameters before zooming in.
            var imageWidth = this.image.width;
            var imageHeight = this.image.height;

            // Zooming in the image.
            this.image.width = imageWidth * this.zoomRatio;
            this.image.height = imageHeight * this.zoomRatio;

            // Change image zoomed state.
            this.imageState.zoomed = true;

            // Update image position in the browser window.
            this.updateImgPosition();

            // Update zoom in and zoom out buttons' disabled attributes.
            this.zoomInButton.setAttribute('disabled', true);
            this.zoomOutButton.removeAttribute('disabled');
        }

        /**
         * When you click on a zoom out button, an image zoom out.
         */

    }, {
        key: 'onZoomOutHandler',
        value: function onZoomOutHandler() {
            // Memorize image width and height parameters before zooming in.
            var imageWidth = this.image.width;
            var imageHeight = this.image.height;

            // Zooming out the image.
            this.image.width = imageWidth / this.zoomRatio;
            this.image.height = imageHeight / this.zoomRatio;
            this.imageState.zoomed = false;

            // Update image position in the browser window.
            this.updateImgPosition();

            // Update zoom in and zoom out buttons' disabled attributes.
            this.zoomOutButton.setAttribute('disabled', true);
            this.zoomInButton.removeAttribute('disabled');
        }

        /**
         * When you single click a zoomed in image, it zoom out.
         * When you single click a zoomed out image, it zoom in.
         */

    }, {
        key: 'onImageClickHandler',
        value: function onImageClickHandler() {
            // Invoke Zoom In or Zoom Out method depends on 'zoomed' image state.
            if (this.imageState.zoomed) {
                this.onZoomOutHandler();
            } else {
                this.onZoomInHandler();
            }
        }

        /**
         * Panning of a zoomed image.
         * @param {Object} event
         */

    }, {
        key: 'onDragStartHandler',
        value: function onDragStartHandler(event) {
            // Memorize current clientX and clientY position
            // for use in 'onDragOverHandler' method.
            this.imageState.clientX = event.clientX;
            this.imageState.clientY = event.clientY;

            // Set a transparent image as Drag Image
            var img = new Image();
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
            event.dataTransfer.setDragImage(img, 0, 0);
        }

        /**
         * Continue of panning a zoomed image.
         * @param {Object} event
         */

    }, {
        key: 'onDragOverHandler',
        value: function onDragOverHandler(event) {
            // Look up on previous clientX position, calculate
            // a new horizontal image position and apply it to the image.
            var moveX = this.imageState.clientX - event.clientX;
            var newPositionX = this.imageContainer.scrollLeft + moveX;
            this.imageContainer.scrollLeft = newPositionX;

            // Look up on previous clientY position, calculate
            // a new vertical image position and apply it to the image.
            var moveY = this.imageState.clientY - event.clientY;
            var newPositionY = this.imageContainer.scrollTop + moveY;
            this.imageContainer.scrollTop = newPositionY;

            // Memorize current clientX and clientY position
            // for use in 'onDragOverHandler' method.
            this.imageState.clientX = event.clientX;
            this.imageState.clientY = event.clientY;

            // Remove 'ghost' image.
            event.dataTransfer.dropEffect = "none";

            // Prevent default behavior.
            event.preventDefault();
        }

        /**
         * Component Initialisation Method.
         */

    }, {
        key: 'initComponent',
        value: function initComponent() {
            var _this = this;

            // Add 'click' event listener to an image.
            this.image.addEventListener("click", function () {
                _this.onImageClickHandler();
            });

            // Add 'click' event listener to a 'zoom in' button.
            this.zoomInButton.addEventListener("click", function () {
                _this.onZoomInHandler();
            });

            // Add 'click' event listener to a 'zoom out' button.
            this.zoomOutButton.addEventListener("click", function () {
                _this.onZoomOutHandler();
            });

            // Add 'dragstart' event listener to a 'zoom out' button.
            this.imageContainer.addEventListener("dragstart", function (event) {
                document.body.className = 'dragstart';
                _this.onDragStartHandler(event);
            }, false);

            // Add 'dragend' event listener to the image.
            this.imageContainer.addEventListener("dragover", function (event) {
                _this.onDragOverHandler(event);
            }, false);

            // Add onDragOver event listener to the image.
            this.imageContainer.addEventListener("dragend", function (event) {
                document.body.className = '';
            }, false);

            // Initialize start image position.
            this.initImagePosition();
        }
    }]);

    return Zoomer;
}();

// Create an instance of Zoomer class.


new Zoomer();