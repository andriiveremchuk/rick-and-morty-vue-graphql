<template>
  <div :style="{ backgroundImage: `url(${character.image})` }" class="card">
    <div class="card__content">
      <p class="card__name">
        {{ character.name }}
      </p>
      <p class="card__status">
        <span class="card__label">Status:</span>
        {{ character.status }}
      </p>
      <p class="card__species">
        <span class="card__label">Species:</span>
        {{ character.species }}
      </p>
    </div>
    <template v-if="favouriteIDs.includes(character.id)">
      <v-tooltip slot="append" color="black" top max-width="200">
        <template #activator="{ on }">
          <v-icon
            @click.prevent="removeFromFavourites(character.id)"
            v-on="on"
            class="mx-2 card__button"
            color="red"
          >
            mdi-heart
          </v-icon>
        </template>
        <span> Remove from Favourites </span>
      </v-tooltip>
    </template>
    <template v-else>
      <v-tooltip slot="append" color="black" top max-width="200">
        <template #activator="{ on }">
          <v-icon
            @click.prevent="addToFavourites(character.id)"
            v-on="on"
            class="mx-2 card__button"
          >
            mdi-heart
          </v-icon>
        </template>
        <span> Add to Favourites </span>
      </v-tooltip>
    </template>
  </div>
</template>

<script>
  import { useFavouriteList } from '@/hooks/useFavouriteList'

  export default {
    name: 'Card',
    props: {
      character: {
        type: Object,
        default: () => ({
          image: '',
          id: null,
          name: 'Unknown Character',
          status: 'unknown',
          species: 'unknown'
        })
      }
    },
    setup(_, context) {
      const { favouriteIDs, addToFavourites, removeFromFavourites } = useFavouriteList(context)

      return {
        favouriteIDs,
        addToFavourites,
        removeFromFavourites
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    $c: &;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    padding-bottom: 100%;
    cursor: pointer;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 20px;
    &:hover {
      #{$c}__content {
        transform: translateY(0);
      }
    }

    &__content {
      position: absolute;
      bottom: 0;
      width: 100%;
      transform: translateY(70%);
      transition: 0.3s all;
      &::before {
        content: '';
        position: absolute;
        z-index: 0;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.82) 35%,
          rgba(0, 0, 0, 1) 76%,
          rgba(0, 0, 0, 1) 100%
        );
      }
    }

    &__name {
      position: relative;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
    }

    &__avatar {
      border-radius: 20px;
      max-width: 150px;
    }

    &__content {
      align-items: flex-end;
    }

    &__status {
      position: relative;
      color: #fff;
      margin-top: 5px;
    }

    &__species {
      position: relative;
      color: #fff;
      margin-bottom: 20px;
      margin-top: 5px;
    }

    &__label {
      font-weight: bold;
      font-size: 14px;
    }

    &__button {
      position: absolute;
      top: 10px;
      right: 0;
    }
  }
</style>
