import { BackgroundSimpleCode, ForegroundSimpleCode, DecorationCode } from './mod.ts';
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function checkCodeProperty(code, propertyName) {
    return !!code[propertyName] && typeof code[propertyName] === 'number';
}
function checkValidCodeOrRgb(color, enumValues) {
    return checkValidCode(color, enumValues) || color.red && color.green && color.blue;
}
function checkValidCode(color, enumValues) {
    return enumValues.includes(color);
}
function recursiveValidateTheme(referenceTheme, theme, location, errors) {
    Object.entries(referenceTheme).forEach(function(param) {
        var _param = _slicedToArray(param, 2), key = _param[0], referenceCode = _param[1];
        if (!referenceCode) {
            return;
        }
        if (typeof referenceCode !== 'object') {
            return;
        }
        var themeCode = theme[key];
        var childLocation = _toConsumableArray(location).concat([
            key
        ]);
        if (!checkCodeProperty(referenceCode, 'color') && !checkCodeProperty(referenceCode, 'backgroundColor') && !checkCodeProperty(referenceCode, 'decoration')) {
            if (!themeCode || typeof themeCode !== 'object') {
                errors.push("The theme should contain an object at ".concat(JSON.stringify(childLocation)));
                return;
            }
            recursiveValidateTheme(referenceCode, themeCode, childLocation, errors);
            return;
        }
        if (!themeCode || typeof themeCode !== 'object') {
            errors.push("The theme should contain a style at ".concat(JSON.stringify(childLocation)));
            return;
        }
        var themeColor = themeCode.color;
        if (themeColor && !checkValidCodeOrRgb(themeColor, Object.values(ForegroundSimpleCode))) {
            errors.push("The theme color is invalid at ".concat(JSON.stringify(childLocation), ". It should be a ForegroundSimpleCode or ForegroundRgbCode"));
        }
        var themeBackgroundColor = themeCode.backgroundColor;
        if (themeBackgroundColor && !checkValidCodeOrRgb(themeBackgroundColor, Object.values(BackgroundSimpleCode))) {
            errors.push("The theme backgroundColor is invalid at ".concat(JSON.stringify(childLocation), ". It should be a BackgroundSimpleCode or BackgroundRgbCode"));
        }
        var themeDecoration = themeCode.decoration;
        if (themeDecoration && !checkValidCode(themeDecoration, Object.values(DecorationCode))) {
            errors.push("The theme decoration is invalid at ".concat(JSON.stringify(childLocation), ". It should be a DecorationCode"));
        }
    });
    return errors;
}
export function validateTheme(referenceTheme, theme) {
    var errors = recursiveValidateTheme(referenceTheme, theme, [], []);
    if (errors.length) {
        throw new Error("[Theme errors]\n* ".concat(errors.join('\n* ')));
    }
    return theme;
}

//# sourceMappingURL=validateTheme.js.map