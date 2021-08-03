<template>
  <div class="cards-list">
    <div class="toolbar">
      <v-text-field
        class="search"
        placeholder="Character Name"
        solo
        dense
        clearable
        append-icon="mdi-magnify"
        v-model="searchTerm"
        @click:append="onSearch()"
        @click:clear="onClear()"
      />
      <v-select
        class="select"
        clearable
        hide-details
        solo
        dense
        placeholder="Select species"
        :items="characterSpecies"
        @input="onSelect($event)"
      />
    </div>
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
        <div class="column" v-for="(character, index) in characterList" :key="index">
          <router-link :to="`/characters/${character.id}`">
            <Card :character="character" @storage-updated="storageUpdated" />
          </router-link>
        </div>
      </template>
    </div>
    <v-row v-if="!error && !loading" justify="center">
      <v-col cols="6">
        <v-container class="max-width">
          <v-pagination
            v-model="currentPage"
            class="my-4"
            color="black"
            :length="paginationInfo.pages"
            @input="onPageChange"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import Card from '@/components/Card'
  import { ref, watch } from '@vue/composition-api'
  import { useGetCharacterList } from '@/graphql/hooks/useCharacterList'

  export default {
    name: 'CharacterListPage',
    components: {
      Card
    },
    setup(_, context) {
      const searchTerm = ref('')
      const currentFilter = ref('')
      const characterSpecies = ref([])
      const currentPage = ref(1)
      const { characterList, paginationInfo, loading, error, variables } = useGetCharacterList()

      function onSearch() {
        variables.value = {
          name: searchTerm.value,
          page: currentPage.value
        }
      }

      function onSelect(species) {
        currentFilter.value = species

        variables.value = {
          species,
          name: searchTerm.value,
          page: currentPage.value
        }
      }

      function onPageChange(page) {
        currentPage.value = page

        variables.value = {
          page,
          species: currentFilter,
          name: searchTerm.value
        }
      }

      function onClear() {
        searchTerm.value = ''

        variables.value = {
          name: searchTerm.value
        }
      }

      function storageUpdated() {
        context.emit('storage-updated')
      }

      watch(characterList, (list) => {
        if (list) {
          characterSpecies.value = [...new Set(list.map((character) => character.species))]
        }
      })

      return {
        searchTerm,
        onSearch,
        onSelect,
        onClear,
        onPageChange,
        error,
        loading,
        characterList,
        characterSpecies,
        currentPage,
        paginationInfo,
        storageUpdated
      }
    }
  }
</script>

<style scoped>
  .cards-list {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 20px;
  }

  .column {
    box-sizing: border-box;
    padding: 0 20px 30px;
    width: calc(100% / 4);
  }

  .toolbar {
    display: flex;
    padding: 25px 40px 0;
    margin-bottom: 25px;
    gap: 20px;
    background-color: rgb(239, 239, 239);
  }

  .select {
    max-width: 200px;
  }

  .search {
    max-width: 200px;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    min-height: 70vh;
  }
</style>
