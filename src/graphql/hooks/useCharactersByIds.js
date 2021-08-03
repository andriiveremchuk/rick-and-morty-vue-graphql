import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable'

const GET_CHARACTERS_BY_IDS = gql`
  query charactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      image
    }
  }
`

export const useGetCharactersByIds = (ids) => {
  const { result, loading, error, refetch } = useQuery(GET_CHARACTERS_BY_IDS, {
    ids
  })

  const favouriteCharacters = useResult(result, null, (data) => data.charactersByIds)

  return {
    favouriteCharacters,
    loading,
    error,
    refetch
  }
}
