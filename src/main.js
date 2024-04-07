import iziToast from "izitoast";
import { fetchImages } from "./js/pixabay-api";
import { displayImages } from "./js/render-functions";
import "izitoast/dist/css/iziToast.min.css";

let searchQuery = '';
let currentPage = 1;
const apiKey = "43152327-599555690163c4dbf744e6761";

const loadMoreBtn = document.getElementById("loadMoreBtn");
const loader = document.getElementById("loader");
const gallery = document.getElementById("gallery");

loadMoreBtn.style.display = "none";

 

    
loadMoreBtn.addEventListener("click", async () => {
    try {
        const data = await fetchImages(searchQuery, apiKey, ++currentPage);
        if (data.hits.length === 0) {
            loadMoreBtn.style.display = "none";
            iziToast.info({
                title: "Info",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topCenter"
            });
        } else {
            displayImages(data.hits);
            smoothScrollBy(getGalleryCardHeight() * 2);
        }
    } catch (error) {
        console.error(error);
    }
});

document.getElementById("searchForm").addEventListener("submit", async evt => {
    evt.preventDefault();
gallery.innerHTML = "";
    loader.style.display = "block";
    

    searchQuery = document.getElementById("searchInput").value.trim();
    
    if (searchQuery === "") {
        loader.style.display = "none";
        gallery.innerHTML = "";
        iziToast.error({
            title: "Alert",
            message: "Please enter a value.",
            position: "topCenter"
        });
        return;
    }

   

    try {
        currentPage = 1;
        const data = await fetchImages(searchQuery, apiKey, currentPage);
        if (data.hits.length === 0) {
            loader.style.display = "none";
            iziToast.info({
                title: "Info",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topCenter"
            });
            loadMoreBtn.style.display = "none";
        } else {
            loader.style.display = "none";
            displayImages(data.hits);
            if (data.totalHits <= currentPage * 15) {
                loadMoreBtn.style.display = "none";
                iziToast.info({
                    title: "Info",
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topCenter"
                });
            } else {
                loadMoreBtn.style.display = "block";
            }
            smoothScrollBy(getGalleryCardHeight() * 2);
        }
    } catch (error) {
        loader.style.display = "none";
        gallery.innerHTML = "";
        iziToast.error({
            title: "Error",
            message: error.message,
            position: "topCenter"
        });
    }
});

function getGalleryCardHeight() {
    const firstGalleryCard = gallery.querySelector(".image-container");
    const cardHeight = firstGalleryCard.getBoundingClientRect().height;
    return cardHeight;
}

function smoothScrollBy(distance, duration = 500) {
    const initialY = window.scrollY;
    const targetY = initialY + distance;
    const startTime = performance.now();

    function step() {
        const normalizedTime = (performance.now() - startTime) / duration;
        if (normalizedTime < 1) {
            window.scrollTo(0, initialY + distance * normalizedTime);
            requestAnimationFrame(step);
        } else {
            window.scrollTo(0, targetY);
        }
    }

    requestAnimationFrame(step);
}