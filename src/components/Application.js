import React from 'react'

import Appointment from 'components/Appointment/Appointment';
import DayList from "components/DayList/DayList";

import useApplicationData from 'hooks/useApplicationData'

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

import "components/Application.scss";

export default function Application() {
  const {
    state,
    handleSetDay,
    bookInterview,
    cancelInterview,
    updateSpots
  } = useApplicationData()


  const generateAppointments = (appointment) => {
    const interviewData = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interviewData}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        updateSpots={updateSpots}
      />
    )
  }

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
            days={state.days} 
            day={state.day}
            setDay={handleSetDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appointment => (
          generateAppointments(appointment)
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
