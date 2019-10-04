import axios from 'axios';

export const GetPokemons = () =>
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=100`)
        .then(response => response.data);

// export default axios.create({
//     baseURL: "https://pokeapi.co/api/v2/pokemon/?limit=100"
// });
