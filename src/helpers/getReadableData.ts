import {format, fromUnixTime} from 'date-fns'

// getReadableData return data in dd:MM format from Unix time
const getReadableData = (time: number): string => {
  return format(fromUnixTime(time), 'dd/MM')
}

export default getReadableData
