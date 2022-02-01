function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
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
/**************
 * ANSI CODES *
 *************/ export var RESET_CODE = 0;
export var ForegroundSimpleCode;
(function(ForegroundSimpleCode) {
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Black"] = 30] = "FG_Black";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Red"] = 31] = "FG_Red";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Green"] = 32] = "FG_Green";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Yellow"] = 33] = "FG_Yellow";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Blue"] = 34] = "FG_Blue";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Magenta"] = 35] = "FG_Magenta";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Cyan"] = 36] = "FG_Cyan";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_White"] = 37] = "FG_White";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Bright_Black"] = 90] = "FG_Bright_Black";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Bright_Red"] = 91] = "FG_Bright_Red";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Bright_Green"] = 92] = "FG_Bright_Green";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Bright_Yellow"] = 93] = "FG_Bright_Yellow";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Bright_Blue"] = 94] = "FG_Bright_Blue";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Bright_Magenta"] = 95] = "FG_Bright_Magenta";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Bright_Cyan"] = 96] = "FG_Bright_Cyan";
    ForegroundSimpleCode[ForegroundSimpleCode["FG_Bright_White"] = 97] = "FG_Bright_White";
})(ForegroundSimpleCode || (ForegroundSimpleCode = {}));
export var BackgroundSimpleCode;
(function(BackgroundSimpleCode) {
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Black"] = 40] = "BG_Black";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Red"] = 41] = "BG_Red";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Green"] = 42] = "BG_Green";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Yellow"] = 43] = "BG_Yellow";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Blue"] = 44] = "BG_Blue";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Magenta"] = 45] = "BG_Magenta";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Cyan"] = 46] = "BG_Cyan";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_White"] = 47] = "BG_White";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Bright_Black"] = 100] = "BG_Bright_Black";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Bright_Red"] = 101] = "BG_Bright_Red";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Bright_Green"] = 102] = "BG_Bright_Green";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Bright_Yellow"] = 103] = "BG_Bright_Yellow";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Bright_Blue"] = 104] = "BG_Bright_Blue";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Bright_Magenta"] = 105] = "BG_Bright_Magenta";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Bright_Cyan"] = 106] = "BG_Bright_Cyan";
    BackgroundSimpleCode[BackgroundSimpleCode["BG_Bright_White"] = 107] = "BG_Bright_White";
})(BackgroundSimpleCode || (BackgroundSimpleCode = {}));
export var DecorationCode;
(function(DecorationCode) {
    DecorationCode[DecorationCode["Bold"] = 1] = "Bold";
    DecorationCode[DecorationCode["Dim"] = 2] = "Dim";
    DecorationCode[DecorationCode["Italic"] = 3] = "Italic";
    DecorationCode[DecorationCode["Underline"] = 4] = "Underline";
    DecorationCode[DecorationCode["Blink_Slow"] = 5] = "Blink_Slow";
    DecorationCode[DecorationCode["Blink_Fast"] = 6] = "Blink_Fast";
    DecorationCode[DecorationCode["Reverse_Video"] = 7] = "Reverse_Video";
    DecorationCode[DecorationCode["Conceal"] = 8] = "Conceal";
    DecorationCode[DecorationCode["Crossed_Out"] = 9] = "Crossed_Out";
    DecorationCode[DecorationCode["Primary"] = 10] = "Primary";
    DecorationCode[DecorationCode["Alternative_Font_1"] = 11] = "Alternative_Font_1";
    DecorationCode[DecorationCode["Alternative_Font_2"] = 12] = "Alternative_Font_2";
    DecorationCode[DecorationCode["Alternative_Font_3"] = 13] = "Alternative_Font_3";
    DecorationCode[DecorationCode["Alternative_Font_4"] = 14] = "Alternative_Font_4";
    DecorationCode[DecorationCode["Alternative_Font_5"] = 15] = "Alternative_Font_5";
    DecorationCode[DecorationCode["Alternative_Font_6"] = 16] = "Alternative_Font_6";
    DecorationCode[DecorationCode["Alternative_Font_7"] = 17] = "Alternative_Font_7";
    DecorationCode[DecorationCode["Alternative_Font_8"] = 18] = "Alternative_Font_8";
    DecorationCode[DecorationCode["Alternative_Font_9"] = 19] = "Alternative_Font_9";
    DecorationCode[DecorationCode["Fraktur"] = 20] = "Fraktur";
    DecorationCode[DecorationCode["Double_Underline"] = 21] = "Double_Underline";
    DecorationCode[DecorationCode["Normal"] = 22] = "Normal";
    DecorationCode[DecorationCode["Italic_And_Fraktur_Off"] = 23] = "Italic_And_Fraktur_Off";
    DecorationCode[DecorationCode["Underline_Off"] = 24] = "Underline_Off";
    DecorationCode[DecorationCode["Blink_Off"] = 25] = "Blink_Off";
    DecorationCode[DecorationCode["Proportional_Spacing"] = 26] = "Proportional_Spacing";
    DecorationCode[DecorationCode["Reverse_And_Invert_Off"] = 27] = "Reverse_And_Invert_Off";
    DecorationCode[DecorationCode["Reveal_And_Conceal_Off"] = 28] = "Reveal_And_Conceal_Off";
    DecorationCode[DecorationCode["Crossed_Off"] = 29] = "Crossed_Off";
})(DecorationCode || (DecorationCode = {}));
function checkRgbRange(code) {
    if (code < 0 || code > 255) {
        throw Error("RGB codes should be between 0 & 255, got: ".concat(code));
    }
    return code;
}
export var RgbCode = function RgbCode(red, green, blue) {
    "use strict";
    _classCallCheck(this, RgbCode);
    this.red = checkRgbRange(red);
    this.green = checkRgbRange(green);
    this.blue = checkRgbRange(blue);
};
export var ForegroundRgbCode = /*#__PURE__*/ function(RgbCode) {
    "use strict";
    _inherits(ForegroundRgbCode, RgbCode);
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
}(RgbCode);
export var BackgroundRgbCode = /*#__PURE__*/ function(RgbCode) {
    "use strict";
    _inherits(BackgroundRgbCode, RgbCode);
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
}(RgbCode);
export function styleToAnsiCode(param) {
    var color = param.color, backgroundColor = param.backgroundColor, decoration = param.decoration, shouldResetFirst = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var codes = _toConsumableArray(shouldResetFirst ? [
        RESET_CODE
    ] : []).concat([
        color,
        backgroundColor,
        decoration, 
    ]).filter(function(code) {
        return typeof code === 'number' || typeof code === 'object';
    });
    return codes.length === 0 ? '' : "\x1b[".concat(codes.join(';'), "m");
}
export var StyleMode;
(function(StyleMode) {
    StyleMode[StyleMode["STYLE"] = 0] = "STYLE";
    StyleMode[StyleMode["NO_STYLE"] = 1] = "NO_STYLE";
})(StyleMode || (StyleMode = {}));
function areStylesEqual(style1, style2) {
    return style1.color === style2.color && style1.backgroundColor === style2.backgroundColor && style1.decoration === style2.decoration;
}
function computeNextFragment(string, lastStyle, styleToApply) {
    if (!styleToApply || areStylesEqual(styleToApply, lastStyle)) {
        return {
            string: string,
            shouldResetFirst: false,
            style: undefined
        };
    }
    var shouldRemoveOldColor = !!lastStyle.color && !styleToApply.color;
    var shouldRemoveOldBackgroundColor = !!lastStyle.backgroundColor && !styleToApply.backgroundColor;
    var shouldRemoveOldDecoration = !!lastStyle.decoration && styleToApply.decoration !== lastStyle.decoration;
    var shouldResetFirst = shouldRemoveOldColor || shouldRemoveOldBackgroundColor || shouldRemoveOldDecoration;
    return {
        string: string,
        shouldResetFirst: shouldResetFirst,
        style: {
            color: shouldResetFirst || styleToApply.color !== lastStyle.color ? styleToApply.color : undefined,
            backgroundColor: shouldResetFirst || styleToApply.backgroundColor !== lastStyle.backgroundColor ? styleToApply.backgroundColor : undefined,
            decoration: shouldResetFirst || styleToApply.decoration !== lastStyle.decoration ? styleToApply.decoration : undefined
        }
    };
}
function computeNextCode(lastCode, newCode, hasReset) {
    if (newCode) {
        return newCode;
    }
    return hasReset || !lastCode ? undefined : lastCode;
}
function printFragmentStyle(fragment) {
    return fragment.style ? styleToAnsiCode(fragment.style, fragment.shouldResetFirst) : '';
}
function getString(index, edges, nodes) {
    var isEven = index % 2 === 0;
    var halfIndex = ~~(index / 2);
    return String(isEven ? edges[halfIndex] : nodes[halfIndex]);
}
function getSpecificStyle(index, styles) {
    var ref, ref1;
    var isEven = index % 2 === 0;
    var halfIndex = ~~(index / 2);
    return isEven ? styles === null || styles === void 0 ? void 0 : (ref = styles.edges) === null || ref === void 0 ? void 0 : ref[halfIndex] : styles === null || styles === void 0 ? void 0 : (ref1 = styles.nodes) === null || ref1 === void 0 ? void 0 : ref1[halfIndex];
}
export function stoyleString(input, style) {
    var styleMode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : StyleMode.STYLE;
    return styleMode === StyleMode.NO_STYLE ? input : styleToAnsiCode(style) + input + styleToAnsiCode({}, true);
}
export function stoyleGlobal(edgesAsTemplateStringArray) {
    for(var _len = arguments.length, nodes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        nodes[_key - 1] = arguments[_key];
    }
    var edges = _toConsumableArray(edgesAsTemplateStringArray);
    return function(style) {
        var styleMode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : StyleMode.STYLE;
        var wholeString = new Array(edges.length + nodes.length).fill(null).map(function(whatever, index) {
            return getString(index, edges, nodes);
        }).join('');
        return stoyleString(wholeString, style, styleMode);
    };
}
export function stoyle(edgesAsTemplateStringArray) {
    for(var _len = arguments.length, nodes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        nodes[_key - 1] = arguments[_key];
    }
    var edges = _toConsumableArray(edgesAsTemplateStringArray);
    return function(styles) {
        var styleMode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : StyleMode.STYLE;
        var ref8, ref2;
        if (styles.edges && edges.length !== ((ref8 = styles.edges) === null || ref8 === void 0 ? void 0 : ref8.length)) {
            var ref3;
            throw Error("I found ".concat(edges.length, " edge(s), but ").concat((ref3 = styles.edges) === null || ref3 === void 0 ? void 0 : ref3.length, " edge style(s)!"));
        }
        if (styles.nodes && nodes.length !== ((ref2 = styles.nodes) === null || ref2 === void 0 ? void 0 : ref2.length)) {
            var ref4;
            throw Error("I found ".concat(nodes.length, " node(s), but ").concat((ref4 = styles.nodes) === null || ref4 === void 0 ? void 0 : ref4.length, " node style(s)!"));
        }
        var ref5;
        var globalStyle = (ref5 = styles === null || styles === void 0 ? void 0 : styles.global) !== null && ref5 !== void 0 ? ref5 : {}; // Defaults to no style
        var accumulator = new Array(edges.length + nodes.length).fill(null).reduce(function(seed, whatever, index) {
            var ref, ref6, ref7;
            var string = getString(index, edges, nodes);
            if (!string) {
                return seed;
            } // Nothing to write for empty strings
            var specificStyle = getSpecificStyle(index, styles);
            var styleToApply = specificStyle !== null && specificStyle !== void 0 ? specificStyle : globalStyle; // Specific styles supersede global style
            var fragment = styleMode === StyleMode.NO_STYLE ? {
                string: string,
                shouldResetFirst: false,
                style: {}
            } : computeNextFragment(string, seed.currentStyle, styleToApply);
            seed.fragments.push(fragment);
            seed.currentStyle = {
                color: computeNextCode(seed.currentStyle.color, fragment === null || fragment === void 0 ? void 0 : (ref = fragment.style) === null || ref === void 0 ? void 0 : ref.color, fragment.shouldResetFirst),
                backgroundColor: computeNextCode(seed.currentStyle.backgroundColor, fragment === null || fragment === void 0 ? void 0 : (ref6 = fragment.style) === null || ref6 === void 0 ? void 0 : ref6.backgroundColor, fragment.shouldResetFirst),
                decoration: computeNextCode(seed.currentStyle.decoration, fragment === null || fragment === void 0 ? void 0 : (ref7 = fragment.style) === null || ref7 === void 0 ? void 0 : ref7.decoration, fragment.shouldResetFirst)
            };
            return seed;
        }, {
            currentStyle: {},
            fragments: []
        });
        var fragments = accumulator.fragments, lastStyle = accumulator.currentStyle;
        var shouldCleanup = !!lastStyle.color || !!lastStyle.backgroundColor || !!lastStyle.decoration;
        var allFragments = shouldCleanup ? fragments.concat({
            string: '',
            shouldResetFirst: true,
            style: {}
        }) : fragments;
        return allFragments.map(function(fragment) {
            return printFragmentStyle(fragment) + fragment.string;
        }).join('');
    };
}

//# sourceMappingURL=mod.js.map