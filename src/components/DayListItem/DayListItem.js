import React from "react";

import classnames from 'classnames';
import 'components/DayListItem/DayListItem.scss'

export default function DayListItem(props) {
  const { name, selected, setDay, spots } = props;
  const DayListItemStyle = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  })

  const clickHandler = () => {
    setDay(name)
  }

  const formatSpots = () => {
    if (spots === 0) {
      return 'no spots remaining'
    } else if (spots === 1) {
      return `${spots} spot remaining`
    } else {
      return `${spots} spots remaining`
    }
  }

  return (
    <li
      className={DayListItemStyle} 
      onClick={clickHandler}
    >
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}