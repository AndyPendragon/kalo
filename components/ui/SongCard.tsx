import * as Styled from '@/themes/styles'

export const SongCard = ({ itemData, onPress }: any) => {
  return (
    <Styled.Container>
      <Styled.ID>#{String(details.id).padStart(3, '0')}</Styled.ID>
      <Styled.Name>{details.name}</Styled.Name>
      <Styled.Pokeball source={pokeball} />
      <Styled.Pokemon source={{ uri: details.sprites.front_default }} />
      <Styled.Types>
        {details.types.map((typeObj: any, index: number) => (
          <TypeCard key={index} type={typeObj.type.name} />
        ))}
      </Styled.Types>
    </Styled.Container>
  )
}
