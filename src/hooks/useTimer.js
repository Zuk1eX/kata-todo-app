import { useCallback, useEffect, useState } from 'react'
import { diffBetweenDates } from '../services/utils'

export default function useTimer([minutes, seconds], expirationDate, activeStatus) {
  const [minutesLeft, setMinutesLeft] = useState(minutes)
  const [secondsLeft, setSecondsLeft] = useState(seconds)

  const updateTimer = useCallback(
    (timerId) => {
      if (expirationDate < Date.now() || !activeStatus) {
        clearInterval(timerId)
        return
      }

      const [m, s] = diffBetweenDates(Date.now(), expirationDate)
      setMinutesLeft(m)
      setSecondsLeft(s)
    },
    [expirationDate, activeStatus]
  )

  function resetTimer() {
    setMinutesLeft(0)
    setSecondsLeft(0)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      updateTimer(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [updateTimer])

  return { minutesLeft, secondsLeft, resetTimer }
}
