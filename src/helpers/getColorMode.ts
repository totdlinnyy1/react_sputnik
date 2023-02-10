import {ColorMode} from '@chakra-ui/react'

const getColorMode = (): ColorMode => {
  const morning = 6
  const evening = 18
  const hours = new Date().getHours()

  if (hours >= morning && hours < evening) {
    return 'light'
  }

  return 'dark'
}

export default getColorMode
