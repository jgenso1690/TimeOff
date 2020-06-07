import React from 'react';
import ReactDOM from 'react-dom';
import style from '../public/style.css';
import { PieChart } from 'react-minimal-pie-chart';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import axios from 'axios';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'James',
      vacDays: 10,
      vacUsed: 8,
      vacLeft: 8,
      startDate: null,
      endDate: null,
      focusedInput: 'startDate'
    }

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    axios.post('/vacation', {
      name: this.state.name,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    })
    .then((response) =>{
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  render() {


 return (


      <>

    <h1>Welcome, {this.state.name}</h1>

    <div className= "section1">
      <div className='graph-container'>
        <h2>Vacation Days</h2>
      <PieChart
      radius={50}
      animate={true}
      label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
      labelPosition={50}
        labelStyle={{
          fontSize: "10px",
          fontColor: "FFFFFA",
          fontWeight: "800",
        }}
      data={[
        { title: 'days used', value: this.state.vacUsed, color: '#E38627' },
        { title: 'days available', value: this.state.vacLeft, color: '#C13C37' },
      ]}
      />
      </div>

      <div className='graph-container'>
      <h2>Personal Days</h2>
      <PieChart
      radius={50}
      animate={true}
      label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
      labelPosition={50}
        labelStyle={{
          fontSize: "10px",
          fontColor: "FFFFFA",
          fontWeight: "800",
        }}
      data={[
        { title: 'days used', value: 5, color: '#E38627' },
        { title: 'days available', value: 10, color: '#C13C37' },
      ]}
      />
      </div>


      <div className='graph-container'>
      <h2>Sick Days</h2>
      <PieChart
      radius={50}
      animate={true}
      label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
      labelPosition={50}
        labelStyle={{
          fontSize: "10px",
          fontColor: "FFFFFA",
          fontWeight: "800",
        }}
      data={[
        { title: 'days used', value: 5, color: '#E38627' },
        { title: 'days available', value: 10, color: '#C13C37' },
      ]}
      />
      </div>

      </div>


      <div className='calendar-container'>
       <div className='title'>Select a date:</div>
       <br>
       </br>
        <DateRangePicker
           startDate={this.state.startDate} // momentPropTypes.momentObj or null,
           startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
           endDate={this.state.endDate} // momentPropTypes.momentObj or null,
           endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
           onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
           focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
           onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />

        <button onClick={this.handleClick}>Submit request</button>

      </div>

      </>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);