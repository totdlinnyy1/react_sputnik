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
  const {
    randomPhoto,
    photos,
    isLoading,
    error,
    clearPhotos,
    searchPhotos,
    totalPages
  } = useGallery()

  const [query, setQuery] = useState<string>('')
  const [searchError, setSearchError] = useState<string>('')
  const [page, setPage] = useState<number>(1)

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

  const search = (p = 1): void => {
    if (query === '') {
      setSearchError('Неккоректный запрос')
      return
    }
    if (searchPhotos) {
      searchPhotos({query, page: p})
    }
  }

  const handleSearch = (): void => {
    setPage(1)
    search()
  }

  const handleNext = (): void => {
    search(page + 1)
    setPage(page + 1)
  }

  const handlePrev = (): void => {
    search(page - 1)
    setPage(page - 1)
  }

  const handleClear = (): void => {
    setPage(1)
    if (clearPhotos) {
      clearPhotos()
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
            onClick={handleSearch}
          />
        </HStack>
        <Text fontSize='sm' color='red'>
          {searchError}
        </Text>
      </FormControl>
      <Center my={4}>
        {!!photos?.length && <Button onClick={handleClear}>Очистить</Button>}
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
      <HStack my={8} justify='center' spacing={4}>
        {page <= totalPages && page > 1 && (
          <Button onClick={handlePrev}>Предыдущая страница</Button>
        )}
        {page < totalPages && (
          <Button onClick={handleNext}>Cледующая страница</Button>
        )}
      </HStack>
    </Box>
  )
}

export default GalleryPage
