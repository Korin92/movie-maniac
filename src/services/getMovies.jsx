

export default async function getMovies() {
    const apiKey = process.env.REACT_APP_API_KEY;

    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    const res = await fetch(apiUrl);
    const apiResponse = await res.json();

    return apiResponse;

}