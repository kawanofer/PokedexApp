import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/?limit=100',
});

// https://pokeapi.co/api/v2/pokemon/pikachu/

export default api;
