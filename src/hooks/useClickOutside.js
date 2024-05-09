import { useCallback, useEffect } from 'react'

export default function useClickOutside(elRef, callback) {
  const handleClickOutside = useCallback(
    (e) => {
      if (elRef.current && !elRef.current.contains(e.target)) {
        callback()
      }
    },
    [elRef, callback]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [handleClickOutside])
}
