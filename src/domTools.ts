module util {
  /**
   * Get an element by its ID
   */
  export var getById = function(id) {
    return document.getElementById(id);
  };

  /**
   * Add an event listener to an element located by its ID
   */
  export var onById = function(id, eventName, cb) {
    util.getById(id).addEventListener(eventName, cb);
  }

  /**
   * Change the text of the given element
   */
  export var changeTextById = function(id, text) {
    util.getById(id).innerText = text;
  }
}
