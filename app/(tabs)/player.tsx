import TrackPlayer, {
  Capability,
  RepeatMode,
  Track,
  useActiveTrack,
} from 'react-native-track-player'
import PlayerControls from '@/components/ui/PlayerControls'
import * as Styled from '@/themes/styles'
import { ThemedText } from '@/components/ThemedText'
import { useEffect, useState } from 'react'
import { defaultArtworkImageUri } from '@/constants/Images'


export default function PlayerScreen() {
  const [artworkError, setArtworkError] = useState(false)

  const activeTrack = useActiveTrack() as Track

  const handleImageError = () => {
    setArtworkError(true)
  }

  useEffect(() => {
    const setupTrackPlayer = async () => {
      await TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 10 })

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      })

      await TrackPlayer.setRepeatMode(RepeatMode.Queue)
    }

    setupTrackPlayer()
  }, [])

  return (
    <Styled.Container>
      <ThemedText type='title'>Player</ThemedText>
      <Styled.Container>
        <Styled.AlbumArt
          source={{
            uri: artworkError ? defaultArtworkImageUri : activeTrack?.artwork,
          }}
          onError={handleImageError}
        />
        <Styled.AnimatedText>
          {activeTrack?.title || 'No Track Playing'}
        </Styled.AnimatedText>
        <Styled.ArtistText>
          {activeTrack?.artist || 'Unknown Artist'}
        </Styled.ArtistText>
        <PlayerControls />
      </Styled.Container>
    </Styled.Container>
  )
}
