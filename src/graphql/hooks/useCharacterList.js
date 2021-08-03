import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable'
import { ref } from '@vue/composition-api'

const GET_CHARACTER_LIST = gql`
  query CharacterList($name: String, $species: String, $page: Int) {
    characters(filter: { name: $name, species: $species }, page: $page) {
      results {
        id
        name
        status
        species
        image
      }
      info {
        count
        pages
        prev
        next
      }
    }
  }
`

const options = ref({
  debounce: 500,
  fetchPolicy: 'network-only'
})

export const useGetCharacterList = () => {
  const { result, loading, error, variables, refetch } = useQuery(GET_CHARACTER_LIST, null, options)

  const characterList = useResult(result, null, (data) => data.characters.results)
  const paginationInfo = useResult(result, null, (data) => data.characters.info)

  return {
    characterList,
    paginationInfo,
    loading,
    error,
    variables,
    refetch
  }
}
