import { FlatList } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { useEffect, useState } from 'react'

import * as MediaLibrary from 'expo-media-library'
import * as Styled from '@/themes/styles'

export default function HomeScreen() {
  const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([])
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()

  useEffect(() => {
    const fetchAudioFiles = async () => {
      if (!permissionResponse?.granted) {
        const { granted } = await requestPermission()
        if (!granted) return
      }
      let media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
        first: 1000,
      })
      const mp3Files = media.assets.filter((file) =>
        file.filename.endsWith('.mp3'),
      )
      setAudioFiles(mp3Files)
    }
    fetchAudioFiles()
  }, [permissionResponse])

  return (
    <Styled.Container>
      <Styled.Title>Songs</Styled.Title>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ThemedText>{item.filename}</ThemedText>}
      />
    </Styled.Container>
  )
}
