export function getAppointmentsForDay(state, day) {
  const newState = []
  const curState = state.days.find(cur => {
    return cur.name === day && cur
  })
  
  if (curState) {
    curState.appointments.map(cur => {
      return newState.push(state.appointments[cur])
    })
  }
  
  return newState;
}

export function getInterview(state, interview) {

  if (!interview) return null;

  const interviewerId = interview.interviewer;
  const interviewersAry = Object.values(state.interviewers)

  return { "student": interview.student, "interviewer": interviewersAry.find(i => i.id === interviewerId) }
}

export function getInterviewersForDay(state, day) {
  const newState = []
  const curState = state.days.find(cur => {
    return cur.name === day && cur
  })
  
  if (curState) {
    curState.interviewers.map(cur => {
      return newState.push(state.interviewers[cur])
    })
  }
  
  return newState;
}