import { useCallback, useEffect, useState } from 'react'
import { diffBetweenDates } from '../services/utils'

export default function useTimer([minutes, seconds], expirationDate, activeStatus, setInactive) {
  const [minutesLeft, setMinutesLeft] = useState(minutes)
  const [secondsLeft, setSecondsLeft] = useState(seconds)

  const updateTimer = useCallback(
    (timerId) => {
      const now = Date.now()
      if (expirationDate + 500 < now || !activeStatus) {
        clearInterval(timerId)
        setInactive()
        return
      }

      const [m, s] = diffBetweenDates(now, expirationDate)
      setMinutesLeft(m)
      setSecondsLeft(s)
    },
    [expirationDate, activeStatus, setInactive]
  )

  function resetTimer() {
    setMinutesLeft(0)
    setSecondsLeft(0)
  }

  useEffect(() => {
    let timer
    if (activeStatus) {
      timer = setInterval(() => {
        updateTimer(timer)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [updateTimer, activeStatus])

  return { minutesLeft, secondsLeft, resetTimer }
}
