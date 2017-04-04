import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// require('react-datepicker/dist/react-datepicker-cssmodules.css');

class DatePickerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
    console.log(this.state.startDate)
  }

  handleSelect(date) {
    
  }

  render() {
    return (
      <div>
        <DatePicker
          className="center"
          selected={this.state.startDate}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        />
        <style jsx>{`
          .center {
            text-align: center;
          }
        `}</style>
      </div>
      )
    }
  }

  export default DatePickerComponent
