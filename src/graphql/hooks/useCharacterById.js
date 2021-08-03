import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable'

const GET_CHARACTER_BY_ID = gql`
  query CharacterByID($id: ID!) {
    character(id: $id) {
      id
      image
      name
      species
      status
      location {
        name
      }
      episode {
        name
        air_date
        episode
      }
    }
  }
`

export const useGetCharacterById = (id) => {
  const { result, loading, error } = useQuery(GET_CHARACTER_BY_ID, {
    id
  })

  const character = useResult(result, null, (data) => ({
    ...data.character,
    episode: data.character.episode[0].name,
    location: data.character.location.name
  }))

  return {
    character,
    loading,
    error
  }
}
