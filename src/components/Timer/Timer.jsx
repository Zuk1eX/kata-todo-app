export default function Timer({ minutesLeft, secondsLeft, onPlay, onPause, className }) {
  return (
    <span className={className}>
      <button type="button" className="icon icon-play" onClick={onPlay} disabled={!minutesLeft && !secondsLeft} />
      <button type="button" className="icon icon-pause" onClick={onPause} disabled={!minutesLeft && !secondsLeft} />
      {`${minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`}
    </span>
  )
}
