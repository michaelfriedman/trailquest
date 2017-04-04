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
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  handleSelect(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange.bind(this)} />
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
