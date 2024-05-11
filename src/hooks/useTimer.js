import { useCallback, useEffect, useState } from 'react'
import { diffBetweenDates } from '../services/utils'

export default function useTimer([minutes, seconds], expirationDate, activeStatus) {
  const [minutesLeft, setMinutesLeft] = useState(minutes)
  const [secondsLeft, setSecondsLeft] = useState(seconds)

  const updateTimer = useCallback(() => {
    const [m, s] = diffBetweenDates(Date.now(), expirationDate)
    setMinutesLeft(m)
    setSecondsLeft(s)
  }, [expirationDate])

  function resetTimer() {
    setMinutesLeft(0)
    setSecondsLeft(0)
  }

  useEffect(() => {
    let timer
    if (activeStatus) {
      timer = setInterval(() => {
        updateTimer()
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [updateTimer, activeStatus])

  return { minutesLeft, secondsLeft, resetTimer }
}
