import { useState } from 'react';

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode])

  const transition = (newMode, skip = false) => {
    if (skip) {
      const temp = history
      temp.pop()
      setHistory([...temp, newMode])
      setMode(newMode)
    } else {
      setHistory([...history, newMode])
      setMode(newMode)
    }
  }

  const back = () => {
    if (history.length === 1) {
      setMode(history[0])
    } else {
      const temp = history
      temp.pop()
      setHistory(temp)
      setMode(temp[temp.length - 1])
    }
  }


  return {
    mode,
    transition,
    back
  }
}

