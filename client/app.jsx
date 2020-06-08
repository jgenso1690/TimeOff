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
      focusedInput: 'startDate',
      typeofDay: '',
      checked: false,
      img: 'https://lh3.googleusercontent.com/b2MMAMzEhO0UgMMPysEu2J1Go0NZviSeNsRPs3h9MRJs2nQLfMEqpodGrmzI-Qvs13J-3IcMS7VqzAkGU3g5pjKDUrDW35FqJceCWsHfwIZyFSi_3hKL5zlJnjowc17qbMxJwIobu4amKJI-x1BKud5jixh6XagzB2RMURPv3RkUANQbZ2WbNfp4lLNLmXO9kFL8WLwG13jmb96h9jyG1BjCKydSibTmV9m_GxVuTioYfqxvkF8HE_3LvXlyer_skl8838GKgLPtPo3hlL2duDCe6TBg2z_wVUW8ld7s_qxrGhPMLoZHfGzFoqnIEhcmOCFddnq-wJTf06pBFolzhO8emIATeP0QuvNmSDMw-lPav1KNGo0XmpJ_xSn-HoLo4AqnWR6BZvAv-3TXa9QXmSzqWMfc5nKy6VXMaxK12IxClXRtpwRy9y1B4og44XDaeW1syY3HnH0I1BAXNfawm2QsOMSWlnPIm3qGVJ4UKcT2wfPS-cK5IwqnzTaK-YF7X7zsUeiB3-DhdHWNeMEYWLwJdOv3KXhhJq2tUrsYC8V6-yMip3tfibxV6iQC1Cn_I-iZfix-Lfmi1Y8D1hW0EPWtTjLgED3BVzvtsvWZFqaMkR2_WDUxb60n3Qr51ES6UZTpYjtC8ktQq3nb8gPKvKXXtqHYuS6xvkR-5_k0IAefOoo2rfH7rXmSJOci-Q=w475-h976-no?authuser=0'
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleClick() {
    axios.post('/vacation', {
      name: this.state.name,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      typeofDay: this.state.typeofDay
    })
    .then((response) =>{
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleInputChange(e) {
    console.log(e)
    const target = event.target;
    const value = target.name;

    this.setState({
      typeofDay: value
    });
  }



  render() {


 return (


      <>
    <div className="id-image">
         <img src={this.state.img} alt='jimena'/>
      </div>

    <div className="id-container">

      <div className="cardinfo">
        <div className="name">Jimena Gensollen</div>
        <div className="position">Customer Service</div>
        <div className="department">Sales Deparment</div>
      </div>
    </div>


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
        { title: 'days used', value: this.state.vacUsed, color: '#928f8f' },
        { title: 'days available', value: this.state.vacLeft, color: '#da5c14' },
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
        { title: 'days used', value: 5, color: '#928f8f' },
        { title: 'days available', value: 10, color: '#da5c14' },
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
        { title: 'days used', value: 5, color: '#928f8f' },
        { title: 'days available', value: 10, color: '#da5c14' },
      ]}
      />
      </div>

      </div>


      <div className='calendar-container'>
       <div className='title'>Submit a request:</div>
       <br>
       </br>



      <div>
        <form>
          <label className="checkcontainer">
            Vacation
            <input name="Vacation" type="checkbox" value={this.state.typeofDay} onChange={this.handleInputChange}/>
            <span className="checkmark"></span>
          </label>
          <label className="checkcontainer">
            Personal
            <input name="Personal" type="checkbox" value={this.state.typeofDay} onChange={this.handleInputChange}/>
            <span className="checkmark"></span>
          </label>
          <label className="checkcontainer">
            Sick
            <input name="Sick" type="checkbox" value={this.state.typeofDay} onChange={this.handleInputChange}/>
            <span className="checkmark"></span>
          </label >
        </form>
      </div>
      <div className="calendar">
      <DateRangePicker
           startDate={this.state.startDate} // momentPropTypes.momentObj or null,
           startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
           endDate={this.state.endDate} // momentPropTypes.momentObj or null,
           endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
           onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
           focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
           onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        </div>
      </div>
      <div className="button" onClick={this.handleClick}>
        <button>Submit request</button>
        </div>

      <div className="Request">
      <table>
        <td className="row">Pending:</td>
          <tr>pending1</tr>
          <tr>pending1</tr>
        <td className="row">Approve:</td>
          <tr>HEllo</tr>
          <tr>HEllo</tr>
      </table>
      </div>

      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);