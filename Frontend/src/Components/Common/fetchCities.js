async function fetchCities() {
    const state = 'Maharashtra';
    const response = await fetch(`https://indian-cities-api-nocbegfhqg.now.sh/cities?state=${state}`)
    const data = await response.json();
    console.log(data)
    return data;
}

export default fetchCities;