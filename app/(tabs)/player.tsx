import TrackPlayer, {
  Capability,
  RepeatMode,
  Track,
} from 'react-native-track-player'

import PlayerControls from '@/components/ui/PlayerControls'
import * as Styled from '@/themes/styles'

import defaultAlbumArtAsset from '@/assets/images/default-artwork.png'
import audio from '@/assets/audio/Gimme! Gimme! Gimme! (A Man After Midnight).mp3'
import { ThemedText } from '@/components/ThemedText'

export type TracksListItemProps = {
  track: Track
  onTrackSelect: (track: Track) => void
}

export default function PlayerScreen() {
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

    await TrackPlayer.add({
      id: '1',
      title: 'Gimme! Gimme! Gimme!',
      artist: 'ABBA',
      url: audio,
    })

    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
  }

  setupTrackPlayer()

  return (
    <Styled.Container>
      <ThemedText type='title'>Player</ThemedText>
      <Styled.Container>
        <Styled.AlbumArt source={defaultAlbumArtAsset} />
        <Styled.AnimatedText>Gimme! Gimme! Gimme!</Styled.AnimatedText>
        <Styled.ArtistText>ABBA</Styled.ArtistText>
        <PlayerControls />
      </Styled.Container>
    </Styled.Container>
  )
}
