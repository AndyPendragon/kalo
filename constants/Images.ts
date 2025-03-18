import { Image } from 'react-native'

export const defaultArtworkImageUri = Image.resolveAssetSource(
  require('@/assets/images/default-artwork.png'),
).uri
