import {Box, Image, Text} from '@chakra-ui/react'
import {FC} from 'react'

import {Photo as PhotoProps} from '../../interfaces/gallery'

interface Props {
  photo: PhotoProps
  size: 'big' | 'small'
}

const Photo: FC<Props> = ({photo, size}) => {
  const url = size === 'big' ? photo.urls.full : photo.urls.small
  const username = photo.user.name
  const description = photo.description
    ? photo.description
    : photo.alt_description

  const sm = 280
  const md = 400
  return (
    <Box bg='white' w={size === 'big' ? 'max-content' : [sm, md]} color='black'>
      <Image
        src={url}
        w={size === 'big' ? 'full' : '400px'}
        h={size === 'big' ? '' : '400px'}
        objectFit='cover'
      />
      <Box padding={1}>
        <Text>Автор: {username}</Text>
        <Text>Название: {description}</Text>
      </Box>
    </Box>
  )
}

export default Photo
