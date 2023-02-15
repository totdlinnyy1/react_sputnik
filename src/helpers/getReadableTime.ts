import {format, fromUnixTime} from 'date-fns'

// getReadableTime return time in HH:mm format from Unix time
const getReadableTime = (time: number): string => {
  return format(fromUnixTime(time), 'HH:mm')
}

export default getReadableTime
