import React, { Fragment } from 'react';

import Confirm from 'components/Appointment/Confirm/Confirm';
import Empty from 'components/Appointment/Empty/Empty';
import Error from 'components/Appointment/Error/Error';
import Form from 'components/Appointment/Form/Form';
import Header from 'components/Appointment/Header/Header';
import Show from 'components/Appointment/Show/Show';
import Status from 'components/Appointment/Status/Status';

import useVisualMode from 'hooks/useVisualMode';

import 'components/Appointment/Appointment.scss'

export default function Appointment(props) {
  const { 
    bookInterview, 
    cancelInterview, 
    id, 
    interview, 
    interviewers, 
    time,
    updateSpots
  } = props;

  const CREATE = 'CREATE';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const EMPTY = 'EMPTY';
  const ERROR_DELETE = 'ERROR_DELETE';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_SELECT = 'ERROR_SELECT';
  const SAVE = 'SAVE';
  const SHOW = 'SHOW';
  const CONFIRM = 'CONFIRM';

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const onAdd = () => transition(CREATE)

  const onCancel = () => back()

  const onConfirm = async () => {
    try {
      transition(DELETING, true)
    
      await cancelInterview(id)
      
      await updateSpots(true)

      transition(EMPTY)
    } catch {
      transition(ERROR_DELETE)
    }
      
  }

  const handleSelectError = () => {
    transition(ERROR_SELECT)
  }

  const onEdit = () => {
    transition(EDIT)
  }

  const onDelete = () => {
    transition(CONFIRM)
  }

  const save = async (name, interviewer) => {
    try {
      const fromEdit = mode === EDIT
      transition(SAVE)
    
      const interview = {
        student: name,
        interviewer: Number(interviewer)
      }
      
      await bookInterview(id, interview)

      transition(SHOW)

      if (!fromEdit) {
        await updateSpots()
      }
    } catch {
      transition(ERROR_SAVE, true)
    }
  }

  return (
    <article 
      className="appointment"
      data-testid="appointment"
    >
      <Fragment>
        <Header time={time} />
        {mode === CONFIRM && (
          <Confirm 
            message="Are you sure you would like to delete"
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        )}
        
        {mode === EMPTY && (
          <Empty 
            onAdd={onAdd}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error 
            message="Could not delete appointment"
            onClose={onCancel}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error 
            message="Could not save appointment"
            onClose={onCancel}
          />
        )}
        {mode === ERROR_SELECT && (
          <Error
            message="student name cannot be blank"
            onClose={onCancel}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={interviewers}
            onCancel={onCancel}
            onSave={save}
            onSelectError={handleSelectError}
          />
        )}
        {mode === EDIT && (
          <Form 
            interviewers={interviewers}
            onCancel={onCancel}
            onSave={save}
            name={interview.student}
          />
        )} 

        {mode === SHOW && (
          <Show 
            testing={interview}
            student={interview.student} 
            interviewer={interview.interviewer}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}

        {mode === SAVE && (
          <Status message="Saving" />
        )}
        {mode === DELETING && (
          <Status message="Deleting" />
        )}
        
      </Fragment>
    </article>
  )
}