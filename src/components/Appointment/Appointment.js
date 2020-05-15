import React, { Fragment } from 'react';

import Empty from 'components/Appointment/Empty/Empty';
import Show from 'components/Appointment/Show/Show';
import Header from 'components/Appointment/Header/Header';

import 'components/Appointment/Appointment.scss'

export default function Appointment(props) {
  const { interview, time } = props
  return(
    <article className="appointment">
      <Fragment>
        <Header time={time} />
        {interview ? (
          <Show 
            student={interview.student} 
            interviewer={interview.interviewer}
          />
        ) : <Empty />}
      </Fragment>
    </article>
  )
}