import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function displayImages(images) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; 

    images.forEach(image => {
        const imageLink = document.createElement("a");
        imageLink.classList.add("image-container");
        imageLink.href = image.largeImageURL;

        const img = document.createElement("img");
        img.src = image.webformatURL;
        img.alt = image.tags;

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");
        infoContainer.innerHTML = `
            <p class="info-item">Likes: ${image.likes}</p>
            <p  class="info-item">Views: ${image.views}</p>
            <p  class="info-item">Comments: ${image.comments}</p>
            <p  class="info-item">Downloads: ${image.downloads}</p>
        `;

        imageLink.appendChild(img);
        imageLink.appendChild(infoContainer);
        gallery.appendChild(imageLink);
    });

    const options = {
        captionsData: "alt",
        closeText: "",
        navText: ["←", "→"],
        docClose: true,
        history: false,
        elementClass: "simple-lightbox",
        overlay: true,
        spinner: true,
        spinnerHtml: "<div class='slb-spinner'></div>",
        closeButton: true,
        closeButtonHtml: "<span class='slb-close-button'></span>",
        loop: false,
        bindToItems: true,
        disableRightClick: true,
        enableZoom: false,
        beforeOpen: () => { document.body.style.overflow = "hidden"; },
        afterClose: () => { document.body.style.overflow = ""; }
    };

    if (!lightbox) {
        lightbox = new SimpleLightbox("#gallery a", options);
    } else {
        lightbox.refresh();
    }
}