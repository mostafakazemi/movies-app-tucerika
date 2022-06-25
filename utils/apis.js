export const theMovieDBApis = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: 'f62f750b70a8ef11dad44670cfb6aa57',
  movie: {
    discover: 'discover/movie',
    genres: 'genre/movie/list'
  },
  image: {
    baseUrl: 'https://image.tmdb.org/t/p/',
    sizes: {
      w440andH660: 'w440_and_h660_face',
      w1280: 'w1280'
    }
  }
}
