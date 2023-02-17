import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import {FC, useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

import Photo from '../../components/photo/Photo'
import {useGallery} from '../../context/galleryContext/galleryContext'

const GalleryPage: FC = () => {
  const {randomPhoto, photos, isLoading, error, clearPhotos, searchPhotos} =
    useGallery()

  const [query, setQuery] = useState<string>('')
  const [searchError, setSearchError] = useState<string>('')

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

  const handleClick = (): void => {
    if (query === '') {
      setSearchError('Неккоректный запрос')
      return
    }
    if (searchPhotos) {
      searchPhotos(query)
    }
  }

  return (
    <Box>
      <HStack>
        <Heading as='h1'>Поиск по фотографиям</Heading>
      </HStack>
      <FormControl my='8'>
        <HStack>
          <Input
            placeholder='Введите запрос'
            value={query}
            onChange={(e): void => setQuery(e.target.value)}
          />
          <IconButton
            icon={<Icon as={AiOutlineSearch} />}
            aria-label='search'
            size='md'
            onClick={handleClick}
          />
        </HStack>
        <Text fontSize='sm' color='red'>
          {searchError}
        </Text>
      </FormControl>
      <Center my={4}>
        {!!photos?.length && <Button onClick={clearPhotos}>Назад</Button>}
      </Center>
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
