import {
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import {FC} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

import Photo from '../../components/photo/Photo'
import {useGallery} from '../../context/galleryContext/galleryContext'

const GalleryPage: FC = () => {
  const {randomPhoto, photos, isLoading, error} = useGallery()

  if (isLoading || !randomPhoto) {
    return (
      <Center w='full' h='100vh'>
        <Spinner />
      </Center>
    )
  }

  if (error !== '') {
    throw new Error(error)
  }

  return (
    <Box>
      <Heading as='h1'>Поиск по фотографиям</Heading>
      <FormControl my='8'>
        <HStack>
          <Input placeholder='Введите запрос' />
          <IconButton
            icon={<Icon as={AiOutlineSearch} />}
            aria-label='search'
            size='md'
          />
        </HStack>
      </FormControl>
      {!photos?.length ? (
        <Center>
          <Photo photo={randomPhoto} size='big' />
        </Center>
      ) : (
        <Wrap justify='center'>
          {photos.map((photo, key) => (
            <WrapItem key={key}>
              <Center w='full'>
                <Photo photo={photo} size='small' />
              </Center>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Box>
  )
}

export default GalleryPage
