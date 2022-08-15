import logo from './logo.svg';
import './App.scss';
import React from 'react';


let dataInput = '';
let dataOut = '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      previusValue: '',
      displayOut: '',
      isDone: false
    };

    this.initialValues = this.initialValues.bind(this);
    this.handledAddNumber = this.handledAddNumber.bind(this);
    this.handledAddOperator = this.handledAddOperator.bind(this);
    this.handledResult = this.handledResult.bind(this);
    this.handledAddDecimal = this.handledAddDecimal.bind(this);
  }

  messageWarning() {
    this.setState({
      currentValue: 'Digit Limit Met'
    })
    setTimeout(() => this.setState({ currentValue: dataInput }), 500);
  }

  handledResult() {
    let expression = dataOut;
    if (1) {
      let dataResult = eval(expression);
      this.setState({
        currentValue: dataResult,
        displayOut: expression + "=" + dataResult,
        isDone: true
      })
    }

  }

  handledAddDecimal(event) {
    console.log(this.state.currentValue);
    if (!this.state.currentValue.includes(".")) {
      dataInput = this.state.currentValue += event.target.value;
      this.setState({
        currentValue: dataInput,
        displayOut: dataOut += event.target.value
      });
    }
  }

  handledAddOperator(event) {
    var disOut = this.state.displayOut;
    var lastLetter;
    var flag = false;
    if (lastLetter == undefined) {
      lastLetter = event.target.value;
    }

    if (this.state.currentValue !== event.target.value) {
      if (dataInput.length == 0) {
        dataInput = event.target.value;
        this.setState({
          currentValue: event.target.value,
          displayOut: dataOut += event.target.value
        });
      } else {
        if (this.state.isDone) {
          dataOut = this.state.currentValue;
          this.setState({
            displayOut: this.state.currentValue,
            isDone: false
          });
        }
        console.log(lastLetter)
        console.log(lastLetter.includes('+'));
        console.log(lastLetter.includes('/'));
        console.log(lastLetter.includes('*'));
        console.log((lastLetter.includes('+') || lastLetter.includes('/') || lastLetter.includes('*') || flag))
        if (1){//(!(lastLetter.includes('+') || lastLetter.includes('/') || lastLetter.includes('*') || flag)) {
          dataOut += event.target.value;
          dataInput = '';
          flag = true;
          this.setState({
            currentValue: event.target.value,
            previusValue: this.state.currentValue,
            displayOut: event.target.value,
          });
        } 
      }
      lastLetter = disOut[disOut.length - 1];
    }

  }

  handledAddNumber(event) {
    if (dataInput.length >= 12) {
      this.messageWarning();
    } else {
      console.log(this.state.displayOut.length);
      if (this.state.currentValue === '0' && this.state.previusValue === '' && event.target.value != '0') {
        console.log('fisrt');
        dataInput += event.target.value;
        this.setState({
          currentValue: event.target.value,
          displayOut: dataOut += event.target.value
        });

      } else if (this.state.displayOut.length >= 1) {
        if (this.state.isDone) {
          this.initialValues();
        }
        dataInput += event.target.value;
        dataOut += event.target.value;
        this.setState({
          previusValue: this.state.currentValue,
          currentValue: dataInput,
          displayOut: dataOut
        })

      }



    }



  }

  initialValues() {
    dataInput = '';
    dataOut = '';

    this.setState({
      currentValue: '0',
      previusValue: '',
      displayOut: '',
      isDone: false
    })
  }

  render() {
    //you can write script 

    return (
      <main className='container'>

        <div className='row'>
          <DisplayHistoric textOut={this.state.displayOut} />
        </div>
        <div className='row '>
          <DisplayInput textIn={this.state.currentValue} />
        </div>
        <div className='row buttons'>
          <Buttons
            addNumber={this.handledAddNumber}
            reset={this.initialValues}
            addOperator={this.handledAddOperator}
            addDecimal={this.handledAddDecimal}
            result={this.handledResult} />
        </div>
      </main>
    );
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //you can write script 

    return (
      <div className="row">
        <button
          className='btn btn-danger'
          id="clear"
          onClick={this.props.reset}>
          AC
        </button>
        <button
          className='btn btn-secondary'
          id="divide"
          onClick={this.props.addOperator}
          value="/">
          /
        </button>
        <button
          className='btn btn-secondary'
          id="multiply"
          onClick={this.props.addOperator}
          value="*">
          x
        </button>

        <button
          className='btn btn-light'
          id="seven"
          onClick={this.props.addNumber}
          value="7">
          7
        </button>
        <button
          className='btn btn-light'
          id="eight"
          onClick={this.props.addNumber}
          value="8">
          8
        </button>
        <button
          className='btn btn-light'
          id="nine"
          onClick={this.props.addNumber}
          value="9">
          9
        </button>
        <button
          className='btn btn-secondary'
          id="subtract"
          onClick={this.props.addOperator}
          value="-">
          -
        </button>

        <button
          className='btn btn-light'
          id="four"
          onClick={this.props.addNumber}
          value="4">
          4
        </button>
        <button
          className='btn btn-light'
          id="five"
          onClick={this.props.addNumber}
          value="5">
          5
        </button>
        <button
          className='btn btn-light'
          id="six"
          onClick={this.props.addNumber}
          value="6">
          6
        </button>
        <button
          className='btn btn-secondary'
          id="add"
          onClick={this.props.addOperator}
          value="+">
          +
        </button>


        <button className='btn btn-light'
          id="one"
          onClick={this.props.addNumber}
          value="1">
          1
        </button>
        <button
          className='btn btn-light'
          id="two"
          onClick={this.props.addNumber}
          value="2">
          2
        </button>
        <button
          className='btn btn-light'
          id="three"
          onClick={this.props.addNumber}
          value="3">
          3
        </button>

        <button
          className='btn btn-light'
          id="zero"
          onClick={this.props.addNumber}
          value="0">
          0
        </button>
        <button
          className='btn btn-light'
          id="decimal"
          onClick={this.props.addDecimal}
          value=".">
          .
        </button>

        <button
          className='btn btn-primary'
          id="equals"
          onClick={this.props.result}>
          =
        </button>

      </div>
    );
  }
}

class DisplayInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //you can write script 

    return (
      <div className='col' id='display'>
        {this.props.textIn}
      </div>
    );
  }
}

class DisplayHistoric extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //you can write script 

    return (
      <div className='col' id='displayOut'>
        {this.props.textOut}
      </div>
    );
  }
}

export default App;
