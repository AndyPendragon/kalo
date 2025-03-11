import styled from 'styled-components/native'
import Constants from 'expo-constants'

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
`

export const Description = styled.Text`
  font-size: 16px;
  line-height: 20px;
  margin-top: 10px;
  color: ${(props: any) => props.theme.text};
`
