(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Main = (function () {
  function Main() {
    _classCallCheck(this, Main);
  }

  _createClass(Main, [{
    key: 'beep',
    value: function beep() {
      console.log('beep');
      console.log('beepbeep');
    }
  }]);

  return Main;
})();

exports['default'] = Main;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _utilsConst = require('./utils/Const');

var _utilsConst2 = _interopRequireDefault(_utilsConst);

var app = new _Main2['default']();

app.beep();

// var test = 'coucou';
// console.log(test);

},{"./Main":1,"./utils/Const":3}],3:[function(require,module,exports){
'use strict';

// all constants
var Const = {

	//Place your constants here

};

module.exports = Const;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvQXBwbGljYXRpb25zL01BTVAvaHRkb2NzL3BvcnRmb2xpby1jbGVtZW5jZS93ZWJzaXRlL2FwcC9zY3JpcHRzL01haW4uanMiLCIvQXBwbGljYXRpb25zL01BTVAvaHRkb2NzL3BvcnRmb2xpby1jbGVtZW5jZS93ZWJzaXRlL2FwcC9zY3JpcHRzL2FwcC5qcyIsIi9BcHBsaWNhdGlvbnMvTUFNUC9odGRvY3MvcG9ydGZvbGlvLWNsZW1lbmNlL3dlYnNpdGUvYXBwL3NjcmlwdHMvdXRpbHMvQ29uc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQXFCLElBQUk7QUFDWixXQURRLElBQUksR0FDVDswQkFESyxJQUFJO0dBR3RCOztlQUhrQixJQUFJOztXQUtuQixnQkFBRztBQUNILGFBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMzQjs7O1NBUmtCLElBQUk7OztxQkFBSixJQUFJOzs7Ozs7OztvQkNBVCxRQUFROzs7OzBCQUNOLGVBQWU7Ozs7QUFFakMsSUFBSSxHQUFHLEdBQUcsdUJBQVMsQ0FBQzs7QUFFcEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7QUNMWCxZQUFZLENBQUM7OztBQUdiLElBQUksS0FBSyxHQUFHOzs7O0NBSVgsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIHtcbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIGJlZXAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnYmVlcCcpO1xuICAgICAgY29uc29sZS5sb2coJ2JlZXBiZWVwJyk7XG4gIH1cbn1cbiIsImltcG9ydCBBcHAgZnJvbSAnLi9NYWluJztcbmltcG9ydCBDb25zdCBmcm9tICcuL3V0aWxzL0NvbnN0JztcblxubGV0IGFwcCA9IG5ldyBBcHAoKTtcblxuYXBwLmJlZXAoKTtcblxuLy8gdmFyIHRlc3QgPSAnY291Y291Jztcbi8vIGNvbnNvbGUubG9nKHRlc3QpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBhbGwgY29uc3RhbnRzXG52YXIgQ29uc3QgPSB7XG5cblx0Ly9QbGFjZSB5b3VyIGNvbnN0YW50cyBoZXJlXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29uc3Q7XG4iXX0=
