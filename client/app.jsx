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
import jimena from '../jimena.jpg'
import Rob from '../Rob.jpg'



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signIn: false,
      name: '',
      vacDays: '',
      vacUsed: '',
      vacLeft: '',
      perDays: '',
      perUsed: '',
      perLeft: '',
      sickDays: '',
      sickUsed: '',
      sickLeft: '',
      startDate: null,
      endDate: null,
      focusedInput: 'startDate',
      typeofDay: '',
      checked: false,
      img: '',
      position: '',
      department: '',
      perDays: '',
      approveJimena: ['10/22/2020 - 10/25/2020' , '12/03/2020 - 12/02/2020'],
      approveRob: ['10/22/2020 - 10/25/2020' , '12/03/2020 - 12/02/2020'],
      pending: ''

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlelogOut = this.handlelogOut.bind(this)

  }

  handleChange(e) {

    this.setState({name: e.target.value})
  }

  handleSubmit(e) {

    axios.get('/user', {
      params: {
        body: this.state.name
      }
    })
    .then((response) => {

      this.setState({name: response.data.name})
      //this.setState({img: response.data.img})
      this.setState({position: response.data.position})
      this.setState({department: response.data.department})
      this.setState({vacDays: response.data.vacations})
      this.setState({perDays: response.data.personal})
      this.setState({sickDays: response.data.sick})
      this.setState({vacUsed: response.data.vacUsed})
      this.setState({perUsed: response.data.perUsed})
      this.setState({sickUsed: response.data.sickUsed})
      this.setState({vacLeft: response.data.vacLeft})
      this.setState({perLeft: response.data.perLeft})
      this.setState({sickLeft: response.data.sickLeft})
      //this.setState({approve: response.data.approve})
      console.log('here',response)

    })
    .catch((error)=> console.log('err',error))

    this.setState({signIn : !this.state.signIn})

  }

  handlelogOut(e) {
    this.setState({signIn : !this.state.signIn})
    this.setState({name : ''})
    this.setState({pending : ''})
    this.setState({startDate : ''})
    this.setState({endDate : ''})
  }



//submit dates button
  handleClick() {
    axios.post('/vacation', {
      name: this.state.name,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      typeofDay: this.state.typeofDay
    })
    .then((response) =>{
      this.setState({pending: response.data.dates})
      if ( this.state.name === 'Jimena Gensollen') {
        this.setState({perLeft: this.state.perDays - response.data.used})
        this.setState({perUsed: response.data.used})

      } else {
        this.setState({sickLeft: this.state.sickDays - response.data.used})
        this.setState({sickUsed: response.data.used})

      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleInputChange(e) {

    const target = event.target;
    const value = target.name;

    this.setState({
      typeofDay: value
    });
  }



  render() {


 return (


      <>
    <div>
      {!this.state.signIn && (
        <form onSubmit={this.handleSubmit}>
          <label>
            User:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
          </label>
          <input type='submit' value='Sign In'/>
        </form>
      )}
      {this.state.signIn && (
        <>
      <div className="id-image">
         {this.state.name === 'Jimena Gensollen' ?
           <img src={jimena} alt='jimena'/>
           : <img src={Rob} alt='Rob'/>}
      </div>

      <div className="id-container">
        <div className="cardinfo">
          <div className="name">{this.state.name}</div>
          <div className="position">{this.state.position}</div>
          <div className="department">{this.state.department}</div>
        </div>
      </div>


      <div className= "section1">
        <div className='graph-container'>
          <h2>Vacation Days</h2>
            <PieChart
            radius={50}
            animate={true}
            label={({ dataEntry }) => `${dataEntry.value} ${dataEntry.title}`}
            labelPosition={50}
              labelStyle={{
                fontSize: "10px",
                fontColor: "FFFFFA",
                fontWeight: "800",
                fontFamily: "Manjari"
              }}
            data={[
              { title: 'used', value: Number(this.state.vacUsed), color: '#928f8f' },
              { title: 'available', value: Number(this.state.vacLeft), color: '#da5c14' },
            ]}
            />
        </div>

        <div className='graph-container'>
          <h2>Personal Days</h2>
            <PieChart
            radius={50}
            animate={true}
            label={({ dataEntry }) => `${dataEntry.value} ${dataEntry.title}`}
            labelPosition={50}
              labelStyle={{
                fontSize: "10px",
                fontColor: "FFFFFA",
                fontWeight: "800",
                fontFamily: "Manjari"
              }}
            data={[
              { title: 'used', value: Number(this.state.perUsed), color: '#928f8f' },
              { title: 'available', value: Number(this.state.perLeft), color: '#da5c14' },
            ]}
            />
          </div>


        <div className='graph-container'>

          <h2 id="sick">Sick Days</h2>
            <PieChart
            data={[
              { title: 'used', value: Number(this.state.sickUsed), color: '#928f8f' },
              { title: 'available', value: Number(this.state.sickLeft), color: '#da5c14' },
            ]}
            radius={50}
            animate={true}
            label={({ dataEntry }) => `${dataEntry.value} ${dataEntry.title}`}
            labelPosition={50}
              labelStyle={{
                fontSize: "10px",
                fontColor: "FFFFFA",
                fontWeight: "800",
                fontFamily: "Manjari"
              }}
              data={[
                { title: 'used', value: Number(this.state.sickUsed), color: '#928f8f' },
                { title: 'available', value: Number(this.state.sickLeft), color: '#da5c14' },
              ]}

            />

        </div>

      </div>


      <div className='calendar-container'>
       <div className='title'>Submit a request:</div>
       <br></br>
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
        <div className="row">Pending: </div>

              <li>{this.state.pending}</li>


        <div className="row">Approve: </div>
          {this.state.name === 'Jimena Gensollen'
          ? this.state.approveJimena.map((date)=>
            <li>{date}</li>
           )
          : this.state.approveRob.map((date)=>
            <li>{date}</li>
           )

          }
      </table>
      </div>

      <button className="logout" onClick={this.handlelogOut}>Log out</button>
      </>
    )}
  </div>
      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);