import {extendTheme, ThemeComponentProps} from '@chakra-ui/react'

export const themeConfig = extendTheme({
  useSystemColorMode: false,
  colors: {
    'bg-dark': '#031D44',
    'bg-light': '#F1DEDE',
    'component-light': '#ECD444',
    'component-dark': '#947BD3',
    'component-primary': '#DB2763'
  },
  styles: {
    global: (props: ThemeComponentProps) => ({
      'html, body': {
        backgroundColor: props.colorMode === 'dark' ? 'bg-dark' : 'bg-light'
      },
      '.defaultColor': {
        backgroundColor: props.colorMode === 'dark' ? 'component-dark' : 'component-light'
      }
    })
  }
})
