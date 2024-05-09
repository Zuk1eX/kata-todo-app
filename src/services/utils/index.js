import { formatDistanceToNow } from 'date-fns'

function formatDate(date) {
  return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
}

function diffBetweenDates(date1, date2) {
  const diff = Math.round((date2 - date1) / 1000)
  return [Math.floor(diff / 60), Math.floor(diff % 60)]
}

export { formatDate, diffBetweenDates }
