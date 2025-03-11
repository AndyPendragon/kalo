import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useEffect, useState } from 'react'

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
        first: 100, // Nombre max de fichiers récupérés
      })

      // Filtrer uniquement les fichiers MP3
      const mp3Files = media.assets.filter((file) =>
        file.filename.endsWith('.mp3'),
      )
      setAudioFiles(mp3Files)
    }

    fetchAudioFiles()
  }, [permissionResponse])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/audio-wave.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
      }
    >
      <ThemedView style={{ padding: 20 }}>
        <ThemedText type='title'>🎵 Fichiers Audio</ThemedText>
        <FlatList
          data={audioFiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ paddingVertical: 10 }}>
              <ThemedText type='defaultSemiBold'>{item.filename}</ThemedText>
            </TouchableOpacity>
          )}
        />
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
