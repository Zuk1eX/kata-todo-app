export default function Timer({ isActive, minutesLeft, secondsLeft, onPlay, onPause, className }) {
  const isDisabled = !minutesLeft && !secondsLeft

  return (
    <span className={className}>
      {!isDisabled && (
        <button
          type="button"
          className={`icon icon-${isActive ? 'pause' : 'play'}`}
          onClick={isActive ? onPause : onPlay}
          disabled={isDisabled}
        />
      )}
      {`${minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`}
    </span>
  )
}
