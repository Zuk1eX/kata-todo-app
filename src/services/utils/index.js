import { formatDistanceToNow } from 'date-fns'

function formatDate(date) {
  return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
}

export default formatDate
