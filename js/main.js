

    const APP = {
    apiUrl: "https://api.unsplash.com/",
    apiKey: "dud5vlDrf7TChkxCgabnMv1OEum9F-5rOi0VBpQPEy8",

    searchInput: document.getElementById("searchInput"),
    searchButton: document.getElementById("searchButton"),
    imageList: document.getElementById("imageList"),

    init: () => {
        APP.addEventListeners();
    },

    addEventListeners: () => {
        APP.searchButton.addEventListener("click", APP.searchImages);
    },

    searchImages: () => {
        const searchQuery = APP.searchInput.value.trim();
        if (searchQuery === "") {
        console.log("Please enter a search query."); // fix this
        return;
        }

        const searchUrl = `${APP.apiUrl}search/photos?query=${searchQuery}&client_id=${APP.apiKey}`;

        APP.fetchData(searchUrl);
    },

    fetchData: (url) => {
        fetch(url)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.results.length > 0) {
            APP.displayImages(data.results);
            } else {
            console.error("No results found"); // fix this
            }
        })
        .catch((error) => {
            console.error("Error fetching images:", error); // fix this
        });
    },

    displayImages: (results) => {
        APP.imageList.innerHTML = "";

        results.map((image) => {
        APP.imageList.innerHTML += `<li class="image-container">
            <strong>${image.alt_description}</strong>
            <img  class"imageSize" id="${image.id}" data-url="${image.urls.raw}" src="${image.urls.small}" alt="${image.alt_description}">
            </li>`;
        });
        APP.updateSource();
    },

    updateSource: () => {
        const imageElements = document.querySelectorAll("img");
        imageElements.forEach((img) => {
        const imageUrl = img.dataset.url;
        const imageId = img.id;
        APP.fetchImage(imageUrl, imageId);
        });
    },

    fetchImage: (imageUrl, imageId) => {
        fetch(imageUrl)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
            }
            return response.blob();
        })
        .then((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            APP.updateImageSource(blobUrl, imageId);
        })
        .catch((error) => console.error("Error fetching image Blob:", error)); // fix this
    },

    updateImageSource: (blobUrl, imageId) => {
        const imageElement = document.getElementById(imageId);
        imageElement.src = blobUrl;
    },
    };

    document.addEventListener("DOMContentLoaded", APP.init);

