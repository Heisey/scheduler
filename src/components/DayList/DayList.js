import React from 'react'
import DayListItem from 'components/DayListItem/DayListItem'

export default function DayList(props) {
  const { days, setDay } = props
  
  return (
    <ul>
      {days.map(day => (
        <DayListItem 
          key={day.id}
          name={day.name}
          selected={day.name === props.day}
          setDay={setDay}
          spots={day.spots}
        />
      ))}
    </ul>
  )
}