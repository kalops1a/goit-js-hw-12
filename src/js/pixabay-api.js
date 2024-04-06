import axios from 'axios';

export async function fetchImages(searchQuery, apiKey, page = 1, perPage = 15) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error.message}`);
    }
}