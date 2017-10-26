const win = window;

win.LazyLoad = (() => {
  const defaultSettings = {
    elements_selector: 'img',
    container: win,
    threshold: 300,
    throttle: 150,
    data_src: 'original',
    data_srcset: 'originalSet',
    class_loading: 'loading',
    class_loaded: 'loaded',
    class_error: 'error',
    class_initial: 'initial',
    skip_invisible: true,
    callback_load: null,
    callback_error: null,
    callback_set: null,
    callback_processed: null
  };

  const isBot = !('onscroll' in win) || /glebot/.test(navigator.userAgent);

  const callCallback = (callback, argument) => {
    if (callback) { callback(argument); }
  };

  const getTopOffset = (element) => element.getBoundingClientRect().top
    + (win.pageYOffset - element.ownerDocument.documentElement.clientTop);

  const isBelowViewport = (element, container, threshold) => {
    const fold = (container === win) ?
      win.innerHeight + win.pageYOffset :
      getTopOffset(container) + container.offsetHeight;
    return fold <= getTopOffset(element) - threshold;
  };

  const getLeftOffset = (element) => element.getBoundingClientRect().left
    + (win.pageXOffset - element.ownerDocument.documentElement.clientLeft);

  const isAtRightOfViewport = (element, container, threshold) => {
    const documentWidth = win.innerWidth;
    const fold = (container === win) ?
      documentWidth + win.pageXOffset :
      getLeftOffset(container) + documentWidth;
    return fold <= getLeftOffset(element) - threshold;
  };

  const isAboveViewport = (element, container, threshold) => {
    const fold = (container === win) ? win.pageYOffset : getTopOffset(container);
    return fold >= getTopOffset(element) + threshold + element.offsetHeight;
  };

  const isAtLeftOfViewport = (element, container, threshold) => {
    const fold = (container === win) ? win.pageXOffset : getLeftOffset(container);
    return fold >= getLeftOffset(element) + threshold + element.offsetWidth;
  };

  const isInsideViewport = (element, container, threshold) => !isBelowViewport(element, container, threshold) &&
    !isAboveViewport(element, container, threshold) &&
    !isAtRightOfViewport(element, container, threshold) &&
    !isAtLeftOfViewport(element, container, threshold);


  const setSourcesForPicture = (element, srcsetDataAttribute) => {
    const parent = element.parentElement;
    if (parent.tagName !== 'PICTURE') {
      return;
    }
    for (let i = 0; i < parent.children.length; i++) {
      const pictureChild = parent.children[i];
      if (pictureChild.tagName === 'SOURCE') {
        const sourceSrcset = pictureChild.dataset[srcsetDataAttribute];
        if (sourceSrcset) {
          pictureChild.setAttribute('srcset', sourceSrcset);
        }
      }
    }
  };

  const setSources = (element, srcsetDataAttribute, srcDataAttribute) => {
    const tagName = element.tagName;
    const elementSrc = element.dataset[srcDataAttribute];
    if (tagName === 'IMG') {
      setSourcesForPicture(element, srcsetDataAttribute);
      const imgSrcset = element.dataset[srcsetDataAttribute];
      if (imgSrcset) {
        element.setAttribute('srcset', imgSrcset);
      }
      if (elementSrc) {
        element.setAttribute('src', elementSrc);
      }
      return;
    }
    if (tagName === 'IFRAME') {
      if (elementSrc) {
        element.setAttribute('src', elementSrc);
      }
      return;
    }
    if (elementSrc) {
      element.style.backgroundImage = `url("${elementSrc}")`;
    }
  };

  class LazyLoad {
    constructor(instanceSettings) {
      this._settings = Object.assign({}, defaultSettings, instanceSettings);
      this._queryOriginNode = this._settings.container === win ? document : this._settings.container;

      this._previousLoopTime = 0;
      this._loopTimeout = null;
      this._boundHandleScroll = this.handleScroll.bind(this);

      this._isFirstLoop = true;
      win.addEventListener('resize', this._boundHandleScroll);
      this.update();
    }
    /*
   * Private methods
   */

    _reveal(element) {
      const settings = this._settings;

      function errorCallback() {
      /**
       * As this method is asynchronous, it must be protected against external destroy() calls
       */
        if (!settings) { return; }
        element.removeEventListener('load', loadCallback);
        element.removeEventListener('error', errorCallback);
        element.classList.remove(settings.class_loading);
        element.classList.add(settings.class_error);
        callCallback(settings.callback_error, element);
      }

      function loadCallback() {
      /* As this method is asynchronous, it must be protected against external destroy() calls */
        if (!settings) { return; }
        element.classList.remove(settings.class_loading);
        element.classList.add(settings.class_loaded);
        element.removeEventListener('load', loadCallback);
        element.removeEventListener('error', errorCallback);
        /* Calling LOAD callback */
        callCallback(settings.callback_load, element);
      }

      if (element.tagName === 'IMG' || element.tagName === 'IFRAME') {
        element.addEventListener('load', loadCallback);
        element.addEventListener('error', errorCallback);
        element.classList.add(settings.class_loading);
      }

      setSources(element, settings.data_srcset, settings.data_src);
      /* Calling SET callback */
      callCallback(settings.callback_set, element);
    }

    _loopThroughElements() {
      const settings = this._settings;
      const elements = this._elements;
      const elementsLength = (!elements) ? 0 : elements.length;
      const processedIndexes = [];
      const firstLoop = this._isFirstLoop;

      for (let i = 0; i < elementsLength; i++) {
        const element = elements[i];
        /* If must skip_invisible and element is invisible, skip it */
        if (settings.skip_invisible && (element.offsetParent === null)) {
          continue; // eslint-disable-line
        }

        if (isBot || isInsideViewport(element, settings.container, settings.threshold)) {
          if (firstLoop) {
            element.classList.add(settings.class_initial);
          }
          /* Start loading the image */
          this._reveal(element);
          /* Marking the element as processed. */
          processedIndexes.push(i);
          element.dataset.wasProcessed = true;
        }
      }
      /* Removing processed elements from this._elements. */
      while (processedIndexes.length) {
        elements.splice(processedIndexes.pop(), 1);
        /* Calling the end loop callback */
        callCallback(settings.callback_processed, elements.length);
      }
      /* Stop listening to scroll event when 0 elements remains */
      if (elementsLength === 0) {
        this._stopScrollHandler();
      }
      /* Sets isFirstLoop to false */
      if (firstLoop) {
        this._isFirstLoop = false;
      }
    }

    _purgeElements() {
      const elements = this._elements;
      const elementsLength = elements.length;
      const elementsToPurge = [];

      for (let i = 0; i < elementsLength; i++) {
        const element = elements[i];
        /* If the element has already been processed, skip it */
        if (element.dataset.wasProcessed) {
          elementsToPurge.push(i);
        }
      }
      /* Removing elements to purge from this._elements. */
      while (elementsToPurge.length > 0) {
        elements.splice(elementsToPurge.pop(), 1);
      }
    }

    _startScrollHandler() {
      if (!this._isHandlingScroll) {
        this._isHandlingScroll = true;
        this._settings.container.addEventListener('scroll', this._boundHandleScroll);
      }
    }

    _stopScrollHandler() {
      if (this._isHandlingScroll) {
        this._isHandlingScroll = false;
        this._settings.container.removeEventListener('scroll', this._boundHandleScroll);
      }
    }

    handleScroll() {
      const throttle = this._settings.throttle;

      if (throttle !== 0) {
        const now = Date.now();
        const remainingTime = throttle - (now - this._previousLoopTime);
        if (remainingTime <= 0 || remainingTime > throttle) {
          if (this._loopTimeout) {
            clearTimeout(this._loopTimeout);
            this._loopTimeout = null;
          }
          this._previousLoopTime = now;
          this._loopThroughElements();
        } else if (!this._loopTimeout) {
          this._loopTimeout = setTimeout(() => {
            this._previousLoopTime = Date.now();
            this._loopTimeout = null;
            this._loopThroughElements();
          }, remainingTime);
        }
      } else {
        this._loopThroughElements();
      }
    }

    update() {
      this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
      this._purgeElements();
      this._loopThroughElements();
      this._startScrollHandler();
    }

    destroy() {
      win.removeEventListener('resize', this._boundHandleScroll);
      if (this._loopTimeout) {
        clearTimeout(this._loopTimeout);
        this._loopTimeout = null;
      }
      this._stopScrollHandler();
      this._elements = null;
      this._queryOriginNode = null;
      this._settings = null;
    }
  }

  return LazyLoad;
})();


export default win.LazyLoad;
