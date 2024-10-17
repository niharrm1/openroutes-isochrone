"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useIsochrone = require("../hooks/useIsochrone");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var MapWithIsochrone = function MapWithIsochrone(_ref) {
  var googleMapsApiKey = _ref.googleMapsApiKey,
    openRouteServiceApiKey = _ref.openRouteServiceApiKey,
    centerLat = _ref.centerLat,
    centerLng = _ref.centerLng,
    mapHeight = _ref.mapHeight,
    mapWidth = _ref.mapWidth,
    isochroneLat = _ref.isochroneLat,
    isochroneLng = _ref.isochroneLng,
    mode = _ref.mode,
    range = _ref.range;
  var mapRef = (0, _react.useRef)(null);
  var isochrone = (0, _useIsochrone.useIsochrone)({
    lat: isochroneLat,
    lng: isochroneLng,
    mode: mode,
    range: range,
    apiKey: openRouteServiceApiKey
  });
  (0, _react.useEffect)(function () {
    var loadGoogleMaps = function loadGoogleMaps() {
      var script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=".concat(googleMapsApiKey, "&callback=initMap");
      script.async = true;
      script.defer = true;
      window.document.body.appendChild(script);
      script.onload = function () {
        var map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: centerLat,
            lng: centerLng
          },
          zoom: 12
        });
        if (isochrone) {
          var isochronePolygon = new window.google.maps.Polygon({
            paths: isochrone.features[0].geometry.coordinates[0].map(function (coord) {
              return {
                lat: coord[1],
                lng: coord[0]
              };
            }),
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          });
          isochronePolygon.setMap(map);
        }
      };
    };
    if (!window.google) {
      loadGoogleMaps();
    } else {
      var map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: centerLat,
          lng: centerLng
        },
        zoom: 12
      });
    }
  }, [googleMapsApiKey, isochrone, centerLat, centerLng]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: mapRef,
    style: {
      height: mapHeight,
      width: mapWidth
    }
  });
};
MapWithIsochrone.propTypes = {
  googleMapsApiKey: _propTypes["default"].string.isRequired,
  openRouteServiceApiKey: _propTypes["default"].string.isRequired,
  centerLat: _propTypes["default"].number.isRequired,
  centerLng: _propTypes["default"].number.isRequired,
  mapHeight: _propTypes["default"].string.isRequired,
  mapWidth: _propTypes["default"].string.isRequired,
  isochroneLat: _propTypes["default"].number.isRequired,
  isochroneLng: _propTypes["default"].number.isRequired,
  mode: _propTypes["default"].string.isRequired,
  range: _propTypes["default"].number.isRequired
};
var _default = exports["default"] = MapWithIsochrone;