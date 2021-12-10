<template>
  <div class="favourites">
    <div class="cards-container">
      <template v-if="error"> No results </template>
      <template v-if="loading">
        <v-progress-circular
          class="loader"
          :size="40"
          indeterminate
          color="black"
        ></v-progress-circular>
      </template>
      <template v-if="!error && !loading">
        <div class="column" v-for="(character, index) in favouriteCharacters" :key="index">
          <router-link :to="`/characters/${character.id}`">
            <Card :character="character" @storage-updated="getFreshData" />
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import Card from '@/components/Card'
  import { computed, ref } from '@vue/composition-api'
  import { useGetCharactersByIds } from '@/graphql/hooks/useCharactersByIds'
  import { useSessionStorage } from '@/hooks/useSessionStorage'

  const STORAGE_KEY = 'favouriteIDs'

  export default {
    name: 'CharacterListPage',
    components: {
      Card
    },
    setup(_, context) {
      const { getItemFromSessionStorage } = useSessionStorage()

      const idsFromStorage = ref(getItemFromSessionStorage(STORAGE_KEY))

      const parsedIds = computed(() => {
        return (
          (idsFromStorage.value &&
            idsFromStorage.value.length &&
            idsFromStorage.value.map((id) => +id)) ||
          null
        )
      })

      const { favouriteCharacters, loading, error, refetch } = useGetCharactersByIds(parsedIds)

      function getFreshData() {
        idsFromStorage.value = getItemFromSessionStorage(STORAGE_KEY)

        context.emit('storage-updated')

        refetch()
      }

      return {
        error,
        loading,
        favouriteCharacters,
        getFreshData
      }
    }
  }
</script>

<style scoped>
  .favourites {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 25px;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 40px;
  }

  .column {
    box-sizing: border-box;
    padding: 0 20px 30px;
    width: calc(100% / 3);
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    min-height: 70vh;
  }
</style>
