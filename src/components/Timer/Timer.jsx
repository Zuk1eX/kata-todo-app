import './Timer.css'
import PropTypes from 'prop-types'

export default function Timer({ isActive, minutesLeft, secondsLeft, onPlay, onPause }) {
  const isNegative = minutesLeft < 0 || secondsLeft < 0
  const absMinutesLeft = Math.abs(minutesLeft)
  const absSecondsLeft = Math.abs(secondsLeft)

  return (
    <span className={`description description--timer ${isNegative && ' description--alert'}`}>
      <button
        type="button"
        className={`icon icon-${isActive ? 'pause' : 'play'}`}
        onClick={isActive ? onPause : onPlay}
      />
      {isNegative && '- '}
      {`${absMinutesLeft}:${absSecondsLeft < 10 ? `0${absSecondsLeft}` : absSecondsLeft}`}
    </span>
  )
}

Timer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  minutesLeft: PropTypes.number.isRequired,
  secondsLeft: PropTypes.number.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
}
