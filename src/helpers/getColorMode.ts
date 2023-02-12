import {ColorMode} from '@chakra-ui/react'

// getColorMode return color mode by current time
// dark mode turn on after 6pm and turn off after 6am
// light mode working from 6am to 6pm
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
