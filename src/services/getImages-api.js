const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34894296-d45261c0c480dae38daba0bf7';

function getImages (searchQuery, page = 1 ) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12`
    ).then(response => {
    if (response.ok) {
      return response.json();
    }
      return Promise.reject(
        new Error(
          `Oops... No search `
        )
      );
  });
};

const api = { getImages, };

export default api;