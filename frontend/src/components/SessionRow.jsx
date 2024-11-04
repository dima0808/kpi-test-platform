import React from 'react';
import { useState, useEffect, useCallback } from 'react';

import DropdownMenu from './DropdownMenu';

import borderBetween from '../assets/icons/brd-between-small.svg';
import people from '../assets/icons/people.svg';

const SessionRow = ({ id, name, openDate, deadline, startedSessions, selectAll, onDelete }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectAll);
  }, [selectAll]);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
  };

  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  const getStatus = useCallback(
    (deadline) => {
      const currentDate = new Date();
      const deadlineTime = parseDate(deadline);
      const openDateTime = parseDate(openDate);
      return currentDate <= deadlineTime && currentDate >= openDateTime;
    },
    [openDate],
  );

  const [status, setStatus] = useState(getStatus(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStatus(deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, getStatus]);

  const [openDatePart, openTimePart] = openDate.split(' ');
  const [deadlineDatePart, deadlineTimePart] = deadline.split(' ');

  return (
    <div className={`session-row ${isSelected ? 'selected' : ''}`}>
      <div className="session-row__checkbox">
        <input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} id={id} />
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
        <DropdownMenu id={id} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default SessionRow;
