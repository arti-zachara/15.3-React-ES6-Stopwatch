"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// create stopwatch class
var StopWatch = function (_React$Component) {
  _inherits(StopWatch, _React$Component);

  function StopWatch(props) {
    _classCallCheck(this, StopWatch);

    var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

    _this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    };
    return _this;
  }

  // method: reset counters


  _createClass(StopWatch, [{
    key: "reset",
    value: function reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }

    // method: format the timer display according to the template 00:00:00 /m:s:ms

  }, {
    key: "format",
    value: function format() {
      var minutes = this.state.times.minutes;
      var seconds = this.state.times.seconds;
      var miliseconds = this.state.times.miliseconds;

      return this.pad0(minutes) + ":" + this.pad0(seconds) + ":" + this.pad0(Math.floor(miliseconds));
    }

    //method: formatting the numbers : add 0 in the front of the number if the value has less than 2 digits

  }, {
    key: "pad0",
    value: function pad0(value) {
      var result = value.toString();
      if (result.length < 2) {
        result = "0" + result;
      }
      return result;
    }

    // method: start if it is not running and count (step)

  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.state.running = true;
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }

    // method: step - triggers calculate and print if the stopwatch is running

  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
      // this.print();
    }

    // method: calculate time to m/s/ms adding each time 1 ms

  }, {
    key: "calculate",
    value: function calculate() {
      this.setState({
        times: { miliseconds: this.state.times.miliseconds + 1 }
      });

      if (this.state.times.miliseconds >= 100) {
        this.setState({
          times: {
            minutes: this.state.times.minutes,
            seconds: this.state.times.seconds + 1,
            miliseconds: 0
          }
        });
      }
      if (this.state.times.seconds >= 60) {
        this.setState({
          times: {
            minutes: this.state.times.minutes + 1,
            seconds: 0,
            miliseconds: this.state.times.miliseconds
          }
        });
      }
    }
    // method: stop - stops the count and clears interval

  }, {
    key: "stop",
    value: function stop() {
      this.setState({
        running: false
      });
      clearInterval(this.watch);
    }

    // method: reset watch display count

  }, {
    key: "resetWatch",
    value: function resetWatch() {
      this.stop();
      this.reset();
    }

    // method: add a result

  }, {
    key: "addResult",
    value: function addResult() {
      var newResult = this.format();
      this.setState({
        results: [].concat(_toConsumableArray(this.state.results), [newResult])
      });
    }
    // method: clear results list

  }, {
    key: "resetResults",
    value: function resetResults() {
      this.setState({
        results: []
      });
    }
    // render the app

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "nav",
          { className: "controls" },
          React.createElement(
            "a",
            {
              href: "#",
              className: "button",
              id: "start",
              onClick: function onClick() {
                return _this3.start();
              }
            },
            "Start"
          ),
          React.createElement(
            "a",
            {
              href: "#",
              className: "button",
              id: "stop",
              onClick: function onClick() {
                _this3.stop();
              }
            },
            "Stop"
          ),
          React.createElement(
            "a",
            {
              href: "#",
              className: "button",
              id: "reset",
              onClick: function onClick() {
                return _this3.resetWatch();
              }
            },
            "Reset"
          ),
          React.createElement(
            "a",
            {
              href: "#",
              className: "button",
              id: "add-result",
              onClick: function onClick() {
                return _this3.addResult();
              }
            },
            "Add result"
          ),
          React.createElement(
            "a",
            {
              href: "#",
              className: "button",
              id: "reset-results",
              onClick: function onClick() {
                return _this3.resetResults();
              }
            },
            "Reset results"
          )
        ),
        React.createElement(Display, { display: this.format() }),
        React.createElement(Results, { results: this.state.results })
      );
    }
  }]);

  return StopWatch;
}(React.Component);
// ----------------------- Stopwatch Class end ----------------------------------

// Display class


var Display = function (_React$Component2) {
  _inherits(Display, _React$Component2);

  function Display(props) {
    _classCallCheck(this, Display);

    return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
  }

  _createClass(Display, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "stopWatch" },
        this.props.display
      );
    }
  }]);

  return Display;
}(React.Component);

Display.propTypes = {
  display: React.PropTypes.string.isRequired
};
// ----------------------- Display Class end ----------------------------------

// Results class

var Results = function (_React$Component3) {
  _inherits(Results, _React$Component3);

  function Results(props) {
    _classCallCheck(this, Results);

    return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));
  }

  _createClass(Results, [{
    key: "render",
    value: function render() {
      return this.props.results === [] ? React.createElement(
        "ul",
        { className: "results" },
        this.props.results.forEach(function (resultElement) {
          React.createElement(
            "li",
            null,
            resultElement
          );
        })
      ) : React.createElement(
        "div",
        null,
        "No results added yet"
      );
    }
  }]);

  return Results;
}(React.Component);

Results.propTypes = {
  results: React.PropTypes.array.isRequired
};
// ----------------------- Results Class end ----------------------------------

// React DOM render
var element = React.createElement(StopWatch, null);
ReactDOM.render(element, document.getElementById("app"));
