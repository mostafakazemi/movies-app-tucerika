export const theMovieDBApis = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: 'f62f750b70a8ef11dad44670cfb6aa57',
  language: 'en-US',
  movie: {
    genres: 'genre/movie/list',
    discover: 'discover/movie',
    details: movieId => `movie/${movieId}`,
    credits: movieId => `movie/${movieId}/credits`
  },
  image: {
    baseUrl: 'https://image.tmdb.org/t/p/',
    sizes: {
      w440andH660: 'w440_and_h660_face',
      w1280: 'w1280'
    }
  }
}
