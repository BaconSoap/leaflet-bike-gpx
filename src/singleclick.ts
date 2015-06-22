/**
 * Adds the event type 'singleclick' to L.Map
 */
module LeafletSingleClick {
  export function attach(doubleClickDelay: number): void {
    L.Map.addInitHook(function() {
      var that = this;
      var onClickTimeout;

      that.on('click', onClick);
      that.on('dblclick', onDoubleClick);

      function onClick(e) {
        clearClickTimeout();

        onClickTimeout = setTimeout(function() { fireSingleClick(e); }, doubleClickDelay);
      }

      function onDoubleClick() {
        clearClickTimeout();
      }

      function fireSingleClick(e) {
        that.fire('singleclick', L.Util.extend(e, {type: 'singleclick'}));
      };

      function clearClickTimeout() {
        if (onClickTimeout === null) {
          return;
        }

        clearTimeout(onClickTimeout);
        onClickTimeout = null;
      }

    });
  }
}

LeafletSingleClick.attach(200);
