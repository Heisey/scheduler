import React, { useState } from 'react';

import Button from 'components/Button/Button';
import InterviewerList from 'components/InterviewerList/InterviewerList'

export default function Form(props) {
  const { name, interviewer, interviewers, onCancel, onSave } = props

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
    onSave(student, interrogator)
  }

  const handleOnSave = () => {
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