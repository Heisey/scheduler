import React from 'react'
import classnames from 'classnames'

import 'components/InterviewerListItem/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const { avatar, id, name, selected, setInterviewer } = props
  const InterviewerListItemStyles = classnames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  const handleSetInterviewer = (e) => {
    setInterviewer(e.target.id)
  }
  return (
    <li
      onClick={handleSetInterviewer}
      className={InterviewerListItemStyles}
    >
      <img
        id={id}
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}