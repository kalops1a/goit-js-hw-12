import iziToast from "izitoast";
import { fetchImages } from "./js/pixabay-api";
import { displayImages } from "./js/render-functions";
import "izitoast/dist/css/iziToast.min.css";

const loader = document.getElementById("loader");

document.getElementById("searchForm").addEventListener("submit", async evt => {
    evt.preventDefault();

    loader.style.display = "block";

    
    const searchInputValue = document.getElementById("searchInput").value.trim();
    if (searchInputValue === "") {
        iziToast.error({
            title: "Alert",
            message: "Please enter a value.",
            position: "topCenter"
        });
        return;
    }

    const apiKey = "43152327-599555690163c4dbf744e6761";

    try {
        const data = await fetchImages(searchInputValue, apiKey);
        if (data.hits.length === 0) {
            loader.style.display = "none";
            iziToast.info({
                title: "Info",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topCenter"
            });
        } else {
            loader.style.display = "none";
            displayImages(data.hits);
        }
    } catch (error) {
        loader.style.display = "none";
        iziToast.error({
            title: "Error",
            message: error.message,
            position: "topCenter"
        });
    }
});
