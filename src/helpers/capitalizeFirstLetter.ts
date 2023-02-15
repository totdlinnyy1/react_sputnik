// capitalizeFirstLetter return string with capitalized first letter
const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export default capitalizeFirstLetter
