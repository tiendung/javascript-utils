/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 *
 * Refactored by Nguyen Tien Dung ( http://free-and-happy.blogspot.com )
 */

window.shortcut = (function () {

  var defaultOptions = {
    type      : 'keydown',
    propagate : false,
    disable   : 'input textarea',
    target    : document,
    keycode   : false
  };

  // Work around for Shift key bug created by using lowercase
  // as a result the shift+num combinationnation was broken
  var shiftNums = {
    '`':'~',    '1':'!',    '2':'@',    '3':'#',  
    '4':'$',    '5':'%',    '6':'^',    '7':'&',    '8':'*',  
    '9':'(',    '0':')',    '-':'_',    '=':'+',    ';':':',  
    "'":'"',    ',':'<',    '.':'>',    '/':'?',   '\\':'|'
  };
	
  // Special Keys and their codes
  var specialKeys = {
    'escape'  :27,	'space'	:32,
    'return'  :13,	'enter'	:13,
    'pause'   :19,	'break'	:19,
    'insert'  :45,	'home'	:36, 
    'delete'  :46,  'end'   :35,

    'backspace'  :8,    'esc'         :27,    'tab'    :9,
    'scrolllock' :145,  'scroll_lock' :145,   'scroll' :145,
    'capslock'   :20,   'caps_lock'   :20,    'caps'   :20, 
    'numlock'    :144,  'num_lock'    :144,   'num'    :144,
    'pageup'     :33,   'page_up'     :33,    'pu'     :33,
    'pagedown'   :34,   'page_down'   :34,    'pd'     :34,

    'left':37,   'up':38,   'right':39,   'down':40,
    'f1':112,    'f2':113,   'f3' :114,    'f4' :115, 
    'f5':116,    'f6':117,   'f7' :118,    'f8' :119, 
    'f9':120,   'f10':121,   'f11':122,   'f12' :123
  };

  var modifierMapping = {
    ctrl   :'ctrl',     control :'ctrl',
    shift  :'shift',    alt     :'alt',
    option :'alt',      meta    :'meta'
  };
  
  var bindings = {};

  function triggeredInDisableTags(event, disableTags) {
    if (typeof disableTags !== 'string') return false; 

    var element = event.target || event.srcElement;
    if (element.nodeType === 3)
      element = element.parentNode;

    return (disableTags.toLowerCase().indexOf(element.tagName.toLowerCase()) >= 0) ? true : false;
  }
	
	
  function matching(combination, options, e) {
    var i, key, modifier;
    var want = {};
    var keys = combination.split('+');

    //Find Which key is pressed
    var code = e.keyCode || e.which;
    var char = { 188: ',', 190: '.' }[code] || String.fromCharCode(code).toLowerCase();

    var count = 0;
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      modifier = modifierMapping[key];

      if (modifier) {
        want[modifier] = true;
        count++;
      } 
      else 
      if ( (key.length > 1 && specialKeys[key] === code) ||
           (options.keycode === code) || (char === key) || 
           (e.shiftKey && shiftNums[char] === key) ) 
        count++; 
    } // End for (..)
		
    return (
      keys.length  === count &&
      !!want.shift === !!e.shiftKey &&
      !!want.ctrl  === !!e.ctrlKey &&
      !!want.alt   === !!e.altKey &&
      !!want.meta  === !!e.metaKey
    );
  }

  // Return the function to be called at keypress
  function makeKeypressedFun( combination, callback, options ) {
    return function( e ) {
      e = e || window.event;

      if ( triggeredInDisableTags(e, options.disable) || 
				   !matching(combination, options, e) ) return;

      callback(e);
      if( !options.propagate ) {
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
      }
    };
  }

	
return /*shotcut*/ {
  add: function(combination, callback, options) {
    options = options || {};

    for (var name in defaultOptions)
      if (!options.hasOwnProperty(name))
        options[name] = defaultOptions[name];
		
    var ele = options.target;

    if(typeof ele === 'string')
      ele = document.getElementById(ele);

    var func = makeKeypressedFun( combination, callback, options );
		
    bindings[combination.toLowerCase()] = {
      'callback' : func,
      'target'	 : ele,
      'event'    : options.type
    };

    //Attach the function with the event
    if (ele.addEventListener)
        ele.addEventListener(options.type, func, false); 
    else 
    if (ele.attachEvent)
        ele.attachEvent('on' + options.type, func); 
    else
      ele['on' + options.type] = func; 
  },

  //Remove the shortcut - just specify the shortcut and I will remove the binding
  remove: function(combination) {
    combination = combination.toLowerCase();
    var binding = bindings[combination];

    delete bindings[combination];

    if( !binding ) return;
		
    var type = binding.event;
    var ele = binding.target;
    var callback = binding.callback;

    if (ele.detachEvent)
        ele.detachEvent('on'+type, callback);
    else 
    if (ele.removeEventListener)
        ele.removeEventListener(type, callback, false);
    else
      ele['on'+type] = false;
  }	
};
})();