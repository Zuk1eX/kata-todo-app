export default function Timer({ isActive, minutesLeft, secondsLeft, onPlay, onPause, className }) {
  const isDisabled = !minutesLeft && !secondsLeft

  return (
    <span className={className}>
      <button type="button" className="icon icon-play" onClick={onPlay} disabled={isDisabled || isActive} />
      <button type="button" className="icon icon-pause" onClick={onPause} disabled={isDisabled || !isActive} />
      {`${minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`}
    </span>
  )
}
