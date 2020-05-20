import React from 'react';
import PropTypes from 'prop-types'

import InterviewerListItem from 'components/InterviewerListItem/InterviewerListItem'
import 'components/InterviewerList/InterviewerList.scss';

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  interviewers: PropTypes.array,
  setInterviewer: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  const { interviewer, interviewers, setInterviewer } = props

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(cur => (
          <InterviewerListItem
            key={cur.id}
            avatar={cur.avatar}
            id={cur.id}
            name={cur.name}
            selected={interviewer === cur.id}
            setInterviewer={setInterviewer}
          />
        ))}
        
      </ul>
    </section>
  )
} 