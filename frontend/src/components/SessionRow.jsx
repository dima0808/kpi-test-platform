import React from 'react';
import { useState, useEffect } from 'react';

import DropdownMenu from './DropdownMenu';

import borderBetween from '../assets/icons/brd-between-small.svg';
import people from '../assets/icons/people.svg';

const SessionRow = ({ id, name, openDate, deadline, startedSessions }) => {
  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  const getStatus = (deadline) => {
    const currentDate = new Date();
    const deadlineTime = parseDate(deadline);
    const openDateTime = parseDate(openDate);
    return currentDate <= deadlineTime && currentDate >= openDateTime;
  };

  const [status, setStatus] = useState(getStatus(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStatus(deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  const [openDatePart, openTimePart] = openDate.split(' ');
  const [deadlineDatePart, deadlineTimePart] = deadline.split(' ');

  return (
    <div className="session-row">
      <div className="session-row__checkbox">
        <input type="checkbox" id={id} />
        <label htmlFor={id}></label>
      </div>
      <div className="session-row__title">{name}</div>
      <div className="session-row__dates">
        <div className="session-row__start-date">
          <span>{openTimePart} UTC+2</span>
          <span>{openDatePart}</span>
        </div>
        <div className="session-row__divider">
          <img src={borderBetween} alt="border" />
        </div>
        <div className="session-row__end-date">
          <span>{deadlineTimePart} UTC+2</span>
          <span>{deadlineDatePart}</span>
        </div>
      </div>
      <div className="session-row__status">
        <div className={`status-${status ? 'active' : 'inactive'}`}>
          <div className={`circle-${status ? 'green' : 'red'}`}></div>
          <span>{status ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
      <div className="session-row__sessions">
        <img src={people} alt="" />
        <span>{startedSessions}</span>
      </div>
      <div className="session-row__actions">
        <DropdownMenu />
      </div>
    </div>
  );
};

export default SessionRow;
