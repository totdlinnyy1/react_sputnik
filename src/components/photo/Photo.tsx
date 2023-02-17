import {Box, Image, Text} from '@chakra-ui/react'
import {FC} from 'react'

import {Photo as PhotoProps} from '../../context/galleryContext/galleryContext'

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
  return (
    <Box bg='white' w={size === 'big' ? '' : '400px'} color='black'>
      <Image
        src={url}
        w={size === 'big' ? '' : '400px'}
        h={size === 'big' ? '' : '400px'}
        maxW={size === 'big' ? 'full' : '400px'}
        maxH={size === 'big' ? '1000px' : '400px'}
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
