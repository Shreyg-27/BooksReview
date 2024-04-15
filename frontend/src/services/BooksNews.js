// const axios = require('axios');
import axios, * as others from 'axios';


const url = `https://hapi-books.p.rapidapi.com/nominees/romance/2020`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '7f757d3ab0msha3f2bb3500b4c7fp18d194jsne28649b3488a',
    'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
  }
};


const fetchDataWithAxios = async () => {
  try {
    const response = await axios(url, options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// fetchDataWithAxios();
export default fetchDataWithAxios;
