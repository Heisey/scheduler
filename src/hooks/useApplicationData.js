import { useEffect, useState } from "react";

import axios from 'axios';

export default function useApplicationData() {


  const startingObj = {
    day: "Monday",
    days: [],
    appointments: {}
  }

  const [state, setState] = useState(startingObj)

  useEffect(() => {
    async function setData() {
      try {
        const daysData = await axios.get('http://192.168.1.67:8001/api/days')
        const appointmentsData = await axios.get('http://192.168.1.67:8001/api/appointments')
        const interviewerData = await axios.get('http://192.168.1.67:8001/api/interviewers')

        setState(prev => ({
          ...prev, 
          days: daysData.data,
          appointments: appointmentsData.data,
          interviewers: interviewerData.data
        }))
      } catch(e) {
        alert('there was an error')
      }
      
    }
    setData()
  }, [])

  const bookInterview = async (id, interview) => {
  
    await axios.put(`/api/appointments/${id}`, {interview})

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    setState(prev => {
      return {...prev, appointments: appointments}
    })
  }

  const cancelInterview = async id => {

    await axios.delete(`/api/appointments/${id}`)

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    setState(prev => {
      return {...prev, appointments: appointments}
    })
  }

  const handleSetDay = (day) => {
    setState({...state, day: day})
  }

  const updateSpots = (add) => {
    let index;
    let newDay;
    
    const curDay = state.days.find((cur, i) => {
      index = i
      return cur.name === state.day
    })
    
    if (add) { 
      newDay = {
        ...curDay,
        spots: curDay.spots + 1
      }
    } else {
      newDay = {
        ...curDay,
        spots: curDay.spots - 1
      }
    }

    const newDays = [
      ...state.days
    ]

    newDays[index] = newDay
    
    setState(pre => ({
      ...pre,
      days: newDays
    }))
  }
  
  return {
    state,
    handleSetDay,
    bookInterview,
    cancelInterview,
    updateSpots
  }
}
