// create stopwatch class
class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    };
  }
  // method: reset counters
  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }
  // method: format the timer display according to the template 00:00:00 /m:s:ms
  format() {
    let minutes = this.state.times.minutes;
    let seconds = this.state.times.seconds;
    let miliseconds = this.state.times.miliseconds;
    return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
  }

  // method: start if it is not running and count (step)
  start() {
    if (!this.state.running) {
      this.state.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  // method: step - triggers calculate and print if the stopwatch is running
  step() {
    if (!this.state.running) return;
    this.calculate();
    // this.print();
  }

  // method: calculate time to m/s/ms adding each time 1 ms
  calculate() {
    this.setState({
      times: Object.assign(this.state.times, {
        miliseconds: this.state.times.miliseconds + 1
      })
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
  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  }

  // method: reset watch display count
  resetWatch() {
    this.stop();
    this.reset();
  }

  // method: add a result
  addResult() {
    let newResult = this.format();
    console.log(newResult);
    console.log(this.state.results);

    this.setState({
      results: [...this.state.results, newResult]
    });
  }
  // method: clear results list
  resetResults() {
    this.setState({
      results: []
    });
    console.log(this.state.results);
  }
  // render the app
  render() {
    return (
      <div className={"container"}>
        <nav className={"controls"}>
          <a
            href={"#"}
            className={"button"}
            id={"start"}
            onClick={() => this.start()}
          >
            Start
          </a>
          <a
            href={"#"}
            className={"button"}
            id={"stop"}
            onClick={() => {
              this.stop();
            }}
          >
            Stop
          </a>
          <a
            href={"#"}
            className={"button"}
            id={"reset"}
            onClick={() => this.resetWatch()}
          >
            Reset
          </a>
          <a
            href={"#"}
            className={"button"}
            id={"add-result"}
            onClick={() => this.addResult()}
          >
            Add result
          </a>
          <a
            href={"#"}
            className={"button"}
            id={"reset-results"}
            onClick={() => this.resetResults()}
          >
            Reset results
          </a>
        </nav>
        <Display display={this.format()} />

        <Results results={this.state.results} />
      </div>
    );
  }
}
// ----------------------- Stopwatch Class end ----------------------------------

// Display class
class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={"stopWatch"}>{this.props.display}</div>;
  }
}
Display.propTypes = {
  display: React.PropTypes.string.isRequired
};
// ----------------------- Display Class end ----------------------------------

// Results class
class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.results.length > 0 ? (
      <ul className={"results"}>
        {this.props.results.map(function(resultElement, index) {
          return <li key={index}>{resultElement}</li>;
        })}
      </ul>
    ) : (
      <div>No results added yet</div>
    );
  }
}
Results.propTypes = {
  results: React.PropTypes.array.isRequired
};
// ----------------------- Results Class end ----------------------------------

//function formatting the numbers : add 0 in the front of the number if the value has less than 2 digits
function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

// React DOM render
const element = <StopWatch />;
ReactDOM.render(element, document.getElementById("app"));
