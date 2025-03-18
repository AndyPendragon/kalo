import { FlatList, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import * as MusicLibrary from 'expo-music-library'
import TrackPlayer, {
  Track,
  State,
} from 'react-native-track-player'
import * as Styled from '@/themes/styles'
import { ThemedText } from '@/components/ThemedText'
import FastImage from 'react-native-fast-image'
import { create } from 'zustand'
import { setupPlayer } from 'react-native-track-player/lib/src/trackPlayer'
import { defaultArtworkImageUri } from '@/constants/Images'

type QueueStore = {
  activeQueueId: string | null
  setActiveQueueId: (id: string) => void
}

const useQueueStore = create<QueueStore>()((set) => ({
  activeQueueId: null,
  setActiveQueueId: (id) => set({ activeQueueId: id }),
}))

export const useQueue = () => useQueueStore((state) => state)
export type TrackWithPlaylist = Track & { playlist?: string[] }

export default function HomeScreen() {
  setupPlayer()

  const [audioFiles, setAudioFiles] = useState<TrackWithPlaylist[]>([])
  const [artworkError, setArtworkError] = useState(false)

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
          artist: asset.artist ?? '<unknown artist>',
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

  const handleTrackPress = async (selectedTrack: TrackWithPlaylist) => {
    try {
      const currentQueue = await TrackPlayer.getQueue()
      const isTrackInQueue = currentQueue.some(
        (track) => track.url === selectedTrack.url,
      )

      if (!isTrackInQueue) {
        await TrackPlayer.add(selectedTrack)
          
      }

      const playerState = await TrackPlayer.getState()
      if (playerState !== State.Playing) {
        await TrackPlayer.play()
      }


    } catch (error) {
      console.error('Error handling track press:', error)
    }
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
          source={{
            uri: artworkError ? defaultArtworkImageUri : item?.artwork,
          }}
        />
        <View style={{ flex: 1 }}>
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
