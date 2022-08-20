import logo from './logo.svg';
import './App.scss';
import React from 'react';


let dataInput = '';
let dataOut = '';
let flagLess = false;
let flagConc = false;

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
    let dataResult = eval(expression);
    this.setState({
      currentValue: dataResult,
      displayOut: expression + "=" + dataResult,
      isDone: true
    })


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
    if (this.state.currentValue !== event.target.value) {
      if (this.state.currentValue === '0' && this.state.previusValue === '') {
        console.log('first operator');
        dataInput = event.target.value;
        dataOut = event.target.value;
        console.log('first lastletter ' + dataOut);
        if (dataInput == '-') {
          flagLess = true;
        }
        this.setState({
          currentValue: dataInput,
          displayOut: dataOut
        });
      } else {
        if (this.state.isDone) {
          dataOut = this.state.currentValue;
          console.log(dataOut + ' rodo');
          this.setState({
            displayOut: this.state.currentValue,
            isDone: false
          });
        }
        console.log(dataOut);
        if (flagConc) {
          var lastLetter = dataOut.toString().slice(-2);
        }
        else {
          var lastLetter = dataOut.toString().slice(-1);
        }
        if (lastLetter == undefined) {
          lastLetter = event.target.value;
        }
        console.log('last: ' + lastLetter)
        console.log(!(lastLetter.includes('+') || lastLetter.includes('/') || lastLetter.includes('*')))
        if (!(lastLetter.includes('+') || lastLetter.includes('/') || lastLetter.includes('*') || flagLess)) {
          console.log('firts condition');
          dataOut += event.target.value;
          dataInput = '';
          this.setState({
            currentValue: event.target.value,
            previusValue: this.state.currentValue,
            displayOut: dataOut,
          });

          if (event.target.value == '-') {
            flagLess = true;
          }
        } else {
          if (event.target.value == '-' && !flagLess) {
            console.log('condicion less');
            if (dataOut.length > 1 && !event.target.value.includes('-')) {
              dataOut = dataOut.slice(0, -1) + event.target.value;
            } else if (dataOut.length > 1 && event.target.value.includes('-')) {
              dataOut += event.target.value;
              flagConc = true;
            } else {
              dataOut = event.target.value;
            }

            flagLess = true;
            this.setState({
              currentValue: event.target.value,
              previusValue: this.state.currentValue,
              displayOut: dataOut,
            });
          } else {
            let dt;
            if (lastLetter.includes('+-') || lastLetter.includes('/-') || lastLetter.includes('*-')) {
              dt = dataOut.slice(0, -2) + event.target.value;
              console.log('dt slice');
            } else if ((lastLetter.includes('+') || lastLetter.includes('/') || lastLetter.includes('*') || lastLetter.includes('-'))) {
              console.log('condition two operators')
              flagConc = false;
              dt = dataOut.slice(0, -1) + event.target.value;
            }
            else {
              dt = dataOut += event.target.value;
              console.log('dt +=');
            }
            dataOut = dt;
            console.log('condicion else');
            flagLess = false;
            this.setState({
              currentValue: event.target.value,
              previusValue: this.state.currentValue,
              displayOut: dataOut,
            });

          }
        }
      }

    }

  }

  handledAddNumber(event) {
    if (dataInput.length >= 12) {
      this.messageWarning();
    } else {
      //console.log(this.state.displayOut.length);
      flagConc = false;
      if (this.state.currentValue === '0' && this.state.previusValue === '' && event.target.value != '0') {
        console.log('fisrt number');
        dataInput = event.target.value;
        dataOut = event.target.value;
        this.setState({
          currentValue: dataInput,
          displayOut: dataOut
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
    flagLess = false;

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
