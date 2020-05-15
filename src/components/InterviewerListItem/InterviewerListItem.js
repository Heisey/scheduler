import React from 'react'
import classnames from 'classnames'

import 'components/InterviewerListItem/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const { avatar, id, name, selected, setInterviewer } = props
  const InterviewerListItemStyles = classnames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li
      id={id}
      onClick={setInterviewer}
      className={InterviewerListItemStyles}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}