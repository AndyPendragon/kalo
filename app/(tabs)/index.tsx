import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import * as MusicLibrary from 'expo-music-library'
import { Track } from 'react-native-track-player'
import * as Styled from '@/themes/styles'
import { ThemedText } from '@/components/ThemedText'
import FastImage from 'react-native-fast-image'

export type TrackWithPlaylist = Track & { playlist?: string[] }

export default function HomeScreen() {
  const [audioFiles, setAudioFiles] = useState<TrackWithPlaylist[]>([])

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const { granted } = await MusicLibrary.requestPermissionsAsync()
        if (!granted) return

        const { assets } = await MusicLibrary.getAssetsAsync({ first: 1000 })
        const formattedTracks: TrackWithPlaylist[] = assets.map((asset) => ({
          id: asset.id,
          url: asset.uri,
          title: asset.title ?? asset.filename,
          artist: asset.artist ?? '<unknown album>',
          album: asset.albumId ?? '<unknown album>',
          duration: asset.duration ?? 0,
          artwork: asset.artwork,
          playlist: [],
        }))

        setAudioFiles(formattedTracks)
      } catch (error) {
        console.error('Error fetching tracks:', error)
      }
    }
    fetchTracks()
  }, [])

  const handleTrackPress = (track: TrackWithPlaylist) => {
    Alert.alert(
      'Track Selected',
      `You selected: ${JSON.stringify(track.artwork)}`,
    )
  }

  const trackItem = ({ item }: { item: TrackWithPlaylist }) => (
    <TouchableOpacity onPress={() => handleTrackPress(item)}>
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <FastImage
          style={{ width: 50, height: 50 }}
          source={
            item.artwork && typeof item.artwork === 'string'
              ? { uri: item.artwork, priority: FastImage.priority.normal }
              : {
                  uri: '@/assets/images/default-artwork.png',
                  priority: FastImage.priority.normal,
                }
          }
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText type='defaultSemiBold'>{item.title}</ThemedText>
          <ThemedText>{item.artist}</ThemedText>
        </View>
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
