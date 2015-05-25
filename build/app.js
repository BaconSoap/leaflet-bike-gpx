var util;
(function (util) {
    /**
     * Get an element by its ID
     */
    util.getById = function (id) {
        return document.getElementById(id);
    };
    /**
     * Add an event listener to an element located by its ID
     */
    util.onById = function (id, eventName, cb) {
        util.getById(id).addEventListener(eventName, cb);
    };
    /**
     * Change the text of the given element
     */
    util.changeTextById = function (id, text) {
        util.getById(id).innerText = text;
    };
})(util || (util = {}));
/**
 * Adds the event type 'singleclick' to L.Map
 */
var LeafletSingleClick;
(function (LeafletSingleClick) {
    function attach(doubleClickDelay) {
        L.Map.addInitHook(function () {
            var that = this;
            var onClickTimeout;
            that.on('click', onClick);
            that.on('dblclick', onDoubleClick);
            function onClick(e) {
                clearClickTimeout();
                onClickTimeout = setTimeout(function () { fireSingleClick(e); }, doubleClickDelay);
            }
            function onDoubleClick() {
                clearClickTimeout();
            }
            function fireSingleClick(e) {
                that.fire('singleclick', L.Util.extend(e, { type: 'singleclick' }));
            }
            ;
            function clearClickTimeout() {
                if (onClickTimeout === null) {
                    return;
                }
                clearTimeout(onClickTimeout);
                onClickTimeout = null;
            }
        });
    }
    LeafletSingleClick.attach = attach;
})(LeafletSingleClick || (LeafletSingleClick = {}));
LeafletSingleClick.attach(200);
///<reference path="domTools.ts" />
///<reference path="singleclick.ts" />
var maps;
(function (maps) {
    var map;
    var nextMarkerNumber = 1;
    var catImg = '<img src="http://thecatapi.com/api/images/get?format=src&type=png&size=small">';
    var isDrawing = false;
    var isClustered = false;
    var polygons = {};
    var nextPolygonId = 0;
    var markers = [];
    var clusters = [];
    var colors = ["#ff0000", "#a67f53", "#40ff8c", "#004b8c", "#fbbfff", "#bf0000", "#594f43", "#6cd998", "#7c92a6", "#bf00b3", "#400000", "#cc8800", "#004022", "#0066ff", "#731d62", "#ff8080", "#f2c200", "#4d665a", "#1a2433", "#a65395", "#331a1a", "#665200", "#8fbfaf", "#162859", "#73566d", "#a65e53", "#403610", "#238c77", "#7999f2", "#40303a", "#cca099", "#999126", "#00f2e2", "#0022ff", "#f23d9d", "#806460", "#f2ea79", "#003c40", "#6060bf", "#cc99b4", "#ffa280", "#7d8060", "#30b6bf", "#0f0073", "#591631", "#4c3026", "#c3e639", "#00add9", "#a099cc", "#f20041", "#4c1f00", "#414d13", "#006680", "#7033cc", "#cc335c", "#ff8c40", "#d2e6ac", "#303d40", "#210d33", "#804051", "#e6c3ac", "#93bf60", "#0080bf", "#583973", "#73000f", "#995200", "#52cc00", "#004466", "#ca79f2", "#ffc480", "#208039", "#bfeaff", "#cc00ff"];
    function init() {
        // create a new map with no base layer
        map = new L.Map("map", {
            center: new L.LatLng(42.3964631, -71.1205171),
            zoom: 16,
            editable: true
        });
        // use Stamen's 'terrain' base layer
        var layer = new L.StamenTileLayer("terrain");
        map.addLayer(layer);
        // add a marker at the center of the map
        addMarker([42.3964631, -71.1205171]);
        //util.onById('toggleDrawing', 'click', toggleDrawing);
        //map.on('editable:drawing:start', onDrawingStart);
        var data = omnivore.gpx('data/20150617-213807-Ride.gpx');
        data.on('ready', function () {
            console.log(data.getLayers()[0]);
            data.addTo(map);
        });
    }
    /**
     * add a marker with a popup at the specified coordinates
     */
    function addMarker(coords) {
        var marker = L.marker(coords);
        marker.addTo(map);
        markers.push(marker);
    }
    document.addEventListener('DOMContentLoaded', init);
})(maps || (maps = {}));
