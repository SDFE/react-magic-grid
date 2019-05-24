import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MagicGrid from 'magic-grid';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var MagicGridWrapper = function MagicGridWrapper(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  var container = useRef(null);
  var grid = null;
  useEffect(function () {
    var timeout; // magic-grid handles resizing via its own `listen` method
    // unfortunately event listener it creates is not being cleaned up
    // that's why we don't use it and have our own instead
    // see: https://github.com/e-oj/Magic-Grid/issues/24

    var resize = function resize() {
      if (!timeout) timeout = setTimeout(function () {
        grid && grid.positionItems();
        timeout = null;
      }, 200);
    };

    if (!grid) {
      grid = new MagicGrid(_objectSpread({
        container: container.current
      }, props));
      window.addEventListener("resize", resize);
      resize();
    }

    grid.positionItems();
    return function () {
      window.removeEventListener("resize", resize);
    };
  });
  return React.createElement("div", {
    ref: container
  }, children);
};

MagicGridWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node)
};

export default MagicGridWrapper;
