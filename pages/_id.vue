<template>
  <div>
    <TopBar>
      <NuxtLink class="button text-white px-5 py-2 rounded-full flex items-center" :to="{name: 'index'}">
        <IconArrow class="mr-2" />
        Back
      </NuxtLink>
      <div class="ml-12">
        <h1 class="font-bold">
          {{ movie.title }}
        </h1>
        <div>{{ movie.tagline }}</div>
      </div>
    </TopBar>
    <div class="grid grid-cols-3 gap-14">
      <div class="col-span-1">
        <img :src="image.src" alt="movie.title" class="rounded-lg">
      </div>
      <div class="col-span-2">
        <div v-for="item in table.rows.items" :key="item.name" class="flex mb-3">
          <span class="font-medium">{{ item.name }}</span>
          <span class="ml-auto">{{ item.value }}</span>
        </div>
        <div v-for="item in table.rows.links" :key="item.name" class="flex mb-3">
          <span class="font-medium">{{ item.name }}</span>
          <a :href="item.href" class="ml-auto underline custom-link">Link</a>
        </div>
      </div>
    </div>
    <p class="mt-12">
      {{ movie.overview }}
    </p>
    <div class="mt-16">
      <div class="font-bold">
        Credit:
      </div>
      <p>{{ credits.toString() }}</p>
    </div>
  </div>
</template>

<script>
import { theMovieDBApis } from '@/utils/apis'
import numberMixin from '@/mixins/numberMixin'
import timeMixin from '@/mixins/timeMixin'

export default {
  name: 'MovieDetails',
  mixins: [numberMixin, timeMixin],
  // async asyncData (ctx) {
  //   let movie
  //   await ctx.$axios({
  //     baseURL: theMovieDBApis.baseUrl,
  //     url: theMovieDBApis.movie.details(ctx.params.id),
  //     params: {
  //       api_key: theMovieDBApis.apiKey,
  //       language: theMovieDBApis.language
  //     }
  //   }).then(({ data }) => {
  //     movie = data
  //   })
  //   return { movie }
  // },
  data: () => ({
    movie: {
      adult: false,
      backdrop_path: '/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg',
      belongs_to_collection: {
        id: 618529,
        name: null,
        poster_path: '/oa5uQOTY9Y4ERNrsDk7E0eC1E3h.jpg',
        backdrop_path: '/5ZuctJh5uX5L2dz1CjA7WsTJwZk.jpg'
      },
      budget: 200000000,
      genres: [{
        id: 14,
        name: 'Fantasy'
      }, {
        id: 28,
        name: 'Action'
      }, {
        id: 12,
        name: 'Adventure'
      }],
      homepage: 'https://www.marvel.com/movies/doctor-strange-in-the-multiverse-of-madness',
      id: 453395,
      imdb_id: 'tt9419884',
      original_language: 'en',
      original_title: 'Doctor Strange in the Multiverse of Madness',
      overview: 'Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.',
      popularity: 14988.159,
      poster_path: '/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
      production_companies: [{
        id: 420,
        logo_path: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
        name: 'Marvel Studios',
        origin_country: 'US'
      }, {
        id: 176762,
        logo_path: null,
        name: 'Kevin Feige Productions',
        origin_country: 'US'
      }],
      production_countries: [{
        iso_3166_1: 'US',
        name: 'United States of America'
      }],
      release_date: '2022-05-04',
      revenue: 944913572,
      runtime: 126,
      spoken_languages: [{
        english_name: 'Cantonese',
        iso_639_1: 'cn',
        name: '广州话 / 廣州話'
      }, {
        english_name: 'English',
        iso_639_1: 'en',
        name: 'English'
      }, {
        english_name: 'Spanish',
        iso_639_1: 'es',
        name: 'Español'
      }],
      status: 'Released',
      tagline: 'Enter a new dimension of Strange.',
      title: 'Doctor Strange in the Multiverse of Madness',
      video: false,
      vote_average: 7.564,
      vote_count: 3233
    },
    credits: []
  }),
  head () {
    return {
      title: this.movie.title
    }
  },
  computed: {
    image () {
      return {
        src: theMovieDBApis.image.baseUrl + theMovieDBApis.image.sizes.w440andH660 + this.movie.poster_path
      }
    },
    table () {
      return {
        rows: {
          items: [
            {
              name: 'Budget',
              value: this.numberSeparator(this.movie.budget, '\'', '$')
            },
            {
              name: 'Revenue',
              value: this.numberSeparator(this.movie.revenue, '\'', '$')
            },
            {
              name: 'Release Date',
              value: this.movie.release_date
            },
            {
              name: 'Runtime',
              value: process.client ? this.convertMinutesToDuration(this.movie.runtime) : this.movie.runtime
            },
            {
              name: 'Score',
              value: `${this.movie.vote_average} (${this.movie.vote_count} votes)`
            },
            {
              name: 'Genres',
              value: process.client ? this.movie.genres.map(genre => genre.name).toString().replaceAll(',', ', ') : this.movie.genres.map(genre => genre.name).toString()
            }
          ],
          links: [
            {
              name: 'IMDB Link',
              href: this.movie.homepage
            },
            {
              name: 'Homepage Link',
              href: this.movie.homepage
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.fetchCredits(this.$route.params.id)
  },
  methods: {
    fetchCredits (movieId) {
      this.$axios({
        baseURL: theMovieDBApis.baseUrl,
        url: theMovieDBApis.movie.credits(movieId),
        params: {
          api_key: theMovieDBApis.apiKey,
          language: theMovieDBApis.language
        }
      }).then(({ data }) => {
        this.credits = data.cast.map(cast => cast.name)
      })
    }
  }
}
</script>

<style scoped>
.custom-link {
  color: #318FE7;
}
</style>
