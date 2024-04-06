export async function fetchImages(searchQuery, apiKey) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error.message}`);
    }
}
