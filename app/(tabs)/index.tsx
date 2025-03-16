import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'

import * as MediaLibrary from 'expo-media-library'

import * as Styled from '@/themes/styles'
import { ThemedText } from '@/components/ThemedText'

export default function HomeScreen() {
  const [audioFiles, setAudioFiles] = useState<any[]>([])
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

  const handleTrackPress = (track: MediaLibrary.Asset[]) => {
    Alert.alert('Track Selected', `You selected: ${JSON.stringify(track)}`)
  }

  const trackItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTrackPress(item)}>
      <View
        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
      >
        <ThemedText>{item.filename}</ThemedText>
      </View>
    </TouchableOpacity>
  )

  return (
    <Styled.Container>
      <Styled.Title>Songs</Styled.Title>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={trackItem}
        ListEmptyComponent={
          <Styled.Container>
            <ThemedText>No songs found.</ThemedText>
          </Styled.Container>
        }
      />
    </Styled.Container>
  )
}
