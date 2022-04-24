

export default async function getMovies() {
    const apiKey = process.env.REACT_APP_API_KEY;

    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=a0554f9f8c7df1f0d1325453755c1518&language=en-US&page=1`;

    const res = await fetch(apiUrl);
    const apiResponse = await res.json();

    return apiResponse;

}