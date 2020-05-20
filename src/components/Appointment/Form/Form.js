import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import InterviewerList from 'components/InterviewerList/InterviewerList'

Form.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default function Form(props) {
  const { name, interviewer, interviewers, onCancel, onSave, onSelectError } = props

  const [student, setStudent] = useState(name || "")
  const [interrogator, setInterrogator] = useState(interviewer || null)

  const handleChange = e => {
    setStudent(e.target.value)
  }

  const handleOnCancel = e => {
    resetInput()
    onCancel()
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!interrogator) {
      return onSelectError()
    }
    onSave(student, interrogator)
  }

  const handleOnSave = () => {
    if (!interrogator || student === "") {
      return onSelectError()
    }
    onSave(student, interrogator)
  }

  const resetInput = () => {
    setStudent("")
    setInterrogator(null)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={handleChange}
            data-testid="student-name-input"
          />
        </form>
        
        <InterviewerList
          interviewers={interviewers}
          interviewer={interrogator}
          setInterviewer={setInterrogator}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={handleOnCancel}
          >
            Cancel
          </Button>
          <Button
            confirm
            onClick={handleOnSave}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  )
}