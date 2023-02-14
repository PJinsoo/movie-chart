const API_KEY = "a202bdc99cbe21e37e41b18531622d8f";

module.exports = {
  reactStrictMode: true,

  //URL 리다이렉트(URL 자체변경)
  async redirects() {
    return [
      {
        source: "/oldindex",
        destination: "/loadingOn",
        permanent: false,
      },
    ];
  },

  //마스킹, API 숨기기
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        //source와 destination에서 준 변수값(:id)는 서로 동일해야 함
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};
