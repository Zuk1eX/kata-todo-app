import { useCallback, useEffect } from 'react'

export default function useEscapeHandler(elRef, callback) {
  const handleKeydown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        callback()
      }
    },
    [callback]
  )

  useEffect(() => {
    const el = elRef.current
    el.addEventListener('keydown', handleKeydown)

    return () => {
      el.removeEventListener('keydown', handleKeydown)
    }
  }, [elRef, handleKeydown])
}
