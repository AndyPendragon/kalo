import * as Styled from '@/themes/styles'
import { TouchableOpacity } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import { Colors } from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'

export default function PlayerControls() {
  return (
    <Styled.Container>
      <Styled.Row>
        <SkipToPreviousButton />
        <PlayPauseButton />
        <SkipToNextButton />
      </Styled.Row>
    </Styled.Container>
  )
}

const PlayPauseButton = () => {
  const { playing } = useIsPlaying()

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
    >
      <MaterialIcons
        name={playing ? 'pause' : 'play-arrow'}
        size={48}
        color={Colors.light.text}
      />
    </TouchableOpacity>
  )
}

const SkipToNextButton = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}
    >
      <MaterialIcons name='skip-next' size={35} color={Colors.light.text} />
    </TouchableOpacity>
  )
}

const SkipToPreviousButton = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}
    >
      <MaterialIcons
        name={'skip-previous'}
        size={35}
        color={Colors.light.text}
      />
    </TouchableOpacity>
  )
}
