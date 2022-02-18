import React, { useState } from 'react';
import { connect } from 'react-redux';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import {
  nepaliToEnglishNumber
} from 'nepali-number';


export const Datepicker = ({ pickDate}) => {
  return (
    <>
      <label htmlFor="date">मिति</label>
      <Calendar
        className="form-control max-auto mb-4"
        language="ne"
        onChange={pickDate}
        theme="green"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    date: state.selectedDate.date,
  };
};


const mapDispatchToProps = (dispatch) => {
  
  return {
    pickDate: ({ bsDate }) => {
      const action = {
        type: 'SET_SELECTED_DATE',
        newDate: nepaliToEnglishNumber(bsDate),
      };
      dispatch(action);
  }
}
};

// const handleDate = ({ bsDate, adDate }) => {
//     setDate({ date: bsDate });

export default connect(mapStateToProps, mapDispatchToProps)(Datepicker);
