var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 310);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(24)
  , hide      = __webpack_require__(12)
  , redefine  = __webpack_require__(13)
  , ctx       = __webpack_require__(25)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(57)('wks')
  , uid        = __webpack_require__(39)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1)
  , IE8_DOM_DEFINE = __webpack_require__(97)
  , toPrimitive    = __webpack_require__(23)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(30)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(19);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(29);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , hide      = __webpack_require__(12)
  , has       = __webpack_require__(10)
  , SRC       = __webpack_require__(39)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(24).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , defined = __webpack_require__(19)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(46)
  , defined = __webpack_require__(19);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(47)
  , createDesc     = __webpack_require__(29)
  , toIObject      = __webpack_require__(15)
  , toPrimitive    = __webpack_require__(23)
  , has            = __webpack_require__(10)
  , IE8_DOM_DEFINE = __webpack_require__(97)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(10)
  , toObject    = __webpack_require__(9)
  , IE_PROTO    = __webpack_require__(76)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(25)
  , IObject  = __webpack_require__(46)
  , toObject = __webpack_require__(9)
  , toLength = __webpack_require__(8)
  , asc      = __webpack_require__(130);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0)
  , core    = __webpack_require__(24)
  , fails   = __webpack_require__(3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(11);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(113)
  , $export = __webpack_require__(0)
  , shared  = __webpack_require__(57)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(116)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(6)){
  var LIBRARY             = __webpack_require__(32)
    , global              = __webpack_require__(2)
    , fails               = __webpack_require__(3)
    , $export             = __webpack_require__(0)
    , $typed              = __webpack_require__(58)
    , $buffer             = __webpack_require__(83)
    , ctx                 = __webpack_require__(25)
    , anInstance          = __webpack_require__(31)
    , propertyDesc        = __webpack_require__(29)
    , hide                = __webpack_require__(12)
    , redefineAll         = __webpack_require__(36)
    , toInteger           = __webpack_require__(30)
    , toLength            = __webpack_require__(8)
    , toIndex             = __webpack_require__(38)
    , toPrimitive         = __webpack_require__(23)
    , has                 = __webpack_require__(10)
    , same                = __webpack_require__(110)
    , classof             = __webpack_require__(45)
    , isObject            = __webpack_require__(4)
    , toObject            = __webpack_require__(9)
    , isArrayIter         = __webpack_require__(68)
    , create              = __webpack_require__(33)
    , getPrototypeOf      = __webpack_require__(17)
    , gOPN                = __webpack_require__(34).f
    , getIterFn           = __webpack_require__(85)
    , uid                 = __webpack_require__(39)
    , wks                 = __webpack_require__(5)
    , createArrayMethod   = __webpack_require__(21)
    , createArrayIncludes = __webpack_require__(48)
    , speciesConstructor  = __webpack_require__(77)
    , ArrayIterators      = __webpack_require__(86)
    , Iterators           = __webpack_require__(42)
    , $iterDetect         = __webpack_require__(54)
    , setSpecies          = __webpack_require__(37)
    , arrayFill           = __webpack_require__(61)
    , arrayCopyWithin     = __webpack_require__(90)
    , $DP                 = __webpack_require__(7)
    , $GOPD               = __webpack_require__(16)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(39)('meta')
  , isObject = __webpack_require__(4)
  , has      = __webpack_require__(10)
  , setDesc  = __webpack_require__(7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1)
  , dPs         = __webpack_require__(103)
  , enumBugKeys = __webpack_require__(64)
  , IE_PROTO    = __webpack_require__(76)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(63)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(66).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(105)
  , hiddenKeys = __webpack_require__(64).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(105)
  , enumBugKeys = __webpack_require__(64);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(13);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , dP          = __webpack_require__(7)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(5)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(25)
  , call        = __webpack_require__(99)
  , isArrayIter = __webpack_require__(68)
  , anObject    = __webpack_require__(1)
  , toLength    = __webpack_require__(8)
  , getIterFn   = __webpack_require__(85)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(10)
  , TAG = __webpack_require__(5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(19)
  , fails   = __webpack_require__(3)
  , spaces  = __webpack_require__(81)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(18)
  , TAG = __webpack_require__(5)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15)
  , toLength  = __webpack_require__(8)
  , toIndex   = __webpack_require__(38);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , $export           = __webpack_require__(0)
  , redefine          = __webpack_require__(13)
  , redefineAll       = __webpack_require__(36)
  , meta              = __webpack_require__(28)
  , forOf             = __webpack_require__(41)
  , anInstance        = __webpack_require__(31)
  , isObject          = __webpack_require__(4)
  , fails             = __webpack_require__(3)
  , $iterDetect       = __webpack_require__(54)
  , setToStringTag    = __webpack_require__(43)
  , inheritIfRequired = __webpack_require__(67);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(12)
  , redefine = __webpack_require__(13)
  , fails    = __webpack_require__(3)
  , defined  = __webpack_require__(19)
  , wks      = __webpack_require__(5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4)
  , cof      = __webpack_require__(18)
  , MATCH    = __webpack_require__(5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(5)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(32)|| !__webpack_require__(3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 56 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , hide   = __webpack_require__(12)
  , uid    = __webpack_require__(39)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);

var Comment = exports.Comment = function (_CustomElement2) {
    _inherits(Comment, _CustomElement2);

    function Comment(name, text) {
        _classCallCheck(this, Comment);

        var _this = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this));

        _this.name = name;
        _this.text = text;
        return _this;
    }

    _createClass(Comment, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.className = 'frame';
            this.innerHTML = '<div><h3>' + this.name + '</h3><p>' + this.text + '</p></div>';
        }
    }]);

    return Comment;
}(_CustomElement);

window.customElements.define('results-comment', Comment);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWSProtocol = getWSProtocol;
function getWSProtocol() {
    return window.location.protocol === 'https:' ? 'wss' : 'ws';
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(38)
  , toLength = __webpack_require__(8);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7)
  , createDesc      = __webpack_require__(29);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 64 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(4)
  , setPrototypeOf = __webpack_require__(75).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(42)
  , ITERATOR   = __webpack_require__(5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(33)
  , descriptor     = __webpack_require__(29)
  , setToStringTag = __webpack_require__(43)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(32)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(13)
  , hide           = __webpack_require__(12)
  , has            = __webpack_require__(10)
  , Iterators      = __webpack_require__(42)
  , $iterCreate    = __webpack_require__(70)
  , setToStringTag = __webpack_require__(43)
  , getPrototypeOf = __webpack_require__(17)
  , ITERATOR       = __webpack_require__(5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 72 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 73 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(82).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(18)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4)
  , anObject = __webpack_require__(1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(25)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(57)('keys')
  , uid    = __webpack_require__(39);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(1)
  , aFunction = __webpack_require__(11)
  , SPECIES   = __webpack_require__(5)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30)
  , defined   = __webpack_require__(19);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(53)
  , defined  = __webpack_require__(19);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(30)
  , defined   = __webpack_require__(19);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(25)
  , invoke             = __webpack_require__(52)
  , html               = __webpack_require__(66)
  , cel                = __webpack_require__(63)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(18)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , DESCRIPTORS    = __webpack_require__(6)
  , LIBRARY        = __webpack_require__(32)
  , $typed         = __webpack_require__(58)
  , hide           = __webpack_require__(12)
  , redefineAll    = __webpack_require__(36)
  , fails          = __webpack_require__(3)
  , anInstance     = __webpack_require__(31)
  , toInteger      = __webpack_require__(30)
  , toLength       = __webpack_require__(8)
  , gOPN           = __webpack_require__(34).f
  , dP             = __webpack_require__(7).f
  , arrayFill      = __webpack_require__(61)
  , setToStringTag = __webpack_require__(43)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(24)
  , LIBRARY        = __webpack_require__(32)
  , wksExt         = __webpack_require__(112)
  , defineProperty = __webpack_require__(7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(45)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(42);
module.exports = __webpack_require__(24).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(40)
  , step             = __webpack_require__(100)
  , Iterators        = __webpack_require__(42)
  , toIObject        = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(71)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(308);

__webpack_require__(309);

__webpack_require__(128);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(117)))

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.5.0
 *
 * Copyright 2017 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
!function (t) {
  if ("object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
    var e;e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Chart = t();
  }
}(function () {
  return function t(e, a, i) {
    function n(r, s) {
      if (!a[r]) {
        if (!e[r]) {
          var l = "function" == typeof require && require;if (!s && l) return require(r, !0);if (o) return require(r, !0);var u = new Error("Cannot find module '" + r + "'");throw u.code = "MODULE_NOT_FOUND", u;
        }var d = a[r] = { exports: {} };e[r][0].call(d.exports, function (t) {
          var a = e[r][1][t];return n(a ? a : t);
        }, d, d.exports, t, e, a, i);
      }return a[r].exports;
    }for (var o = "function" == typeof require && require, r = 0; r < i.length; r++) {
      n(i[r]);
    }return n;
  }({ 1: [function (t, e, a) {}, {}], 2: [function (t, e, a) {
      function i(t) {
        if (t) {
          var e = /^#([a-fA-F0-9]{3})$/,
              a = /^#([a-fA-F0-9]{6})$/,
              i = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
              n = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
              o = /(\w+)/,
              r = [0, 0, 0],
              s = 1,
              l = t.match(e);if (l) {
            l = l[1];for (var u = 0; u < r.length; u++) {
              r[u] = parseInt(l[u] + l[u], 16);
            }
          } else if (l = t.match(a)) {
            l = l[1];for (var u = 0; u < r.length; u++) {
              r[u] = parseInt(l.slice(2 * u, 2 * u + 2), 16);
            }
          } else if (l = t.match(i)) {
            for (var u = 0; u < r.length; u++) {
              r[u] = parseInt(l[u + 1]);
            }s = parseFloat(l[4]);
          } else if (l = t.match(n)) {
            for (var u = 0; u < r.length; u++) {
              r[u] = Math.round(2.55 * parseFloat(l[u + 1]));
            }s = parseFloat(l[4]);
          } else if (l = t.match(o)) {
            if ("transparent" == l[1]) return [0, 0, 0, 0];if (r = y[l[1]], !r) return;
          }for (var u = 0; u < r.length; u++) {
            r[u] = b(r[u], 0, 255);
          }return s = s || 0 == s ? b(s, 0, 1) : 1, r[3] = s, r;
        }
      }function n(t) {
        if (t) {
          var e = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
              a = t.match(e);if (a) {
            var i = parseFloat(a[4]),
                n = b(parseInt(a[1]), 0, 360),
                o = b(parseFloat(a[2]), 0, 100),
                r = b(parseFloat(a[3]), 0, 100),
                s = b(isNaN(i) ? 1 : i, 0, 1);return [n, o, r, s];
          }
        }
      }function o(t) {
        if (t) {
          var e = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
              a = t.match(e);if (a) {
            var i = parseFloat(a[4]),
                n = b(parseInt(a[1]), 0, 360),
                o = b(parseFloat(a[2]), 0, 100),
                r = b(parseFloat(a[3]), 0, 100),
                s = b(isNaN(i) ? 1 : i, 0, 1);return [n, o, r, s];
          }
        }
      }function r(t) {
        var e = i(t);return e && e.slice(0, 3);
      }function s(t) {
        var e = n(t);return e && e.slice(0, 3);
      }function l(t) {
        var e = i(t);return e ? e[3] : (e = n(t)) ? e[3] : (e = o(t)) ? e[3] : void 0;
      }function u(t) {
        return "#" + x(t[0]) + x(t[1]) + x(t[2]);
      }function d(t, e) {
        return e < 1 || t[3] && t[3] < 1 ? c(t, e) : "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
      }function c(t, e) {
        return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")";
      }function h(t, e) {
        if (e < 1 || t[3] && t[3] < 1) return f(t, e);var a = Math.round(t[0] / 255 * 100),
            i = Math.round(t[1] / 255 * 100),
            n = Math.round(t[2] / 255 * 100);return "rgb(" + a + "%, " + i + "%, " + n + "%)";
      }function f(t, e) {
        var a = Math.round(t[0] / 255 * 100),
            i = Math.round(t[1] / 255 * 100),
            n = Math.round(t[2] / 255 * 100);return "rgba(" + a + "%, " + i + "%, " + n + "%, " + (e || t[3] || 1) + ")";
      }function g(t, e) {
        return e < 1 || t[3] && t[3] < 1 ? p(t, e) : "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)";
      }function p(t, e) {
        return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")";
      }function m(t, e) {
        return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")";
      }function v(t) {
        return k[t.slice(0, 3)];
      }function b(t, e, a) {
        return Math.min(Math.max(e, t), a);
      }function x(t) {
        var e = t.toString(16).toUpperCase();return e.length < 2 ? "0" + e : e;
      }var y = t(6);e.exports = { getRgba: i, getHsla: n, getRgb: r, getHsl: s, getHwb: o, getAlpha: l, hexString: u, rgbString: d, rgbaString: c, percentString: h, percentaString: f, hslString: g, hslaString: p, hwbString: m, keyword: v };var k = {};for (var S in y) {
        k[y[S]] = S;
      }
    }, { 6: 6 }], 3: [function (t, e, a) {
      var i = t(5),
          n = t(2),
          o = function o(t) {
        if (t instanceof o) return t;if (!(this instanceof o)) return new o(t);this.values = { rgb: [0, 0, 0], hsl: [0, 0, 0], hsv: [0, 0, 0], hwb: [0, 0, 0], cmyk: [0, 0, 0, 0], alpha: 1 };var e;if ("string" == typeof t) {
          if (e = n.getRgba(t)) this.setValues("rgb", e);else if (e = n.getHsla(t)) this.setValues("hsl", e);else {
            if (!(e = n.getHwb(t))) throw new Error('Unable to parse color from string "' + t + '"');this.setValues("hwb", e);
          }
        } else if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) if (e = t, void 0 !== e.r || void 0 !== e.red) this.setValues("rgb", e);else if (void 0 !== e.l || void 0 !== e.lightness) this.setValues("hsl", e);else if (void 0 !== e.v || void 0 !== e.value) this.setValues("hsv", e);else if (void 0 !== e.w || void 0 !== e.whiteness) this.setValues("hwb", e);else {
          if (void 0 === e.c && void 0 === e.cyan) throw new Error("Unable to parse color from object " + JSON.stringify(t));this.setValues("cmyk", e);
        }
      };o.prototype = { rgb: function rgb() {
          return this.setSpace("rgb", arguments);
        }, hsl: function hsl() {
          return this.setSpace("hsl", arguments);
        }, hsv: function hsv() {
          return this.setSpace("hsv", arguments);
        }, hwb: function hwb() {
          return this.setSpace("hwb", arguments);
        }, cmyk: function cmyk() {
          return this.setSpace("cmyk", arguments);
        }, rgbArray: function rgbArray() {
          return this.values.rgb;
        }, hslArray: function hslArray() {
          return this.values.hsl;
        }, hsvArray: function hsvArray() {
          return this.values.hsv;
        }, hwbArray: function hwbArray() {
          var t = this.values;return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb;
        }, cmykArray: function cmykArray() {
          return this.values.cmyk;
        }, rgbaArray: function rgbaArray() {
          var t = this.values;return t.rgb.concat([t.alpha]);
        }, hslaArray: function hslaArray() {
          var t = this.values;return t.hsl.concat([t.alpha]);
        }, alpha: function alpha(t) {
          return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this);
        }, red: function red(t) {
          return this.setChannel("rgb", 0, t);
        }, green: function green(t) {
          return this.setChannel("rgb", 1, t);
        }, blue: function blue(t) {
          return this.setChannel("rgb", 2, t);
        }, hue: function hue(t) {
          return t && (t %= 360, t = t < 0 ? 360 + t : t), this.setChannel("hsl", 0, t);
        }, saturation: function saturation(t) {
          return this.setChannel("hsl", 1, t);
        }, lightness: function lightness(t) {
          return this.setChannel("hsl", 2, t);
        }, saturationv: function saturationv(t) {
          return this.setChannel("hsv", 1, t);
        }, whiteness: function whiteness(t) {
          return this.setChannel("hwb", 1, t);
        }, blackness: function blackness(t) {
          return this.setChannel("hwb", 2, t);
        }, value: function value(t) {
          return this.setChannel("hsv", 2, t);
        }, cyan: function cyan(t) {
          return this.setChannel("cmyk", 0, t);
        }, magenta: function magenta(t) {
          return this.setChannel("cmyk", 1, t);
        }, yellow: function yellow(t) {
          return this.setChannel("cmyk", 2, t);
        }, black: function black(t) {
          return this.setChannel("cmyk", 3, t);
        }, hexString: function hexString() {
          return n.hexString(this.values.rgb);
        }, rgbString: function rgbString() {
          return n.rgbString(this.values.rgb, this.values.alpha);
        }, rgbaString: function rgbaString() {
          return n.rgbaString(this.values.rgb, this.values.alpha);
        }, percentString: function percentString() {
          return n.percentString(this.values.rgb, this.values.alpha);
        }, hslString: function hslString() {
          return n.hslString(this.values.hsl, this.values.alpha);
        }, hslaString: function hslaString() {
          return n.hslaString(this.values.hsl, this.values.alpha);
        }, hwbString: function hwbString() {
          return n.hwbString(this.values.hwb, this.values.alpha);
        }, keyword: function keyword() {
          return n.keyword(this.values.rgb, this.values.alpha);
        }, rgbNumber: function rgbNumber() {
          var t = this.values.rgb;return t[0] << 16 | t[1] << 8 | t[2];
        }, luminosity: function luminosity() {
          for (var t = this.values.rgb, e = [], a = 0; a < t.length; a++) {
            var i = t[a] / 255;e[a] = i <= .03928 ? i / 12.92 : Math.pow((i + .055) / 1.055, 2.4);
          }return .2126 * e[0] + .7152 * e[1] + .0722 * e[2];
        }, contrast: function contrast(t) {
          var e = this.luminosity(),
              a = t.luminosity();return e > a ? (e + .05) / (a + .05) : (a + .05) / (e + .05);
        }, level: function level(t) {
          var e = this.contrast(t);return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : "";
        }, dark: function dark() {
          var t = this.values.rgb,
              e = (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3;return e < 128;
        }, light: function light() {
          return !this.dark();
        }, negate: function negate() {
          for (var t = [], e = 0; e < 3; e++) {
            t[e] = 255 - this.values.rgb[e];
          }return this.setValues("rgb", t), this;
        }, lighten: function lighten(t) {
          var e = this.values.hsl;return e[2] += e[2] * t, this.setValues("hsl", e), this;
        }, darken: function darken(t) {
          var e = this.values.hsl;return e[2] -= e[2] * t, this.setValues("hsl", e), this;
        }, saturate: function saturate(t) {
          var e = this.values.hsl;return e[1] += e[1] * t, this.setValues("hsl", e), this;
        }, desaturate: function desaturate(t) {
          var e = this.values.hsl;return e[1] -= e[1] * t, this.setValues("hsl", e), this;
        }, whiten: function whiten(t) {
          var e = this.values.hwb;return e[1] += e[1] * t, this.setValues("hwb", e), this;
        }, blacken: function blacken(t) {
          var e = this.values.hwb;return e[2] += e[2] * t, this.setValues("hwb", e), this;
        }, greyscale: function greyscale() {
          var t = this.values.rgb,
              e = .3 * t[0] + .59 * t[1] + .11 * t[2];return this.setValues("rgb", [e, e, e]), this;
        }, clearer: function clearer(t) {
          var e = this.values.alpha;return this.setValues("alpha", e - e * t), this;
        }, opaquer: function opaquer(t) {
          var e = this.values.alpha;return this.setValues("alpha", e + e * t), this;
        }, rotate: function rotate(t) {
          var e = this.values.hsl,
              a = (e[0] + t) % 360;return e[0] = a < 0 ? 360 + a : a, this.setValues("hsl", e), this;
        }, mix: function mix(t, e) {
          var a = this,
              i = t,
              n = void 0 === e ? .5 : e,
              o = 2 * n - 1,
              r = a.alpha() - i.alpha(),
              s = ((o * r === -1 ? o : (o + r) / (1 + o * r)) + 1) / 2,
              l = 1 - s;return this.rgb(s * a.red() + l * i.red(), s * a.green() + l * i.green(), s * a.blue() + l * i.blue()).alpha(a.alpha() * n + i.alpha() * (1 - n));
        }, toJSON: function toJSON() {
          return this.rgb();
        }, clone: function clone() {
          var t,
              e,
              a = new o(),
              i = this.values,
              n = a.values;for (var r in i) {
            i.hasOwnProperty(r) && (t = i[r], e = {}.toString.call(t), "[object Array]" === e ? n[r] = t.slice(0) : "[object Number]" === e ? n[r] = t : console.error("unexpected color value:", t));
          }return a;
        } }, o.prototype.spaces = { rgb: ["red", "green", "blue"], hsl: ["hue", "saturation", "lightness"], hsv: ["hue", "saturation", "value"], hwb: ["hue", "whiteness", "blackness"], cmyk: ["cyan", "magenta", "yellow", "black"] }, o.prototype.maxes = { rgb: [255, 255, 255], hsl: [360, 100, 100], hsv: [360, 100, 100], hwb: [360, 100, 100], cmyk: [100, 100, 100, 100] }, o.prototype.getValues = function (t) {
        for (var e = this.values, a = {}, i = 0; i < t.length; i++) {
          a[t.charAt(i)] = e[t][i];
        }return 1 !== e.alpha && (a.a = e.alpha), a;
      }, o.prototype.setValues = function (t, e) {
        var a,
            n = this.values,
            o = this.spaces,
            r = this.maxes,
            s = 1;if ("alpha" === t) s = e;else if (e.length) n[t] = e.slice(0, t.length), s = e[t.length];else if (void 0 !== e[t.charAt(0)]) {
          for (a = 0; a < t.length; a++) {
            n[t][a] = e[t.charAt(a)];
          }s = e.a;
        } else if (void 0 !== e[o[t][0]]) {
          var l = o[t];for (a = 0; a < t.length; a++) {
            n[t][a] = e[l[a]];
          }s = e.alpha;
        }if (n.alpha = Math.max(0, Math.min(1, void 0 === s ? n.alpha : s)), "alpha" === t) return !1;var u;for (a = 0; a < t.length; a++) {
          u = Math.max(0, Math.min(r[t][a], n[t][a])), n[t][a] = Math.round(u);
        }for (var d in o) {
          d !== t && (n[d] = i[t][d](n[t]));
        }return !0;
      }, o.prototype.setSpace = function (t, e) {
        var a = e[0];return void 0 === a ? this.getValues(t) : ("number" == typeof a && (a = Array.prototype.slice.call(e)), this.setValues(t, a), this);
      }, o.prototype.setChannel = function (t, e, a) {
        var i = this.values[t];return void 0 === a ? i[e] : a === i[e] ? this : (i[e] = a, this.setValues(t, i), this);
      }, "undefined" != typeof window && (window.Color = o), e.exports = o;
    }, { 2: 2, 5: 5 }], 4: [function (t, e, a) {
      function i(t) {
        var e,
            a,
            i,
            n = t[0] / 255,
            o = t[1] / 255,
            r = t[2] / 255,
            s = Math.min(n, o, r),
            l = Math.max(n, o, r),
            u = l - s;return l == s ? e = 0 : n == l ? e = (o - r) / u : o == l ? e = 2 + (r - n) / u : r == l && (e = 4 + (n - o) / u), e = Math.min(60 * e, 360), e < 0 && (e += 360), i = (s + l) / 2, a = l == s ? 0 : i <= .5 ? u / (l + s) : u / (2 - l - s), [e, 100 * a, 100 * i];
      }function n(t) {
        var e,
            a,
            i,
            n = t[0],
            o = t[1],
            r = t[2],
            s = Math.min(n, o, r),
            l = Math.max(n, o, r),
            u = l - s;return a = 0 == l ? 0 : u / l * 1e3 / 10, l == s ? e = 0 : n == l ? e = (o - r) / u : o == l ? e = 2 + (r - n) / u : r == l && (e = 4 + (n - o) / u), e = Math.min(60 * e, 360), e < 0 && (e += 360), i = l / 255 * 1e3 / 10, [e, a, i];
      }function o(t) {
        var e = t[0],
            a = t[1],
            n = t[2],
            o = i(t)[0],
            r = 1 / 255 * Math.min(e, Math.min(a, n)),
            n = 1 - 1 / 255 * Math.max(e, Math.max(a, n));return [o, 100 * r, 100 * n];
      }function s(t) {
        var e,
            a,
            i,
            n,
            o = t[0] / 255,
            r = t[1] / 255,
            s = t[2] / 255;return n = Math.min(1 - o, 1 - r, 1 - s), e = (1 - o - n) / (1 - n) || 0, a = (1 - r - n) / (1 - n) || 0, i = (1 - s - n) / (1 - n) || 0, [100 * e, 100 * a, 100 * i, 100 * n];
      }function l(t) {
        return Z[JSON.stringify(t)];
      }function u(t) {
        var e = t[0] / 255,
            a = t[1] / 255,
            i = t[2] / 255;e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92, a = a > .04045 ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92, i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92;var n = .4124 * e + .3576 * a + .1805 * i,
            o = .2126 * e + .7152 * a + .0722 * i,
            r = .0193 * e + .1192 * a + .9505 * i;return [100 * n, 100 * o, 100 * r];
      }function d(t) {
        var e,
            a,
            i,
            n = u(t),
            o = n[0],
            r = n[1],
            s = n[2];return o /= 95.047, r /= 100, s /= 108.883, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, s = s > .008856 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, e = 116 * r - 16, a = 500 * (o - r), i = 200 * (r - s), [e, a, i];
      }function c(t) {
        return z(d(t));
      }function h(t) {
        var e,
            a,
            i,
            n,
            o,
            r = t[0] / 360,
            s = t[1] / 100,
            l = t[2] / 100;if (0 == s) return o = 255 * l, [o, o, o];a = l < .5 ? l * (1 + s) : l + s - l * s, e = 2 * l - a, n = [0, 0, 0];for (var u = 0; u < 3; u++) {
          i = r + 1 / 3 * -(u - 1), i < 0 && i++, i > 1 && i--, o = 6 * i < 1 ? e + 6 * (a - e) * i : 2 * i < 1 ? a : 3 * i < 2 ? e + (a - e) * (2 / 3 - i) * 6 : e, n[u] = 255 * o;
        }return n;
      }function f(t) {
        var e,
            a,
            i = t[0],
            n = t[1] / 100,
            o = t[2] / 100;return 0 === o ? [0, 0, 0] : (o *= 2, n *= o <= 1 ? o : 2 - o, a = (o + n) / 2, e = 2 * n / (o + n), [i, 100 * e, 100 * a]);
      }function p(t) {
        return o(h(t));
      }function m(t) {
        return s(h(t));
      }function v(t) {
        return l(h(t));
      }function x(t) {
        var e = t[0] / 60,
            a = t[1] / 100,
            i = t[2] / 100,
            n = Math.floor(e) % 6,
            o = e - Math.floor(e),
            r = 255 * i * (1 - a),
            s = 255 * i * (1 - a * o),
            l = 255 * i * (1 - a * (1 - o)),
            i = 255 * i;switch (n) {case 0:
            return [i, l, r];case 1:
            return [s, i, r];case 2:
            return [r, i, l];case 3:
            return [r, s, i];case 4:
            return [l, r, i];case 5:
            return [i, r, s];}
      }function y(t) {
        var e,
            a,
            i = t[0],
            n = t[1] / 100,
            o = t[2] / 100;return a = (2 - n) * o, e = n * o, e /= a <= 1 ? a : 2 - a, e = e || 0, a /= 2, [i, 100 * e, 100 * a];
      }function k(t) {
        return o(x(t));
      }function S(t) {
        return s(x(t));
      }function M(t) {
        return l(x(t));
      }function w(t) {
        var e,
            a,
            i,
            n,
            o = t[0] / 360,
            s = t[1] / 100,
            l = t[2] / 100,
            u = s + l;switch (u > 1 && (s /= u, l /= u), e = Math.floor(6 * o), a = 1 - l, i = 6 * o - e, 0 != (1 & e) && (i = 1 - i), n = s + i * (a - s), e) {default:case 6:case 0:
            r = a, g = n, b = s;break;case 1:
            r = n, g = a, b = s;break;case 2:
            r = s, g = a, b = n;break;case 3:
            r = s, g = n, b = a;break;case 4:
            r = n, g = s, b = a;break;case 5:
            r = a, g = s, b = n;}return [255 * r, 255 * g, 255 * b];
      }function C(t) {
        return i(w(t));
      }function I(t) {
        return n(w(t));
      }function D(t) {
        return s(w(t));
      }function A(t) {
        return l(w(t));
      }function T(t) {
        var e,
            a,
            i,
            n = t[0] / 100,
            o = t[1] / 100,
            r = t[2] / 100,
            s = t[3] / 100;return e = 1 - Math.min(1, n * (1 - s) + s), a = 1 - Math.min(1, o * (1 - s) + s), i = 1 - Math.min(1, r * (1 - s) + s), [255 * e, 255 * a, 255 * i];
      }function P(t) {
        return i(T(t));
      }function _(t) {
        return n(T(t));
      }function F(t) {
        return o(T(t));
      }function V(t) {
        return l(T(t));
      }function R(t) {
        var e,
            a,
            i,
            n = t[0] / 100,
            o = t[1] / 100,
            r = t[2] / 100;return e = 3.2406 * n + o * -1.5372 + r * -.4986, a = n * -.9689 + 1.8758 * o + .0415 * r, i = .0557 * n + o * -.204 + 1.057 * r, e = e > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e *= 12.92, a = a > .0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - .055 : a *= 12.92, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i *= 12.92, e = Math.min(Math.max(0, e), 1), a = Math.min(Math.max(0, a), 1), i = Math.min(Math.max(0, i), 1), [255 * e, 255 * a, 255 * i];
      }function O(t) {
        var e,
            a,
            i,
            n = t[0],
            o = t[1],
            r = t[2];return n /= 95.047, o /= 100, r /= 108.883, n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, e = 116 * o - 16, a = 500 * (n - o), i = 200 * (o - r), [e, a, i];
      }function L(t) {
        return z(O(t));
      }function B(t) {
        var e,
            a,
            i,
            n,
            o = t[0],
            r = t[1],
            s = t[2];return o <= 8 ? (a = 100 * o / 903.3, n = 7.787 * (a / 100) + 16 / 116) : (a = 100 * Math.pow((o + 16) / 116, 3), n = Math.pow(a / 100, 1 / 3)), e = e / 95.047 <= .008856 ? e = 95.047 * (r / 500 + n - 16 / 116) / 7.787 : 95.047 * Math.pow(r / 500 + n, 3), i = i / 108.883 <= .008859 ? i = 108.883 * (n - s / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(n - s / 200, 3), [e, a, i];
      }function z(t) {
        var e,
            a,
            i,
            n = t[0],
            o = t[1],
            r = t[2];return e = Math.atan2(r, o), a = 360 * e / 2 / Math.PI, a < 0 && (a += 360), i = Math.sqrt(o * o + r * r), [n, i, a];
      }function W(t) {
        return R(B(t));
      }function N(t) {
        var e,
            a,
            i,
            n = t[0],
            o = t[1],
            r = t[2];return i = r / 360 * 2 * Math.PI, e = o * Math.cos(i), a = o * Math.sin(i), [n, e, a];
      }function E(t) {
        return B(N(t));
      }function H(t) {
        return W(N(t));
      }function j(t) {
        return G[t];
      }function U(t) {
        return i(j(t));
      }function q(t) {
        return n(j(t));
      }function Y(t) {
        return o(j(t));
      }function X(t) {
        return s(j(t));
      }function K(t) {
        return d(j(t));
      }function J(t) {
        return u(j(t));
      }e.exports = { rgb2hsl: i, rgb2hsv: n, rgb2hwb: o, rgb2cmyk: s, rgb2keyword: l, rgb2xyz: u, rgb2lab: d, rgb2lch: c, hsl2rgb: h, hsl2hsv: f, hsl2hwb: p, hsl2cmyk: m, hsl2keyword: v, hsv2rgb: x, hsv2hsl: y, hsv2hwb: k, hsv2cmyk: S, hsv2keyword: M, hwb2rgb: w, hwb2hsl: C, hwb2hsv: I, hwb2cmyk: D, hwb2keyword: A, cmyk2rgb: T, cmyk2hsl: P, cmyk2hsv: _, cmyk2hwb: F, cmyk2keyword: V, keyword2rgb: j, keyword2hsl: U, keyword2hsv: q, keyword2hwb: Y, keyword2cmyk: X, keyword2lab: K, keyword2xyz: J, xyz2rgb: R, xyz2lab: O, xyz2lch: L, lab2xyz: B, lab2rgb: W, lab2lch: z, lch2lab: N, lch2xyz: E, lch2rgb: H };var G = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] },
          Z = {};for (var Q in G) {
        Z[JSON.stringify(G[Q])] = Q;
      }
    }, {}], 5: [function (t, e, a) {
      var i = t(4),
          n = function n() {
        return new u();
      };for (var o in i) {
        n[o + "Raw"] = function (t) {
          return function (e) {
            return "number" == typeof e && (e = Array.prototype.slice.call(arguments)), i[t](e);
          };
        }(o);var r = /(\w+)2(\w+)/.exec(o),
            s = r[1],
            l = r[2];n[s] = n[s] || {}, n[s][l] = n[o] = function (t) {
          return function (e) {
            "number" == typeof e && (e = Array.prototype.slice.call(arguments));var a = i[t](e);if ("string" == typeof a || void 0 === a) return a;for (var n = 0; n < a.length; n++) {
              a[n] = Math.round(a[n]);
            }return a;
          };
        }(o);
      }var u = function u() {
        this.convs = {};
      };u.prototype.routeSpace = function (t, e) {
        var a = e[0];return void 0 === a ? this.getValues(t) : ("number" == typeof a && (a = Array.prototype.slice.call(e)), this.setValues(t, a));
      }, u.prototype.setValues = function (t, e) {
        return this.space = t, this.convs = {}, this.convs[t] = e, this;
      }, u.prototype.getValues = function (t) {
        var e = this.convs[t];if (!e) {
          var a = this.space,
              i = this.convs[a];e = n[a][t](i), this.convs[t] = e;
        }return e;
      }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function (t) {
        u.prototype[t] = function (e) {
          return this.routeSpace(t, arguments);
        };
      }), e.exports = n;
    }, { 4: 4 }], 6: [function (t, e, a) {
      e.exports = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] };
    }, {}], 7: [function (t, e, a) {
      var i = t(28)();t(26)(i), t(42)(i), t(22)(i), t(31)(i), t(25)(i), t(21)(i), t(23)(i), t(24)(i), t(29)(i), t(33)(i), t(34)(i), t(32)(i), t(35)(i), t(30)(i), t(27)(i), t(36)(i), t(37)(i), t(38)(i), t(39)(i), t(40)(i), t(45)(i), t(43)(i), t(44)(i), t(46)(i), t(47)(i), t(48)(i), t(15)(i), t(16)(i), t(17)(i), t(18)(i), t(19)(i), t(20)(i), t(8)(i), t(9)(i), t(10)(i), t(11)(i), t(12)(i), t(13)(i), t(14)(i), window.Chart = e.exports = i;
    }, { 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 8: 8, 9: 9 }], 8: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        t.Bar = function (e, a) {
          return a.type = "bar", new t(e, a);
        };
      };
    }, {}], 9: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        t.Bubble = function (e, a) {
          return a.type = "bubble", new t(e, a);
        };
      };
    }, {}], 10: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        t.Doughnut = function (e, a) {
          return a.type = "doughnut", new t(e, a);
        };
      };
    }, {}], 11: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        t.Line = function (e, a) {
          return a.type = "line", new t(e, a);
        };
      };
    }, {}], 12: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        t.PolarArea = function (e, a) {
          return a.type = "polarArea", new t(e, a);
        };
      };
    }, {}], 13: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        t.Radar = function (e, a) {
          return a.type = "radar", new t(e, a);
        };
      };
    }, {}], 14: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = { hover: { mode: "single" }, scales: { xAxes: [{ type: "linear", position: "bottom", id: "x-axis-1" }], yAxes: [{ type: "linear", position: "left", id: "y-axis-1" }] }, tooltips: { callbacks: { title: function title() {
                return "";
              }, label: function label(t) {
                return "(" + t.xLabel + ", " + t.yLabel + ")";
              } } } };t.defaults.scatter = e, t.controllers.scatter = t.controllers.line, t.Scatter = function (e, a) {
          return a.type = "scatter", new t(e, a);
        };
      };
    }, {}], 15: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.defaults.bar = { hover: { mode: "label" }, scales: { xAxes: [{ type: "category", categoryPercentage: .8, barPercentage: .9, gridLines: { offsetGridLines: !0 } }], yAxes: [{ type: "linear" }] } }, t.controllers.bar = t.DatasetController.extend({ dataElementType: t.elements.Rectangle, initialize: function initialize(e, a) {
            t.DatasetController.prototype.initialize.call(this, e, a);var i = this,
                n = i.getMeta(),
                o = i.getDataset();n.stack = o.stack, n.bar = !0;
          }, getStackCount: function getStackCount() {
            var t = this,
                a = t.getMeta(),
                i = t.getScaleForId(a.yAxisID),
                n = [];return e.each(t.chart.data.datasets, function (e, a) {
              var o = t.chart.getDatasetMeta(a);o.bar && t.chart.isDatasetVisible(a) && (i.options.stacked === !1 || i.options.stacked === !0 && n.indexOf(o.stack) === -1 || void 0 === i.options.stacked && (void 0 === o.stack || n.indexOf(o.stack) === -1)) && n.push(o.stack);
            }, t), n.length;
          }, update: function update(t) {
            var a = this;e.each(a.getMeta().data, function (e, i) {
              a.updateElement(e, i, t);
            }, a);
          }, updateElement: function updateElement(t, a, i) {
            var n = this,
                o = n.getMeta(),
                r = n.getScaleForId(o.xAxisID),
                s = n.getScaleForId(o.yAxisID),
                l = s.getBasePixel(),
                u = n.chart.options.elements.rectangle,
                d = t.custom || {},
                c = n.getDataset();t._xScale = r, t._yScale = s, t._datasetIndex = n.index, t._index = a;var h = n.getRuler(a);t._model = { x: n.calculateBarX(a, n.index, h), y: i ? l : n.calculateBarY(a, n.index), label: n.chart.data.labels[a], datasetLabel: c.label, horizontal: !1, base: i ? l : n.calculateBarBase(n.index, a), width: n.calculateBarWidth(h), backgroundColor: d.backgroundColor ? d.backgroundColor : e.getValueAtIndexOrDefault(c.backgroundColor, a, u.backgroundColor), borderSkipped: d.borderSkipped ? d.borderSkipped : u.borderSkipped, borderColor: d.borderColor ? d.borderColor : e.getValueAtIndexOrDefault(c.borderColor, a, u.borderColor), borderWidth: d.borderWidth ? d.borderWidth : e.getValueAtIndexOrDefault(c.borderWidth, a, u.borderWidth) }, t.pivot();
          }, calculateBarBase: function calculateBarBase(t, e) {
            var a = this,
                i = a.getMeta(),
                n = a.getScaleForId(i.yAxisID),
                o = n.getBaseValue(),
                r = o;if (n.options.stacked === !0 || void 0 === n.options.stacked && void 0 !== i.stack) {
              for (var s = a.chart, l = s.data.datasets, u = Number(l[t].data[e]), d = 0; d < t; d++) {
                var c = l[d],
                    h = s.getDatasetMeta(d);if (h.bar && h.yAxisID === n.id && s.isDatasetVisible(d) && i.stack === h.stack) {
                  var f = Number(c.data[e]);o += u < 0 ? Math.min(f, r) : Math.max(f, r);
                }
              }return n.getPixelForValue(o);
            }return n.getBasePixel();
          }, getRuler: function getRuler() {
            var t = this,
                e = t.getMeta(),
                a = t.getScaleForId(e.xAxisID),
                i = t.getStackCount(),
                n = a.width / a.ticks.length,
                o = n * a.options.categoryPercentage,
                r = (n - n * a.options.categoryPercentage) / 2,
                s = o / i,
                l = s * a.options.barPercentage,
                u = s - s * a.options.barPercentage;return { stackCount: i, tickWidth: n, categoryWidth: o, categorySpacing: r, fullBarWidth: s, barWidth: l, barSpacing: u };
          }, calculateBarWidth: function calculateBarWidth(t) {
            var e = this,
                a = e.getMeta(),
                i = e.getScaleForId(a.xAxisID);return i.options.barThickness ? i.options.barThickness : t.barWidth;
          }, getStackIndex: function getStackIndex(t) {
            var e,
                a,
                i = this,
                n = i.chart.getDatasetMeta(t),
                o = i.getScaleForId(n.yAxisID),
                r = [n.stack];for (a = 0; a < t; ++a) {
              e = this.chart.getDatasetMeta(a), e.bar && this.chart.isDatasetVisible(a) && (o.options.stacked === !1 || o.options.stacked === !0 && r.indexOf(e.stack) === -1 || void 0 === o.options.stacked && (void 0 === e.stack || r.indexOf(e.stack) === -1)) && r.push(e.stack);
            }return r.length - 1;
          }, calculateBarX: function calculateBarX(t, e, a) {
            var i = this,
                n = i.getMeta(),
                o = i.getScaleForId(n.xAxisID),
                r = i.getStackIndex(e),
                s = o.getPixelForValue(null, t, e, i.chart.isCombo);return s -= i.chart.isCombo ? a.tickWidth / 2 : 0, s + a.barWidth / 2 + a.categorySpacing + a.barWidth * r + a.barSpacing / 2 + a.barSpacing * r;
          }, calculateBarY: function calculateBarY(t, e) {
            var a = this,
                i = a.getMeta(),
                n = a.getScaleForId(i.yAxisID),
                o = Number(a.getDataset().data[t]);if (n.options.stacked || void 0 === n.options.stacked && void 0 !== i.stack) {
              for (var r = n.getBaseValue(), s = r, l = r, u = 0; u < e; u++) {
                var d = a.chart.data.datasets[u],
                    c = a.chart.getDatasetMeta(u);if (c.bar && c.yAxisID === n.id && a.chart.isDatasetVisible(u) && i.stack === c.stack) {
                  var h = Number(d.data[t]);h < 0 ? l += h || 0 : s += h || 0;
                }
              }return o < 0 ? n.getPixelForValue(l + o) : n.getPixelForValue(s + o);
            }return n.getPixelForValue(o);
          }, draw: function draw(e) {
            var a,
                i,
                n = this,
                o = e || 1,
                r = n.getMeta().data,
                s = n.getDataset();for (t.canvasHelpers.clipArea(n.chart.chart.ctx, n.chart.chartArea), a = 0, i = r.length; a < i; ++a) {
              var l = s.data[a];null === l || void 0 === l || isNaN(l) || r[a].transition(o).draw();
            }t.canvasHelpers.unclipArea(n.chart.chart.ctx);
          }, setHoverStyle: function setHoverStyle(t) {
            var a = this.chart.data.datasets[t._datasetIndex],
                i = t._index,
                n = t.custom || {},
                o = t._model;o.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : e.getValueAtIndexOrDefault(a.hoverBackgroundColor, i, e.getHoverColor(o.backgroundColor)), o.borderColor = n.hoverBorderColor ? n.hoverBorderColor : e.getValueAtIndexOrDefault(a.hoverBorderColor, i, e.getHoverColor(o.borderColor)), o.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : e.getValueAtIndexOrDefault(a.hoverBorderWidth, i, o.borderWidth);
          }, removeHoverStyle: function removeHoverStyle(t) {
            var a = this.chart.data.datasets[t._datasetIndex],
                i = t._index,
                n = t.custom || {},
                o = t._model,
                r = this.chart.options.elements.rectangle;o.backgroundColor = n.backgroundColor ? n.backgroundColor : e.getValueAtIndexOrDefault(a.backgroundColor, i, r.backgroundColor), o.borderColor = n.borderColor ? n.borderColor : e.getValueAtIndexOrDefault(a.borderColor, i, r.borderColor), o.borderWidth = n.borderWidth ? n.borderWidth : e.getValueAtIndexOrDefault(a.borderWidth, i, r.borderWidth);
          } }), t.defaults.horizontalBar = { hover: { mode: "label" }, scales: { xAxes: [{ type: "linear", position: "bottom" }], yAxes: [{ position: "left", type: "category", categoryPercentage: .8, barPercentage: .9, gridLines: { offsetGridLines: !0 } }] }, elements: { rectangle: { borderSkipped: "left" } }, tooltips: { callbacks: { title: function title(t, e) {
                var a = "";return t.length > 0 && (t[0].yLabel ? a = t[0].yLabel : e.labels.length > 0 && t[0].index < e.labels.length && (a = e.labels[t[0].index])), a;
              }, label: function label(t, e) {
                var a = e.datasets[t.datasetIndex].label || "";return a + ": " + t.xLabel;
              } } } }, t.controllers.horizontalBar = t.controllers.bar.extend({ getStackCount: function getStackCount() {
            var t = this,
                a = t.getMeta(),
                i = t.getScaleForId(a.xAxisID),
                n = [];return e.each(t.chart.data.datasets, function (e, a) {
              var o = t.chart.getDatasetMeta(a);o.bar && t.chart.isDatasetVisible(a) && (i.options.stacked === !1 || i.options.stacked === !0 && n.indexOf(o.stack) === -1 || void 0 === i.options.stacked && (void 0 === o.stack || n.indexOf(o.stack) === -1)) && n.push(o.stack);
            }, t), n.length;
          }, updateElement: function updateElement(t, a, i) {
            var n = this,
                o = n.getMeta(),
                r = n.getScaleForId(o.xAxisID),
                s = n.getScaleForId(o.yAxisID),
                l = r.getBasePixel(),
                u = t.custom || {},
                d = n.getDataset(),
                c = n.chart.options.elements.rectangle;t._xScale = r, t._yScale = s, t._datasetIndex = n.index, t._index = a;var h = n.getRuler(a);t._model = { x: i ? l : n.calculateBarX(a, n.index), y: n.calculateBarY(a, n.index, h), label: n.chart.data.labels[a], datasetLabel: d.label, horizontal: !0, base: i ? l : n.calculateBarBase(n.index, a), height: n.calculateBarHeight(h), backgroundColor: u.backgroundColor ? u.backgroundColor : e.getValueAtIndexOrDefault(d.backgroundColor, a, c.backgroundColor), borderSkipped: u.borderSkipped ? u.borderSkipped : c.borderSkipped, borderColor: u.borderColor ? u.borderColor : e.getValueAtIndexOrDefault(d.borderColor, a, c.borderColor),
              borderWidth: u.borderWidth ? u.borderWidth : e.getValueAtIndexOrDefault(d.borderWidth, a, c.borderWidth) }, t.pivot();
          }, calculateBarBase: function calculateBarBase(t, e) {
            var a = this,
                i = a.getMeta(),
                n = a.getScaleForId(i.xAxisID),
                o = n.getBaseValue(),
                r = o;if (n.options.stacked || void 0 === n.options.stacked && void 0 !== i.stack) {
              for (var s = a.chart, l = s.data.datasets, u = Number(l[t].data[e]), d = 0; d < t; d++) {
                var c = l[d],
                    h = s.getDatasetMeta(d);if (h.bar && h.xAxisID === n.id && s.isDatasetVisible(d) && i.stack === h.stack) {
                  var f = Number(c.data[e]);o += u < 0 ? Math.min(f, r) : Math.max(f, r);
                }
              }return n.getPixelForValue(o);
            }return n.getBasePixel();
          }, getRuler: function getRuler() {
            var t = this,
                e = t.getMeta(),
                a = t.getScaleForId(e.yAxisID),
                i = t.getStackCount(),
                n = a.height / a.ticks.length,
                o = n * a.options.categoryPercentage,
                r = (n - n * a.options.categoryPercentage) / 2,
                s = o / i,
                l = s * a.options.barPercentage,
                u = s - s * a.options.barPercentage;return { stackCount: i, tickHeight: n, categoryHeight: o, categorySpacing: r, fullBarHeight: s, barHeight: l, barSpacing: u };
          }, calculateBarHeight: function calculateBarHeight(t) {
            var e = this,
                a = e.getMeta(),
                i = e.getScaleForId(a.yAxisID);return i.options.barThickness ? i.options.barThickness : t.barHeight;
          }, getStackIndex: function getStackIndex(t) {
            var e,
                a,
                i = this,
                n = i.chart.getDatasetMeta(t),
                o = i.getScaleForId(n.xAxisID),
                r = [n.stack];for (a = 0; a < t; ++a) {
              e = this.chart.getDatasetMeta(a), e.bar && this.chart.isDatasetVisible(a) && (o.options.stacked === !1 || o.options.stacked === !0 && r.indexOf(e.stack) === -1 || void 0 === o.options.stacked && (void 0 === e.stack || r.indexOf(e.stack) === -1)) && r.push(e.stack);
            }return r.length - 1;
          }, calculateBarX: function calculateBarX(t, e) {
            var a = this,
                i = a.getMeta(),
                n = a.getScaleForId(i.xAxisID),
                o = Number(a.getDataset().data[t]);if (n.options.stacked || void 0 === n.options.stacked && void 0 !== i.stack) {
              for (var r = n.getBaseValue(), s = r, l = r, u = 0; u < e; u++) {
                var d = a.chart.data.datasets[u],
                    c = a.chart.getDatasetMeta(u);if (c.bar && c.xAxisID === n.id && a.chart.isDatasetVisible(u) && i.stack === c.stack) {
                  var h = Number(d.data[t]);h < 0 ? l += h || 0 : s += h || 0;
                }
              }return o < 0 ? n.getPixelForValue(l + o) : n.getPixelForValue(s + o);
            }return n.getPixelForValue(o);
          }, calculateBarY: function calculateBarY(t, e, a) {
            var i = this,
                n = i.getMeta(),
                o = i.getScaleForId(n.yAxisID),
                r = i.getStackIndex(e),
                s = o.getPixelForValue(null, t, e, i.chart.isCombo);return s -= i.chart.isCombo ? a.tickHeight / 2 : 0, s + a.barHeight / 2 + a.categorySpacing + a.barHeight * r + a.barSpacing / 2 + a.barSpacing * r;
          } });
      };
    }, {}], 16: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.defaults.bubble = { hover: { mode: "single" }, scales: { xAxes: [{ type: "linear", position: "bottom", id: "x-axis-0" }], yAxes: [{ type: "linear", position: "left", id: "y-axis-0" }] }, tooltips: { callbacks: { title: function title() {
                return "";
              }, label: function label(t, e) {
                var a = e.datasets[t.datasetIndex].label || "",
                    i = e.datasets[t.datasetIndex].data[t.index];return a + ": (" + t.xLabel + ", " + t.yLabel + ", " + i.r + ")";
              } } } }, t.controllers.bubble = t.DatasetController.extend({ dataElementType: t.elements.Point, update: function update(t) {
            var a = this,
                i = a.getMeta(),
                n = i.data;e.each(n, function (e, i) {
              a.updateElement(e, i, t);
            });
          }, updateElement: function updateElement(a, i, n) {
            var o = this,
                r = o.getMeta(),
                s = o.getScaleForId(r.xAxisID),
                l = o.getScaleForId(r.yAxisID),
                u = a.custom || {},
                d = o.getDataset(),
                c = d.data[i],
                h = o.chart.options.elements.point,
                f = o.index;e.extend(a, { _xScale: s, _yScale: l, _datasetIndex: f, _index: i, _model: { x: n ? s.getPixelForDecimal(.5) : s.getPixelForValue("object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? c : NaN, i, f, o.chart.isCombo), y: n ? l.getBasePixel() : l.getPixelForValue(c, i, f), radius: n ? 0 : u.radius ? u.radius : o.getRadius(c), hitRadius: u.hitRadius ? u.hitRadius : e.getValueAtIndexOrDefault(d.hitRadius, i, h.hitRadius) } }), t.DatasetController.prototype.removeHoverStyle.call(o, a, h);var g = a._model;g.skip = u.skip ? u.skip : isNaN(g.x) || isNaN(g.y), a.pivot();
          }, getRadius: function getRadius(t) {
            return t.r || this.chart.options.elements.point.radius;
          }, setHoverStyle: function setHoverStyle(a) {
            var i = this;t.DatasetController.prototype.setHoverStyle.call(i, a);var n = i.chart.data.datasets[a._datasetIndex],
                o = a._index,
                r = a.custom || {},
                s = a._model;s.radius = r.hoverRadius ? r.hoverRadius : e.getValueAtIndexOrDefault(n.hoverRadius, o, i.chart.options.elements.point.hoverRadius) + i.getRadius(n.data[o]);
          }, removeHoverStyle: function removeHoverStyle(e) {
            var a = this;t.DatasetController.prototype.removeHoverStyle.call(a, e, a.chart.options.elements.point);var i = a.chart.data.datasets[e._datasetIndex].data[e._index],
                n = e.custom || {},
                o = e._model;o.radius = n.radius ? n.radius : a.getRadius(i);
          } });
      };
    }, {}], 17: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers,
            a = t.defaults;a.doughnut = { animation: { animateRotate: !0, animateScale: !1 }, aspectRatio: 1, hover: { mode: "single" }, legendCallback: function legendCallback(t) {
            var e = [];e.push('<ul class="' + t.id + '-legend">');var a = t.data,
                i = a.datasets,
                n = a.labels;if (i.length) for (var o = 0; o < i[0].data.length; ++o) {
              e.push('<li><span style="background-color:' + i[0].backgroundColor[o] + '"></span>'), n[o] && e.push(n[o]), e.push("</li>");
            }return e.push("</ul>"), e.join("");
          }, legend: { labels: { generateLabels: function generateLabels(t) {
                var a = t.data;return a.labels.length && a.datasets.length ? a.labels.map(function (i, n) {
                  var o = t.getDatasetMeta(0),
                      r = a.datasets[0],
                      s = o.data[n],
                      l = s && s.custom || {},
                      u = e.getValueAtIndexOrDefault,
                      d = t.options.elements.arc,
                      c = l.backgroundColor ? l.backgroundColor : u(r.backgroundColor, n, d.backgroundColor),
                      h = l.borderColor ? l.borderColor : u(r.borderColor, n, d.borderColor),
                      f = l.borderWidth ? l.borderWidth : u(r.borderWidth, n, d.borderWidth);return { text: i, fillStyle: c, strokeStyle: h, lineWidth: f, hidden: isNaN(r.data[n]) || o.data[n].hidden, index: n };
                }) : [];
              } }, onClick: function onClick(t, e) {
              var a,
                  i,
                  n,
                  o = e.index,
                  r = this.chart;for (a = 0, i = (r.data.datasets || []).length; a < i; ++a) {
                n = r.getDatasetMeta(a), n.data[o] && (n.data[o].hidden = !n.data[o].hidden);
              }r.update();
            } }, cutoutPercentage: 50, rotation: Math.PI * -.5, circumference: 2 * Math.PI, tooltips: { callbacks: { title: function title() {
                return "";
              }, label: function label(t, a) {
                var i = a.labels[t.index],
                    n = ": " + a.datasets[t.datasetIndex].data[t.index];return e.isArray(i) ? (i = i.slice(), i[0] += n) : i += n, i;
              } } } }, a.pie = e.clone(a.doughnut), e.extend(a.pie, { cutoutPercentage: 0 }), t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({ dataElementType: t.elements.Arc, linkScales: e.noop, getRingIndex: function getRingIndex(t) {
            for (var e = 0, a = 0; a < t; ++a) {
              this.chart.isDatasetVisible(a) && ++e;
            }return e;
          }, update: function update(t) {
            var a = this,
                i = a.chart,
                n = i.chartArea,
                o = i.options,
                r = o.elements.arc,
                s = n.right - n.left - r.borderWidth,
                l = n.bottom - n.top - r.borderWidth,
                u = Math.min(s, l),
                d = { x: 0, y: 0 },
                c = a.getMeta(),
                h = o.cutoutPercentage,
                f = o.circumference;if (f < 2 * Math.PI) {
              var g = o.rotation % (2 * Math.PI);g += 2 * Math.PI * (g >= Math.PI ? -1 : g < -Math.PI ? 1 : 0);var p = g + f,
                  m = { x: Math.cos(g), y: Math.sin(g) },
                  v = { x: Math.cos(p), y: Math.sin(p) },
                  b = g <= 0 && 0 <= p || g <= 2 * Math.PI && 2 * Math.PI <= p,
                  x = g <= .5 * Math.PI && .5 * Math.PI <= p || g <= 2.5 * Math.PI && 2.5 * Math.PI <= p,
                  y = g <= -Math.PI && -Math.PI <= p || g <= Math.PI && Math.PI <= p,
                  k = g <= .5 * -Math.PI && .5 * -Math.PI <= p || g <= 1.5 * Math.PI && 1.5 * Math.PI <= p,
                  S = h / 100,
                  M = { x: y ? -1 : Math.min(m.x * (m.x < 0 ? 1 : S), v.x * (v.x < 0 ? 1 : S)), y: k ? -1 : Math.min(m.y * (m.y < 0 ? 1 : S), v.y * (v.y < 0 ? 1 : S)) },
                  w = { x: b ? 1 : Math.max(m.x * (m.x > 0 ? 1 : S), v.x * (v.x > 0 ? 1 : S)), y: x ? 1 : Math.max(m.y * (m.y > 0 ? 1 : S), v.y * (v.y > 0 ? 1 : S)) },
                  C = { width: .5 * (w.x - M.x), height: .5 * (w.y - M.y) };u = Math.min(s / C.width, l / C.height), d = { x: (w.x + M.x) * -.5, y: (w.y + M.y) * -.5 };
            }i.borderWidth = a.getMaxBorderWidth(c.data), i.outerRadius = Math.max((u - i.borderWidth) / 2, 0), i.innerRadius = Math.max(h ? i.outerRadius / 100 * h : 0, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), i.offsetX = d.x * i.outerRadius, i.offsetY = d.y * i.outerRadius, c.total = a.calculateTotal(), a.outerRadius = i.outerRadius - i.radiusLength * a.getRingIndex(a.index), a.innerRadius = Math.max(a.outerRadius - i.radiusLength, 0), e.each(c.data, function (e, i) {
              a.updateElement(e, i, t);
            });
          }, updateElement: function updateElement(t, a, i) {
            var n = this,
                o = n.chart,
                r = o.chartArea,
                s = o.options,
                l = s.animation,
                u = (r.left + r.right) / 2,
                d = (r.top + r.bottom) / 2,
                c = s.rotation,
                h = s.rotation,
                f = n.getDataset(),
                g = i && l.animateRotate ? 0 : t.hidden ? 0 : n.calculateCircumference(f.data[a]) * (s.circumference / (2 * Math.PI)),
                p = i && l.animateScale ? 0 : n.innerRadius,
                m = i && l.animateScale ? 0 : n.outerRadius,
                v = e.getValueAtIndexOrDefault;e.extend(t, { _datasetIndex: n.index, _index: a, _model: { x: u + o.offsetX, y: d + o.offsetY, startAngle: c, endAngle: h, circumference: g, outerRadius: m, innerRadius: p, label: v(f.label, a, o.data.labels[a]) } });var b = t._model;this.removeHoverStyle(t), i && l.animateRotate || (0 === a ? b.startAngle = s.rotation : b.startAngle = n.getMeta().data[a - 1]._model.endAngle, b.endAngle = b.startAngle + b.circumference), t.pivot();
          }, removeHoverStyle: function removeHoverStyle(e) {
            t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc);
          }, calculateTotal: function calculateTotal() {
            var t,
                a = this.getDataset(),
                i = this.getMeta(),
                n = 0;return e.each(i.data, function (e, i) {
              t = a.data[i], isNaN(t) || e.hidden || (n += Math.abs(t));
            }), n;
          }, calculateCircumference: function calculateCircumference(t) {
            var e = this.getMeta().total;return e > 0 && !isNaN(t) ? 2 * Math.PI * (t / e) : 0;
          }, getMaxBorderWidth: function getMaxBorderWidth(t) {
            for (var e, a, i = 0, n = this.index, o = t.length, r = 0; r < o; r++) {
              e = t[r]._model ? t[r]._model.borderWidth : 0, a = t[r]._chart ? t[r]._chart.config.data.datasets[n].hoverBorderWidth : 0, i = e > i ? e : i, i = a > i ? a : i;
            }return i;
          } });
      };
    }, {}], 18: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t, e) {
          return a.getValueOrDefault(t.showLine, e.showLines);
        }var a = t.helpers;t.defaults.line = { showLines: !0, spanGaps: !1, hover: { mode: "label" }, scales: { xAxes: [{ type: "category", id: "x-axis-0" }], yAxes: [{ type: "linear", id: "y-axis-0" }] } }, t.controllers.line = t.DatasetController.extend({ datasetElementType: t.elements.Line, dataElementType: t.elements.Point, update: function update(t) {
            var i,
                n,
                o,
                r = this,
                s = r.getMeta(),
                l = s.dataset,
                u = s.data || [],
                d = r.chart.options,
                c = d.elements.line,
                h = r.getScaleForId(s.yAxisID),
                f = r.getDataset(),
                g = e(f, d);for (g && (o = l.custom || {}, void 0 !== f.tension && void 0 === f.lineTension && (f.lineTension = f.tension), l._scale = h, l._datasetIndex = r.index, l._children = u, l._model = { spanGaps: f.spanGaps ? f.spanGaps : d.spanGaps, tension: o.tension ? o.tension : a.getValueOrDefault(f.lineTension, c.tension), backgroundColor: o.backgroundColor ? o.backgroundColor : f.backgroundColor || c.backgroundColor, borderWidth: o.borderWidth ? o.borderWidth : f.borderWidth || c.borderWidth, borderColor: o.borderColor ? o.borderColor : f.borderColor || c.borderColor, borderCapStyle: o.borderCapStyle ? o.borderCapStyle : f.borderCapStyle || c.borderCapStyle, borderDash: o.borderDash ? o.borderDash : f.borderDash || c.borderDash, borderDashOffset: o.borderDashOffset ? o.borderDashOffset : f.borderDashOffset || c.borderDashOffset, borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : f.borderJoinStyle || c.borderJoinStyle, fill: o.fill ? o.fill : void 0 !== f.fill ? f.fill : c.fill, steppedLine: o.steppedLine ? o.steppedLine : a.getValueOrDefault(f.steppedLine, c.stepped), cubicInterpolationMode: o.cubicInterpolationMode ? o.cubicInterpolationMode : a.getValueOrDefault(f.cubicInterpolationMode, c.cubicInterpolationMode), scaleTop: h.top, scaleBottom: h.bottom, scaleZero: h.getBasePixel() }, l.pivot()), i = 0, n = u.length; i < n; ++i) {
              r.updateElement(u[i], i, t);
            }for (g && 0 !== l._model.tension && r.updateBezierControlPoints(), i = 0, n = u.length; i < n; ++i) {
              u[i].pivot();
            }
          }, getPointBackgroundColor: function getPointBackgroundColor(t, e) {
            var i = this.chart.options.elements.point.backgroundColor,
                n = this.getDataset(),
                o = t.custom || {};return o.backgroundColor ? i = o.backgroundColor : n.pointBackgroundColor ? i = a.getValueAtIndexOrDefault(n.pointBackgroundColor, e, i) : n.backgroundColor && (i = n.backgroundColor), i;
          }, getPointBorderColor: function getPointBorderColor(t, e) {
            var i = this.chart.options.elements.point.borderColor,
                n = this.getDataset(),
                o = t.custom || {};return o.borderColor ? i = o.borderColor : n.pointBorderColor ? i = a.getValueAtIndexOrDefault(n.pointBorderColor, e, i) : n.borderColor && (i = n.borderColor), i;
          }, getPointBorderWidth: function getPointBorderWidth(t, e) {
            var i = this.chart.options.elements.point.borderWidth,
                n = this.getDataset(),
                o = t.custom || {};return isNaN(o.borderWidth) ? isNaN(n.pointBorderWidth) ? isNaN(n.borderWidth) || (i = n.borderWidth) : i = a.getValueAtIndexOrDefault(n.pointBorderWidth, e, i) : i = o.borderWidth, i;
          }, updateElement: function updateElement(t, e, i) {
            var n,
                o,
                r = this,
                s = r.getMeta(),
                l = t.custom || {},
                u = r.getDataset(),
                d = r.index,
                c = u.data[e],
                h = r.getScaleForId(s.yAxisID),
                f = r.getScaleForId(s.xAxisID),
                g = r.chart.options.elements.point,
                p = r.chart.data.labels || [],
                m = 1 === p.length || 1 === u.data.length || r.chart.isCombo;void 0 !== u.radius && void 0 === u.pointRadius && (u.pointRadius = u.radius), void 0 !== u.hitRadius && void 0 === u.pointHitRadius && (u.pointHitRadius = u.hitRadius), n = f.getPixelForValue("object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? c : NaN, e, d, m), o = i ? h.getBasePixel() : r.calculatePointY(c, e, d), t._xScale = f, t._yScale = h, t._datasetIndex = d, t._index = e, t._model = { x: n, y: o, skip: l.skip || isNaN(n) || isNaN(o), radius: l.radius || a.getValueAtIndexOrDefault(u.pointRadius, e, g.radius), pointStyle: l.pointStyle || a.getValueAtIndexOrDefault(u.pointStyle, e, g.pointStyle), backgroundColor: r.getPointBackgroundColor(t, e), borderColor: r.getPointBorderColor(t, e), borderWidth: r.getPointBorderWidth(t, e), tension: s.dataset._model ? s.dataset._model.tension : 0, steppedLine: !!s.dataset._model && s.dataset._model.steppedLine, hitRadius: l.hitRadius || a.getValueAtIndexOrDefault(u.pointHitRadius, e, g.hitRadius) };
          }, calculatePointY: function calculatePointY(t, e, a) {
            var i,
                n,
                o,
                r = this,
                s = r.chart,
                l = r.getMeta(),
                u = r.getScaleForId(l.yAxisID),
                d = 0,
                c = 0;if (u.options.stacked) {
              for (i = 0; i < a; i++) {
                if (n = s.data.datasets[i], o = s.getDatasetMeta(i), "line" === o.type && o.yAxisID === u.id && s.isDatasetVisible(i)) {
                  var h = Number(u.getRightValue(n.data[e]));h < 0 ? c += h || 0 : d += h || 0;
                }
              }var f = Number(u.getRightValue(t));return f < 0 ? u.getPixelForValue(c + f) : u.getPixelForValue(d + f);
            }return u.getPixelForValue(t);
          }, updateBezierControlPoints: function updateBezierControlPoints() {
            function t(t, e, a) {
              return Math.max(Math.min(t, a), e);
            }var e,
                i,
                n,
                o,
                r,
                s = this,
                l = s.getMeta(),
                u = s.chart.chartArea,
                d = l.data || [];if (l.dataset._model.spanGaps && (d = d.filter(function (t) {
              return !t._model.skip;
            })), "monotone" === l.dataset._model.cubicInterpolationMode) a.splineCurveMonotone(d);else for (e = 0, i = d.length; e < i; ++e) {
              n = d[e], o = n._model, r = a.splineCurve(a.previousItem(d, e)._model, o, a.nextItem(d, e)._model, l.dataset._model.tension), o.controlPointPreviousX = r.previous.x, o.controlPointPreviousY = r.previous.y, o.controlPointNextX = r.next.x, o.controlPointNextY = r.next.y;
            }if (s.chart.options.elements.line.capBezierPoints) for (e = 0, i = d.length; e < i; ++e) {
              o = d[e]._model, o.controlPointPreviousX = t(o.controlPointPreviousX, u.left, u.right), o.controlPointPreviousY = t(o.controlPointPreviousY, u.top, u.bottom), o.controlPointNextX = t(o.controlPointNextX, u.left, u.right), o.controlPointNextY = t(o.controlPointNextY, u.top, u.bottom);
            }
          }, draw: function draw(a) {
            var i,
                n,
                o = this,
                r = o.getMeta(),
                s = r.data || [],
                l = a || 1;for (i = 0, n = s.length; i < n; ++i) {
              s[i].transition(l);
            }for (t.canvasHelpers.clipArea(o.chart.chart.ctx, o.chart.chartArea), e(o.getDataset(), o.chart.options) && r.dataset.transition(l).draw(), t.canvasHelpers.unclipArea(o.chart.chart.ctx), i = 0, n = s.length; i < n; ++i) {
              s[i].draw(o.chart.chartArea);
            }
          }, setHoverStyle: function setHoverStyle(t) {
            var e = this.chart.data.datasets[t._datasetIndex],
                i = t._index,
                n = t.custom || {},
                o = t._model;o.radius = n.hoverRadius || a.getValueAtIndexOrDefault(e.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius), o.backgroundColor = n.hoverBackgroundColor || a.getValueAtIndexOrDefault(e.pointHoverBackgroundColor, i, a.getHoverColor(o.backgroundColor)), o.borderColor = n.hoverBorderColor || a.getValueAtIndexOrDefault(e.pointHoverBorderColor, i, a.getHoverColor(o.borderColor)), o.borderWidth = n.hoverBorderWidth || a.getValueAtIndexOrDefault(e.pointHoverBorderWidth, i, o.borderWidth);
          }, removeHoverStyle: function removeHoverStyle(t) {
            var e = this,
                i = e.chart.data.datasets[t._datasetIndex],
                n = t._index,
                o = t.custom || {},
                r = t._model;void 0 !== i.radius && void 0 === i.pointRadius && (i.pointRadius = i.radius), r.radius = o.radius || a.getValueAtIndexOrDefault(i.pointRadius, n, e.chart.options.elements.point.radius), r.backgroundColor = e.getPointBackgroundColor(t, n), r.borderColor = e.getPointBorderColor(t, n), r.borderWidth = e.getPointBorderWidth(t, n);
          } });
      };
    }, {}], 19: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.defaults.polarArea = { scale: { type: "radialLinear", lineArc: !0, ticks: { beginAtZero: !0 } }, animation: { animateRotate: !0, animateScale: !0 }, startAngle: -.5 * Math.PI, aspectRatio: 1, legendCallback: function legendCallback(t) {
            var e = [];e.push('<ul class="' + t.id + '-legend">');var a = t.data,
                i = a.datasets,
                n = a.labels;if (i.length) for (var o = 0; o < i[0].data.length; ++o) {
              e.push('<li><span style="background-color:' + i[0].backgroundColor[o] + '"></span>'), n[o] && e.push(n[o]), e.push("</li>");
            }return e.push("</ul>"), e.join("");
          }, legend: { labels: { generateLabels: function generateLabels(t) {
                var a = t.data;return a.labels.length && a.datasets.length ? a.labels.map(function (i, n) {
                  var o = t.getDatasetMeta(0),
                      r = a.datasets[0],
                      s = o.data[n],
                      l = s.custom || {},
                      u = e.getValueAtIndexOrDefault,
                      d = t.options.elements.arc,
                      c = l.backgroundColor ? l.backgroundColor : u(r.backgroundColor, n, d.backgroundColor),
                      h = l.borderColor ? l.borderColor : u(r.borderColor, n, d.borderColor),
                      f = l.borderWidth ? l.borderWidth : u(r.borderWidth, n, d.borderWidth);return { text: i, fillStyle: c, strokeStyle: h, lineWidth: f, hidden: isNaN(r.data[n]) || o.data[n].hidden, index: n };
                }) : [];
              } }, onClick: function onClick(t, e) {
              var a,
                  i,
                  n,
                  o = e.index,
                  r = this.chart;for (a = 0, i = (r.data.datasets || []).length; a < i; ++a) {
                n = r.getDatasetMeta(a), n.data[o].hidden = !n.data[o].hidden;
              }r.update();
            } }, tooltips: { callbacks: { title: function title() {
                return "";
              }, label: function label(t, e) {
                return e.labels[t.index] + ": " + t.yLabel;
              } } } }, t.controllers.polarArea = t.DatasetController.extend({ dataElementType: t.elements.Arc, linkScales: e.noop, update: function update(t) {
            var a = this,
                i = a.chart,
                n = i.chartArea,
                o = a.getMeta(),
                r = i.options,
                s = r.elements.arc,
                l = Math.min(n.right - n.left, n.bottom - n.top);i.outerRadius = Math.max((l - s.borderWidth / 2) / 2, 0), i.innerRadius = Math.max(r.cutoutPercentage ? i.outerRadius / 100 * r.cutoutPercentage : 1, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), a.outerRadius = i.outerRadius - i.radiusLength * a.index, a.innerRadius = a.outerRadius - i.radiusLength, o.count = a.countVisibleElements(), e.each(o.data, function (e, i) {
              a.updateElement(e, i, t);
            });
          }, updateElement: function updateElement(t, a, i) {
            for (var n = this, o = n.chart, r = n.getDataset(), s = o.options, l = s.animation, u = o.scale, d = e.getValueAtIndexOrDefault, c = o.data.labels, h = n.calculateCircumference(r.data[a]), f = u.xCenter, g = u.yCenter, p = 0, m = n.getMeta(), v = 0; v < a; ++v) {
              isNaN(r.data[v]) || m.data[v].hidden || ++p;
            }var b = s.startAngle,
                x = t.hidden ? 0 : u.getDistanceFromCenterForValue(r.data[a]),
                y = b + h * p,
                k = y + (t.hidden ? 0 : h),
                S = l.animateScale ? 0 : u.getDistanceFromCenterForValue(r.data[a]);e.extend(t, { _datasetIndex: n.index, _index: a, _scale: u, _model: { x: f, y: g, innerRadius: 0, outerRadius: i ? S : x, startAngle: i && l.animateRotate ? b : y, endAngle: i && l.animateRotate ? b : k, label: d(c, a, c[a]) } }), n.removeHoverStyle(t), t.pivot();
          }, removeHoverStyle: function removeHoverStyle(e) {
            t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc);
          }, countVisibleElements: function countVisibleElements() {
            var t = this.getDataset(),
                a = this.getMeta(),
                i = 0;return e.each(a.data, function (e, a) {
              isNaN(t.data[a]) || e.hidden || i++;
            }), i;
          }, calculateCircumference: function calculateCircumference(t) {
            var e = this.getMeta().count;return e > 0 && !isNaN(t) ? 2 * Math.PI / e : 0;
          } });
      };
    }, {}], 20: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.defaults.radar = { aspectRatio: 1, scale: { type: "radialLinear" }, elements: { line: { tension: 0 } } }, t.controllers.radar = t.DatasetController.extend({ datasetElementType: t.elements.Line, dataElementType: t.elements.Point, linkScales: e.noop, update: function update(t) {
            var a = this,
                i = a.getMeta(),
                n = i.dataset,
                o = i.data,
                r = n.custom || {},
                s = a.getDataset(),
                l = a.chart.options.elements.line,
                u = a.chart.scale;void 0 !== s.tension && void 0 === s.lineTension && (s.lineTension = s.tension), e.extend(i.dataset, { _datasetIndex: a.index, _children: o, _loop: !0, _model: { tension: r.tension ? r.tension : e.getValueOrDefault(s.lineTension, l.tension), backgroundColor: r.backgroundColor ? r.backgroundColor : s.backgroundColor || l.backgroundColor, borderWidth: r.borderWidth ? r.borderWidth : s.borderWidth || l.borderWidth, borderColor: r.borderColor ? r.borderColor : s.borderColor || l.borderColor, fill: r.fill ? r.fill : void 0 !== s.fill ? s.fill : l.fill, borderCapStyle: r.borderCapStyle ? r.borderCapStyle : s.borderCapStyle || l.borderCapStyle, borderDash: r.borderDash ? r.borderDash : s.borderDash || l.borderDash, borderDashOffset: r.borderDashOffset ? r.borderDashOffset : s.borderDashOffset || l.borderDashOffset, borderJoinStyle: r.borderJoinStyle ? r.borderJoinStyle : s.borderJoinStyle || l.borderJoinStyle, scaleTop: u.top, scaleBottom: u.bottom, scaleZero: u.getBasePosition() } }), i.dataset.pivot(), e.each(o, function (e, i) {
              a.updateElement(e, i, t);
            }, a), a.updateBezierControlPoints();
          }, updateElement: function updateElement(t, a, i) {
            var n = this,
                o = t.custom || {},
                r = n.getDataset(),
                s = n.chart.scale,
                l = n.chart.options.elements.point,
                u = s.getPointPositionForValue(a, r.data[a]);e.extend(t, { _datasetIndex: n.index, _index: a, _scale: s, _model: { x: i ? s.xCenter : u.x, y: i ? s.yCenter : u.y, tension: o.tension ? o.tension : e.getValueOrDefault(r.lineTension, n.chart.options.elements.line.tension), radius: o.radius ? o.radius : e.getValueAtIndexOrDefault(r.pointRadius, a, l.radius), backgroundColor: o.backgroundColor ? o.backgroundColor : e.getValueAtIndexOrDefault(r.pointBackgroundColor, a, l.backgroundColor), borderColor: o.borderColor ? o.borderColor : e.getValueAtIndexOrDefault(r.pointBorderColor, a, l.borderColor), borderWidth: o.borderWidth ? o.borderWidth : e.getValueAtIndexOrDefault(r.pointBorderWidth, a, l.borderWidth), pointStyle: o.pointStyle ? o.pointStyle : e.getValueAtIndexOrDefault(r.pointStyle, a, l.pointStyle), hitRadius: o.hitRadius ? o.hitRadius : e.getValueAtIndexOrDefault(r.hitRadius, a, l.hitRadius) } }), t._model.skip = o.skip ? o.skip : isNaN(t._model.x) || isNaN(t._model.y);
          }, updateBezierControlPoints: function updateBezierControlPoints() {
            var t = this.chart.chartArea,
                a = this.getMeta();e.each(a.data, function (i, n) {
              var o = i._model,
                  r = e.splineCurve(e.previousItem(a.data, n, !0)._model, o, e.nextItem(a.data, n, !0)._model, o.tension);o.controlPointPreviousX = Math.max(Math.min(r.previous.x, t.right), t.left), o.controlPointPreviousY = Math.max(Math.min(r.previous.y, t.bottom), t.top), o.controlPointNextX = Math.max(Math.min(r.next.x, t.right), t.left), o.controlPointNextY = Math.max(Math.min(r.next.y, t.bottom), t.top), i.pivot();
            });
          }, draw: function draw(t) {
            var a = this.getMeta(),
                i = t || 1;e.each(a.data, function (t) {
              t.transition(i);
            }), a.dataset.transition(i).draw(), e.each(a.data, function (t) {
              t.draw();
            });
          }, setHoverStyle: function setHoverStyle(t) {
            var a = this.chart.data.datasets[t._datasetIndex],
                i = t.custom || {},
                n = t._index,
                o = t._model;o.radius = i.hoverRadius ? i.hoverRadius : e.getValueAtIndexOrDefault(a.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius), o.backgroundColor = i.hoverBackgroundColor ? i.hoverBackgroundColor : e.getValueAtIndexOrDefault(a.pointHoverBackgroundColor, n, e.getHoverColor(o.backgroundColor)), o.borderColor = i.hoverBorderColor ? i.hoverBorderColor : e.getValueAtIndexOrDefault(a.pointHoverBorderColor, n, e.getHoverColor(o.borderColor)), o.borderWidth = i.hoverBorderWidth ? i.hoverBorderWidth : e.getValueAtIndexOrDefault(a.pointHoverBorderWidth, n, o.borderWidth);
          }, removeHoverStyle: function removeHoverStyle(t) {
            var a = this.chart.data.datasets[t._datasetIndex],
                i = t.custom || {},
                n = t._index,
                o = t._model,
                r = this.chart.options.elements.point;o.radius = i.radius ? i.radius : e.getValueAtIndexOrDefault(a.radius, n, r.radius), o.backgroundColor = i.backgroundColor ? i.backgroundColor : e.getValueAtIndexOrDefault(a.pointBackgroundColor, n, r.backgroundColor), o.borderColor = i.borderColor ? i.borderColor : e.getValueAtIndexOrDefault(a.pointBorderColor, n, r.borderColor), o.borderWidth = i.borderWidth ? i.borderWidth : e.getValueAtIndexOrDefault(a.pointBorderWidth, n, r.borderWidth);
          } });
      };
    }, {}], 21: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.defaults.global.animation = { duration: 1e3, easing: "easeOutQuart", onProgress: e.noop, onComplete: e.noop }, t.Animation = t.Element.extend({ currentStep: null, numSteps: 60, easing: "", render: null, onAnimationProgress: null, onAnimationComplete: null }), t.animationService = { frameDuration: 17, animations: [], dropFrames: 0, request: null, addAnimation: function addAnimation(t, e, a, i) {
            var n = this;i || (t.animating = !0);for (var o = 0; o < n.animations.length; ++o) {
              if (n.animations[o].chartInstance === t) return void (n.animations[o].animationObject = e);
            }n.animations.push({ chartInstance: t, animationObject: e }), 1 === n.animations.length && n.requestAnimationFrame();
          }, cancelAnimation: function cancelAnimation(t) {
            var a = e.findIndex(this.animations, function (e) {
              return e.chartInstance === t;
            });a !== -1 && (this.animations.splice(a, 1), t.animating = !1);
          }, requestAnimationFrame: function requestAnimationFrame() {
            var t = this;null === t.request && (t.request = e.requestAnimFrame.call(window, function () {
              t.request = null, t.startDigest();
            }));
          }, startDigest: function startDigest() {
            var t = this,
                e = Date.now(),
                a = 0;t.dropFrames > 1 && (a = Math.floor(t.dropFrames), t.dropFrames = t.dropFrames % 1);for (var i = 0; i < t.animations.length;) {
              null === t.animations[i].animationObject.currentStep && (t.animations[i].animationObject.currentStep = 0), t.animations[i].animationObject.currentStep += 1 + a, t.animations[i].animationObject.currentStep > t.animations[i].animationObject.numSteps && (t.animations[i].animationObject.currentStep = t.animations[i].animationObject.numSteps), t.animations[i].animationObject.render(t.animations[i].chartInstance, t.animations[i].animationObject), t.animations[i].animationObject.onAnimationProgress && t.animations[i].animationObject.onAnimationProgress.call && t.animations[i].animationObject.onAnimationProgress.call(t.animations[i].chartInstance, t.animations[i]), t.animations[i].animationObject.currentStep === t.animations[i].animationObject.numSteps ? (t.animations[i].animationObject.onAnimationComplete && t.animations[i].animationObject.onAnimationComplete.call && t.animations[i].animationObject.onAnimationComplete.call(t.animations[i].chartInstance, t.animations[i]), t.animations[i].chartInstance.animating = !1, t.animations.splice(i, 1)) : ++i;
            }var n = Date.now(),
                o = (n - e) / t.frameDuration;t.dropFrames += o, t.animations.length > 0 && t.requestAnimationFrame();
          } };
      };
    }, {}], 22: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.canvasHelpers = {};e.drawPoint = function (e, a, i, n, o) {
          var r, s, l, u, d, c;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) && (r = a.toString(), "[object HTMLImageElement]" === r || "[object HTMLCanvasElement]" === r)) return void e.drawImage(a, n - a.width / 2, o - a.height / 2);if (!(isNaN(i) || i <= 0)) {
            switch (a) {default:
                e.beginPath(), e.arc(n, o, i, 0, 2 * Math.PI), e.closePath(), e.fill();break;case "triangle":
                e.beginPath(), s = 3 * i / Math.sqrt(3), d = s * Math.sqrt(3) / 2, e.moveTo(n - s / 2, o + d / 3), e.lineTo(n + s / 2, o + d / 3), e.lineTo(n, o - 2 * d / 3), e.closePath(), e.fill();break;case "rect":
                c = 1 / Math.SQRT2 * i, e.beginPath(), e.fillRect(n - c, o - c, 2 * c, 2 * c), e.strokeRect(n - c, o - c, 2 * c, 2 * c);break;case "rectRounded":
                var h = i / Math.SQRT2,
                    f = n - h,
                    g = o - h,
                    p = Math.SQRT2 * i;t.helpers.drawRoundedRectangle(e, f, g, p, p, i / 2), e.fill();break;case "rectRot":
                c = 1 / Math.SQRT2 * i, e.beginPath(), e.moveTo(n - c, o), e.lineTo(n, o + c), e.lineTo(n + c, o), e.lineTo(n, o - c), e.closePath(), e.fill();break;case "cross":
                e.beginPath(), e.moveTo(n, o + i), e.lineTo(n, o - i), e.moveTo(n - i, o), e.lineTo(n + i, o), e.closePath();break;case "crossRot":
                e.beginPath(), l = Math.cos(Math.PI / 4) * i, u = Math.sin(Math.PI / 4) * i, e.moveTo(n - l, o - u), e.lineTo(n + l, o + u), e.moveTo(n - l, o + u), e.lineTo(n + l, o - u), e.closePath();break;case "star":
                e.beginPath(), e.moveTo(n, o + i), e.lineTo(n, o - i), e.moveTo(n - i, o), e.lineTo(n + i, o), l = Math.cos(Math.PI / 4) * i, u = Math.sin(Math.PI / 4) * i, e.moveTo(n - l, o - u), e.lineTo(n + l, o + u), e.moveTo(n - l, o + u), e.lineTo(n + l, o - u), e.closePath();break;case "line":
                e.beginPath(), e.moveTo(n - i, o), e.lineTo(n + i, o), e.closePath();break;case "dash":
                e.beginPath(), e.moveTo(n, o), e.lineTo(n + i, o), e.closePath();}e.stroke();
          }
        }, e.clipArea = function (t, e) {
          t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
        }, e.unclipArea = function (t) {
          t.restore();
        };
      };
    }, {}], 23: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(e) {
          e = e || {};var a = e.data = e.data || {};return a.datasets = a.datasets || [], a.labels = a.labels || [], e.options = i.configMerge(t.defaults.global, t.defaults[e.type], e.options || {}), e;
        }function a(t) {
          var e = t.options;e.scale ? t.scale.options = e.scale : e.scales && e.scales.xAxes.concat(e.scales.yAxes).forEach(function (e) {
            t.scales[e.id].options = e;
          }), t.tooltip._options = e.tooltips;
        }var i = t.helpers,
            n = t.plugins,
            o = t.platform;t.types = {}, t.instances = {}, t.controllers = {}, t.Controller = function (a, n, r) {
          var s = this;n = e(n);var l = o.acquireContext(a, n),
              u = l && l.canvas,
              d = u && u.height,
              c = u && u.width;return r.ctx = l, r.canvas = u, r.config = n, r.width = c, r.height = d, r.aspectRatio = d ? c / d : null, s.id = i.uid(), s.chart = r, s.config = n, s.options = n.options, s._bufferedRender = !1, t.instances[s.id] = s, Object.defineProperty(s, "data", { get: function get() {
              return s.config.data;
            } }), l && u ? (s.initialize(), s.update(), s) : (console.error("Failed to create chart: can't acquire context from the given item"), s);
        }, i.extend(t.Controller.prototype, { initialize: function initialize() {
            var t = this;return n.notify(t, "beforeInit"), i.retinaScale(t.chart), t.bindEvents(), t.options.responsive && t.resize(!0), t.ensureScalesHaveIDs(), t.buildScales(), t.initToolTip(), n.notify(t, "afterInit"), t;
          }, clear: function clear() {
            return i.clear(this.chart), this;
          }, stop: function stop() {
            return t.animationService.cancelAnimation(this), this;
          }, resize: function resize(t) {
            var e = this,
                a = e.chart,
                o = e.options,
                r = a.canvas,
                s = o.maintainAspectRatio && a.aspectRatio || null,
                l = Math.floor(i.getMaximumWidth(r)),
                u = Math.floor(s ? l / s : i.getMaximumHeight(r));if ((a.width !== l || a.height !== u) && (r.width = a.width = l, r.height = a.height = u, r.style.width = l + "px", r.style.height = u + "px", i.retinaScale(a), !t)) {
              var d = { width: l, height: u };n.notify(e, "resize", [d]), e.options.onResize && e.options.onResize(e, d), e.stop(), e.update(e.options.responsiveAnimationDuration);
            }
          }, ensureScalesHaveIDs: function ensureScalesHaveIDs() {
            var t = this.options,
                e = t.scales || {},
                a = t.scale;i.each(e.xAxes, function (t, e) {
              t.id = t.id || "x-axis-" + e;
            }), i.each(e.yAxes, function (t, e) {
              t.id = t.id || "y-axis-" + e;
            }), a && (a.id = a.id || "scale");
          }, buildScales: function buildScales() {
            var e = this,
                a = e.options,
                n = e.scales = {},
                o = [];a.scales && (o = o.concat((a.scales.xAxes || []).map(function (t) {
              return { options: t, dtype: "category" };
            }), (a.scales.yAxes || []).map(function (t) {
              return { options: t, dtype: "linear" };
            }))), a.scale && o.push({ options: a.scale, dtype: "radialLinear", isDefault: !0 }), i.each(o, function (a) {
              var o = a.options,
                  r = i.getValueOrDefault(o.type, a.dtype),
                  s = t.scaleService.getScaleConstructor(r);if (s) {
                var l = new s({ id: o.id, options: o, ctx: e.chart.ctx, chart: e });n[l.id] = l, a.isDefault && (e.scale = l);
              }
            }), t.scaleService.addScalesToLayout(this);
          }, buildOrUpdateControllers: function buildOrUpdateControllers() {
            var e = this,
                a = [],
                n = [];if (i.each(e.data.datasets, function (i, o) {
              var r = e.getDatasetMeta(o);r.type || (r.type = i.type || e.config.type), a.push(r.type), r.controller ? r.controller.updateIndex(o) : (r.controller = new t.controllers[r.type](e, o), n.push(r.controller));
            }, e), a.length > 1) for (var o = 1; o < a.length; o++) {
              if (a[o] !== a[o - 1]) {
                e.isCombo = !0;break;
              }
            }return n;
          }, resetElements: function resetElements() {
            var t = this;i.each(t.data.datasets, function (e, a) {
              t.getDatasetMeta(a).controller.reset();
            }, t);
          }, reset: function reset() {
            this.resetElements(), this.tooltip.initialize();
          }, update: function update(t, e) {
            var o = this;if (a(o), n.notify(o, "beforeUpdate") !== !1) {
              o.tooltip._data = o.data;var r = o.buildOrUpdateControllers();i.each(o.data.datasets, function (t, e) {
                o.getDatasetMeta(e).controller.buildOrUpdateElements();
              }, o), o.updateLayout(), i.each(r, function (t) {
                t.reset();
              }), o.updateDatasets(), n.notify(o, "afterUpdate"), o._bufferedRender ? o._bufferedRequest = { lazy: e, duration: t } : o.render(t, e);
            }
          }, updateLayout: function updateLayout() {
            var e = this;n.notify(e, "beforeLayout") !== !1 && (t.layoutService.update(this, this.chart.width, this.chart.height), n.notify(e, "afterScaleUpdate"), n.notify(e, "afterLayout"));
          }, updateDatasets: function updateDatasets() {
            var t = this;if (n.notify(t, "beforeDatasetsUpdate") !== !1) {
              for (var e = 0, a = t.data.datasets.length; e < a; ++e) {
                t.getDatasetMeta(e).controller.update();
              }n.notify(t, "afterDatasetsUpdate");
            }
          }, render: function render(e, a) {
            var o = this;if (n.notify(o, "beforeRender") !== !1) {
              var r = o.options.animation,
                  s = function s() {
                n.notify(o, "afterRender");var t = r && r.onComplete;t && t.call && t.call(o);
              };if (r && ("undefined" != typeof e && 0 !== e || "undefined" == typeof e && 0 !== r.duration)) {
                var l = new t.Animation();l.numSteps = (e || r.duration) / 16.66, l.easing = r.easing, l.render = function (t, e) {
                  var a = i.easingEffects[e.easing],
                      n = e.currentStep / e.numSteps,
                      o = a(n);t.draw(o, n, e.currentStep);
                }, l.onAnimationProgress = r.onProgress, l.onAnimationComplete = s, t.animationService.addAnimation(o, l, e, a);
              } else o.draw(), s();return o;
            }
          }, draw: function draw(t) {
            var e = this;e.clear(), void 0 !== t && null !== t || (t = 1), n.notify(e, "beforeDraw", [t]) !== !1 && (i.each(e.boxes, function (t) {
              t.draw(e.chartArea);
            }, e), e.scale && e.scale.draw(), e.drawDatasets(t), e.tooltip.transition(t).draw(), n.notify(e, "afterDraw", [t]));
          }, drawDatasets: function drawDatasets(t) {
            var e = this;n.notify(e, "beforeDatasetsDraw", [t]) !== !1 && (i.each(e.data.datasets, function (a, i) {
              e.isDatasetVisible(i) && e.getDatasetMeta(i).controller.draw(t);
            }, e, !0), n.notify(e, "afterDatasetsDraw", [t]));
          }, getElementAtEvent: function getElementAtEvent(e) {
            return t.Interaction.modes.single(this, e);
          }, getElementsAtEvent: function getElementsAtEvent(e) {
            return t.Interaction.modes.label(this, e, { intersect: !0 });
          }, getElementsAtXAxis: function getElementsAtXAxis(e) {
            return t.Interaction.modes["x-axis"](this, e, { intersect: !0 });
          }, getElementsAtEventForMode: function getElementsAtEventForMode(e, a, i) {
            var n = t.Interaction.modes[a];return "function" == typeof n ? n(this, e, i) : [];
          }, getDatasetAtEvent: function getDatasetAtEvent(e) {
            return t.Interaction.modes.dataset(this, e, { intersect: !0 });
          }, getDatasetMeta: function getDatasetMeta(t) {
            var e = this,
                a = e.data.datasets[t];a._meta || (a._meta = {});var i = a._meta[e.id];return i || (i = a._meta[e.id] = { type: null, data: [], dataset: null, controller: null, hidden: null, xAxisID: null, yAxisID: null }), i;
          }, getVisibleDatasetCount: function getVisibleDatasetCount() {
            for (var t = 0, e = 0, a = this.data.datasets.length; e < a; ++e) {
              this.isDatasetVisible(e) && t++;
            }return t;
          }, isDatasetVisible: function isDatasetVisible(t) {
            var e = this.getDatasetMeta(t);return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden;
          }, generateLegend: function generateLegend() {
            return this.options.legendCallback(this);
          }, destroy: function destroy() {
            var e,
                a,
                r,
                s = this,
                l = s.chart.canvas;for (s.stop(), a = 0, r = s.data.datasets.length; a < r; ++a) {
              e = s.getDatasetMeta(a), e.controller && (e.controller.destroy(), e.controller = null);
            }l && (s.unbindEvents(), i.clear(s.chart), o.releaseContext(s.chart.ctx), s.chart.canvas = null, s.chart.ctx = null), n.notify(s, "destroy"), delete t.instances[s.id];
          }, toBase64Image: function toBase64Image() {
            return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
          }, initToolTip: function initToolTip() {
            var e = this;e.tooltip = new t.Tooltip({ _chart: e.chart, _chartInstance: e, _data: e.data, _options: e.options.tooltips }, e), e.tooltip.initialize();
          }, bindEvents: function bindEvents() {
            var t = this,
                e = t._listeners = {},
                a = function a() {
              t.eventHandler.apply(t, arguments);
            };i.each(t.options.events, function (i) {
              o.addEventListener(t, i, a), e[i] = a;
            }), t.options.responsive && (a = function a() {
              t.resize();
            }, o.addEventListener(t, "resize", a), e.resize = a);
          }, unbindEvents: function unbindEvents() {
            var t = this,
                e = t._listeners;e && (delete t._listeners, i.each(e, function (e, a) {
              o.removeEventListener(t, a, e);
            }));
          }, updateHoverStyle: function updateHoverStyle(t, e, a) {
            var i,
                n,
                o,
                r = a ? "setHoverStyle" : "removeHoverStyle";for (n = 0, o = t.length; n < o; ++n) {
              i = t[n], i && this.getDatasetMeta(i._datasetIndex).controller[r](i);
            }
          }, eventHandler: function eventHandler(t) {
            var e = this,
                a = e.tooltip;if (n.notify(e, "beforeEvent", [t]) !== !1) {
              e._bufferedRender = !0, e._bufferedRequest = null;var i = e.handleEvent(t);i |= a && a.handleEvent(t), n.notify(e, "afterEvent", [t]);var o = e._bufferedRequest;return o ? e.render(o.duration, o.lazy) : i && !e.animating && (e.stop(), e.render(e.options.hover.animationDuration, !0)), e._bufferedRender = !1, e._bufferedRequest = null, e;
            }
          }, handleEvent: function handleEvent(t) {
            var e = this,
                a = e.options || {},
                n = a.hover,
                o = !1;return e.lastActive = e.lastActive || [], "mouseout" === t.type ? e.active = [] : e.active = e.getElementsAtEventForMode(t, n.mode, n), n.onHover && n.onHover.call(e, t.native, e.active), "mouseup" !== t.type && "click" !== t.type || a.onClick && a.onClick.call(e, t.native, e.active), e.lastActive.length && e.updateHoverStyle(e.lastActive, n.mode, !1), e.active.length && n.mode && e.updateHoverStyle(e.active, n.mode, !0), o = !i.arrayEquals(e.active, e.lastActive), e.lastActive = e.active, o;
          } });
      };
    }, {}], 24: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t, e) {
          return t._chartjs ? void t._chartjs.listeners.push(e) : (Object.defineProperty(t, "_chartjs", { configurable: !0, enumerable: !1, value: { listeners: [e] } }), void n.forEach(function (e) {
            var a = "onData" + e.charAt(0).toUpperCase() + e.slice(1),
                n = t[e];Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: function value() {
                var e = Array.prototype.slice.call(arguments),
                    o = n.apply(this, e);return i.each(t._chartjs.listeners, function (t) {
                  "function" == typeof t[a] && t[a].apply(t, e);
                }), o;
              } });
          }));
        }function a(t, e) {
          var a = t._chartjs;if (a) {
            var i = a.listeners,
                o = i.indexOf(e);o !== -1 && i.splice(o, 1), i.length > 0 || (n.forEach(function (e) {
              delete t[e];
            }), delete t._chartjs);
          }
        }var i = t.helpers,
            n = ["push", "pop", "shift", "splice", "unshift"];t.DatasetController = function (t, e) {
          this.initialize(t, e);
        }, i.extend(t.DatasetController.prototype, { datasetElementType: null, dataElementType: null, initialize: function initialize(t, e) {
            var a = this;a.chart = t, a.index = e, a.linkScales(), a.addElements();
          }, updateIndex: function updateIndex(t) {
            this.index = t;
          }, linkScales: function linkScales() {
            var t = this,
                e = t.getMeta(),
                a = t.getDataset();null === e.xAxisID && (e.xAxisID = a.xAxisID || t.chart.options.scales.xAxes[0].id), null === e.yAxisID && (e.yAxisID = a.yAxisID || t.chart.options.scales.yAxes[0].id);
          }, getDataset: function getDataset() {
            return this.chart.data.datasets[this.index];
          }, getMeta: function getMeta() {
            return this.chart.getDatasetMeta(this.index);
          }, getScaleForId: function getScaleForId(t) {
            return this.chart.scales[t];
          }, reset: function reset() {
            this.update(!0);
          }, destroy: function destroy() {
            this._data && a(this._data, this);
          }, createMetaDataset: function createMetaDataset() {
            var t = this,
                e = t.datasetElementType;return e && new e({ _chart: t.chart.chart, _datasetIndex: t.index });
          }, createMetaData: function createMetaData(t) {
            var e = this,
                a = e.dataElementType;return a && new a({ _chart: e.chart.chart, _datasetIndex: e.index, _index: t });
          }, addElements: function addElements() {
            var t,
                e,
                a = this,
                i = a.getMeta(),
                n = a.getDataset().data || [],
                o = i.data;for (t = 0, e = n.length; t < e; ++t) {
              o[t] = o[t] || a.createMetaData(t);
            }i.dataset = i.dataset || a.createMetaDataset();
          }, addElementAndReset: function addElementAndReset(t) {
            var e = this.createMetaData(t);this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0);
          }, buildOrUpdateElements: function buildOrUpdateElements() {
            var t = this,
                i = t.getDataset(),
                n = i.data || (i.data = []);t._data !== n && (t._data && a(t._data, t), e(n, t), t._data = n), t.resyncElements();
          }, update: i.noop, draw: function draw(t) {
            var e,
                a,
                i = t || 1,
                n = this.getMeta().data;for (e = 0, a = n.length; e < a; ++e) {
              n[e].transition(i).draw();
            }
          }, removeHoverStyle: function removeHoverStyle(t, e) {
            var a = this.chart.data.datasets[t._datasetIndex],
                n = t._index,
                o = t.custom || {},
                r = i.getValueAtIndexOrDefault,
                s = t._model;s.backgroundColor = o.backgroundColor ? o.backgroundColor : r(a.backgroundColor, n, e.backgroundColor), s.borderColor = o.borderColor ? o.borderColor : r(a.borderColor, n, e.borderColor), s.borderWidth = o.borderWidth ? o.borderWidth : r(a.borderWidth, n, e.borderWidth);
          }, setHoverStyle: function setHoverStyle(t) {
            var e = this.chart.data.datasets[t._datasetIndex],
                a = t._index,
                n = t.custom || {},
                o = i.getValueAtIndexOrDefault,
                r = i.getHoverColor,
                s = t._model;s.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : o(e.hoverBackgroundColor, a, r(s.backgroundColor)), s.borderColor = n.hoverBorderColor ? n.hoverBorderColor : o(e.hoverBorderColor, a, r(s.borderColor)), s.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : o(e.hoverBorderWidth, a, s.borderWidth);
          }, resyncElements: function resyncElements() {
            var t = this,
                e = t.getMeta(),
                a = t.getDataset().data,
                i = e.data.length,
                n = a.length;n < i ? e.data.splice(n, i - n) : n > i && t.insertElements(i, n - i);
          }, insertElements: function insertElements(t, e) {
            for (var a = 0; a < e; ++a) {
              this.addElementAndReset(t + a);
            }
          }, onDataPush: function onDataPush() {
            this.insertElements(this.getDataset().data.length - 1, arguments.length);
          }, onDataPop: function onDataPop() {
            this.getMeta().data.pop();
          }, onDataShift: function onDataShift() {
            this.getMeta().data.shift();
          }, onDataSplice: function onDataSplice(t, e) {
            this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2);
          }, onDataUnshift: function onDataUnshift() {
            this.insertElements(0, arguments.length);
          } }), t.DatasetController.extend = i.inherits;
      };
    }, {}], 25: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.elements = {}, t.Element = function (t) {
          e.extend(this, t), this.initialize.apply(this, arguments);
        }, e.extend(t.Element.prototype, { initialize: function initialize() {
            this.hidden = !1;
          }, pivot: function pivot() {
            var t = this;return t._view || (t._view = e.clone(t._model)), t._start = e.clone(t._view), t;
          }, transition: function transition(t) {
            var a = this;return a._view || (a._view = e.clone(a._model)), 1 === t ? (a._view = a._model, a._start = null, a) : (a._start || a.pivot(), e.each(a._model, function (i, n) {
              if ("_" === n[0]) ;else if (a._view.hasOwnProperty(n)) {
                if (i === a._view[n]) ;else if ("string" == typeof i) try {
                  var o = e.color(a._model[n]).mix(e.color(a._start[n]), t);a._view[n] = o.rgbString();
                } catch (t) {
                  a._view[n] = i;
                } else if ("number" == typeof i) {
                  var r = void 0 !== a._start[n] && isNaN(a._start[n]) === !1 ? a._start[n] : 0;a._view[n] = (a._model[n] - r) * t + r;
                } else a._view[n] = i;
              } else "number" != typeof i || isNaN(a._view[n]) ? a._view[n] = i : a._view[n] = i * t;
            }, a), a);
          }, tooltipPosition: function tooltipPosition() {
            return { x: this._model.x, y: this._model.y };
          }, hasValue: function hasValue() {
            return e.isNumber(this._model.x) && e.isNumber(this._model.y);
          } }), t.Element.extend = e.inherits;
      };
    }, {}], 26: [function (t, e, a) {
      "use strict";
      var i = t(3);e.exports = function (t) {
        function e(t, e, a) {
          var i;return "string" == typeof t ? (i = parseInt(t, 10), t.indexOf("%") !== -1 && (i = i / 100 * e.parentNode[a])) : i = t, i;
        }function a(t) {
          return void 0 !== t && null !== t && "none" !== t;
        }function n(t, i, n) {
          var o = document.defaultView,
              r = t.parentNode,
              s = o.getComputedStyle(t)[i],
              l = o.getComputedStyle(r)[i],
              u = a(s),
              d = a(l),
              c = Number.POSITIVE_INFINITY;return u || d ? Math.min(u ? e(s, t, n) : c, d ? e(l, r, n) : c) : "none";
        }var o = t.helpers = {};o.each = function (t, e, a, i) {
          var n, r;if (o.isArray(t)) {
            if (r = t.length, i) for (n = r - 1; n >= 0; n--) {
              e.call(a, t[n], n);
            } else for (n = 0; n < r; n++) {
              e.call(a, t[n], n);
            }
          } else if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
            var s = Object.keys(t);for (r = s.length, n = 0; n < r; n++) {
              e.call(a, t[s[n]], s[n]);
            }
          }
        }, o.clone = function (t) {
          var e = {};return o.each(t, function (t, a) {
            o.isArray(t) ? e[a] = t.slice(0) : "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && null !== t ? e[a] = o.clone(t) : e[a] = t;
          }), e;
        }, o.extend = function (t) {
          for (var e = function e(_e, a) {
            t[a] = _e;
          }, a = 1, i = arguments.length; a < i; a++) {
            o.each(arguments[a], e);
          }return t;
        }, o.configMerge = function (e) {
          var a = o.clone(e);return o.each(Array.prototype.slice.call(arguments, 1), function (e) {
            o.each(e, function (e, i) {
              var n = a.hasOwnProperty(i),
                  r = n ? a[i] : {};"scales" === i ? a[i] = o.scaleMerge(r, e) : "scale" === i ? a[i] = o.configMerge(r, t.scaleService.getScaleDefaults(e.type), e) : !n || "object" != (typeof r === "undefined" ? "undefined" : _typeof(r)) || o.isArray(r) || null === r || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) || o.isArray(e) ? a[i] = e : a[i] = o.configMerge(r, e);
            });
          }), a;
        }, o.scaleMerge = function (e, a) {
          var i = o.clone(e);return o.each(a, function (e, a) {
            "xAxes" === a || "yAxes" === a ? i.hasOwnProperty(a) ? o.each(e, function (e, n) {
              var r = o.getValueOrDefault(e.type, "xAxes" === a ? "category" : "linear"),
                  s = t.scaleService.getScaleDefaults(r);n >= i[a].length || !i[a][n].type ? i[a].push(o.configMerge(s, e)) : e.type && e.type !== i[a][n].type ? i[a][n] = o.configMerge(i[a][n], s, e) : i[a][n] = o.configMerge(i[a][n], e);
            }) : (i[a] = [], o.each(e, function (e) {
              var n = o.getValueOrDefault(e.type, "xAxes" === a ? "category" : "linear");i[a].push(o.configMerge(t.scaleService.getScaleDefaults(n), e));
            })) : i.hasOwnProperty(a) && "object" == _typeof(i[a]) && null !== i[a] && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? i[a] = o.configMerge(i[a], e) : i[a] = e;
          }), i;
        }, o.getValueAtIndexOrDefault = function (t, e, a) {
          return void 0 === t || null === t ? a : o.isArray(t) ? e < t.length ? t[e] : a : t;
        }, o.getValueOrDefault = function (t, e) {
          return void 0 === t ? e : t;
        }, o.indexOf = Array.prototype.indexOf ? function (t, e) {
          return t.indexOf(e);
        } : function (t, e) {
          for (var a = 0, i = t.length; a < i; ++a) {
            if (t[a] === e) return a;
          }return -1;
        }, o.where = function (t, e) {
          if (o.isArray(t) && Array.prototype.filter) return t.filter(e);var a = [];return o.each(t, function (t) {
            e(t) && a.push(t);
          }), a;
        }, o.findIndex = Array.prototype.findIndex ? function (t, e, a) {
          return t.findIndex(e, a);
        } : function (t, e, a) {
          a = void 0 === a ? t : a;for (var i = 0, n = t.length; i < n; ++i) {
            if (e.call(a, t[i], i, t)) return i;
          }return -1;
        }, o.findNextWhere = function (t, e, a) {
          void 0 !== a && null !== a || (a = -1);for (var i = a + 1; i < t.length; i++) {
            var n = t[i];if (e(n)) return n;
          }
        }, o.findPreviousWhere = function (t, e, a) {
          void 0 !== a && null !== a || (a = t.length);for (var i = a - 1; i >= 0; i--) {
            var n = t[i];if (e(n)) return n;
          }
        }, o.inherits = function (t) {
          var e = this,
              a = t && t.hasOwnProperty("constructor") ? t.constructor : function () {
            return e.apply(this, arguments);
          },
              i = function i() {
            this.constructor = a;
          };return i.prototype = e.prototype, a.prototype = new i(), a.extend = o.inherits, t && o.extend(a.prototype, t), a.__super__ = e.prototype, a;
        }, o.noop = function () {}, o.uid = function () {
          var t = 0;return function () {
            return t++;
          };
        }(), o.isNumber = function (t) {
          return !isNaN(parseFloat(t)) && isFinite(t);
        }, o.almostEquals = function (t, e, a) {
          return Math.abs(t - e) < a;
        }, o.almostWhole = function (t, e) {
          var a = Math.round(t);return a - e < t && a + e > t;
        }, o.max = function (t) {
          return t.reduce(function (t, e) {
            return isNaN(e) ? t : Math.max(t, e);
          }, Number.NEGATIVE_INFINITY);
        }, o.min = function (t) {
          return t.reduce(function (t, e) {
            return isNaN(e) ? t : Math.min(t, e);
          }, Number.POSITIVE_INFINITY);
        }, o.sign = Math.sign ? function (t) {
          return Math.sign(t);
        } : function (t) {
          return t = +t, 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1;
        }, o.log10 = Math.log10 ? function (t) {
          return Math.log10(t);
        } : function (t) {
          return Math.log(t) / Math.LN10;
        }, o.toRadians = function (t) {
          return t * (Math.PI / 180);
        }, o.toDegrees = function (t) {
          return t * (180 / Math.PI);
        }, o.getAngleFromPoint = function (t, e) {
          var a = e.x - t.x,
              i = e.y - t.y,
              n = Math.sqrt(a * a + i * i),
              o = Math.atan2(i, a);return o < -.5 * Math.PI && (o += 2 * Math.PI), { angle: o, distance: n };
        }, o.distanceBetweenPoints = function (t, e) {
          return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
        }, o.aliasPixel = function (t) {
          return t % 2 === 0 ? 0 : .5;
        }, o.splineCurve = function (t, e, a, i) {
          var n = t.skip ? e : t,
              o = e,
              r = a.skip ? e : a,
              s = Math.sqrt(Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2)),
              l = Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)),
              u = s / (s + l),
              d = l / (s + l);u = isNaN(u) ? 0 : u, d = isNaN(d) ? 0 : d;var c = i * u,
              h = i * d;return { previous: { x: o.x - c * (r.x - n.x), y: o.y - c * (r.y - n.y) }, next: { x: o.x + h * (r.x - n.x), y: o.y + h * (r.y - n.y) } };
        }, o.EPSILON = Number.EPSILON || 1e-14, o.splineCurveMonotone = function (t) {
          var e,
              a,
              i,
              n,
              r = (t || []).map(function (t) {
            return { model: t._model, deltaK: 0, mK: 0 };
          }),
              s = r.length;for (e = 0; e < s; ++e) {
            if (i = r[e], !i.model.skip) {
              if (a = e > 0 ? r[e - 1] : null, n = e < s - 1 ? r[e + 1] : null, n && !n.model.skip) {
                var l = n.model.x - i.model.x;i.deltaK = 0 !== l ? (n.model.y - i.model.y) / l : 0;
              }!a || a.model.skip ? i.mK = i.deltaK : !n || n.model.skip ? i.mK = a.deltaK : this.sign(a.deltaK) !== this.sign(i.deltaK) ? i.mK = 0 : i.mK = (a.deltaK + i.deltaK) / 2;
            }
          }var u, d, c, h;for (e = 0; e < s - 1; ++e) {
            i = r[e], n = r[e + 1], i.model.skip || n.model.skip || (o.almostEquals(i.deltaK, 0, this.EPSILON) ? i.mK = n.mK = 0 : (u = i.mK / i.deltaK, d = n.mK / i.deltaK, h = Math.pow(u, 2) + Math.pow(d, 2), h <= 9 || (c = 3 / Math.sqrt(h), i.mK = u * c * i.deltaK, n.mK = d * c * i.deltaK)));
          }var f;for (e = 0; e < s; ++e) {
            i = r[e], i.model.skip || (a = e > 0 ? r[e - 1] : null, n = e < s - 1 ? r[e + 1] : null, a && !a.model.skip && (f = (i.model.x - a.model.x) / 3, i.model.controlPointPreviousX = i.model.x - f, i.model.controlPointPreviousY = i.model.y - f * i.mK), n && !n.model.skip && (f = (n.model.x - i.model.x) / 3, i.model.controlPointNextX = i.model.x + f, i.model.controlPointNextY = i.model.y + f * i.mK));
          }
        }, o.nextItem = function (t, e, a) {
          return a ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1];
        }, o.previousItem = function (t, e, a) {
          return a ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1];
        }, o.niceNum = function (t, e) {
          var a,
              i = Math.floor(o.log10(t)),
              n = t / Math.pow(10, i);return a = e ? n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10 : n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10, a * Math.pow(10, i);
        };var r = o.easingEffects = { linear: function linear(t) {
            return t;
          }, easeInQuad: function easeInQuad(t) {
            return t * t;
          }, easeOutQuad: function easeOutQuad(t) {
            return -1 * t * (t - 2);
          }, easeInOutQuad: function easeInOutQuad(t) {
            return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
          }, easeInCubic: function easeInCubic(t) {
            return t * t * t;
          }, easeOutCubic: function easeOutCubic(t) {
            return 1 * ((t = t / 1 - 1) * t * t + 1);
          }, easeInOutCubic: function easeInOutCubic(t) {
            return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
          }, easeInQuart: function easeInQuart(t) {
            return t * t * t * t;
          }, easeOutQuart: function easeOutQuart(t) {
            return -1 * ((t = t / 1 - 1) * t * t * t - 1);
          }, easeInOutQuart: function easeInOutQuart(t) {
            return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
          }, easeInQuint: function easeInQuint(t) {
            return 1 * (t /= 1) * t * t * t * t;
          }, easeOutQuint: function easeOutQuint(t) {
            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
          }, easeInOutQuint: function easeInOutQuint(t) {
            return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
          }, easeInSine: function easeInSine(t) {
            return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
          }, easeOutSine: function easeOutSine(t) {
            return 1 * Math.sin(t / 1 * (Math.PI / 2));
          }, easeInOutSine: function easeInOutSine(t) {
            return -.5 * (Math.cos(Math.PI * t / 1) - 1);
          }, easeInExpo: function easeInExpo(t) {
            return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
          }, easeOutExpo: function easeOutExpo(t) {
            return 1 === t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
          }, easeInOutExpo: function easeInOutExpo(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (-Math.pow(2, -10 * --t) + 2);
          }, easeInCirc: function easeInCirc(t) {
            return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
          }, easeOutCirc: function easeOutCirc(t) {
            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
          }, easeInOutCirc: function easeInOutCirc(t) {
            return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
          }, easeInElastic: function easeInElastic(t) {
            var e = 1.70158,
                a = 0,
                i = 1;return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, e = a / 4) : e = a / (2 * Math.PI) * Math.asin(1 / i), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / a)));
          }, easeOutElastic: function easeOutElastic(t) {
            var e = 1.70158,
                a = 0,
                i = 1;return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, e = a / 4) : e = a / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / a) + 1);
          }, easeInOutElastic: function easeInOutElastic(t) {
            var e = 1.70158,
                a = 0,
                i = 1;return 0 === t ? 0 : 2 === (t /= .5) ? 1 : (a || (a = 1 * (.3 * 1.5)), i < Math.abs(1) ? (i = 1, e = a / 4) : e = a / (2 * Math.PI) * Math.asin(1 / i), t < 1 ? -.5 * (i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / a)) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / a) * .5 + 1);
          }, easeInBack: function easeInBack(t) {
            var e = 1.70158;return 1 * (t /= 1) * t * ((e + 1) * t - e);
          }, easeOutBack: function easeOutBack(t) {
            var e = 1.70158;return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1);
          }, easeInOutBack: function easeInOutBack(t) {
            var e = 1.70158;return (t /= .5) < 1 ? .5 * (t * t * (((e *= 1.525) + 1) * t - e)) : .5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2);
          }, easeInBounce: function easeInBounce(t) {
            return 1 - r.easeOutBounce(1 - t);
          }, easeOutBounce: function easeOutBounce(t) {
            return (t /= 1) < 1 / 2.75 ? 1 * (7.5625 * t * t) : t < 2 / 2.75 ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
          }, easeInOutBounce: function easeInOutBounce(t) {
            return t < .5 ? .5 * r.easeInBounce(2 * t) : .5 * r.easeOutBounce(2 * t - 1) + .5;
          } };o.requestAnimFrame = function () {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
            return window.setTimeout(t, 1e3 / 60);
          };
        }(), o.getRelativePosition = function (t, e) {
          var a,
              i,
              n = t.originalEvent || t,
              r = t.currentTarget || t.srcElement,
              s = r.getBoundingClientRect(),
              l = n.touches;l && l.length > 0 ? (a = l[0].clientX, i = l[0].clientY) : (a = n.clientX, i = n.clientY);var u = parseFloat(o.getStyle(r, "padding-left")),
              d = parseFloat(o.getStyle(r, "padding-top")),
              c = parseFloat(o.getStyle(r, "padding-right")),
              h = parseFloat(o.getStyle(r, "padding-bottom")),
              f = s.right - s.left - u - c,
              g = s.bottom - s.top - d - h;return a = Math.round((a - s.left - u) / f * r.width / e.currentDevicePixelRatio), i = Math.round((i - s.top - d) / g * r.height / e.currentDevicePixelRatio), { x: a, y: i };
        }, o.addEvent = function (t, e, a) {
          t.addEventListener ? t.addEventListener(e, a) : t.attachEvent ? t.attachEvent("on" + e, a) : t["on" + e] = a;
        }, o.removeEvent = function (t, e, a) {
          t.removeEventListener ? t.removeEventListener(e, a, !1) : t.detachEvent ? t.detachEvent("on" + e, a) : t["on" + e] = o.noop;
        }, o.getConstraintWidth = function (t) {
          return n(t, "max-width", "clientWidth");
        }, o.getConstraintHeight = function (t) {
          return n(t, "max-height", "clientHeight");
        }, o.getMaximumWidth = function (t) {
          var e = t.parentNode,
              a = parseInt(o.getStyle(e, "padding-left"), 10),
              i = parseInt(o.getStyle(e, "padding-right"), 10),
              n = e.clientWidth - a - i,
              r = o.getConstraintWidth(t);return isNaN(r) ? n : Math.min(n, r);
        }, o.getMaximumHeight = function (t) {
          var e = t.parentNode,
              a = parseInt(o.getStyle(e, "padding-top"), 10),
              i = parseInt(o.getStyle(e, "padding-bottom"), 10),
              n = e.clientHeight - a - i,
              r = o.getConstraintHeight(t);return isNaN(r) ? n : Math.min(n, r);
        }, o.getStyle = function (t, e) {
          return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e);
        }, o.retinaScale = function (t) {
          var e = t.currentDevicePixelRatio = window.devicePixelRatio || 1;if (1 !== e) {
            var a = t.canvas,
                i = t.height,
                n = t.width;a.height = i * e, a.width = n * e, t.ctx.scale(e, e), a.style.height = i + "px", a.style.width = n + "px";
          }
        }, o.clear = function (t) {
          t.ctx.clearRect(0, 0, t.width, t.height);
        }, o.fontString = function (t, e, a) {
          return e + " " + t + "px " + a;
        }, o.longestText = function (t, e, a, i) {
          i = i || {};var n = i.data = i.data || {},
              r = i.garbageCollect = i.garbageCollect || [];i.font !== e && (n = i.data = {}, r = i.garbageCollect = [], i.font = e), t.font = e;var s = 0;o.each(a, function (e) {
            void 0 !== e && null !== e && o.isArray(e) !== !0 ? s = o.measureText(t, n, r, s, e) : o.isArray(e) && o.each(e, function (e) {
              void 0 === e || null === e || o.isArray(e) || (s = o.measureText(t, n, r, s, e));
            });
          });var l = r.length / 2;if (l > a.length) {
            for (var u = 0; u < l; u++) {
              delete n[r[u]];
            }r.splice(0, l);
          }return s;
        }, o.measureText = function (t, e, a, i, n) {
          var o = e[n];return o || (o = e[n] = t.measureText(n).width, a.push(n)), o > i && (i = o), i;
        }, o.numberOfLabelLines = function (t) {
          var e = 1;return o.each(t, function (t) {
            o.isArray(t) && t.length > e && (e = t.length);
          }), e;
        }, o.drawRoundedRectangle = function (t, e, a, i, n, o) {
          t.beginPath(), t.moveTo(e + o, a), t.lineTo(e + i - o, a), t.quadraticCurveTo(e + i, a, e + i, a + o), t.lineTo(e + i, a + n - o), t.quadraticCurveTo(e + i, a + n, e + i - o, a + n), t.lineTo(e + o, a + n), t.quadraticCurveTo(e, a + n, e, a + n - o), t.lineTo(e, a + o), t.quadraticCurveTo(e, a, e + o, a), t.closePath();
        }, o.color = function (e) {
          return i ? i(e instanceof CanvasGradient ? t.defaults.global.defaultColor : e) : (console.error("Color.js not found!"), e);
        }, o.isArray = Array.isArray ? function (t) {
          return Array.isArray(t);
        } : function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        }, o.arrayEquals = function (t, e) {
          var a, i, n, r;if (!t || !e || t.length !== e.length) return !1;for (a = 0, i = t.length; a < i; ++a) {
            if (n = t[a], r = e[a], n instanceof Array && r instanceof Array) {
              if (!o.arrayEquals(n, r)) return !1;
            } else if (n !== r) return !1;
          }return !0;
        }, o.callCallback = function (t, e, a) {
          t && "function" == typeof t.call && t.apply(a, e);
        }, o.getHoverColor = function (t) {
          return t instanceof CanvasPattern ? t : o.color(t).saturate(.5).darken(.1).rgbString();
        };
      };
    }, { 3: 3 }], 27: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t, e) {
          return t.native ? { x: t.x, y: t.y } : r.getRelativePosition(t, e);
        }function a(t, e) {
          var a,
              i,
              n,
              o,
              r,
              s = t.data.datasets;for (i = 0, o = s.length; i < o; ++i) {
            if (t.isDatasetVisible(i)) for (a = t.getDatasetMeta(i), n = 0, r = a.data.length; n < r; ++n) {
              var l = a.data[n];l._view.skip || e(l);
            }
          }
        }function i(t, e) {
          var i = [];return a(t, function (t) {
            t.inRange(e.x, e.y) && i.push(t);
          }), i;
        }function n(t, e, i, n) {
          var o = Number.POSITIVE_INFINITY,
              s = [];return n || (n = r.distanceBetweenPoints), a(t, function (t) {
            if (!i || t.inRange(e.x, e.y)) {
              var a = t.getCenterPoint(),
                  r = n(e, a);r < o ? (s = [t], o = r) : r === o && s.push(t);
            }
          }), s;
        }function o(t, a, o) {
          var r = e(a, t.chart),
              s = function s(t, e) {
            return Math.abs(t.x - e.x);
          },
              l = o.intersect ? i(t, r) : n(t, r, !1, s),
              u = [];return l.length ? (t.data.datasets.forEach(function (e, a) {
            if (t.isDatasetVisible(a)) {
              var i = t.getDatasetMeta(a),
                  n = i.data[l[0]._index];n && !n._view.skip && u.push(n);
            }
          }), u) : [];
        }var r = t.helpers;t.Interaction = { modes: { single: function single(t, i) {
              var n = e(i, t.chart),
                  o = [];return a(t, function (t) {
                if (t.inRange(n.x, n.y)) return o.push(t), o;
              }), o.slice(0, 1);
            }, label: o, index: o, dataset: function dataset(t, a, o) {
              var r = e(a, t.chart),
                  s = o.intersect ? i(t, r) : n(t, r, !1);return s.length > 0 && (s = t.getDatasetMeta(s[0]._datasetIndex).data), s;
            }, "x-axis": function xAxis(t, e) {
              return o(t, e, !0);
            }, point: function point(t, a) {
              var n = e(a, t.chart);return i(t, n);
            }, nearest: function nearest(t, a, i) {
              var o = e(a, t.chart),
                  r = n(t, o, i.intersect);return r.length > 1 && r.sort(function (t, e) {
                var a = t.getArea(),
                    i = e.getArea(),
                    n = a - i;return 0 === n && (n = t._datasetIndex - e._datasetIndex), n;
              }), r.slice(0, 1);
            }, x: function x(t, i, n) {
              var o = e(i, t.chart),
                  r = [],
                  s = !1;return a(t, function (t) {
                t.inXRange(o.x) && r.push(t), t.inRange(o.x, o.y) && (s = !0);
              }), n.intersect && !s && (r = []), r;
            }, y: function y(t, i, n) {
              var o = e(i, t.chart),
                  r = [],
                  s = !1;return a(t, function (t) {
                t.inYRange(o.y) && r.push(t), t.inRange(o.x, o.y) && (s = !0);
              }), n.intersect && !s && (r = []), r;
            } } };
      };
    }, {}], 28: [function (t, e, a) {
      "use strict";
      e.exports = function () {
        var t = function t(e, a) {
          return this.controller = new t.Controller(e, a, this), this.controller;
        };return t.defaults = { global: { responsive: !0, responsiveAnimationDuration: 0, maintainAspectRatio: !0, events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"], hover: { onHover: null, mode: "nearest", intersect: !0, animationDuration: 400 }, onClick: null, defaultColor: "rgba(0,0,0,0.1)", defaultFontColor: "#666", defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", defaultFontSize: 12, defaultFontStyle: "normal", showLines: !0, elements: {}, legendCallback: function legendCallback(t) {
              var e = [];e.push('<ul class="' + t.id + '-legend">');for (var a = 0; a < t.data.datasets.length; a++) {
                e.push('<li><span style="background-color:' + t.data.datasets[a].backgroundColor + '"></span>'), t.data.datasets[a].label && e.push(t.data.datasets[a].label), e.push("</li>");
              }return e.push("</ul>"), e.join("");
            } } }, t.Chart = t, t;
      };
    }, {}], 29: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.layoutService = { defaults: {}, addBox: function addBox(t, e) {
            t.boxes || (t.boxes = []), t.boxes.push(e);
          }, removeBox: function removeBox(t, e) {
            t.boxes && t.boxes.splice(t.boxes.indexOf(e), 1);
          }, update: function update(t, a, i) {
            function n(t) {
              var e,
                  a = t.isHorizontal();a ? (e = t.update(t.options.fullWidth ? x : C, w), I -= e.height) : (e = t.update(M, S), C -= e.width), D.push({ horizontal: a, minSize: e, box: t });
            }function o(t) {
              var a = e.findNextWhere(D, function (e) {
                return e.box === t;
              });if (a) if (t.isHorizontal()) {
                var i = { left: Math.max(F, A), right: Math.max(V, T), top: 0, bottom: 0 };t.update(t.options.fullWidth ? x : C, y / 2, i);
              } else t.update(a.minSize.width, I);
            }function r(t) {
              var a = e.findNextWhere(D, function (e) {
                return e.box === t;
              }),
                  i = { left: 0, right: 0, top: R, bottom: O };a && t.update(a.minSize.width, I, i);
            }function s(t) {
              t.isHorizontal() ? (t.left = t.options.fullWidth ? d : F, t.right = t.options.fullWidth ? a - c : F + C, t.top = E, t.bottom = E + t.height, E = t.bottom) : (t.left = N, t.right = N + t.width, t.top = R, t.bottom = R + I, N = t.right);
            }if (t) {
              var l = t.options.layout,
                  u = l ? l.padding : null,
                  d = 0,
                  c = 0,
                  h = 0,
                  f = 0;isNaN(u) ? (d = u.left || 0, c = u.right || 0, h = u.top || 0, f = u.bottom || 0) : (d = u, c = u, h = u, f = u);var g = e.where(t.boxes, function (t) {
                return "left" === t.options.position;
              }),
                  p = e.where(t.boxes, function (t) {
                return "right" === t.options.position;
              }),
                  m = e.where(t.boxes, function (t) {
                return "top" === t.options.position;
              }),
                  v = e.where(t.boxes, function (t) {
                return "bottom" === t.options.position;
              }),
                  b = e.where(t.boxes, function (t) {
                return "chartArea" === t.options.position;
              });m.sort(function (t, e) {
                return (e.options.fullWidth ? 1 : 0) - (t.options.fullWidth ? 1 : 0);
              }), v.sort(function (t, e) {
                return (t.options.fullWidth ? 1 : 0) - (e.options.fullWidth ? 1 : 0);
              });var x = a - d - c,
                  y = i - h - f,
                  k = x / 2,
                  S = y / 2,
                  M = (a - k) / (g.length + p.length),
                  w = (i - S) / (m.length + v.length),
                  C = x,
                  I = y,
                  D = [];e.each(g.concat(p, m, v), n);var A = 0,
                  T = 0,
                  P = 0,
                  _ = 0;e.each(m.concat(v), function (t) {
                if (t.getPadding) {
                  var e = t.getPadding();A = Math.max(A, e.left), T = Math.max(T, e.right);
                }
              }), e.each(g.concat(p), function (t) {
                if (t.getPadding) {
                  var e = t.getPadding();P = Math.max(P, e.top), _ = Math.max(_, e.bottom);
                }
              });var F = d,
                  V = c,
                  R = h,
                  O = f;e.each(g.concat(p), o), e.each(g, function (t) {
                F += t.width;
              }), e.each(p, function (t) {
                V += t.width;
              }), e.each(m.concat(v), o), e.each(m, function (t) {
                R += t.height;
              }), e.each(v, function (t) {
                O += t.height;
              }), e.each(g.concat(p), r), F = d, V = c, R = h, O = f, e.each(g, function (t) {
                F += t.width;
              }), e.each(p, function (t) {
                V += t.width;
              }), e.each(m, function (t) {
                R += t.height;
              }), e.each(v, function (t) {
                O += t.height;
              });var L = Math.max(A - F, 0);F += L, V += Math.max(T - V, 0);var B = Math.max(P - R, 0);R += B, O += Math.max(_ - O, 0);var z = i - R - O,
                  W = a - F - V;W === C && z === I || (e.each(g, function (t) {
                t.height = z;
              }), e.each(p, function (t) {
                t.height = z;
              }), e.each(m, function (t) {
                t.options.fullWidth || (t.width = W);
              }), e.each(v, function (t) {
                t.options.fullWidth || (t.width = W);
              }), I = z, C = W);var N = d + L,
                  E = h + B;e.each(g.concat(m), s), N += C, E += I, e.each(p, s), e.each(v, s), t.chartArea = { left: F, top: R, right: F + C, bottom: R + I }, e.each(b, function (e) {
                e.left = t.chartArea.left, e.top = t.chartArea.top, e.right = t.chartArea.right, e.bottom = t.chartArea.bottom, e.update(C, I);
              });
            }
          } };
      };
    }, {}], 30: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t, e) {
          return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth;
        }function a(e, a) {
          var i = new t.Legend({ ctx: e.chart.ctx, options: a, chart: e });e.legend = i, t.layoutService.addBox(e, i);
        }var i = t.helpers,
            n = i.noop;t.defaults.global.legend = { display: !0, position: "top", fullWidth: !0, reverse: !1, onClick: function onClick(t, e) {
            var a = e.datasetIndex,
                i = this.chart,
                n = i.getDatasetMeta(a);n.hidden = null === n.hidden ? !i.data.datasets[a].hidden : null, i.update();
          }, onHover: null, labels: { boxWidth: 40, padding: 10, generateLabels: function generateLabels(t) {
              var e = t.data;return i.isArray(e.datasets) ? e.datasets.map(function (e, a) {
                return { text: e.label, fillStyle: i.isArray(e.backgroundColor) ? e.backgroundColor[0] : e.backgroundColor, hidden: !t.isDatasetVisible(a), lineCap: e.borderCapStyle, lineDash: e.borderDash, lineDashOffset: e.borderDashOffset, lineJoin: e.borderJoinStyle, lineWidth: e.borderWidth, strokeStyle: e.borderColor, pointStyle: e.pointStyle, datasetIndex: a };
              }, this) : [];
            } } }, t.Legend = t.Element.extend({ initialize: function initialize(t) {
            i.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1;
          }, beforeUpdate: n, update: function update(t, e, a) {
            var i = this;return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = a, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize;
          }, afterUpdate: n, beforeSetDimensions: n, setDimensions: function setDimensions() {
            var t = this;t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = { width: 0, height: 0 };
          }, afterSetDimensions: n, beforeBuildLabels: n, buildLabels: function buildLabels() {
            var t = this,
                e = t.options.labels,
                a = e.generateLabels.call(t, t.chart);e.filter && (a = a.filter(function (a) {
              return e.filter(a, t.chart.data);
            })), t.options.reverse && a.reverse(), t.legendItems = a;
          }, afterBuildLabels: n, beforeFit: n, fit: function fit() {
            var a = this,
                n = a.options,
                o = n.labels,
                r = n.display,
                s = a.ctx,
                l = t.defaults.global,
                u = i.getValueOrDefault,
                d = u(o.fontSize, l.defaultFontSize),
                c = u(o.fontStyle, l.defaultFontStyle),
                h = u(o.fontFamily, l.defaultFontFamily),
                f = i.fontString(d, c, h),
                g = a.legendHitBoxes = [],
                p = a.minSize,
                m = a.isHorizontal();if (m ? (p.width = a.maxWidth, p.height = r ? 10 : 0) : (p.width = r ? 10 : 0, p.height = a.maxHeight), r) if (s.font = f, m) {
              var v = a.lineWidths = [0],
                  b = a.legendItems.length ? d + o.padding : 0;s.textAlign = "left", s.textBaseline = "top", i.each(a.legendItems, function (t, i) {
                var n = e(o, d),
                    r = n + d / 2 + s.measureText(t.text).width;v[v.length - 1] + r + o.padding >= a.width && (b += d + o.padding, v[v.length] = a.left), g[i] = { left: 0, top: 0, width: r, height: d }, v[v.length - 1] += r + o.padding;
              }), p.height += b;
            } else {
              var x = o.padding,
                  y = a.columnWidths = [],
                  k = o.padding,
                  S = 0,
                  M = 0,
                  w = d + x;i.each(a.legendItems, function (t, a) {
                var i = e(o, d),
                    n = i + d / 2 + s.measureText(t.text).width;M + w > p.height && (k += S + o.padding, y.push(S), S = 0, M = 0), S = Math.max(S, n), M += w, g[a] = { left: 0, top: 0, width: n, height: d };
              }), k += S, y.push(S), p.width += k;
            }a.width = p.width, a.height = p.height;
          }, afterFit: n, isHorizontal: function isHorizontal() {
            return "top" === this.options.position || "bottom" === this.options.position;
          }, draw: function draw() {
            var a = this,
                n = a.options,
                o = n.labels,
                r = t.defaults.global,
                s = r.elements.line,
                l = a.width,
                u = a.lineWidths;if (n.display) {
              var d,
                  c = a.ctx,
                  h = i.getValueOrDefault,
                  f = h(o.fontColor, r.defaultFontColor),
                  g = h(o.fontSize, r.defaultFontSize),
                  p = h(o.fontStyle, r.defaultFontStyle),
                  m = h(o.fontFamily, r.defaultFontFamily),
                  v = i.fontString(g, p, m);c.textAlign = "left", c.textBaseline = "top", c.lineWidth = .5, c.strokeStyle = f, c.fillStyle = f, c.font = v;var b = e(o, g),
                  x = a.legendHitBoxes,
                  y = function y(e, a, i) {
                if (!(isNaN(b) || b <= 0)) {
                  c.save(), c.fillStyle = h(i.fillStyle, r.defaultColor), c.lineCap = h(i.lineCap, s.borderCapStyle), c.lineDashOffset = h(i.lineDashOffset, s.borderDashOffset), c.lineJoin = h(i.lineJoin, s.borderJoinStyle), c.lineWidth = h(i.lineWidth, s.borderWidth), c.strokeStyle = h(i.strokeStyle, r.defaultColor);var o = 0 === h(i.lineWidth, s.borderWidth);if (c.setLineDash && c.setLineDash(h(i.lineDash, s.borderDash)), n.labels && n.labels.usePointStyle) {
                    var l = g * Math.SQRT2 / 2,
                        u = l / Math.SQRT2,
                        d = e + u,
                        f = a + u;t.canvasHelpers.drawPoint(c, i.pointStyle, l, d, f);
                  } else o || c.strokeRect(e, a, b, g), c.fillRect(e, a, b, g);c.restore();
                }
              },
                  k = function k(t, e, a, i) {
                c.fillText(a.text, b + g / 2 + t, e), a.hidden && (c.beginPath(), c.lineWidth = 2, c.moveTo(b + g / 2 + t, e + g / 2), c.lineTo(b + g / 2 + t + i, e + g / 2), c.stroke());
              },
                  S = a.isHorizontal();d = S ? { x: a.left + (l - u[0]) / 2, y: a.top + o.padding, line: 0 } : { x: a.left + o.padding, y: a.top + o.padding, line: 0 };var M = g + o.padding;i.each(a.legendItems, function (t, e) {
                var i = c.measureText(t.text).width,
                    n = b + g / 2 + i,
                    r = d.x,
                    s = d.y;S ? r + n >= l && (s = d.y += M, d.line++, r = d.x = a.left + (l - u[d.line]) / 2) : s + M > a.bottom && (r = d.x = r + a.columnWidths[d.line] + o.padding, s = d.y = a.top + o.padding, d.line++), y(r, s, t), x[e].left = r, x[e].top = s, k(r, s, t, i), S ? d.x += n + o.padding : d.y += M;
              });
            }
          }, handleEvent: function handleEvent(t) {
            var e = this,
                a = e.options,
                i = "mouseup" === t.type ? "click" : t.type,
                n = !1;if ("mousemove" === i) {
              if (!a.onHover) return;
            } else {
              if ("click" !== i) return;if (!a.onClick) return;
            }var o = t.x,
                r = t.y;if (o >= e.left && o <= e.right && r >= e.top && r <= e.bottom) for (var s = e.legendHitBoxes, l = 0; l < s.length; ++l) {
              var u = s[l];if (o >= u.left && o <= u.left + u.width && r >= u.top && r <= u.top + u.height) {
                if ("click" === i) {
                  a.onClick.call(e, t.native, e.legendItems[l]), n = !0;break;
                }if ("mousemove" === i) {
                  a.onHover.call(e, t.native, e.legendItems[l]), n = !0;break;
                }
              }
            }return n;
          } }), t.plugins.register({ beforeInit: function beforeInit(t) {
            var e = t.options.legend;e && a(t, e);
          }, beforeUpdate: function beforeUpdate(e) {
            var n = e.options.legend;n ? (n = i.configMerge(t.defaults.global.legend, n), e.legend ? e.legend.options = n : a(e, n)) : (t.layoutService.removeBox(e, e.legend), delete e.legend);
          }, afterEvent: function afterEvent(t, e) {
            var a = t.legend;a && a.handleEvent(e);
          } });
      };
    }, {}], 31: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.defaults.global.plugins = {}, t.plugins = { _plugins: [], _cacheId: 0, register: function register(t) {
            var e = this._plugins;[].concat(t).forEach(function (t) {
              e.indexOf(t) === -1 && e.push(t);
            }), this._cacheId++;
          }, unregister: function unregister(t) {
            var e = this._plugins;[].concat(t).forEach(function (t) {
              var a = e.indexOf(t);a !== -1 && e.splice(a, 1);
            }), this._cacheId++;
          }, clear: function clear() {
            this._plugins = [], this._cacheId++;
          }, count: function count() {
            return this._plugins.length;
          }, getAll: function getAll() {
            return this._plugins;
          }, notify: function notify(t, e, a) {
            var i,
                n,
                o,
                r,
                s,
                l = this.descriptors(t),
                u = l.length;for (i = 0; i < u; ++i) {
              if (n = l[i], o = n.plugin, s = o[e], "function" == typeof s && (r = [t].concat(a || []), r.push(n.options), s.apply(o, r) === !1)) return !1;
            }return !0;
          }, descriptors: function descriptors(a) {
            var i = a._plugins || (a._plugins = {});if (i.id === this._cacheId) return i.descriptors;var n = [],
                o = [],
                r = a && a.config || {},
                s = t.defaults.global.plugins,
                l = r.options && r.options.plugins || {};return this._plugins.concat(r.plugins || []).forEach(function (t) {
              var a = n.indexOf(t);if (a === -1) {
                var i = t.id,
                    r = l[i];r !== !1 && (r === !0 && (r = e.clone(s[i])), n.push(t), o.push({ plugin: t, options: r || {} }));
              }
            }), i.descriptors = o, i.id = this._cacheId, o;
          } }, t.pluginService = t.plugins, t.PluginBase = e.inherits({});
      };
    }, {}], 32: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t, e, a) {
          return i.isArray(e) ? i.longestText(t, a, e) : t.measureText(e).width;
        }function a(e) {
          var a = i.getValueOrDefault,
              n = t.defaults.global,
              o = a(e.fontSize, n.defaultFontSize),
              r = a(e.fontStyle, n.defaultFontStyle),
              s = a(e.fontFamily, n.defaultFontFamily);return { size: o, style: r, family: s, font: i.fontString(o, r, s) };
        }var i = t.helpers;t.defaults.scale = { display: !0, position: "left", gridLines: { display: !0, color: "rgba(0, 0, 0, 0.1)", lineWidth: 1, drawBorder: !0, drawOnChartArea: !0, drawTicks: !0, tickMarkLength: 10, zeroLineWidth: 1, zeroLineColor: "rgba(0,0,0,0.25)", offsetGridLines: !1, borderDash: [], borderDashOffset: 0 }, scaleLabel: { labelString: "", display: !1 }, ticks: { beginAtZero: !1, minRotation: 0, maxRotation: 50, mirror: !1, padding: 0, reverse: !1, display: !0, autoSkip: !0, autoSkipPadding: 0, labelOffset: 0, callback: t.Ticks.formatters.values } }, t.Scale = t.Element.extend({ getPadding: function getPadding() {
            var t = this;return { left: t.paddingLeft || 0, top: t.paddingTop || 0, right: t.paddingRight || 0, bottom: t.paddingBottom || 0 };
          }, beforeUpdate: function beforeUpdate() {
            i.callCallback(this.options.beforeUpdate, [this]);
          }, update: function update(t, e, a) {
            var n = this;return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = e, n.margins = i.extend({ left: 0, right: 0, top: 0, bottom: 0 }, a), n.longestTextCache = n.longestTextCache || {}, n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeDataLimits(), n.determineDataLimits(), n.afterDataLimits(), n.beforeBuildTicks(), n.buildTicks(), n.afterBuildTicks(), n.beforeTickToLabelConversion(), n.convertTicksToLabels(), n.afterTickToLabelConversion(), n.beforeCalculateTickRotation(), n.calculateTickRotation(), n.afterCalculateTickRotation(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize;
          }, afterUpdate: function afterUpdate() {
            i.callCallback(this.options.afterUpdate, [this]);
          }, beforeSetDimensions: function beforeSetDimensions() {
            i.callCallback(this.options.beforeSetDimensions, [this]);
          }, setDimensions: function setDimensions() {
            var t = this;t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0;
          }, afterSetDimensions: function afterSetDimensions() {
            i.callCallback(this.options.afterSetDimensions, [this]);
          }, beforeDataLimits: function beforeDataLimits() {
            i.callCallback(this.options.beforeDataLimits, [this]);
          }, determineDataLimits: i.noop, afterDataLimits: function afterDataLimits() {
            i.callCallback(this.options.afterDataLimits, [this]);
          }, beforeBuildTicks: function beforeBuildTicks() {
            i.callCallback(this.options.beforeBuildTicks, [this]);
          }, buildTicks: i.noop, afterBuildTicks: function afterBuildTicks() {
            i.callCallback(this.options.afterBuildTicks, [this]);
          }, beforeTickToLabelConversion: function beforeTickToLabelConversion() {
            i.callCallback(this.options.beforeTickToLabelConversion, [this]);
          }, convertTicksToLabels: function convertTicksToLabels() {
            var t = this,
                e = t.options.ticks;t.ticks = t.ticks.map(e.userCallback || e.callback);
          }, afterTickToLabelConversion: function afterTickToLabelConversion() {
            i.callCallback(this.options.afterTickToLabelConversion, [this]);
          }, beforeCalculateTickRotation: function beforeCalculateTickRotation() {
            i.callCallback(this.options.beforeCalculateTickRotation, [this]);
          }, calculateTickRotation: function calculateTickRotation() {
            var t = this,
                e = t.ctx,
                n = t.options.ticks,
                o = a(n);e.font = o.font;var r = n.minRotation || 0;if (t.options.display && t.isHorizontal()) for (var s, l, u = i.longestText(e, o.font, t.ticks, t.longestTextCache), d = u, c = t.getPixelForTick(1) - t.getPixelForTick(0) - 6; d > c && r < n.maxRotation;) {
              var h = i.toRadians(r);if (s = Math.cos(h), l = Math.sin(h), l * u > t.maxHeight) {
                r--;break;
              }r++, d = s * u;
            }t.labelRotation = r;
          }, afterCalculateTickRotation: function afterCalculateTickRotation() {
            i.callCallback(this.options.afterCalculateTickRotation, [this]);
          }, beforeFit: function beforeFit() {
            i.callCallback(this.options.beforeFit, [this]);
          }, fit: function fit() {
            var t = this,
                n = t.minSize = { width: 0, height: 0 },
                o = t.options,
                r = o.ticks,
                s = o.scaleLabel,
                l = o.gridLines,
                u = o.display,
                d = t.isHorizontal(),
                c = a(r),
                h = 1.5 * a(s).size,
                f = o.gridLines.tickMarkLength;if (d ? n.width = t.isFullWidth() ? t.maxWidth - t.margins.left - t.margins.right : t.maxWidth : n.width = u && l.drawTicks ? f : 0, d ? n.height = u && l.drawTicks ? f : 0 : n.height = t.maxHeight, s.display && u && (d ? n.height += h : n.width += h), r.display && u) {
              var g = i.longestText(t.ctx, c.font, t.ticks, t.longestTextCache),
                  p = i.numberOfLabelLines(t.ticks),
                  m = .5 * c.size;if (d) {
                t.longestLabelWidth = g;var v = i.toRadians(t.labelRotation),
                    b = Math.cos(v),
                    x = Math.sin(v),
                    y = x * g + c.size * p + m * p;n.height = Math.min(t.maxHeight, n.height + y), t.ctx.font = c.font;var k = t.ticks[0],
                    S = e(t.ctx, k, c.font),
                    M = t.ticks[t.ticks.length - 1],
                    w = e(t.ctx, M, c.font);0 !== t.labelRotation ? (t.paddingLeft = "bottom" === o.position ? b * S + 3 : b * m + 3, t.paddingRight = "bottom" === o.position ? b * m + 3 : b * w + 3) : (t.paddingLeft = S / 2 + 3, t.paddingRight = w / 2 + 3);
              } else r.mirror ? g = 0 : g += t.options.ticks.padding, n.width += g, t.paddingTop = c.size / 2, t.paddingBottom = c.size / 2;
            }t.handleMargins(), t.width = n.width, t.height = n.height;
          }, handleMargins: function handleMargins() {
            var t = this;t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0), t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0), t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0));
          }, afterFit: function afterFit() {
            i.callCallback(this.options.afterFit, [this]);
          }, isHorizontal: function isHorizontal() {
            return "top" === this.options.position || "bottom" === this.options.position;
          }, isFullWidth: function isFullWidth() {
            return this.options.fullWidth;
          }, getRightValue: function getRightValue(t) {
            return null === t || "undefined" == typeof t ? NaN : "number" != typeof t || isFinite(t) ? "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t instanceof Date || t.isValid ? t : this.getRightValue(this.isHorizontal() ? t.x : t.y) : t : NaN;
          }, getLabelForIndex: i.noop, getPixelForValue: i.noop, getValueForPixel: i.noop, getPixelForTick: function getPixelForTick(t, e) {
            var a = this;if (a.isHorizontal()) {
              var i = a.width - (a.paddingLeft + a.paddingRight),
                  n = i / Math.max(a.ticks.length - (a.options.gridLines.offsetGridLines ? 0 : 1), 1),
                  o = n * t + a.paddingLeft;e && (o += n / 2);var r = a.left + Math.round(o);return r += a.isFullWidth() ? a.margins.left : 0;
            }var s = a.height - (a.paddingTop + a.paddingBottom);return a.top + t * (s / (a.ticks.length - 1));
          }, getPixelForDecimal: function getPixelForDecimal(t) {
            var e = this;if (e.isHorizontal()) {
              var a = e.width - (e.paddingLeft + e.paddingRight),
                  i = a * t + e.paddingLeft,
                  n = e.left + Math.round(i);return n += e.isFullWidth() ? e.margins.left : 0;
            }return e.top + t * e.height;
          }, getBasePixel: function getBasePixel() {
            return this.getPixelForValue(this.getBaseValue());
          }, getBaseValue: function getBaseValue() {
            var t = this,
                e = t.min,
                a = t.max;return t.beginAtZero ? 0 : e < 0 && a < 0 ? a : e > 0 && a > 0 ? e : 0;
          }, draw: function draw(e) {
            var n = this,
                o = n.options;if (o.display) {
              var r,
                  s,
                  l = n.ctx,
                  u = t.defaults.global,
                  d = o.ticks,
                  c = o.gridLines,
                  h = o.scaleLabel,
                  f = 0 !== n.labelRotation,
                  g = d.autoSkip,
                  p = n.isHorizontal();d.maxTicksLimit && (s = d.maxTicksLimit);var m = i.getValueOrDefault(d.fontColor, u.defaultFontColor),
                  v = a(d),
                  b = c.drawTicks ? c.tickMarkLength : 0,
                  x = i.getValueOrDefault(c.borderDash, u.borderDash),
                  y = i.getValueOrDefault(c.borderDashOffset, u.borderDashOffset),
                  k = i.getValueOrDefault(h.fontColor, u.defaultFontColor),
                  S = a(h),
                  M = i.toRadians(n.labelRotation),
                  w = Math.cos(M),
                  C = n.longestLabelWidth * w;l.fillStyle = m;var I = [];if (p) {
                if (r = !1, f && (C /= 2), (C + d.autoSkipPadding) * n.ticks.length > n.width - (n.paddingLeft + n.paddingRight) && (r = 1 + Math.floor((C + d.autoSkipPadding) * n.ticks.length / (n.width - (n.paddingLeft + n.paddingRight)))), s && n.ticks.length > s) for (; !r || n.ticks.length / (r || 1) > s;) {
                  r || (r = 1), r += 1;
                }g || (r = !1);
              }var D = "right" === o.position ? n.left : n.right - b,
                  A = "right" === o.position ? n.left + b : n.right,
                  T = "bottom" === o.position ? n.top : n.bottom - b,
                  P = "bottom" === o.position ? n.top + b : n.bottom;if (i.each(n.ticks, function (t, a) {
                if (void 0 !== t && null !== t) {
                  var s = n.ticks.length === a + 1,
                      l = r > 1 && a % r > 0 || a % r === 0 && a + r >= n.ticks.length;if ((!l || s) && void 0 !== t && null !== t) {
                    var u, h;a === ("undefined" != typeof n.zeroLineIndex ? n.zeroLineIndex : 0) ? (u = c.zeroLineWidth, h = c.zeroLineColor) : (u = i.getValueAtIndexOrDefault(c.lineWidth, a), h = i.getValueAtIndexOrDefault(c.color, a));var g,
                        m,
                        v,
                        k,
                        S,
                        w,
                        C,
                        _,
                        F,
                        V,
                        R = "middle",
                        O = "middle";if (p) {
                      "bottom" === o.position ? (O = f ? "middle" : "top", R = f ? "right" : "center", V = n.top + b) : (O = f ? "middle" : "bottom", R = f ? "left" : "center", V = n.bottom - b);var L = n.getPixelForTick(a) + i.aliasPixel(u);F = n.getPixelForTick(a, c.offsetGridLines) + d.labelOffset, g = v = S = C = L, m = T, k = P, w = e.top, _ = e.bottom;
                    } else {
                      var B,
                          z = "left" === o.position,
                          W = d.padding;d.mirror ? (R = z ? "left" : "right", B = W) : (R = z ? "right" : "left", B = b + W), F = z ? n.right - B : n.left + B;var N = n.getPixelForTick(a);N += i.aliasPixel(u), V = n.getPixelForTick(a, c.offsetGridLines), g = D, v = A, S = e.left, C = e.right, m = k = w = _ = N;
                    }I.push({ tx1: g, ty1: m, tx2: v, ty2: k, x1: S, y1: w, x2: C, y2: _, labelX: F, labelY: V, glWidth: u, glColor: h, glBorderDash: x, glBorderDashOffset: y, rotation: -1 * M, label: t, textBaseline: O, textAlign: R });
                  }
                }
              }), i.each(I, function (t) {
                if (c.display && (l.save(), l.lineWidth = t.glWidth, l.strokeStyle = t.glColor, l.setLineDash && (l.setLineDash(t.glBorderDash), l.lineDashOffset = t.glBorderDashOffset), l.beginPath(), c.drawTicks && (l.moveTo(t.tx1, t.ty1), l.lineTo(t.tx2, t.ty2)), c.drawOnChartArea && (l.moveTo(t.x1, t.y1), l.lineTo(t.x2, t.y2)), l.stroke(), l.restore()), d.display) {
                  l.save(), l.translate(t.labelX, t.labelY), l.rotate(t.rotation), l.font = v.font, l.textBaseline = t.textBaseline, l.textAlign = t.textAlign;var e = t.label;if (i.isArray(e)) for (var a = 0, n = 0; a < e.length; ++a) {
                    l.fillText("" + e[a], 0, n), n += 1.5 * v.size;
                  } else l.fillText(e, 0, 0);l.restore();
                }
              }), h.display) {
                var _,
                    F,
                    V = 0;if (p) _ = n.left + (n.right - n.left) / 2, F = "bottom" === o.position ? n.bottom - S.size / 2 : n.top + S.size / 2;else {
                  var R = "left" === o.position;_ = R ? n.left + S.size / 2 : n.right - S.size / 2, F = n.top + (n.bottom - n.top) / 2, V = R ? -.5 * Math.PI : .5 * Math.PI;
                }l.save(), l.translate(_, F), l.rotate(V), l.textAlign = "center", l.textBaseline = "middle", l.fillStyle = k, l.font = S.font, l.fillText(h.labelString, 0, 0), l.restore();
              }if (c.drawBorder) {
                l.lineWidth = i.getValueAtIndexOrDefault(c.lineWidth, 0), l.strokeStyle = i.getValueAtIndexOrDefault(c.color, 0);var O = n.left,
                    L = n.right,
                    B = n.top,
                    z = n.bottom,
                    W = i.aliasPixel(l.lineWidth);p ? (B = z = "top" === o.position ? n.bottom : n.top, B += W, z += W) : (O = L = "left" === o.position ? n.right : n.left, O += W, L += W), l.beginPath(), l.moveTo(O, B), l.lineTo(L, z), l.stroke();
              }
            }
          } });
      };
    }, {}], 33: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.scaleService = { constructors: {}, defaults: {}, registerScaleType: function registerScaleType(t, a, i) {
            this.constructors[t] = a, this.defaults[t] = e.clone(i);
          }, getScaleConstructor: function getScaleConstructor(t) {
            return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0;
          }, getScaleDefaults: function getScaleDefaults(a) {
            return this.defaults.hasOwnProperty(a) ? e.scaleMerge(t.defaults.scale, this.defaults[a]) : {};
          }, updateScaleDefaults: function updateScaleDefaults(t, a) {
            var i = this.defaults;i.hasOwnProperty(t) && (i[t] = e.extend(i[t], a));
          }, addScalesToLayout: function addScalesToLayout(a) {
            e.each(a.scales, function (e) {
              t.layoutService.addBox(a, e);
            });
          } };
      };
    }, {}], 34: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers;t.Ticks = { generators: { linear: function linear(t, a) {
              var i,
                  n = [];if (t.stepSize && t.stepSize > 0) i = t.stepSize;else {
                var o = e.niceNum(a.max - a.min, !1);i = e.niceNum(o / (t.maxTicks - 1), !0);
              }var r = Math.floor(a.min / i) * i,
                  s = Math.ceil(a.max / i) * i;t.min && t.max && t.stepSize && e.almostWhole((t.max - t.min) / t.stepSize, i / 1e3) && (r = t.min, s = t.max);var l = (s - r) / i;l = e.almostEquals(l, Math.round(l), i / 1e3) ? Math.round(l) : Math.ceil(l), n.push(void 0 !== t.min ? t.min : r);for (var u = 1; u < l; ++u) {
                n.push(r + u * i);
              }return n.push(void 0 !== t.max ? t.max : s), n;
            }, logarithmic: function logarithmic(t, a) {
              var i,
                  n,
                  o = [],
                  r = e.getValueOrDefault,
                  s = r(t.min, Math.pow(10, Math.floor(e.log10(a.min)))),
                  l = Math.floor(e.log10(a.max)),
                  u = Math.ceil(a.max / Math.pow(10, l));0 === s ? (i = Math.floor(e.log10(a.minNotZero)), n = Math.floor(a.minNotZero / Math.pow(10, i)), o.push(s), s = n * Math.pow(10, i)) : (i = Math.floor(e.log10(s)), n = Math.floor(s / Math.pow(10, i)));do {
                o.push(s), ++n, 10 === n && (n = 1, ++i), s = n * Math.pow(10, i);
              } while (i < l || i === l && n < u);var d = r(t.max, s);return o.push(d), o;
            } }, formatters: { values: function values(t) {
              return e.isArray(t) ? t : "" + t;
            }, linear: function linear(t, a, i) {
              var n = i.length > 3 ? i[2] - i[1] : i[1] - i[0];Math.abs(n) > 1 && t !== Math.floor(t) && (n = t - Math.floor(t));var o = e.log10(Math.abs(n)),
                  r = "";if (0 !== t) {
                var s = -1 * Math.floor(o);s = Math.max(Math.min(s, 20), 0), r = t.toFixed(s);
              } else r = "0";return r;
            }, logarithmic: function logarithmic(t, a, i) {
              var n = t / Math.pow(10, Math.floor(e.log10(t)));return 0 === t ? "0" : 1 === n || 2 === n || 5 === n || 0 === a || a === i.length - 1 ? t.toExponential() : "";
            } } };
      };
    }, {}], 35: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(e, a) {
          var i = new t.Title({ ctx: e.chart.ctx, options: a, chart: e });e.titleBlock = i, t.layoutService.addBox(e, i);
        }var a = t.helpers;t.defaults.global.title = { display: !1, position: "top", fullWidth: !0, fontStyle: "bold", padding: 10, text: "" };var i = a.noop;t.Title = t.Element.extend({ initialize: function initialize(t) {
            var e = this;a.extend(e, t), e.legendHitBoxes = [];
          }, beforeUpdate: i, update: function update(t, e, a) {
            var i = this;return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = a, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize;
          }, afterUpdate: i, beforeSetDimensions: i, setDimensions: function setDimensions() {
            var t = this;t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = { width: 0, height: 0 };
          }, afterSetDimensions: i, beforeBuildLabels: i, buildLabels: i, afterBuildLabels: i, beforeFit: i, fit: function fit() {
            var e = this,
                i = a.getValueOrDefault,
                n = e.options,
                o = t.defaults.global,
                r = n.display,
                s = i(n.fontSize, o.defaultFontSize),
                l = e.minSize;e.isHorizontal() ? (l.width = e.maxWidth, l.height = r ? s + 2 * n.padding : 0) : (l.width = r ? s + 2 * n.padding : 0, l.height = e.maxHeight), e.width = l.width, e.height = l.height;
          }, afterFit: i, isHorizontal: function isHorizontal() {
            var t = this.options.position;return "top" === t || "bottom" === t;
          }, draw: function draw() {
            var e = this,
                i = e.ctx,
                n = a.getValueOrDefault,
                o = e.options,
                r = t.defaults.global;if (o.display) {
              var s,
                  l,
                  u,
                  d = n(o.fontSize, r.defaultFontSize),
                  c = n(o.fontStyle, r.defaultFontStyle),
                  h = n(o.fontFamily, r.defaultFontFamily),
                  f = a.fontString(d, c, h),
                  g = 0,
                  p = e.top,
                  m = e.left,
                  v = e.bottom,
                  b = e.right;i.fillStyle = n(o.fontColor, r.defaultFontColor), i.font = f, e.isHorizontal() ? (s = m + (b - m) / 2, l = p + (v - p) / 2, u = b - m) : (s = "left" === o.position ? m + d / 2 : b - d / 2, l = p + (v - p) / 2, u = v - p, g = Math.PI * ("left" === o.position ? -.5 : .5)), i.save(), i.translate(s, l), i.rotate(g), i.textAlign = "center", i.textBaseline = "middle", i.fillText(o.text, 0, 0, u), i.restore();
            }
          } }), t.plugins.register({ beforeInit: function beforeInit(t) {
            var a = t.options.title;a && e(t, a);
          }, beforeUpdate: function beforeUpdate(i) {
            var n = i.options.title;n ? (n = a.configMerge(t.defaults.global.title, n), i.titleBlock ? i.titleBlock.options = n : e(i, n)) : (t.layoutService.removeBox(i, i.titleBlock), delete i.titleBlock);
          } });
      };
    }, {}], 36: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t, e) {
          var a = l.color(t);return a.alpha(e * a.alpha()).rgbaString();
        }function a(t, e) {
          return e && (l.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
        }function i(t) {
          var e = t._xScale,
              a = t._yScale || t._scale,
              i = t._index,
              n = t._datasetIndex;return { xLabel: e ? e.getLabelForIndex(i, n) : "", yLabel: a ? a.getLabelForIndex(i, n) : "", index: i, datasetIndex: n, x: t._model.x, y: t._model.y };
        }function n(e) {
          var a = t.defaults.global,
              i = l.getValueOrDefault;return { xPadding: e.xPadding, yPadding: e.yPadding, xAlign: e.xAlign, yAlign: e.yAlign, bodyFontColor: e.bodyFontColor, _bodyFontFamily: i(e.bodyFontFamily, a.defaultFontFamily), _bodyFontStyle: i(e.bodyFontStyle, a.defaultFontStyle), _bodyAlign: e.bodyAlign, bodyFontSize: i(e.bodyFontSize, a.defaultFontSize), bodySpacing: e.bodySpacing, titleFontColor: e.titleFontColor, _titleFontFamily: i(e.titleFontFamily, a.defaultFontFamily), _titleFontStyle: i(e.titleFontStyle, a.defaultFontStyle), titleFontSize: i(e.titleFontSize, a.defaultFontSize), _titleAlign: e.titleAlign, titleSpacing: e.titleSpacing, titleMarginBottom: e.titleMarginBottom, footerFontColor: e.footerFontColor, _footerFontFamily: i(e.footerFontFamily, a.defaultFontFamily), _footerFontStyle: i(e.footerFontStyle, a.defaultFontStyle), footerFontSize: i(e.footerFontSize, a.defaultFontSize), _footerAlign: e.footerAlign, footerSpacing: e.footerSpacing, footerMarginTop: e.footerMarginTop, caretSize: e.caretSize, cornerRadius: e.cornerRadius, backgroundColor: e.backgroundColor, opacity: 0, legendColorBackground: e.multiKeyBackground, displayColors: e.displayColors };
        }function o(t, e) {
          var a = t._chart.ctx,
              i = 2 * e.yPadding,
              n = 0,
              o = e.body,
              r = o.reduce(function (t, e) {
            return t + e.before.length + e.lines.length + e.after.length;
          }, 0);r += e.beforeBody.length + e.afterBody.length;var s = e.title.length,
              u = e.footer.length,
              d = e.titleFontSize,
              c = e.bodyFontSize,
              h = e.footerFontSize;i += s * d, i += s ? (s - 1) * e.titleSpacing : 0, i += s ? e.titleMarginBottom : 0, i += r * c, i += r ? (r - 1) * e.bodySpacing : 0, i += u ? e.footerMarginTop : 0, i += u * h, i += u ? (u - 1) * e.footerSpacing : 0;var f = 0,
              g = function g(t) {
            n = Math.max(n, a.measureText(t).width + f);
          };return a.font = l.fontString(d, e._titleFontStyle, e._titleFontFamily), l.each(e.title, g), a.font = l.fontString(c, e._bodyFontStyle, e._bodyFontFamily), l.each(e.beforeBody.concat(e.afterBody), g), f = e.displayColors ? c + 2 : 0, l.each(o, function (t) {
            l.each(t.before, g), l.each(t.lines, g), l.each(t.after, g);
          }), f = 0, a.font = l.fontString(h, e._footerFontStyle, e._footerFontFamily), l.each(e.footer, g), n += 2 * e.xPadding, { width: n, height: i };
        }function r(t, e) {
          var a = t._model,
              i = t._chart,
              n = t._chartInstance.chartArea,
              o = "center",
              r = "center";a.y < e.height ? r = "top" : a.y > i.height - e.height && (r = "bottom");var s,
              l,
              u,
              d,
              c,
              h = (n.left + n.right) / 2,
              f = (n.top + n.bottom) / 2;"center" === r ? (s = function s(t) {
            return t <= h;
          }, l = function l(t) {
            return t > h;
          }) : (s = function s(t) {
            return t <= e.width / 2;
          }, l = function l(t) {
            return t >= i.width - e.width / 2;
          }), u = function u(t) {
            return t + e.width > i.width;
          }, d = function d(t) {
            return t - e.width < 0;
          }, c = function c(t) {
            return t <= f ? "top" : "bottom";
          }, s(a.x) ? (o = "left", u(a.x) && (o = "center", r = c(a.y))) : l(a.x) && (o = "right", d(a.x) && (o = "center", r = c(a.y)));var g = t._options;return { xAlign: g.xAlign ? g.xAlign : o, yAlign: g.yAlign ? g.yAlign : r };
        }function s(t, e, a) {
          var i = t.x,
              n = t.y,
              o = t.caretSize,
              r = t.caretPadding,
              s = t.cornerRadius,
              l = a.xAlign,
              u = a.yAlign,
              d = o + r,
              c = s + r;return "right" === l ? i -= e.width : "center" === l && (i -= e.width / 2), "top" === u ? n += d : n -= "bottom" === u ? e.height + d : e.height / 2, "center" === u ? "left" === l ? i += d : "right" === l && (i -= d) : "left" === l ? i -= c : "right" === l && (i += c), { x: i, y: n };
        }var l = t.helpers;t.defaults.global.tooltips = { enabled: !0, custom: null, mode: "nearest", position: "average", intersect: !0, backgroundColor: "rgba(0,0,0,0.8)", titleFontStyle: "bold", titleSpacing: 2, titleMarginBottom: 6, titleFontColor: "#fff", titleAlign: "left", bodySpacing: 2, bodyFontColor: "#fff", bodyAlign: "left", footerFontStyle: "bold", footerSpacing: 2, footerMarginTop: 6, footerFontColor: "#fff", footerAlign: "left", yPadding: 6, xPadding: 6, caretSize: 5, cornerRadius: 6, multiKeyBackground: "#fff", displayColors: !0, callbacks: { beforeTitle: l.noop, title: function title(t, e) {
              var a = "",
                  i = e.labels,
                  n = i ? i.length : 0;if (t.length > 0) {
                var o = t[0];o.xLabel ? a = o.xLabel : n > 0 && o.index < n && (a = i[o.index]);
              }return a;
            }, afterTitle: l.noop, beforeBody: l.noop, beforeLabel: l.noop, label: function label(t, e) {
              var a = e.datasets[t.datasetIndex].label || "";return a + ": " + t.yLabel;
            }, labelColor: function labelColor(t, e) {
              var a = e.getDatasetMeta(t.datasetIndex),
                  i = a.data[t.index],
                  n = i._view;return { borderColor: n.borderColor, backgroundColor: n.backgroundColor };
            }, afterLabel: l.noop, afterBody: l.noop, beforeFooter: l.noop, footer: l.noop, afterFooter: l.noop } }, t.Tooltip = t.Element.extend({ initialize: function initialize() {
            this._model = n(this._options);
          }, getTitle: function getTitle() {
            var t = this,
                e = t._options,
                i = e.callbacks,
                n = i.beforeTitle.apply(t, arguments),
                o = i.title.apply(t, arguments),
                r = i.afterTitle.apply(t, arguments),
                s = [];return s = a(s, n), s = a(s, o), s = a(s, r);
          }, getBeforeBody: function getBeforeBody() {
            var t = this._options.callbacks.beforeBody.apply(this, arguments);return l.isArray(t) ? t : void 0 !== t ? [t] : [];
          }, getBody: function getBody(t, e) {
            var i = this,
                n = i._options.callbacks,
                o = [];return l.each(t, function (t) {
              var r = { before: [], lines: [], after: [] };a(r.before, n.beforeLabel.call(i, t, e)), a(r.lines, n.label.call(i, t, e)), a(r.after, n.afterLabel.call(i, t, e)), o.push(r);
            }), o;
          }, getAfterBody: function getAfterBody() {
            var t = this._options.callbacks.afterBody.apply(this, arguments);return l.isArray(t) ? t : void 0 !== t ? [t] : [];
          }, getFooter: function getFooter() {
            var t = this,
                e = t._options.callbacks,
                i = e.beforeFooter.apply(t, arguments),
                n = e.footer.apply(t, arguments),
                o = e.afterFooter.apply(t, arguments),
                r = [];return r = a(r, i), r = a(r, n), r = a(r, o);
          }, update: function update(e) {
            var a,
                u,
                d = this,
                c = d._options,
                h = d._model,
                f = d._model = n(c),
                g = d._active,
                p = d._data,
                m = d._chartInstance,
                v = { xAlign: h.xAlign, yAlign: h.yAlign },
                b = { x: h.x, y: h.y },
                x = { width: h.width, height: h.height },
                y = { x: h.caretX, y: h.caretY };if (g.length) {
              f.opacity = 1;var k = [];y = t.Tooltip.positioners[c.position](g, d._eventPosition);var S = [];for (a = 0, u = g.length; a < u; ++a) {
                S.push(i(g[a]));
              }c.filter && (S = S.filter(function (t) {
                return c.filter(t, p);
              })), c.itemSort && (S = S.sort(function (t, e) {
                return c.itemSort(t, e, p);
              })), l.each(S, function (t) {
                k.push(c.callbacks.labelColor.call(d, t, m));
              }), f.title = d.getTitle(S, p), f.beforeBody = d.getBeforeBody(S, p), f.body = d.getBody(S, p), f.afterBody = d.getAfterBody(S, p), f.footer = d.getFooter(S, p), f.x = Math.round(y.x), f.y = Math.round(y.y), f.caretPadding = l.getValueOrDefault(y.padding, 2), f.labelColors = k, f.dataPoints = S, x = o(this, f), v = r(this, x), b = s(f, x, v);
            } else f.opacity = 0;return f.xAlign = v.xAlign, f.yAlign = v.yAlign, f.x = b.x, f.y = b.y, f.width = x.width, f.height = x.height, f.caretX = y.x, f.caretY = y.y, d._model = f, e && c.custom && c.custom.call(d, f), d;
          }, drawCaret: function drawCaret(t, a, i) {
            var n,
                o,
                r,
                s,
                l,
                u,
                d = this._view,
                c = this._chart.ctx,
                h = d.caretSize,
                f = d.cornerRadius,
                g = d.xAlign,
                p = d.yAlign,
                m = t.x,
                v = t.y,
                b = a.width,
                x = a.height;"center" === p ? ("left" === g ? (n = m, o = n - h, r = n) : (n = m + b, o = n + h, r = n), l = v + x / 2, s = l - h, u = l + h) : ("left" === g ? (n = m + f, o = n + h, r = o + h) : "right" === g ? (n = m + b - f, o = n - h, r = o - h) : (o = m + b / 2, n = o - h, r = o + h), "top" === p ? (s = v, l = s - h, u = s) : (s = v + x, l = s + h, u = s)), c.fillStyle = e(d.backgroundColor, i), c.beginPath(), c.moveTo(n, s), c.lineTo(o, l), c.lineTo(r, u), c.closePath(), c.fill();
          }, drawTitle: function drawTitle(t, a, i, n) {
            var o = a.title;if (o.length) {
              i.textAlign = a._titleAlign, i.textBaseline = "top";var r = a.titleFontSize,
                  s = a.titleSpacing;i.fillStyle = e(a.titleFontColor, n), i.font = l.fontString(r, a._titleFontStyle, a._titleFontFamily);var u, d;for (u = 0, d = o.length; u < d; ++u) {
                i.fillText(o[u], t.x, t.y), t.y += r + s, u + 1 === o.length && (t.y += a.titleMarginBottom - s);
              }
            }
          }, drawBody: function drawBody(t, a, i, n) {
            var o = a.bodyFontSize,
                r = a.bodySpacing,
                s = a.body;i.textAlign = a._bodyAlign, i.textBaseline = "top";var u = e(a.bodyFontColor, n);i.fillStyle = u, i.font = l.fontString(o, a._bodyFontStyle, a._bodyFontFamily);var d = 0,
                c = function c(e) {
              i.fillText(e, t.x + d, t.y), t.y += o + r;
            };l.each(a.beforeBody, c);var h = a.displayColors;d = h ? o + 2 : 0, l.each(s, function (r, s) {
              l.each(r.before, c), l.each(r.lines, function (r) {
                h && (i.fillStyle = e(a.legendColorBackground, n), i.fillRect(t.x, t.y, o, o), i.strokeStyle = e(a.labelColors[s].borderColor, n), i.strokeRect(t.x, t.y, o, o), i.fillStyle = e(a.labelColors[s].backgroundColor, n), i.fillRect(t.x + 1, t.y + 1, o - 2, o - 2), i.fillStyle = u), c(r);
              }), l.each(r.after, c);
            }), d = 0, l.each(a.afterBody, c), t.y -= r;
          }, drawFooter: function drawFooter(t, a, i, n) {
            var o = a.footer;o.length && (t.y += a.footerMarginTop, i.textAlign = a._footerAlign, i.textBaseline = "top", i.fillStyle = e(a.footerFontColor, n), i.font = l.fontString(a.footerFontSize, a._footerFontStyle, a._footerFontFamily), l.each(o, function (e) {
              i.fillText(e, t.x, t.y), t.y += a.footerFontSize + a.footerSpacing;
            }));
          }, drawBackground: function drawBackground(t, a, i, n, o) {
            i.fillStyle = e(a.backgroundColor, o), l.drawRoundedRectangle(i, t.x, t.y, n.width, n.height, a.cornerRadius), i.fill();
          }, draw: function draw() {
            var t = this._chart.ctx,
                e = this._view;if (0 !== e.opacity) {
              var a = { width: e.width, height: e.height },
                  i = { x: e.x, y: e.y },
                  n = Math.abs(e.opacity < .001) ? 0 : e.opacity;this._options.enabled && (this.drawBackground(i, e, t, a, n), this.drawCaret(i, a, n), i.x += e.xPadding, i.y += e.yPadding, this.drawTitle(i, e, t, n), this.drawBody(i, e, t, n), this.drawFooter(i, e, t, n));
            }
          }, handleEvent: function handleEvent(t) {
            var e = this,
                a = e._options,
                i = !1;if (e._lastActive = e._lastActive || [], "mouseout" === t.type ? e._active = [] : e._active = e._chartInstance.getElementsAtEventForMode(t, a.mode, a), i = !l.arrayEquals(e._active, e._lastActive), e._lastActive = e._active, a.enabled || a.custom) {
              e._eventPosition = { x: t.x, y: t.y };var n = e._model;e.update(!0), e.pivot(), i |= n.x !== e._model.x || n.y !== e._model.y;
            }return i;
          } }), t.Tooltip.positioners = { average: function average(t) {
            if (!t.length) return !1;var e,
                a,
                i = 0,
                n = 0,
                o = 0;for (e = 0, a = t.length; e < a; ++e) {
              var r = t[e];if (r && r.hasValue()) {
                var s = r.tooltipPosition();i += s.x, n += s.y, ++o;
              }
            }return { x: Math.round(i / o), y: Math.round(n / o) };
          }, nearest: function nearest(t, e) {
            var a,
                i,
                n,
                o = e.x,
                r = e.y,
                s = Number.POSITIVE_INFINITY;for (i = 0, n = t.length; i < n; ++i) {
              var u = t[i];if (u && u.hasValue()) {
                var d = u.getCenterPoint(),
                    c = l.distanceBetweenPoints(e, d);c < s && (s = c, a = u);
              }
            }if (a) {
              var h = a.tooltipPosition();o = h.x, r = h.y;
            }return { x: o, y: r };
          } };
      };
    }, {}], 37: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers,
            a = t.defaults.global;a.elements.arc = { backgroundColor: a.defaultColor, borderColor: "#fff", borderWidth: 2 }, t.elements.Arc = t.Element.extend({ inLabelRange: function inLabelRange(t) {
            var e = this._view;return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2);
          }, inRange: function inRange(t, a) {
            var i = this._view;if (i) {
              for (var n = e.getAngleFromPoint(i, { x: t, y: a }), o = n.angle, r = n.distance, s = i.startAngle, l = i.endAngle; l < s;) {
                l += 2 * Math.PI;
              }for (; o > l;) {
                o -= 2 * Math.PI;
              }for (; o < s;) {
                o += 2 * Math.PI;
              }var u = o >= s && o <= l,
                  d = r >= i.innerRadius && r <= i.outerRadius;return u && d;
            }return !1;
          }, getCenterPoint: function getCenterPoint() {
            var t = this._view,
                e = (t.startAngle + t.endAngle) / 2,
                a = (t.innerRadius + t.outerRadius) / 2;return { x: t.x + Math.cos(e) * a, y: t.y + Math.sin(e) * a };
          }, getArea: function getArea() {
            var t = this._view;return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2));
          }, tooltipPosition: function tooltipPosition() {
            var t = this._view,
                e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                a = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;return { x: t.x + Math.cos(e) * a, y: t.y + Math.sin(e) * a };
          }, draw: function draw() {
            var t = this._chart.ctx,
                e = this._view,
                a = e.startAngle,
                i = e.endAngle;t.beginPath(), t.arc(e.x, e.y, e.outerRadius, a, i), t.arc(e.x, e.y, e.innerRadius, i, a, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke();
          } });
      };
    }, {}], 38: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers,
            a = t.defaults.global;t.defaults.global.elements.line = { tension: .4, backgroundColor: a.defaultColor, borderWidth: 3, borderColor: a.defaultColor, borderCapStyle: "butt", borderDash: [], borderDashOffset: 0, borderJoinStyle: "miter", capBezierPoints: !0, fill: !0 }, t.elements.Line = t.Element.extend({ draw: function draw() {
            function t(t, e) {
              var a = e._view;e._view.steppedLine === !0 ? (l.lineTo(a.x, t._view.y), l.lineTo(a.x, a.y)) : 0 === e._view.tension ? l.lineTo(a.x, a.y) : l.bezierCurveTo(t._view.controlPointNextX, t._view.controlPointNextY, a.controlPointPreviousX, a.controlPointPreviousY, a.x, a.y);
            }var i = this,
                n = i._view,
                o = n.spanGaps,
                r = n.scaleZero,
                s = i._loop;s || ("top" === n.fill ? r = n.scaleTop : "bottom" === n.fill && (r = n.scaleBottom));var l = i._chart.ctx;l.save();var u = i._children.slice(),
                d = -1;s && u.length && u.push(u[0]);var c, h, f, g;if (u.length && n.fill) {
              for (l.beginPath(), c = 0; c < u.length; ++c) {
                h = u[c], f = e.previousItem(u, c), g = h._view, 0 === c ? (s ? l.moveTo(r.x, r.y) : l.moveTo(g.x, r), g.skip || (d = c, l.lineTo(g.x, g.y))) : (f = d === -1 ? f : u[d], g.skip ? o || d !== c - 1 || (s ? l.lineTo(r.x, r.y) : l.lineTo(f._view.x, r)) : (d !== c - 1 ? o && d !== -1 ? t(f, h) : s ? l.lineTo(g.x, g.y) : (l.lineTo(g.x, r), l.lineTo(g.x, g.y)) : t(f, h), d = c));
              }s || d === -1 || l.lineTo(u[d]._view.x, r), l.fillStyle = n.backgroundColor || a.defaultColor, l.closePath(), l.fill();
            }var p = a.elements.line;for (l.lineCap = n.borderCapStyle || p.borderCapStyle, l.setLineDash && l.setLineDash(n.borderDash || p.borderDash), l.lineDashOffset = n.borderDashOffset || p.borderDashOffset, l.lineJoin = n.borderJoinStyle || p.borderJoinStyle, l.lineWidth = n.borderWidth || p.borderWidth, l.strokeStyle = n.borderColor || a.defaultColor, l.beginPath(), d = -1, c = 0; c < u.length; ++c) {
              h = u[c], f = e.previousItem(u, c), g = h._view, 0 === c ? g.skip || (l.moveTo(g.x, g.y), d = c) : (f = d === -1 ? f : u[d], g.skip || (d !== c - 1 && !o || d === -1 ? l.moveTo(g.x, g.y) : t(f, h), d = c));
            }l.stroke(), l.restore();
          } });
      };
    }, {}], 39: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t) {
          var e = this._view;return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2);
        }function a(t) {
          var e = this._view;return !!e && Math.pow(t - e.y, 2) < Math.pow(e.radius + e.hitRadius, 2);
        }var i = t.helpers,
            n = t.defaults.global,
            o = n.defaultColor;n.elements.point = { radius: 3, pointStyle: "circle", backgroundColor: o, borderWidth: 1, borderColor: o, hitRadius: 1, hoverRadius: 4, hoverBorderWidth: 1 }, t.elements.Point = t.Element.extend({ inRange: function inRange(t, e) {
            var a = this._view;return !!a && Math.pow(t - a.x, 2) + Math.pow(e - a.y, 2) < Math.pow(a.hitRadius + a.radius, 2);
          }, inLabelRange: e, inXRange: e, inYRange: a, getCenterPoint: function getCenterPoint() {
            var t = this._view;return { x: t.x, y: t.y };
          }, getArea: function getArea() {
            return Math.PI * Math.pow(this._view.radius, 2);
          }, tooltipPosition: function tooltipPosition() {
            var t = this._view;return { x: t.x, y: t.y, padding: t.radius + t.borderWidth };
          }, draw: function draw(e) {
            var a = this._view,
                r = this._model,
                s = this._chart.ctx,
                l = a.pointStyle,
                u = a.radius,
                d = a.x,
                c = a.y,
                h = t.helpers.color,
                f = 1.01,
                g = 0;a.skip || (s.strokeStyle = a.borderColor || o, s.lineWidth = i.getValueOrDefault(a.borderWidth, n.elements.point.borderWidth), s.fillStyle = a.backgroundColor || o, void 0 !== e && (r.x < e.left || e.right * f < r.x || r.y < e.top || e.bottom * f < r.y) && (r.x < e.left ? g = (d - r.x) / (e.left - r.x) : e.right * f < r.x ? g = (r.x - d) / (r.x - e.right) : r.y < e.top ? g = (c - r.y) / (e.top - r.y) : e.bottom * f < r.y && (g = (r.y - c) / (r.y - e.bottom)), g = Math.round(100 * g) / 100, s.strokeStyle = h(s.strokeStyle).alpha(g).rgbString(), s.fillStyle = h(s.fillStyle).alpha(g).rgbString()), t.canvasHelpers.drawPoint(s, l, u, d, c));
          } });
      };
    }, {}], 40: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t) {
          return void 0 !== t._view.width;
        }function a(t) {
          var a,
              i,
              n,
              o,
              r = t._view;if (e(t)) {
            var s = r.width / 2;a = r.x - s, i = r.x + s, n = Math.min(r.y, r.base), o = Math.max(r.y, r.base);
          } else {
            var l = r.height / 2;a = Math.min(r.x, r.base), i = Math.max(r.x, r.base), n = r.y - l, o = r.y + l;
          }return { left: a, top: n, right: i, bottom: o };
        }var i = t.defaults.global;i.elements.rectangle = { backgroundColor: i.defaultColor, borderWidth: 0, borderColor: i.defaultColor, borderSkipped: "bottom" }, t.elements.Rectangle = t.Element.extend({ draw: function draw() {
            function t(t) {
              return v[(x + t) % 4];
            }var e,
                a,
                i,
                n,
                o,
                r,
                s,
                l = this._chart.ctx,
                u = this._view,
                d = u.borderWidth;if (u.horizontal ? (e = u.base, a = u.x, i = u.y - u.height / 2, n = u.y + u.height / 2, o = a > e ? 1 : -1, r = 1, s = u.borderSkipped || "left") : (e = u.x - u.width / 2, a = u.x + u.width / 2, i = u.y, n = u.base, o = 1, r = n > i ? 1 : -1, s = u.borderSkipped || "bottom"), d) {
              var c = Math.min(Math.abs(e - a), Math.abs(i - n));d = d > c ? c : d;var h = d / 2,
                  f = e + ("left" !== s ? h * o : 0),
                  g = a + ("right" !== s ? -h * o : 0),
                  p = i + ("top" !== s ? h * r : 0),
                  m = n + ("bottom" !== s ? -h * r : 0);f !== g && (i = p, n = m), p !== m && (e = f, a = g);
            }l.beginPath(), l.fillStyle = u.backgroundColor, l.strokeStyle = u.borderColor, l.lineWidth = d;var v = [[e, n], [e, i], [a, i], [a, n]],
                b = ["bottom", "left", "top", "right"],
                x = b.indexOf(s, 0);x === -1 && (x = 0);var y = t(0);l.moveTo(y[0], y[1]);for (var k = 1; k < 4; k++) {
              y = t(k), l.lineTo(y[0], y[1]);
            }l.fill(), d && l.stroke();
          }, height: function height() {
            var t = this._view;return t.base - t.y;
          }, inRange: function inRange(t, e) {
            var i = !1;if (this._view) {
              var n = a(this);i = t >= n.left && t <= n.right && e >= n.top && e <= n.bottom;
            }return i;
          }, inLabelRange: function inLabelRange(t, i) {
            var n = this;if (!n._view) return !1;var o = !1,
                r = a(n);return o = e(n) ? t >= r.left && t <= r.right : i >= r.top && i <= r.bottom;
          }, inXRange: function inXRange(t) {
            var e = a(this);return t >= e.left && t <= e.right;
          }, inYRange: function inYRange(t) {
            var e = a(this);return t >= e.top && t <= e.bottom;
          }, getCenterPoint: function getCenterPoint() {
            var t,
                a,
                i = this._view;return e(this) ? (t = i.x, a = (i.y + i.base) / 2) : (t = (i.x + i.base) / 2, a = i.y), { x: t, y: a };
          }, getArea: function getArea() {
            var t = this._view;return t.width * Math.abs(t.y - t.base);
          }, tooltipPosition: function tooltipPosition() {
            var t = this._view;return { x: t.x, y: t.y };
          } });
      };
    }, {}], 41: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t, e) {
          var a = l.getStyle(t, e),
              i = a && a.match(/(\d+)px/);return i ? Number(i[1]) : void 0;
        }function a(t, a) {
          var i = t.style,
              n = t.getAttribute("height"),
              o = t.getAttribute("width");if (t._chartjs = { initial: { height: n, width: o, style: { display: i.display, height: i.height, width: i.width } } }, i.display = i.display || "block", null === o || "" === o) {
            var r = e(t, "width");void 0 !== r && (t.width = r);
          }if (null === n || "" === n) if ("" === t.style.height) t.height = t.width / (a.options.aspectRatio || 2);else {
            var s = e(t, "height");void 0 !== r && (t.height = s);
          }return t;
        }function i(t, e, a, i, n) {
          return { type: t, chart: e, native: n || null, x: void 0 !== a ? a : null, y: void 0 !== i ? i : null };
        }function n(t, e) {
          var a = u[t.type] || t.type,
              n = l.getRelativePosition(t, e);return i(a, e, n.x, n.y, t);
        }function o(t) {
          var e = document.createElement("iframe");return e.className = "chartjs-hidden-iframe", e.style.cssText = "display:block;overflow:hidden;border:0;margin:0;top:0;left:0;bottom:0;right:0;height:100%;width:100%;position:absolute;pointer-events:none;z-index:-1;", e.tabIndex = -1, l.addEvent(e, "load", function () {
            l.addEvent(e.contentWindow || e, "resize", t), t();
          }), e;
        }function r(t, e, a) {
          var n = t._chartjs = { ticking: !1 },
              r = function r() {
            n.ticking || (n.ticking = !0, l.requestAnimFrame.call(window, function () {
              if (n.resizer) return n.ticking = !1, e(i("resize", a));
            }));
          };n.resizer = o(r), t.insertBefore(n.resizer, t.firstChild);
        }function s(t) {
          if (t && t._chartjs) {
            var e = t._chartjs.resizer;e && (e.parentNode.removeChild(e), t._chartjs.resizer = null), delete t._chartjs;
          }
        }var l = t.helpers,
            u = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup", pointerenter: "mouseenter", pointerdown: "mousedown", pointermove: "mousemove", pointerup: "mouseup", pointerleave: "mouseout", pointerout: "mouseout" };return { acquireContext: function acquireContext(t, e) {
            if ("string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t instanceof HTMLCanvasElement) {
              var i = t.getContext && t.getContext("2d");if (i instanceof CanvasRenderingContext2D) return a(t, e), i;
            }return null;
          }, releaseContext: function releaseContext(t) {
            var e = t.canvas;if (e._chartjs) {
              var a = e._chartjs.initial;["height", "width"].forEach(function (t) {
                var i = a[t];void 0 === i || null === i ? e.removeAttribute(t) : e.setAttribute(t, i);
              }), l.each(a.style || {}, function (t, a) {
                e.style[a] = t;
              }), e.width = e.width, delete e._chartjs;
            }
          }, addEventListener: function addEventListener(t, e, a) {
            var i = t.chart.canvas;if ("resize" === e) return void r(i.parentNode, a, t.chart);var o = a._chartjs || (a._chartjs = {}),
                s = o.proxies || (o.proxies = {}),
                u = s[t.id + "_" + e] = function (e) {
              a(n(e, t.chart));
            };l.addEvent(i, e, u);
          }, removeEventListener: function removeEventListener(t, e, a) {
            var i = t.chart.canvas;if ("resize" === e) return void s(i.parentNode, a);var n = a._chartjs || {},
                o = n.proxies || {},
                r = o[t.id + "_" + e];r && l.removeEvent(i, e, r);
          } };
      };
    }, {}], 42: [function (t, e, a) {
      "use strict";
      var i = t(41);e.exports = function (t) {
        t.platform = { acquireContext: function acquireContext() {}, releaseContext: function releaseContext() {}, addEventListener: function addEventListener() {}, removeEventListener: function removeEventListener() {} }, t.helpers.extend(t.platform, i(t));
      };
    }, { 41: 41 }], 43: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers,
            a = { position: "bottom" },
            i = t.Scale.extend({ getLabels: function getLabels() {
            var t = this.chart.data;return (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels;
          }, determineDataLimits: function determineDataLimits() {
            var t = this,
                a = t.getLabels();t.minIndex = 0, t.maxIndex = a.length - 1;var i;void 0 !== t.options.ticks.min && (i = e.indexOf(a, t.options.ticks.min), t.minIndex = i !== -1 ? i : t.minIndex), void 0 !== t.options.ticks.max && (i = e.indexOf(a, t.options.ticks.max), t.maxIndex = i !== -1 ? i : t.maxIndex), t.min = a[t.minIndex], t.max = a[t.maxIndex];
          }, buildTicks: function buildTicks() {
            var t = this,
                e = t.getLabels();t.ticks = 0 === t.minIndex && t.maxIndex === e.length - 1 ? e : e.slice(t.minIndex, t.maxIndex + 1);
          }, getLabelForIndex: function getLabelForIndex(t, e) {
            var a = this,
                i = a.chart.data,
                n = a.isHorizontal();return i.yLabels && !n ? a.getRightValue(i.datasets[e].data[t]) : a.ticks[t - a.minIndex];
          }, getPixelForValue: function getPixelForValue(t, e, a, i) {
            var n = this,
                o = Math.max(n.maxIndex + 1 - n.minIndex - (n.options.gridLines.offsetGridLines ? 0 : 1), 1);if (void 0 !== t && isNaN(e)) {
              var r = n.getLabels(),
                  s = r.indexOf(t);e = s !== -1 ? s : e;
            }if (n.isHorizontal()) {
              var l = n.width / o,
                  u = l * (e - n.minIndex);return (n.options.gridLines.offsetGridLines && i || n.maxIndex === n.minIndex && i) && (u += l / 2), n.left + Math.round(u);
            }var d = n.height / o,
                c = d * (e - n.minIndex);return n.options.gridLines.offsetGridLines && i && (c += d / 2), n.top + Math.round(c);
          }, getPixelForTick: function getPixelForTick(t, e) {
            return this.getPixelForValue(this.ticks[t], t + this.minIndex, null, e);
          }, getValueForPixel: function getValueForPixel(t) {
            var e,
                a = this,
                i = Math.max(a.ticks.length - (a.options.gridLines.offsetGridLines ? 0 : 1), 1),
                n = a.isHorizontal(),
                o = (n ? a.width : a.height) / i;return t -= n ? a.left : a.top, a.options.gridLines.offsetGridLines && (t -= o / 2), e = t <= 0 ? 0 : Math.round(t / o);
          }, getBasePixel: function getBasePixel() {
            return this.bottom;
          } });t.scaleService.registerScaleType("category", i, a);
      };
    }, {}], 44: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers,
            a = { position: "left", ticks: { callback: t.Ticks.formatters.linear } },
            i = t.LinearScaleBase.extend({ determineDataLimits: function determineDataLimits() {
            function t(t) {
              return s ? t.xAxisID === a.id : t.yAxisID === a.id;
            }var a = this,
                i = a.options,
                n = a.chart,
                o = n.data,
                r = o.datasets,
                s = a.isHorizontal();a.min = null, a.max = null;var l = i.stacked;if (void 0 === l && e.each(r, function (e, a) {
              if (!l) {
                var i = n.getDatasetMeta(a);n.isDatasetVisible(a) && t(i) && void 0 !== i.stack && (l = !0);
              }
            }), i.stacked || l) {
              var u = {};e.each(r, function (o, r) {
                var s = n.getDatasetMeta(r),
                    l = [s.type, void 0 === i.stacked && void 0 === s.stack ? r : "", s.stack].join(".");void 0 === u[l] && (u[l] = { positiveValues: [], negativeValues: [] });var d = u[l].positiveValues,
                    c = u[l].negativeValues;n.isDatasetVisible(r) && t(s) && e.each(o.data, function (t, e) {
                  var n = +a.getRightValue(t);isNaN(n) || s.data[e].hidden || (d[e] = d[e] || 0, c[e] = c[e] || 0, i.relativePoints ? d[e] = 100 : n < 0 ? c[e] += n : d[e] += n);
                });
              }), e.each(u, function (t) {
                var i = t.positiveValues.concat(t.negativeValues),
                    n = e.min(i),
                    o = e.max(i);a.min = null === a.min ? n : Math.min(a.min, n), a.max = null === a.max ? o : Math.max(a.max, o);
              });
            } else e.each(r, function (i, o) {
              var r = n.getDatasetMeta(o);n.isDatasetVisible(o) && t(r) && e.each(i.data, function (t, e) {
                var i = +a.getRightValue(t);isNaN(i) || r.data[e].hidden || (null === a.min ? a.min = i : i < a.min && (a.min = i), null === a.max ? a.max = i : i > a.max && (a.max = i));
              });
            });this.handleTickRangeOptions();
          }, getTickLimit: function getTickLimit() {
            var a,
                i = this,
                n = i.options.ticks;if (i.isHorizontal()) a = Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(i.width / 50));else {
              var o = e.getValueOrDefault(n.fontSize, t.defaults.global.defaultFontSize);a = Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(i.height / (2 * o)));
            }return a;
          }, handleDirectionalChanges: function handleDirectionalChanges() {
            this.isHorizontal() || this.ticks.reverse();
          }, getLabelForIndex: function getLabelForIndex(t, e) {
            return +this.getRightValue(this.chart.data.datasets[e].data[t]);
          }, getPixelForValue: function getPixelForValue(t) {
            var e,
                a = this,
                i = a.start,
                n = +a.getRightValue(t),
                o = a.end - i;return a.isHorizontal() ? (e = a.left + a.width / o * (n - i), Math.round(e)) : (e = a.bottom - a.height / o * (n - i), Math.round(e));
          }, getValueForPixel: function getValueForPixel(t) {
            var e = this,
                a = e.isHorizontal(),
                i = a ? e.width : e.height,
                n = (a ? t - e.left : e.bottom - t) / i;return e.start + (e.end - e.start) * n;
          }, getPixelForTick: function getPixelForTick(t) {
            return this.getPixelForValue(this.ticksAsNumbers[t]);
          } });t.scaleService.registerScaleType("linear", i, a);
      };
    }, {}], 45: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers,
            a = e.noop;t.LinearScaleBase = t.Scale.extend({ handleTickRangeOptions: function handleTickRangeOptions() {
            var t = this,
                a = t.options,
                i = a.ticks;if (i.beginAtZero) {
              var n = e.sign(t.min),
                  o = e.sign(t.max);n < 0 && o < 0 ? t.max = 0 : n > 0 && o > 0 && (t.min = 0);
            }void 0 !== i.min ? t.min = i.min : void 0 !== i.suggestedMin && (t.min = Math.min(t.min, i.suggestedMin)), void 0 !== i.max ? t.max = i.max : void 0 !== i.suggestedMax && (t.max = Math.max(t.max, i.suggestedMax)), t.min === t.max && (t.max++, i.beginAtZero || t.min--);
          }, getTickLimit: a, handleDirectionalChanges: a, buildTicks: function buildTicks() {
            var a = this,
                i = a.options,
                n = i.ticks,
                o = a.getTickLimit();o = Math.max(2, o);var r = { maxTicks: o, min: n.min, max: n.max, stepSize: e.getValueOrDefault(n.fixedStepSize, n.stepSize) },
                s = a.ticks = t.Ticks.generators.linear(r, a);a.handleDirectionalChanges(), a.max = e.max(s), a.min = e.min(s), n.reverse ? (s.reverse(), a.start = a.max, a.end = a.min) : (a.start = a.min, a.end = a.max);
          }, convertTicksToLabels: function convertTicksToLabels() {
            var e = this;e.ticksAsNumbers = e.ticks.slice(), e.zeroLineIndex = e.ticks.indexOf(0), t.Scale.prototype.convertTicksToLabels.call(e);
          } });
      };
    }, {}], 46: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        var e = t.helpers,
            a = { position: "left", ticks: { callback: t.Ticks.formatters.logarithmic } },
            i = t.Scale.extend({ determineDataLimits: function determineDataLimits() {
            function t(t) {
              return u ? t.xAxisID === a.id : t.yAxisID === a.id;
            }var a = this,
                i = a.options,
                n = i.ticks,
                o = a.chart,
                r = o.data,
                s = r.datasets,
                l = e.getValueOrDefault,
                u = a.isHorizontal();a.min = null, a.max = null, a.minNotZero = null;var d = i.stacked;if (void 0 === d && e.each(s, function (e, a) {
              if (!d) {
                var i = o.getDatasetMeta(a);o.isDatasetVisible(a) && t(i) && void 0 !== i.stack && (d = !0);
              }
            }), i.stacked || d) {
              var c = {};e.each(s, function (n, r) {
                var s = o.getDatasetMeta(r),
                    l = [s.type, void 0 === i.stacked && void 0 === s.stack ? r : "", s.stack].join(".");o.isDatasetVisible(r) && t(s) && (void 0 === c[l] && (c[l] = []), e.each(n.data, function (t, e) {
                  var n = c[l],
                      o = +a.getRightValue(t);isNaN(o) || s.data[e].hidden || (n[e] = n[e] || 0, i.relativePoints ? n[e] = 100 : n[e] += o);
                }));
              }), e.each(c, function (t) {
                var i = e.min(t),
                    n = e.max(t);a.min = null === a.min ? i : Math.min(a.min, i), a.max = null === a.max ? n : Math.max(a.max, n);
              });
            } else e.each(s, function (i, n) {
              var r = o.getDatasetMeta(n);o.isDatasetVisible(n) && t(r) && e.each(i.data, function (t, e) {
                var i = +a.getRightValue(t);isNaN(i) || r.data[e].hidden || (null === a.min ? a.min = i : i < a.min && (a.min = i), null === a.max ? a.max = i : i > a.max && (a.max = i), 0 !== i && (null === a.minNotZero || i < a.minNotZero) && (a.minNotZero = i));
              });
            });a.min = l(n.min, a.min), a.max = l(n.max, a.max), a.min === a.max && (0 !== a.min && null !== a.min ? (a.min = Math.pow(10, Math.floor(e.log10(a.min)) - 1), a.max = Math.pow(10, Math.floor(e.log10(a.max)) + 1)) : (a.min = 1, a.max = 10));
          }, buildTicks: function buildTicks() {
            var a = this,
                i = a.options,
                n = i.ticks,
                o = { min: n.min, max: n.max },
                r = a.ticks = t.Ticks.generators.logarithmic(o, a);a.isHorizontal() || r.reverse(), a.max = e.max(r), a.min = e.min(r), n.reverse ? (r.reverse(), a.start = a.max, a.end = a.min) : (a.start = a.min, a.end = a.max);
          }, convertTicksToLabels: function convertTicksToLabels() {
            this.tickValues = this.ticks.slice(), t.Scale.prototype.convertTicksToLabels.call(this);
          }, getLabelForIndex: function getLabelForIndex(t, e) {
            return +this.getRightValue(this.chart.data.datasets[e].data[t]);
          }, getPixelForTick: function getPixelForTick(t) {
            return this.getPixelForValue(this.tickValues[t]);
          }, getPixelForValue: function getPixelForValue(t) {
            var a,
                i,
                n,
                o = this,
                r = o.start,
                s = +o.getRightValue(t),
                l = o.options,
                u = l.ticks;return o.isHorizontal() ? (n = e.log10(o.end) - e.log10(r), 0 === s ? i = o.left : (a = o.width, i = o.left + a / n * (e.log10(s) - e.log10(r)))) : (a = o.height, 0 !== r || u.reverse ? 0 === o.end && u.reverse ? (n = e.log10(o.start) - e.log10(o.minNotZero), i = s === o.end ? o.top : s === o.minNotZero ? o.top + .02 * a : o.top + .02 * a + .98 * a / n * (e.log10(s) - e.log10(o.minNotZero))) : (n = e.log10(o.end) - e.log10(r), a = o.height, i = o.bottom - a / n * (e.log10(s) - e.log10(r))) : (n = e.log10(o.end) - e.log10(o.minNotZero), i = s === r ? o.bottom : s === o.minNotZero ? o.bottom - .02 * a : o.bottom - .02 * a - .98 * a / n * (e.log10(s) - e.log10(o.minNotZero)))), i;
          }, getValueForPixel: function getValueForPixel(t) {
            var a,
                i,
                n = this,
                o = e.log10(n.end) - e.log10(n.start);return n.isHorizontal() ? (i = n.width, a = n.start * Math.pow(10, (t - n.left) * o / i)) : (i = n.height, a = Math.pow(10, (n.bottom - t) * o / i) / n.start), a;
          } });t.scaleService.registerScaleType("logarithmic", i, a);
      };
    }, {}], 47: [function (t, e, a) {
      "use strict";
      e.exports = function (t) {
        function e(t) {
          return t.options.lineArc ? 0 : t.chart.data.labels.length;
        }function a(t) {
          var e = t.options.pointLabels,
              a = f.getValueOrDefault(e.fontSize, g.defaultFontSize),
              i = f.getValueOrDefault(e.fontStyle, g.defaultFontStyle),
              n = f.getValueOrDefault(e.fontFamily, g.defaultFontFamily),
              o = f.fontString(a, i, n);return { size: a, style: i, family: n, font: o };
        }function i(t, e, a) {
          return f.isArray(a) ? { w: f.longestText(t, t.font, a), h: a.length * e + 1.5 * (a.length - 1) * e } : { w: t.measureText(a).width, h: e };
        }function n(t, e, a, i, n) {
          return t === i || t === n ? { start: e - a / 2, end: e + a / 2 } : t < i || t > n ? { start: e - a - 5, end: e } : { start: e, end: e + a + 5 };
        }function o(t) {
          var o,
              r,
              s,
              l = a(t),
              u = Math.min(t.height / 2, t.width / 2),
              d = { l: t.width, r: 0, t: t.height, b: 0 },
              c = {};t.ctx.font = l.font, t._pointLabelSizes = [];var h = e(t);for (o = 0; o < h; o++) {
            s = t.getPointPosition(o, u), r = i(t.ctx, l.size, t.pointLabels[o] || ""), t._pointLabelSizes[o] = r;var g = t.getIndexAngle(o),
                p = f.toDegrees(g) % 360,
                m = n(p, s.x, r.w, 0, 180),
                v = n(p, s.y, r.h, 90, 270);m.start < d.l && (d.l = m.start, c.l = g), m.end > d.r && (d.r = m.end, c.r = g), v.start < d.t && (d.t = v.start, c.t = g), v.end > d.b && (d.b = v.end, c.b = g);
          }t.setReductions(u, d, c);
        }function r(t) {
          var e = Math.min(t.height / 2, t.width / 2);t.drawingArea = Math.round(e), t.setCenterPoint(0, 0, 0, 0);
        }function s(t) {
          return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right";
        }function l(t, e, a, i) {
          if (f.isArray(e)) for (var n = a.y, o = 1.5 * i, r = 0; r < e.length; ++r) {
            t.fillText(e[r], a.x, n), n += o;
          } else t.fillText(e, a.x, a.y);
        }function u(t, e, a) {
          90 === t || 270 === t ? a.y -= e.h / 2 : (t > 270 || t < 90) && (a.y -= e.h);
        }function d(t) {
          var i = t.ctx,
              n = f.getValueOrDefault,
              o = t.options,
              r = o.angleLines,
              d = o.pointLabels;i.lineWidth = r.lineWidth, i.strokeStyle = r.color;var c = t.getDistanceFromCenterForValue(o.reverse ? t.min : t.max),
              h = a(t);i.textBaseline = "top";for (var p = e(t) - 1; p >= 0; p--) {
            if (r.display) {
              var m = t.getPointPosition(p, c);i.beginPath(), i.moveTo(t.xCenter, t.yCenter), i.lineTo(m.x, m.y), i.stroke(), i.closePath();
            }var v = t.getPointPosition(p, c + 5),
                b = n(d.fontColor, g.defaultFontColor);i.font = h.font, i.fillStyle = b;var x = t.getIndexAngle(p),
                y = f.toDegrees(x);i.textAlign = s(y), u(y, t._pointLabelSizes[p], v), l(i, t.pointLabels[p] || "", v, h.size);
          }
        }function c(t, a, i, n) {
          var o = t.ctx;if (o.strokeStyle = f.getValueAtIndexOrDefault(a.color, n - 1), o.lineWidth = f.getValueAtIndexOrDefault(a.lineWidth, n - 1), t.options.lineArc) o.beginPath(), o.arc(t.xCenter, t.yCenter, i, 0, 2 * Math.PI), o.closePath(), o.stroke();else {
            var r = e(t);if (0 === r) return;o.beginPath();var s = t.getPointPosition(0, i);o.moveTo(s.x, s.y);for (var l = 1; l < r; l++) {
              s = t.getPointPosition(l, i), o.lineTo(s.x, s.y);
            }o.closePath(), o.stroke();
          }
        }function h(t) {
          return f.isNumber(t) ? t : 0;
        }var f = t.helpers,
            g = t.defaults.global,
            p = { display: !0, animate: !0, lineArc: !1, position: "chartArea", angleLines: { display: !0, color: "rgba(0, 0, 0, 0.1)", lineWidth: 1 }, ticks: { showLabelBackdrop: !0, backdropColor: "rgba(255,255,255,0.75)", backdropPaddingY: 2, backdropPaddingX: 2, callback: t.Ticks.formatters.linear }, pointLabels: { fontSize: 10, callback: function callback(t) {
              return t;
            } } },
            m = t.LinearScaleBase.extend({ setDimensions: function setDimensions() {
            var t = this,
                e = t.options,
                a = e.ticks;t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), t.yCenter = Math.round(t.height / 2);var i = f.min([t.height, t.width]),
                n = f.getValueOrDefault(a.fontSize, g.defaultFontSize);t.drawingArea = e.display ? i / 2 - (n / 2 + a.backdropPaddingY) : i / 2;
          }, determineDataLimits: function determineDataLimits() {
            var t = this,
                e = t.chart,
                a = Number.POSITIVE_INFINITY,
                i = Number.NEGATIVE_INFINITY;f.each(e.data.datasets, function (n, o) {
              if (e.isDatasetVisible(o)) {
                var r = e.getDatasetMeta(o);f.each(n.data, function (e, n) {
                  var o = +t.getRightValue(e);isNaN(o) || r.data[n].hidden || (a = Math.min(o, a), i = Math.max(o, i));
                });
              }
            }), t.min = a === Number.POSITIVE_INFINITY ? 0 : a, t.max = i === Number.NEGATIVE_INFINITY ? 0 : i, t.handleTickRangeOptions();
          }, getTickLimit: function getTickLimit() {
            var t = this.options.ticks,
                e = f.getValueOrDefault(t.fontSize, g.defaultFontSize);return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * e)));
          }, convertTicksToLabels: function convertTicksToLabels() {
            var e = this;t.LinearScaleBase.prototype.convertTicksToLabels.call(e), e.pointLabels = e.chart.data.labels.map(e.options.pointLabels.callback, e);
          }, getLabelForIndex: function getLabelForIndex(t, e) {
            return +this.getRightValue(this.chart.data.datasets[e].data[t]);
          }, fit: function fit() {
            this.options.lineArc ? r(this) : o(this);
          }, setReductions: function setReductions(t, e, a) {
            var i = this,
                n = e.l / Math.sin(a.l),
                o = Math.max(e.r - i.width, 0) / Math.sin(a.r),
                r = -e.t / Math.cos(a.t),
                s = -Math.max(e.b - i.height, 0) / Math.cos(a.b);n = h(n), o = h(o), r = h(r), s = h(s), i.drawingArea = Math.min(Math.round(t - (n + o) / 2), Math.round(t - (r + s) / 2)), i.setCenterPoint(n, o, r, s);
          }, setCenterPoint: function setCenterPoint(t, e, a, i) {
            var n = this,
                o = n.width - e - n.drawingArea,
                r = t + n.drawingArea,
                s = a + n.drawingArea,
                l = n.height - i - n.drawingArea;n.xCenter = Math.round((r + o) / 2 + n.left), n.yCenter = Math.round((s + l) / 2 + n.top);
          }, getIndexAngle: function getIndexAngle(t) {
            var a = 2 * Math.PI / e(this),
                i = this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0,
                n = i * Math.PI * 2 / 360;return t * a + n;
          }, getDistanceFromCenterForValue: function getDistanceFromCenterForValue(t) {
            var e = this;if (null === t) return 0;var a = e.drawingArea / (e.max - e.min);return e.options.reverse ? (e.max - t) * a : (t - e.min) * a;
          }, getPointPosition: function getPointPosition(t, e) {
            var a = this,
                i = a.getIndexAngle(t) - Math.PI / 2;return { x: Math.round(Math.cos(i) * e) + a.xCenter, y: Math.round(Math.sin(i) * e) + a.yCenter };
          }, getPointPositionForValue: function getPointPositionForValue(t, e) {
            return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
          }, getBasePosition: function getBasePosition() {
            var t = this,
                e = t.min,
                a = t.max;return t.getPointPositionForValue(0, t.beginAtZero ? 0 : e < 0 && a < 0 ? a : e > 0 && a > 0 ? e : 0);
          }, draw: function draw() {
            var t = this,
                e = t.options,
                a = e.gridLines,
                i = e.ticks,
                n = f.getValueOrDefault;if (e.display) {
              var o = t.ctx,
                  r = n(i.fontSize, g.defaultFontSize),
                  s = n(i.fontStyle, g.defaultFontStyle),
                  l = n(i.fontFamily, g.defaultFontFamily),
                  u = f.fontString(r, s, l);f.each(t.ticks, function (s, l) {
                if (l > 0 || e.reverse) {
                  var d = t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]),
                      h = t.yCenter - d;if (a.display && 0 !== l && c(t, a, d, l), i.display) {
                    var f = n(i.fontColor, g.defaultFontColor);if (o.font = u, i.showLabelBackdrop) {
                      var p = o.measureText(s).width;o.fillStyle = i.backdropColor, o.fillRect(t.xCenter - p / 2 - i.backdropPaddingX, h - r / 2 - i.backdropPaddingY, p + 2 * i.backdropPaddingX, r + 2 * i.backdropPaddingY);
                    }o.textAlign = "center", o.textBaseline = "middle", o.fillStyle = f, o.fillText(s, t.xCenter, h);
                  }
                }
              }), e.lineArc || d(t);
            }
          } });t.scaleService.registerScaleType("radialLinear", m, p);
      };
    }, {}], 48: [function (t, e, a) {
      "use strict";
      var i = t(1);i = "function" == typeof i ? i : window.moment, e.exports = function (t) {
        var e = t.helpers,
            a = { units: [{ name: "millisecond", steps: [1, 2, 5, 10, 20, 50, 100, 250, 500] }, { name: "second", steps: [1, 2, 5, 10, 30] }, { name: "minute", steps: [1, 2, 5, 10, 30] }, { name: "hour", steps: [1, 2, 3, 6, 12] }, { name: "day", steps: [1, 2, 5] }, { name: "week", maxStep: 4 }, { name: "month", maxStep: 3 }, { name: "quarter", maxStep: 4 }, { name: "year", maxStep: !1 }] },
            n = { position: "bottom", time: { parser: !1, format: !1, unit: !1, round: !1, displayFormat: !1, isoWeekday: !1, minUnit: "millisecond", displayFormats: { millisecond: "h:mm:ss.SSS a", second: "h:mm:ss a", minute: "h:mm:ss a", hour: "MMM D, hA", day: "ll", week: "ll", month: "MMM YYYY", quarter: "[Q]Q - YYYY", year: "YYYY" } }, ticks: { autoSkip: !1 } },
            o = t.Scale.extend({ initialize: function initialize() {
            if (!i) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");t.Scale.prototype.initialize.call(this);
          }, getLabelMoment: function getLabelMoment(t, e) {
            return null === t || null === e ? null : "undefined" != typeof this.labelMoments[t] ? this.labelMoments[t][e] : null;
          }, getLabelDiff: function getLabelDiff(t, e) {
            var a = this;return null === t || null === e ? null : (void 0 === a.labelDiffs && a.buildLabelDiffs(), "undefined" != typeof a.labelDiffs[t] ? a.labelDiffs[t][e] : null);
          }, getMomentStartOf: function getMomentStartOf(t) {
            var e = this;return "week" === e.options.time.unit && e.options.time.isoWeekday !== !1 ? t.clone().startOf("isoWeek").isoWeekday(e.options.time.isoWeekday) : t.clone().startOf(e.tickUnit);
          }, determineDataLimits: function determineDataLimits() {
            var t = this;t.labelMoments = [];var a = [];t.chart.data.labels && t.chart.data.labels.length > 0 ? (e.each(t.chart.data.labels, function (e) {
              var i = t.parseTime(e);i.isValid() && (t.options.time.round && i.startOf(t.options.time.round), a.push(i));
            }, t), t.firstTick = i.min.call(t, a), t.lastTick = i.max.call(t, a)) : (t.firstTick = null, t.lastTick = null), e.each(t.chart.data.datasets, function (n, o) {
              var r = [],
                  s = t.chart.isDatasetVisible(o);"object" == _typeof(n.data[0]) && null !== n.data[0] ? e.each(n.data, function (e) {
                var a = t.parseTime(t.getRightValue(e));a.isValid() && (t.options.time.round && a.startOf(t.options.time.round), r.push(a), s && (t.firstTick = null !== t.firstTick ? i.min(t.firstTick, a) : a, t.lastTick = null !== t.lastTick ? i.max(t.lastTick, a) : a));
              }, t) : r = a, t.labelMoments.push(r);
            }, t), t.options.time.min && (t.firstTick = t.parseTime(t.options.time.min)), t.options.time.max && (t.lastTick = t.parseTime(t.options.time.max)), t.firstTick = (t.firstTick || i()).clone(), t.lastTick = (t.lastTick || i()).clone();
          }, buildLabelDiffs: function buildLabelDiffs() {
            var t = this;t.labelDiffs = [];var a = [];t.chart.data.labels && t.chart.data.labels.length > 0 && e.each(t.chart.data.labels, function (e) {
              var i = t.parseTime(e);i.isValid() && (t.options.time.round && i.startOf(t.options.time.round), a.push(i.diff(t.firstTick, t.tickUnit, !0)));
            }, t), e.each(t.chart.data.datasets, function (i) {
              var n = [];"object" == _typeof(i.data[0]) && null !== i.data[0] ? e.each(i.data, function (e) {
                var a = t.parseTime(t.getRightValue(e));a.isValid() && (t.options.time.round && a.startOf(t.options.time.round), n.push(a.diff(t.firstTick, t.tickUnit, !0)));
              }, t) : n = a, t.labelDiffs.push(n);
            }, t);
          }, buildTicks: function buildTicks() {
            var i = this;i.ctx.save();var n = e.getValueOrDefault(i.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                o = e.getValueOrDefault(i.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
                r = e.getValueOrDefault(i.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
                s = e.fontString(n, o, r);if (i.ctx.font = s, i.ticks = [], i.unitScale = 1, i.scaleSizeInUnits = 0, i.options.time.unit) i.tickUnit = i.options.time.unit || "day", i.displayFormat = i.options.time.displayFormats[i.tickUnit], i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0), i.unitScale = e.getValueOrDefault(i.options.time.unitStepSize, 1);else {
              var l = i.isHorizontal() ? i.width : i.height,
                  u = i.tickFormatFunction(i.firstTick, 0, []),
                  d = i.ctx.measureText(u).width,
                  c = Math.cos(e.toRadians(i.options.ticks.maxRotation)),
                  h = Math.sin(e.toRadians(i.options.ticks.maxRotation));d = d * c + n * h;var f = l / d;i.tickUnit = i.options.time.minUnit, i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0), i.displayFormat = i.options.time.displayFormats[i.tickUnit];for (var g = 0, p = a.units[g]; g < a.units.length;) {
                if (i.unitScale = 1, e.isArray(p.steps) && Math.ceil(i.scaleSizeInUnits / f) < e.max(p.steps)) {
                  for (var m = 0; m < p.steps.length; ++m) {
                    if (p.steps[m] >= Math.ceil(i.scaleSizeInUnits / f)) {
                      i.unitScale = e.getValueOrDefault(i.options.time.unitStepSize, p.steps[m]);break;
                    }
                  }break;
                }if (p.maxStep === !1 || Math.ceil(i.scaleSizeInUnits / f) < p.maxStep) {
                  i.unitScale = e.getValueOrDefault(i.options.time.unitStepSize, Math.ceil(i.scaleSizeInUnits / f));break;
                }++g, p = a.units[g], i.tickUnit = p.name;var v = i.firstTick.diff(i.getMomentStartOf(i.firstTick), i.tickUnit, !0),
                    b = i.getMomentStartOf(i.lastTick.clone().add(1, i.tickUnit)).diff(i.lastTick, i.tickUnit, !0);i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0) + v + b, i.displayFormat = i.options.time.displayFormats[p.name];
              }
            }var x;if (i.options.time.min ? x = i.getMomentStartOf(i.firstTick) : (i.firstTick = i.getMomentStartOf(i.firstTick), x = i.firstTick), !i.options.time.max) {
              var y = i.getMomentStartOf(i.lastTick),
                  k = y.diff(i.lastTick, i.tickUnit, !0);k < 0 ? i.lastTick = i.getMomentStartOf(i.lastTick.add(1, i.tickUnit)) : k >= 0 && (i.lastTick = y), i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0);
            }i.options.time.displayFormat && (i.displayFormat = i.options.time.displayFormat), i.ticks.push(i.firstTick.clone());for (var S = i.unitScale; S <= i.scaleSizeInUnits; S += i.unitScale) {
              var M = x.clone().add(S, i.tickUnit);if (i.options.time.max && M.diff(i.lastTick, i.tickUnit, !0) >= 0) break;i.ticks.push(M);
            }var w = i.ticks[i.ticks.length - 1].diff(i.lastTick, i.tickUnit);0 === w && 0 !== i.scaleSizeInUnits || (i.options.time.max ? (i.ticks.push(i.lastTick.clone()), i.scaleSizeInUnits = i.lastTick.diff(i.ticks[0], i.tickUnit, !0)) : (i.ticks.push(i.lastTick.clone()), i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0))), i.ctx.restore(), i.labelDiffs = void 0;
          }, getLabelForIndex: function getLabelForIndex(t, e) {
            var a = this,
                i = a.chart.data.labels && t < a.chart.data.labels.length ? a.chart.data.labels[t] : "",
                n = a.chart.data.datasets[e].data[t];return null !== n && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && (i = a.getRightValue(n)), a.options.time.tooltipFormat && (i = a.parseTime(i).format(a.options.time.tooltipFormat)), i;
          }, tickFormatFunction: function tickFormatFunction(t, a, i) {
            var n = t.format(this.displayFormat),
                o = this.options.ticks,
                r = e.getValueOrDefault(o.callback, o.userCallback);return r ? r(n, a, i) : n;
          }, convertTicksToLabels: function convertTicksToLabels() {
            var t = this;t.tickMoments = t.ticks, t.ticks = t.ticks.map(t.tickFormatFunction, t);
          }, getPixelForValue: function getPixelForValue(t, e, a) {
            var i = this,
                n = null;if (void 0 !== e && void 0 !== a && (n = i.getLabelDiff(a, e)), null === n && (t && t.isValid || (t = i.parseTime(i.getRightValue(t))), t && t.isValid && t.isValid() && (n = t.diff(i.firstTick, i.tickUnit, !0))), null !== n) {
              var o = 0 !== n ? n / i.scaleSizeInUnits : n;if (i.isHorizontal()) {
                var r = i.width * o;return i.left + Math.round(r);
              }var s = i.height * o;return i.top + Math.round(s);
            }
          }, getPixelForTick: function getPixelForTick(t) {
            return this.getPixelForValue(this.tickMoments[t], null, null);
          }, getValueForPixel: function getValueForPixel(t) {
            var e = this,
                a = e.isHorizontal() ? e.width : e.height,
                n = (t - (e.isHorizontal() ? e.left : e.top)) / a;return n *= e.scaleSizeInUnits, e.firstTick.clone().add(i.duration(n, e.tickUnit).asSeconds(), "seconds");
          }, parseTime: function parseTime(t) {
            var e = this;return "string" == typeof e.options.time.parser ? i(t, e.options.time.parser) : "function" == typeof e.options.time.parser ? e.options.time.parser(t) : "function" == typeof t.getMonth || "number" == typeof t ? i(t) : t.isValid && t.isValid() ? t : "string" != typeof e.options.time.format && e.options.time.format.call ? (console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"), e.options.time.format(t)) : i(t, e.options.time.format);
          } });t.scaleService.registerScaleType("time", o, n);
      };
    }, { 1: 1 }] }, {}, [7])(7);
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(18);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(38)
  , toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(41);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(11)
  , toObject  = __webpack_require__(9)
  , IObject   = __webpack_require__(46)
  , toLength  = __webpack_require__(8);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(11)
  , isObject   = __webpack_require__(4)
  , invoke     = __webpack_require__(52)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(7).f
  , create      = __webpack_require__(33)
  , redefineAll = __webpack_require__(36)
  , ctx         = __webpack_require__(25)
  , anInstance  = __webpack_require__(31)
  , defined     = __webpack_require__(19)
  , forOf       = __webpack_require__(41)
  , $iterDefine = __webpack_require__(71)
  , step        = __webpack_require__(100)
  , setSpecies  = __webpack_require__(37)
  , DESCRIPTORS = __webpack_require__(6)
  , fastKey     = __webpack_require__(28).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(45)
  , from    = __webpack_require__(91);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(36)
  , getWeak           = __webpack_require__(28).getWeak
  , anObject          = __webpack_require__(1)
  , isObject          = __webpack_require__(4)
  , anInstance        = __webpack_require__(31)
  , forOf             = __webpack_require__(41)
  , createArrayMethod = __webpack_require__(21)
  , $has              = __webpack_require__(10)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(63)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 101 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(35)
  , gOPS     = __webpack_require__(56)
  , pIE      = __webpack_require__(47)
  , toObject = __webpack_require__(9)
  , IObject  = __webpack_require__(46)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(1)
  , getKeys  = __webpack_require__(35);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15)
  , gOPN      = __webpack_require__(34).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(10)
  , toIObject    = __webpack_require__(15)
  , arrayIndexOf = __webpack_require__(48)(false)
  , IE_PROTO     = __webpack_require__(76)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(35)
  , toIObject = __webpack_require__(15)
  , isEnum    = __webpack_require__(47).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(34)
  , gOPS     = __webpack_require__(56)
  , anObject = __webpack_require__(1)
  , Reflect  = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat
  , $trim       = __webpack_require__(44).trim;

module.exports = 1 / $parseFloat(__webpack_require__(81) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt
  , $trim     = __webpack_require__(44).trim
  , ws        = __webpack_require__(81)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8)
  , repeat   = __webpack_require__(80)
  , defined  = __webpack_require__(19);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(94);

// 23.1 Map Objects
module.exports = __webpack_require__(49)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(6) && /./g.flags != 'g')__webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(51)
});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(94);

// 23.2 Set Objects
module.exports = __webpack_require__(49)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(21)(0)
  , redefine     = __webpack_require__(13)
  , meta         = __webpack_require__(28)
  , assign       = __webpack_require__(102)
  , weak         = __webpack_require__(96)
  , isObject     = __webpack_require__(4)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(49)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 117 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectManager = exports.ResultsManager = exports.DisplayManager = exports.CommentsManager = exports.CurrentManager = undefined;

__webpack_require__(87);

var _CommentsManager = __webpack_require__(120);

var _CurrentManager = __webpack_require__(119);

var _DisplayManager = __webpack_require__(122);

var _ResultsManager = __webpack_require__(123);

var _SelectManager = __webpack_require__(124);

__webpack_require__(127);

exports.CurrentManager = _CurrentManager.CurrentManager;
exports.CommentsManager = _CommentsManager.CommentsManager;
exports.DisplayManager = _DisplayManager.DisplayManager;
exports.ResultsManager = _ResultsManager.ResultsManager;
exports.SelectManager = _SelectManager.SelectManager;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CurrentManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _websocket_protocol = __webpack_require__(60);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurrentManager = exports.CurrentManager = function () {
    function CurrentManager(questionsContainer, commentButton, urls) {
        _classCallCheck(this, CurrentManager);

        this.questionsContainer = questionsContainer;
        this.urls = urls;
        this.connect();
        this._setUpCommentButton(commentButton);
        this.requestQuestions();
    }

    _createClass(CurrentManager, [{
        key: 'connect',
        value: function connect() {
            var _this = this;

            this.ws = new WebSocket((0, _websocket_protocol.getWSProtocol)() + '://' + window.location.host + window.location.pathname);
            this.ws.onmessage = function (message) {
                return _this._processMessage(message);
            };
            this.ws.onclose = function () {
                window.setTimeout(_this.connect, 5000);
            };
        }
    }, {
        key: '_processMessage',
        value: function _processMessage(message) {
            var data = JSON.parse(message.data);
            switch (data.type) {
                case 'update-questions':
                    this.requestQuestions();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'requestQuestions',
        value: function requestQuestions() {
            var xhr = new XMLHttpRequest();
            var that = this;
            xhr.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    that.refreshQuestions(this.responseText);
                }
            };

            xhr.open('GET', this.urls.active, true);
            xhr.send();
        }
    }, {
        key: 'refreshQuestions',
        value: function refreshQuestions(newQuestionsHtml) {
            this.questionsContainer.innerHTML = newQuestionsHtml;
            var forms = this.questionsContainer.getElementsByTagName('form');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = forms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var form = _step.value;

                    this._setUpQuestionForm(form);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: '_setUpQuestionForm',
        value: function _setUpQuestionForm(form) {
            var _this2 = this;

            if (form.classList.contains('question-rate')) {
                var input = document.getElementsByName('rating')[0];

                if (input.classList.contains("STARS")) {
                    var ul = document.createElement('ul');
                    form.insertBefore(ul, input.nextSibling);

                    rating(ul, input.min, input.max, function (rating) {
                        input.value = rating;
                    });

                    input.hidden = true;
                }
            }

            form.addEventListener('submit', CurrentManager._setUpSubmitXhr, true);

            var skipButton = form.getElementsByClassName('skip')[0];
            skipButton.addEventListener('click', function (e) {
                return _this2._setUpSkipXhr(e, form);
            }, true);
        }
    }, {
        key: '_setUpSkipXhr',
        value: function _setUpSkipXhr(event, form) {
            event.preventDefault();

            if (!window.confirm(gettext("Skip the question?"))) {
                return;
            }

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    form.remove();
                }
            };

            var splitUrl = form.action.split('/');
            var questionId = splitUrl[splitUrl.length - 1];

            xhr.open('GET', this.urls.skip + questionId);
            xhr.send();
        }
    }, {
        key: '_setUpCommentButton',
        value: function _setUpCommentButton(commentButton) {
            var _this3 = this;

            commentButton.addEventListener('click', function () {
                var comment = window.prompt(gettext("Please enter your comment."));
                if (comment !== null) {
                    var xhr = new XMLHttpRequest();

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status === 200 || xhr.status === 200) {
                                window.alert(gettext("Comment sent!"));
                            } else {
                                window.alert(gettext("Could not send comment, please try again."));
                            }
                        }
                    };

                    xhr.open('POST', _this3.urls.comment);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send('text=' + comment);
                }
            });
        }
    }], [{
        key: '_setUpSubmitXhr',
        value: function _setUpSubmitXhr(event) {
            event.preventDefault();

            var form = event.target;
            var data = new FormData(form);
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 201 || xhr.status === 200) {
                        form.remove();
                    } else {
                        window.alert(gettext("Could not submit your answer, please try again."));
                    }
                }
            };

            xhr.open(form.method, form.action);
            xhr.send(data);
        }
    }]);

    return CurrentManager;
}();

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentsManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Comment = __webpack_require__(59);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommentsManager = exports.CommentsManager = function () {
    function CommentsManager(commentsContainer) {
        _classCallCheck(this, CommentsManager);

        this.commentsContainer = commentsContainer;
    }

    _createClass(CommentsManager, [{
        key: 'add',
        value: function add(name, text) {
            var comment = new _Comment.Comment(name, text);
            this.commentsContainer.appendFirst(comment);
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            var cc = this.commentsContainer;
            while (cc.firstChild) {
                cc.removeChild(cc.firstChild);
            }
        }
    }]);

    return CommentsManager;
}();

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Display = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chartMin = __webpack_require__(88);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);


var BACKGROUND_COLORS = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'];

var BORDER_COLORS = ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'];

_chartMin.Chart.pluginService.register({
    beforeRender: function beforeRender(chart) {
        if (chart.config.options.showAllTooltips) {
            // create an array of tooltips
            // we can't use the chart tooltip because there is only one tooltip per chart
            chart.pluginTooltips = [];
            chart.config.data.datasets.forEach(function (dataset, i) {
                chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                    chart.pluginTooltips.push(new _chartMin.Chart.Tooltip({
                        _chart: chart.chart,
                        _chartInstance: chart,
                        _data: chart.data,
                        _options: chart.options.tooltips,
                        _active: [sector]
                    }, chart));
                });
            });

            // turn off normal tooltips
            chart.options.tooltips.enabled = false;
        }
    },
    afterDraw: function afterDraw(chart, easing) {
        if (chart.config.options.showAllTooltips) {
            // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
            if (!chart.allTooltipsOnce) {
                if (easing !== 1) return;
                chart.allTooltipsOnce = true;
            }

            // turn on tooltips
            chart.options.tooltips.enabled = true;
            _chartMin.Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                tooltip.initialize();
                tooltip.update();
                // we don't actually need this since we are not animating tooltips
                tooltip.pivot();
                tooltip.transition(easing).draw();
            });
            chart.options.tooltips.enabled = false;
        }
    }
});

var Display = exports.Display = function (_CustomElement2) {
    _inherits(Display, _CustomElement2);

    function Display(question) {
        _classCallCheck(this, Display);

        var _this = _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this));

        _this.question = question;
        return _this;
    }

    _createClass(Display, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.className = 'frame';
            this.innerHTML = '<div><canvas class="chart"></canvas></div>';
            // ChartJS pie charts do not display titles correctly
            if (this.question.type === 'UNIQ') {
                var title = document.createElement('h3');
                title.innerText = this.question.text;
                this.appendFirst(title);
            }

            this.mean = document.createElement('p');
            this.appendChild(this.mean);

            var ctx = this.querySelector('.chart');

            var chartData = {
                labels: this.question.choices,
                datasets: [{
                    label: this.question.text,
                    data: [].concat(_toConsumableArray(new Array(this.question.choices.length))),
                    backgroundColor: BACKGROUND_COLORS,
                    borderColor: BORDER_COLORS,
                    borderWidth: 1
                }]
            };

            var type = this.question.type === 'UNIQ' ? 'pie' : 'bar';

            var options = {
                tooltips: {
                    enabled: true,
                    callbacks: {
                        title: function title(tooltipItem, data) {
                            return null;
                        },

                        label: function label(tooltipItems, data) {
                            var points = data.datasets[tooltipItems.datasetIndex].data;
                            var value = type === 'pie' ? 100 * points[tooltipItems.index] / points.reduce(function (acc, v) {
                                return acc + v;
                            }) : points[tooltipItems.index];

                            return Math.round(value * 100) / 100 + (type === 'pie' ? " %" : "");
                        }

                    }
                },
                showAllTooltips: true,
                events: false,
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0
                }
            };

            if (type === 'bar') {
                options.scales = {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                };
            }

            this.chart = new _chartMin.Chart(ctx, {
                type: type,
                data: chartData,
                options: options
            });
        }
    }, {
        key: 'updateData',
        value: function updateData(data) {
            this.chart.data.datasets[0].data = data;
            this.chart.update();

            if (this.question.type === 'RATE') {
                var sum = 0;
                var n = 0;
                for (var i = 0; i < this.question.choices.length; i++) {
                    n += data[i];
                    sum += data[i] * this.question.choices[i];
                }

                var mean = Math.round(100 * sum / n) / 100;
                this.updateMean(mean);
            }
        }
    }, {
        key: 'updateMean',
        value: function updateMean(mean) {
            this.mean.textContent = gettext("Mean") + ': ' + mean;
        }
    }]);

    return Display;
}(_CustomElement);

window.customElements.define('results-display', Display);

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DisplayManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Display = __webpack_require__(121);

var _chartMin = __webpack_require__(88);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DisplayManager = exports.DisplayManager = function () {
    function DisplayManager(chartsContainer) {
        _classCallCheck(this, DisplayManager);

        this.chartsContainer = chartsContainer;
        this.displays = [];
        DisplayManager._initChartConfig();
    }

    _createClass(DisplayManager, [{
        key: 'updateQuestions',
        value: function updateQuestions(questions) {
            console.log("questions", questions);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = questions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var question = _step.value;

                    var display = this._getAssociatedDisplay(question);
                    if (!display) {
                        display = this.newQuestion(question);
                        display.updateData(question.results);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.displays[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _display = _step2.value;

                    var _question = _display.question;
                    if (questions.map(function (q) {
                        return q.id;
                    }).includes(_question.id)) {
                        continue;
                    }
                    this.remove(_display);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'updateQuestion',
        value: function updateQuestion(question, results) {
            var display = this._getAssociatedDisplay(question);
            if (!display) {
                display = this.newQuestion(question);
            }

            display.updateData(results);
        }
    }, {
        key: 'newQuestion',
        value: function newQuestion(question) {
            var display = new _Display.Display(question);
            this.displays.push(display);
            this.chartsContainer.appendChild(display);
            return display;
        }
    }, {
        key: 'remove',
        value: function remove(display) {
            if (display) {
                this.displays.splice(this.displays.indexOf(display), 1);

                display.remove();
            }
        }
    }, {
        key: '_getAssociatedDisplay',
        value: function _getAssociatedDisplay(question) {
            return this.displays.find(function (e) {
                return e.question.id === question.id;
            });
        }
    }], [{
        key: '_initChartConfig',
        value: function _initChartConfig() {
            _chartMin.Chart.defaults.global.defaultFontSize = 18;
        }
    }]);

    return DisplayManager;
}();

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResultsManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _websocket_protocol = __webpack_require__(60);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResultsManager = exports.ResultsManager = function () {
    function ResultsManager(displayManager, commentsManager, urls) {
        _classCallCheck(this, ResultsManager);

        this.displayManager = displayManager;
        this.commentsManager = commentsManager;
        this.urls = urls;
        this.connect();

        this.activeQuestions = [];
        this.getActiveQuestions();
    }

    _createClass(ResultsManager, [{
        key: 'connect',
        value: function connect() {
            var _this = this;

            this.ws = new WebSocket((0, _websocket_protocol.getWSProtocol)() + '://' + window.location.host + window.location.pathname);
            this.ws.onmessage = function (message) {
                return _this._processMessage(message);
            };
            this.ws.onclose = function () {
                window.setTimeout(_this.connect, 5000);
            };
        }
    }, {
        key: '_processMessage',
        value: function _processMessage(message) {
            var data = JSON.parse(message.data);

            switch (data.type) {
                case 'comment':
                    this.commentsManager.add(data.name, data.text);
                    break;
                case 'update-questions':
                    this.getActiveQuestions();
                    break;
                case 'update-results':
                    this.displayManager.updateQuestion(data.question, data.results);
                    break;
                case 'remove-question':
                    this.displayManager.remove(data.question);
                    break;
                case 'discard-all-comments':
                    this.commentsManager.removeAll();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'getActiveQuestions',
        value: function getActiveQuestions() {
            var _this2 = this;

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    var questions = JSON.parse(xhr.responseText).questions;
                    _this2.displayManager.updateQuestions(questions);
                }
            };

            xhr.open('GET', this.urls.active);
            xhr.send();
        }
    }]);

    return ResultsManager;
}();

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _websocket_protocol = __webpack_require__(60);

var _StagedComment = __webpack_require__(126);

var _SelectedComment = __webpack_require__(125);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectManager = exports.SelectManager = function () {
    function SelectManager(stagedCommentsContainer, selectedCommentsContainer, discardCommentsButton, urls) {
        var _this = this;

        _classCallCheck(this, SelectManager);

        this.stagedCommentsContainer = stagedCommentsContainer;
        this.selectedCommentsContainer = selectedCommentsContainer;
        this.urls = urls;
        this.connect();

        discardCommentsButton.addEventListener('click', function () {
            var stagedCC = _this.stagedCommentsContainer;
            while (stagedCC.firstChild) {
                stagedCC.removeChild(stagedCC.firstChild);
            }

            var selectedCC = _this.selectedCommentsContainer;
            while (selectedCC.firstChild) {
                selectedCC.removeChild(selectedCC.firstChild);
            }

            var xhr = new XMLHttpRequest();
            xhr.open('GET', _this.urls.discardAll);
            xhr.send();
        });
    }

    _createClass(SelectManager, [{
        key: 'connect',
        value: function connect() {
            var _this2 = this;

            this.ws = new WebSocket((0, _websocket_protocol.getWSProtocol)() + '://' + window.location.host + window.location.pathname);
            this.ws.onmessage = function (message) {
                return _this2._processMessage(message);
            };
            this.ws.onclose = function () {
                window.setTimeout(_this2.connect, 5000);
            };
        }
    }, {
        key: '_processMessage',
        value: function _processMessage(message) {
            var data = JSON.parse(message.data);
            switch (data.type) {
                case 'comment':
                    this.appendComment(data.author, data.name, data.text, data.age, data.gender);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'appendComment',
        value: function appendComment(author, name, text, age, gender) {
            var _this3 = this;

            var comment = new _StagedComment.StagedComment(name, text);
            this.stagedCommentsContainer.appendFirst(comment);
            var selectedCommentsContainer = this.selectedCommentsContainer;

            comment.validateButton.addEventListener('click', function () {
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (this.readyState === XMLHttpRequest.DONE) {
                        if (this.status === 200) {
                            comment.remove();
                            selectedCommentsContainer.appendFirst(new _SelectedComment.SelectedComment(name, text));
                        } else {
                            window.alert(gettext("Could not send comment, please try again."));
                        }
                    }
                };

                xhr.open('POST', _this3.urls.select);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send('author=' + author + '&name=' + name + '&text=' + text + '&age=' + age + '&gender=' + gender);
            });
        }
    }]);

    return SelectManager;
}();

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectedComment = undefined;

var _Comment2 = __webpack_require__(59);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectedComment = exports.SelectedComment = function (_Comment) {
    _inherits(SelectedComment, _Comment);

    function SelectedComment(name, text) {
        _classCallCheck(this, SelectedComment);

        return _possibleConstructorReturn(this, (SelectedComment.__proto__ || Object.getPrototypeOf(SelectedComment)).call(this, name, text));
    }

    return SelectedComment;
}(_Comment2.Comment);

window.customElements.define('validated-comment', SelectedComment);

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StagedComment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Comment2 = __webpack_require__(59);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StagedComment = exports.StagedComment = function (_Comment) {
    _inherits(StagedComment, _Comment);

    function StagedComment(name, text) {
        _classCallCheck(this, StagedComment);

        return _possibleConstructorReturn(this, (StagedComment.__proto__ || Object.getPrototypeOf(StagedComment)).call(this, name, text));
    }

    _createClass(StagedComment, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            var _this2 = this;

            _get(StagedComment.prototype.__proto__ || Object.getPrototypeOf(StagedComment.prototype), 'connectedCallback', this).call(this);

            this.validateButton = document.createElement('button');
            this.validateButton.textContent = gettext("Validate");
            this.validateButton.className = 'btn btn-success';

            this.appendChild(this.validateButton);

            var discardButton = document.createElement('button');
            discardButton.textContent = gettext("Discard");
            discardButton.className = 'btn btn-danger';

            discardButton.addEventListener('click', function () {
                return _this2.remove();
            });
            this.appendChild(discardButton);
        }
    }]);

    return StagedComment;
}(_Comment2.Comment);

window.customElements.define('select-comment', StagedComment);

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


HTMLElement.prototype.appendFirst = function (childNode) {
    if (this.firstChild) this.insertBefore(childNode, this.firstChild);else this.appendChild(childNode);
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(137);
module.exports = __webpack_require__(24).RegExp.escape;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , isArray  = __webpack_require__(69)
  , SPECIES  = __webpack_require__(5)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(129);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(23)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(35)
  , gOPS    = __webpack_require__(56)
  , pIE     = __webpack_require__(47);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(35)
  , toIObject = __webpack_require__(15);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(135)
  , invoke    = __webpack_require__(52)
  , aFunction = __webpack_require__(11);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0)
  , $re     = __webpack_require__(136)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(90)});

__webpack_require__(40)('copyWithin');

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $every  = __webpack_require__(21)(4);

$export($export.P + $export.F * !__webpack_require__(20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {fill: __webpack_require__(61)});

__webpack_require__(40)('fill');

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $filter = __webpack_require__(21)(2);

$export($export.P + $export.F * !__webpack_require__(20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(21)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(40)(KEY);

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(21)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(40)(KEY);

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(0)
  , $forEach = __webpack_require__(21)(0)
  , STRICT   = __webpack_require__(20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(25)
  , $export        = __webpack_require__(0)
  , toObject       = __webpack_require__(9)
  , call           = __webpack_require__(99)
  , isArrayIter    = __webpack_require__(68)
  , toLength       = __webpack_require__(8)
  , createProperty = __webpack_require__(62)
  , getIterFn      = __webpack_require__(85);

$export($export.S + $export.F * !__webpack_require__(54)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , $indexOf      = __webpack_require__(48)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', {isArray: __webpack_require__(69)});

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(15)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(46) != Object || !__webpack_require__(20)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , toIObject     = __webpack_require__(15)
  , toInteger     = __webpack_require__(30)
  , toLength      = __webpack_require__(8)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $map    = __webpack_require__(21)(1);

$export($export.P + $export.F * !__webpack_require__(20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(0)
  , createProperty = __webpack_require__(62);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(92);

$export($export.P + $export.F * !__webpack_require__(20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(92);

$export($export.P + $export.F * !__webpack_require__(20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(0)
  , html       = __webpack_require__(66)
  , cof        = __webpack_require__(18)
  , toIndex    = __webpack_require__(38)
  , toLength   = __webpack_require__(8)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $some   = __webpack_require__(21)(3);

$export($export.P + $export.F * !__webpack_require__(20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(11)
  , toObject  = __webpack_require__(9)
  , fails     = __webpack_require__(3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37)('Array');

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(0)
  , toObject    = __webpack_require__(9)
  , toPrimitive = __webpack_require__(23);

$export($export.P + $export.F * __webpack_require__(3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(131));

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(13)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', {bind: __webpack_require__(93)});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(4)
  , getPrototypeOf = __webpack_require__(17)
  , HAS_INSTANCE   = __webpack_require__(5)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(7).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7).f
  , createDesc = __webpack_require__(29)
  , has        = __webpack_require__(10)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0)
  , log1p   = __webpack_require__(101)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0)
  , sign    = __webpack_require__(73);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0)
  , $expm1  = __webpack_require__(72);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(0)
  , sign      = __webpack_require__(73)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {log1p: __webpack_require__(101)});

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {sign: __webpack_require__(73)});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(72)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(72)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , has               = __webpack_require__(10)
  , cof               = __webpack_require__(18)
  , inheritIfRequired = __webpack_require__(67)
  , toPrimitive       = __webpack_require__(23)
  , fails             = __webpack_require__(3)
  , gOPN              = __webpack_require__(34).f
  , gOPD              = __webpack_require__(16).f
  , dP                = __webpack_require__(7).f
  , $trim             = __webpack_require__(44).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(33)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(0)
  , _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {isInteger: __webpack_require__(98)});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(0)
  , isInteger = __webpack_require__(98)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(108);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(109);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , toInteger    = __webpack_require__(30)
  , aNumberValue = __webpack_require__(89)
  , repeat       = __webpack_require__(80)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $fails       = __webpack_require__(3)
  , aNumberValue = __webpack_require__(89)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(102)});

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(33)});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperties: __webpack_require__(103)});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(28).onFreeze;

__webpack_require__(22)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(15)
  , $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(22)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(22)('getOwnPropertyNames', function(){
  return __webpack_require__(104).f;
});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(9)
  , $getPrototypeOf = __webpack_require__(17);

__webpack_require__(22)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(22)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(22)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(22)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {is: __webpack_require__(110)});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9)
  , $keys    = __webpack_require__(35);

__webpack_require__(22)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(28).onFreeze;

__webpack_require__(22)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(28).onFreeze;

__webpack_require__(22)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(75).set});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(45)
  , test    = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(13)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(108);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(109);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(32)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(25)
  , classof            = __webpack_require__(45)
  , $export            = __webpack_require__(0)
  , isObject           = __webpack_require__(4)
  , aFunction          = __webpack_require__(11)
  , anInstance         = __webpack_require__(31)
  , forOf              = __webpack_require__(41)
  , speciesConstructor = __webpack_require__(77)
  , task               = __webpack_require__(82).set
  , microtask          = __webpack_require__(74)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(36)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(43)($Promise, PROMISE);
__webpack_require__(37)(PROMISE);
Wrapper = __webpack_require__(24)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(54)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(11)
  , anObject  = __webpack_require__(1)
  , rApply    = (__webpack_require__(2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(0)
  , create     = __webpack_require__(33)
  , aFunction  = __webpack_require__(11)
  , anObject   = __webpack_require__(1)
  , isObject   = __webpack_require__(4)
  , fails      = __webpack_require__(3)
  , bind       = __webpack_require__(93)
  , rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(7)
  , $export     = __webpack_require__(0)
  , anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(23);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(0)
  , gOPD     = __webpack_require__(16).f
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(70)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(16)
  , $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(0)
  , getProto = __webpack_require__(17)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(10)
  , $export        = __webpack_require__(0)
  , isObject       = __webpack_require__(4)
  , anObject       = __webpack_require__(1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(0)
  , anObject      = __webpack_require__(1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(107)});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(0)
  , anObject           = __webpack_require__(1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(0)
  , setProto = __webpack_require__(75);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(7)
  , gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(10)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(29)
  , anObject       = __webpack_require__(1)
  , isObject       = __webpack_require__(4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(2)
  , inheritIfRequired = __webpack_require__(67)
  , dP                = __webpack_require__(7).f
  , gOPN              = __webpack_require__(34).f
  , isRegExp          = __webpack_require__(53)
  , $flags            = __webpack_require__(51)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function(){
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(37)('RegExp');

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(50)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(50)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(50)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(50)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(53)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(114);
var anObject    = __webpack_require__(1)
  , $flags      = __webpack_require__(51)
  , DESCRIPTORS = __webpack_require__(6)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(14)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(14)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(14)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(14)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(78)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(8)
  , context   = __webpack_require__(79)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(65)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(14)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(14)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(14)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(38)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(79)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(65)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(14)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(71)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(14)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(15)
  , toLength  = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(80)
});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(14)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(8)
  , context     = __webpack_require__(79)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(65)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(14)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(14)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(14)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(44)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(10)
  , DESCRIPTORS    = __webpack_require__(6)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(13)
  , META           = __webpack_require__(28).KEY
  , $fails         = __webpack_require__(3)
  , shared         = __webpack_require__(57)
  , setToStringTag = __webpack_require__(43)
  , uid            = __webpack_require__(39)
  , wks            = __webpack_require__(5)
  , wksExt         = __webpack_require__(112)
  , wksDefine      = __webpack_require__(84)
  , keyOf          = __webpack_require__(133)
  , enumKeys       = __webpack_require__(132)
  , isArray        = __webpack_require__(69)
  , anObject       = __webpack_require__(1)
  , toIObject      = __webpack_require__(15)
  , toPrimitive    = __webpack_require__(23)
  , createDesc     = __webpack_require__(29)
  , _create        = __webpack_require__(33)
  , gOPNExt        = __webpack_require__(104)
  , $GOPD          = __webpack_require__(16)
  , $DP            = __webpack_require__(7)
  , $keys          = __webpack_require__(35)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(34).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(47).f  = $propertyIsEnumerable;
  __webpack_require__(56).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(32)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $typed       = __webpack_require__(58)
  , buffer       = __webpack_require__(83)
  , anObject     = __webpack_require__(1)
  , toIndex      = __webpack_require__(38)
  , toLength     = __webpack_require__(8)
  , isObject     = __webpack_require__(4)
  , ArrayBuffer  = __webpack_require__(2).ArrayBuffer
  , speciesConstructor = __webpack_require__(77)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(37)(ARRAY_BUFFER);

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(58).ABV, {
  DataView: __webpack_require__(83).DataView
});

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(96);

// 23.4 WeakSet Objects
__webpack_require__(49)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(0)
  , $includes = __webpack_require__(48)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(40)('includes');

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(0)
  , microtask = __webpack_require__(74)()
  , process   = __webpack_require__(2).process
  , isNode    = __webpack_require__(18)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0)
  , cof     = __webpack_require__(18);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(95)('Map')});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(11)
  , $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(55), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(11)
  , $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(55), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(0)
  , $entries = __webpack_require__(106)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(0)
  , ownKeys        = __webpack_require__(107)
  , toIObject      = __webpack_require__(15)
  , gOPD           = __webpack_require__(16)
  , createProperty = __webpack_require__(62);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(23)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(55), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(23)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(55), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0)
  , $values = __webpack_require__(106)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(0)
  , global      = __webpack_require__(2)
  , core        = __webpack_require__(24)
  , microtask   = __webpack_require__(74)()
  , OBSERVABLE  = __webpack_require__(5)('observable')
  , aFunction   = __webpack_require__(11)
  , anObject    = __webpack_require__(1)
  , anInstance  = __webpack_require__(31)
  , redefineAll = __webpack_require__(36)
  , hide        = __webpack_require__(12)
  , forOf       = __webpack_require__(41)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(37)('Observable');

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(26)
  , anObject                  = __webpack_require__(1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(26)
  , anObject               = __webpack_require__(1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(115)
  , from                    = __webpack_require__(91)
  , metadata                = __webpack_require__(26)
  , anObject                = __webpack_require__(1)
  , getPrototypeOf          = __webpack_require__(17)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(26)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(26)
  , anObject                = __webpack_require__(1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(26)
  , anObject               = __webpack_require__(1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(26)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(26)
  , anObject               = __webpack_require__(1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(26)
  , anObject                  = __webpack_require__(1)
  , aFunction                 = __webpack_require__(11)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(95)('Set')});

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(78)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(19)
  , toLength    = __webpack_require__(8)
  , isRegExp    = __webpack_require__(53)
  , getFlags    = __webpack_require__(51)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(70)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(111);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(111);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(44)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(44)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84)('asyncIterator');

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84)('observable');

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', {global: __webpack_require__(2)});

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(86)
  , redefine      = __webpack_require__(13)
  , global        = __webpack_require__(2)
  , hide          = __webpack_require__(12)
  , Iterators     = __webpack_require__(42)
  , wks           = __webpack_require__(5)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , $task   = __webpack_require__(82);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(2)
  , $export    = __webpack_require__(0)
  , invoke     = __webpack_require__(52)
  , partial    = __webpack_require__(134)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(257);
__webpack_require__(196);
__webpack_require__(198);
__webpack_require__(197);
__webpack_require__(200);
__webpack_require__(202);
__webpack_require__(207);
__webpack_require__(201);
__webpack_require__(199);
__webpack_require__(209);
__webpack_require__(208);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(203);
__webpack_require__(195);
__webpack_require__(206);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(163);
__webpack_require__(165);
__webpack_require__(164);
__webpack_require__(213);
__webpack_require__(212);
__webpack_require__(183);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(244);
__webpack_require__(249);
__webpack_require__(256);
__webpack_require__(247);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(245);
__webpack_require__(250);
__webpack_require__(252);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(246);
__webpack_require__(248);
__webpack_require__(251);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(158);
__webpack_require__(160);
__webpack_require__(159);
__webpack_require__(162);
__webpack_require__(161);
__webpack_require__(147);
__webpack_require__(145);
__webpack_require__(151);
__webpack_require__(148);
__webpack_require__(154);
__webpack_require__(156);
__webpack_require__(144);
__webpack_require__(150);
__webpack_require__(141);
__webpack_require__(155);
__webpack_require__(139);
__webpack_require__(153);
__webpack_require__(152);
__webpack_require__(146);
__webpack_require__(149);
__webpack_require__(138);
__webpack_require__(140);
__webpack_require__(143);
__webpack_require__(142);
__webpack_require__(157);
__webpack_require__(86);
__webpack_require__(229);
__webpack_require__(234);
__webpack_require__(114);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(214);
__webpack_require__(113);
__webpack_require__(115);
__webpack_require__(116);
__webpack_require__(269);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(264);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(262);
__webpack_require__(265);
__webpack_require__(263);
__webpack_require__(266);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(222);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(228);
__webpack_require__(227);
__webpack_require__(270);
__webpack_require__(296);
__webpack_require__(299);
__webpack_require__(298);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(297);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(281);
__webpack_require__(284);
__webpack_require__(280);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(273);
__webpack_require__(295);
__webpack_require__(304);
__webpack_require__(272);
__webpack_require__(274);
__webpack_require__(276);
__webpack_require__(275);
__webpack_require__(277);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(289);
__webpack_require__(288);
__webpack_require__(291);
__webpack_require__(290);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(271);
__webpack_require__(285);
__webpack_require__(307);
__webpack_require__(306);
__webpack_require__(305);
module.exports = __webpack_require__(24);

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(117)))

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(118);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map