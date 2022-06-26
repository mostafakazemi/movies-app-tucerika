<template>
  <div>
    <TopBar>
      <span>Search by release date:</span>
      <input type="text" class="ml-6">
      <button class="ml-auto text-white px-5 py-2 rounded-full">
        Search
      </button>
    </TopBar>
    <div v-if="$fetchState.error">
      fetch error
    </div>
    <div v-else-if="$fetchState.pending">
      fetch pending ..
    </div>
    <div v-else class="grid grid-cols-3 gap-x-16 gap-y-10">
      <NuxtLink v-for="movie in movies" :key="movie.id" :to="{name: 'id', params: {id: movie.id}}">
        <figure class="md:flex rounded-lg p-1 border">
          <img class="w-5/12 h-auto rounded-l-lg" :src="movie.poster_path" :alt="movie.title">
          <div class="p-2 grid grid-rows-3">
            <p class="font-bold row-span-2">
              {{ movie.title }}
            </p>
            <figcaption class="text-505050 text-xs">
              <div class="flex items-center">
                <IconCalendar class="mr-1" />
                {{ movie.release_date }}
              </div>
              <div class="mt-2">
                {{ movie.genres.toString().replaceAll(',', ' ● ') }}
              </div>
            </figcaption>
          </div>
        </figure>
      </NuxtLink>
    </div>
    <div class="flex justify-center mt-32">
      <Pagination v-model="pagination.page" :count-of-items="pagination.countOfItems" :total-pages="pagination.totalPages" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { theMovieDBApis } from '~/utils/apis'

export default Vue.extend({
  name: 'HomePage',
  data () {
    return {
      pagination: {
        countOfItems: 20,
        page: parseInt(this.$route.query.page || 1),
        totalPages: undefined
      },
      image: {
        preUrl: theMovieDBApis.image.baseUrl + theMovieDBApis.image.sizes.w440andH660
      },
      fetchedMovies: [],
      movieResponse: {
        results: []
      },
      genres: []
    }
  },
  fetchOnServer: false,
  fetch () {
    // fetch movies
    this.$axios({
      baseURL: theMovieDBApis.baseUrl,
      url: theMovieDBApis.movie.discover,
      params: {
        api_key: theMovieDBApis.apiKey,
        page: this.pagination.page,
        language: theMovieDBApis.language
      }
    }).then(({ data }) => {
      this.movieResponse = data
      this.pagination.page = data.page
      this.pagination.totalPages = data.total_pages
    })
  },
  computed: {
    movies () {
      if (this.movieResponse.results) {
        return this.movieResponse.results.map((movie) => {
          movie.poster_path = this.image.preUrl + movie.poster_path
          movie.genres = movie.genre_ids.map(id => this.genres.find(genre => genre.id === id).name)
          return movie
        })
      }
      return []
    }
  },
  watch: {
    'pagination.page': {
      handler (page) {
        this.$router.push({
          query: {
            ...this.$route.query,
            page: page === 1 ? undefined : page
          }
        })
      }
    },
    '$route.query': '$fetch'
  },
  beforeMount () {
    // fetch genres
    this.$axios({
      baseURL: theMovieDBApis.baseUrl,
      url: theMovieDBApis.movie.genres,
      params: {
        api_key: theMovieDBApis.apiKey,
        language: theMovieDBApis.language
      }
    }).then(({ data }) => {
      this.genres = data.genres
    })
  }
})
</script>

<style scoped>
figure {
  background-color: #F1F1F1;
  border-color: #C4C4C4;
}

.text-505050 {
  color: #505050;
}
</style>
