import {extendTheme, ThemeComponentProps} from '@chakra-ui/react'

export const themeConfig = extendTheme({
  config: {
    useSystemColorMode: false
  },
  colors: {
    'bg-dark': '#827081',
    'bg-light': '#E3D0D8',
    'component-light': '#E7E6F7',
    'component-dark': '#AEA3B0',
    'component-primary': '#C03221'
  },
  styles: {
    global: (props: ThemeComponentProps) => ({
      'html, body': {
        backgroundColor: props.colorMode === 'dark' ? 'bg-dark' : 'bg-light'
      },
      '.defaultColor': {
        backgroundColor:
          props.colorMode === 'dark' ? 'component-dark' : 'component-light'
      }
    })
  },
  fonts: {
    heading: `'Roboto Mono', monospace`,
    body: `'Roboto Mono', monospace`
  }
})
