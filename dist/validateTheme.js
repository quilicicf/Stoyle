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
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
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
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var ForegroundSimpleCode;
(function(ForegroundSimpleCode1) {
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Black"] = 30] = "FG_Black";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Red"] = 31] = "FG_Red";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Green"] = 32] = "FG_Green";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Yellow"] = 33] = "FG_Yellow";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Blue"] = 34] = "FG_Blue";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Magenta"] = 35] = "FG_Magenta";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Cyan"] = 36] = "FG_Cyan";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_White"] = 37] = "FG_White";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Bright_Black"] = 90] = "FG_Bright_Black";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Bright_Red"] = 91] = "FG_Bright_Red";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Bright_Green"] = 92] = "FG_Bright_Green";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Bright_Yellow"] = 93] = "FG_Bright_Yellow";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Bright_Blue"] = 94] = "FG_Bright_Blue";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Bright_Magenta"] = 95] = "FG_Bright_Magenta";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Bright_Cyan"] = 96] = "FG_Bright_Cyan";
    ForegroundSimpleCode1[ForegroundSimpleCode1["FG_Bright_White"] = 97] = "FG_Bright_White";
})(ForegroundSimpleCode || (ForegroundSimpleCode = {}));
var BackgroundSimpleCode;
(function(BackgroundSimpleCode1) {
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Black"] = 40] = "BG_Black";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Red"] = 41] = "BG_Red";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Green"] = 42] = "BG_Green";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Yellow"] = 43] = "BG_Yellow";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Blue"] = 44] = "BG_Blue";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Magenta"] = 45] = "BG_Magenta";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Cyan"] = 46] = "BG_Cyan";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_White"] = 47] = "BG_White";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Bright_Black"] = 100] = "BG_Bright_Black";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Bright_Red"] = 101] = "BG_Bright_Red";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Bright_Green"] = 102] = "BG_Bright_Green";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Bright_Yellow"] = 103] = "BG_Bright_Yellow";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Bright_Blue"] = 104] = "BG_Bright_Blue";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Bright_Magenta"] = 105] = "BG_Bright_Magenta";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Bright_Cyan"] = 106] = "BG_Bright_Cyan";
    BackgroundSimpleCode1[BackgroundSimpleCode1["BG_Bright_White"] = 107] = "BG_Bright_White";
})(BackgroundSimpleCode || (BackgroundSimpleCode = {}));
var DecorationCode;
(function(DecorationCode1) {
    DecorationCode1[DecorationCode1["Bold"] = 1] = "Bold";
    DecorationCode1[DecorationCode1["Dim"] = 2] = "Dim";
    DecorationCode1[DecorationCode1["Italic"] = 3] = "Italic";
    DecorationCode1[DecorationCode1["Underline"] = 4] = "Underline";
    DecorationCode1[DecorationCode1["Blink_Slow"] = 5] = "Blink_Slow";
    DecorationCode1[DecorationCode1["Blink_Fast"] = 6] = "Blink_Fast";
    DecorationCode1[DecorationCode1["Reverse_Video"] = 7] = "Reverse_Video";
    DecorationCode1[DecorationCode1["Conceal"] = 8] = "Conceal";
    DecorationCode1[DecorationCode1["Crossed_Out"] = 9] = "Crossed_Out";
    DecorationCode1[DecorationCode1["Primary"] = 10] = "Primary";
    DecorationCode1[DecorationCode1["Alternative_Font_1"] = 11] = "Alternative_Font_1";
    DecorationCode1[DecorationCode1["Alternative_Font_2"] = 12] = "Alternative_Font_2";
    DecorationCode1[DecorationCode1["Alternative_Font_3"] = 13] = "Alternative_Font_3";
    DecorationCode1[DecorationCode1["Alternative_Font_4"] = 14] = "Alternative_Font_4";
    DecorationCode1[DecorationCode1["Alternative_Font_5"] = 15] = "Alternative_Font_5";
    DecorationCode1[DecorationCode1["Alternative_Font_6"] = 16] = "Alternative_Font_6";
    DecorationCode1[DecorationCode1["Alternative_Font_7"] = 17] = "Alternative_Font_7";
    DecorationCode1[DecorationCode1["Alternative_Font_8"] = 18] = "Alternative_Font_8";
    DecorationCode1[DecorationCode1["Alternative_Font_9"] = 19] = "Alternative_Font_9";
    DecorationCode1[DecorationCode1["Fraktur"] = 20] = "Fraktur";
    DecorationCode1[DecorationCode1["Double_Underline"] = 21] = "Double_Underline";
    DecorationCode1[DecorationCode1["Normal"] = 22] = "Normal";
    DecorationCode1[DecorationCode1["Italic_And_Fraktur_Off"] = 23] = "Italic_And_Fraktur_Off";
    DecorationCode1[DecorationCode1["Underline_Off"] = 24] = "Underline_Off";
    DecorationCode1[DecorationCode1["Blink_Off"] = 25] = "Blink_Off";
    DecorationCode1[DecorationCode1["Proportional_Spacing"] = 26] = "Proportional_Spacing";
    DecorationCode1[DecorationCode1["Reverse_And_Invert_Off"] = 27] = "Reverse_And_Invert_Off";
    DecorationCode1[DecorationCode1["Reveal_And_Conceal_Off"] = 28] = "Reveal_And_Conceal_Off";
    DecorationCode1[DecorationCode1["Crossed_Off"] = 29] = "Crossed_Off";
})(DecorationCode || (DecorationCode = {}));
function checkRgbRange(code) {
    if (code < 0 || code > 255) throw Error("RGB codes should be between 0 & 255, got: ".concat(code));
    return code;
}
var RgbCode = function RgbCode1(red, green, blue) {
    "use strict";
    _classCallCheck(this, RgbCode1);
    this.red = checkRgbRange(red);
    this.green = checkRgbRange(green);
    this.blue = checkRgbRange(blue);
};
(function(RgbCode2) {
    "use strict";
    _inherits(ForegroundRgbCode, RgbCode2);
    var _super = _createSuper(ForegroundRgbCode);
    function ForegroundRgbCode() {
        _classCallCheck(this, ForegroundRgbCode);
        return _super.apply(this, arguments);
    }
    _createClass(ForegroundRgbCode, [
        {
            key: "toString",
            value: function toString() {
                return "38;2;".concat(this.red, ";").concat(this.green, ";").concat(this.blue);
            }
        }
    ]);
    return ForegroundRgbCode;
})(RgbCode);
(function(RgbCode3) {
    "use strict";
    _inherits(BackgroundRgbCode, RgbCode3);
    var _super = _createSuper(BackgroundRgbCode);
    function BackgroundRgbCode() {
        _classCallCheck(this, BackgroundRgbCode);
        return _super.apply(this, arguments);
    }
    _createClass(BackgroundRgbCode, [
        {
            key: "toString",
            value: function toString() {
                return "48;2;".concat(this.red, ";").concat(this.green, ";").concat(this.blue);
            }
        }
    ]);
    return BackgroundRgbCode;
})(RgbCode);
var StyleMode;
(function(StyleMode1) {
    StyleMode1[StyleMode1["STYLE"] = 0] = "STYLE";
    StyleMode1[StyleMode1["NO_STYLE"] = 1] = "NO_STYLE";
})(StyleMode || (StyleMode = {}));
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
        if (!referenceCode) return;
        if (typeof referenceCode !== 'object') return;
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
        if (themeColor && !checkValidCodeOrRgb(themeColor, Object.values(ForegroundSimpleCode))) errors.push("The theme color is invalid at ".concat(JSON.stringify(childLocation), ". It should be a ForegroundSimpleCode or ForegroundRgbCode"));
        var themeBackgroundColor = themeCode.backgroundColor;
        if (themeBackgroundColor && !checkValidCodeOrRgb(themeBackgroundColor, Object.values(BackgroundSimpleCode))) errors.push("The theme backgroundColor is invalid at ".concat(JSON.stringify(childLocation), ". It should be a BackgroundSimpleCode or BackgroundRgbCode"));
        var themeDecoration = themeCode.decoration;
        if (themeDecoration && !checkValidCode(themeDecoration, Object.values(DecorationCode))) errors.push("The theme decoration is invalid at ".concat(JSON.stringify(childLocation), ". It should be a DecorationCode"));
    });
    return errors;
}
function validateTheme(referenceTheme, theme) {
    var errors = recursiveValidateTheme(referenceTheme, theme, [], []);
    if (errors.length) throw new Error("[Theme errors]\n* ".concat(errors.join('\n* ')));
    return theme;
}
export { validateTheme as validateTheme };
