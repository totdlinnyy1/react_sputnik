import {format, fromUnixTime} from 'date-fns'

const getReadableData = (time: number): string => {
  return format(fromUnixTime(time), 'dd/MM')
}

export default getReadableData
