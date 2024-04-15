import axios, * as others from 'axios';

const fetchBooksDataWithAxios = async (searchTerm) => {
  console.log("Search term:", searchTerm); // Debugging statement
  const url = `https://books-api7.p.rapidapi.com/books/find/title`;
  const options = {
    method: 'GET',
    params: {
      title: searchTerm
    },
    headers: {
      'X-RapidAPI-Key': '7f757d3ab0msha3f2bb3500b4c7fp18d194jsne28649b3488a',
      'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(url, options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};




  
  export default fetchBooksDataWithAxios;