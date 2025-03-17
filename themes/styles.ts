import styled from 'styled-components/native'
import Constants from 'expo-constants'
import Animated from 'react-native-reanimated'

export const Container = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${25 + Constants.statusBarHeight}px;
  padding-bottom: 0;
  background-color: ${(props: any) => props.theme.background};
`
export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${(props: any) => props.theme.text};
  padding: 12px 0;
`
export const Description = styled.Text`
  font-size: 16px;
  line-height: 20px;
  margin-top: 10px;
  color: ${(props: any) => props.theme.text};
`
export const AlbumArt = styled.Image`
  width: 250px;
  height: 250px;
  border-radius: 12px;
  margin-bottom: 20px;
`
export const TextContainer = styled.View`
  width: 80%;
  align-items: center;
`
export const AnimatedText = styled(Animated.Text)`
  font-size: 20px;
  color: ${(props: any) => props.theme.text};
  font-weight: bold;
  width: 100%;
  overflow: hidden;
`
export const ArtistText = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.theme.text};
  margin-top: 5px;
`
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`
export const TrackItem = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.background};
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`
export const TrackTitle = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.theme.text};
  flex: 1;
`
