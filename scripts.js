
const apiKey = '32983671-e3f155d90538a011f0980488f';
const gallery = document.getElementById('gallery');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const categoryButtons = document.querySelectorAll('.category-button');
const sortDropdown = document.getElementById('sort-dropdown');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
 
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const artistImg = document.getElementById('artistImg');
const artistName = document.getElementById('artistName');
const addToCollectionButton = document.getElementById('addToCollection');
const likeButton = document.getElementById('like');
const downloadButton = document.getElementById('downloadButton');
const closeButton = document.querySelector('.close');


let currentPage = 1;
let currentQuery = 'nature';
let currentOrder = 'popular';

async function fetchImages(query = 'nature', order = 'popular', page = 1) {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&order=${order}&image_type=photo&pretty=true&page=${page}`);
    const data = await response.json();
    displayImages(data.hits);
    updatePagination(data.totalHits);
}

function displayImages(images) {
    gallery.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.className = 'gallery-item';
        imgElement.innerHTML = `<img src="${image.webformatURL}" alt="${image.tags}">
            <div class="overlay">
                <div class="top-buttons">
                    <button id="collection-close" class="button" data-text="Add to Collection">
                        <i class="fa-regular fa-bookmark"></i>
                    </button>
                    <button id="like-close" class="button" data-text="Like">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
                <div class="bottom-buttons">
                    <a href="${image.largeImageURL}" download class="download-button">
                         <i class="fa-solid fa-download" style="color: #ffffff;"></i>
                        Download
                    </a>
                    <div class="artist-info">
                        <img src="${image.userImageURL}" alt="${image.user}">
                        <span>${image.user}</span>
                    </div>
                </div>
            </div>`;

        gallery.appendChild(imgElement);

        imgElement.addEventListener('click', () => {
            openModal(image);
        });

    });


    function openModal(image) {
        modalImage.src = image.largeImageURL;
        artistImg.src = image.userImageURL || 'default-user.png';
        artistName.textContent = image.user;
        downloadButton.href = image.largeImageURL;
        imageModal.style.display = 'block';
    }
    
    closeButton.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });
    
    addToCollectionButton.addEventListener('click', () => {
        addToCollection(modalImage.src);
    });
    
    likeButton.addEventListener('click', () => {
        addToLiked(modalImage.src);
    });
    
    function addToCollection(imageSrc) {
        console.log('Image added to collection:', imageSrc);
        // Implement your collection logic here
    }
    
    function addToLiked(imageSrc) {
        console.log('Image liked:', imageSrc);
        // Implement your like logic here
    }

        // Add event listeners for buttons
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', event => {
                const action = event.currentTarget.getAttribute('data-text');
                const imageElement = event.currentTarget.closest('.gallery-item').querySelector('img');
                if (action === 'Add to Collection') {
                    addToCollection(imageElement.src);
                } else if (action === 'Like') {
                    addToLiked(imageElement.src);
                }
            });
        });
    
}

function addToCollection(imageSrc) {
    console.log('Image added to collection:', imageSrc);
    // Implement your collection logic here
}

function addToLiked(imageSrc) {
    console.log('Image liked:', imageSrc);
    // Implement your like logic here
}

function updatePagination(totalHits) {
    const totalPages = Math.ceil(totalHits / 20); // 20 images per page
    prevButton.style.display = currentPage > 1 ? 'block' : 'none';
    nextButton.style.display = currentPage < totalPages ? 'block' : 'none';
}

// Listen for input in the search bar
searchButton.addEventListener('click', () => {
    currentQuery = searchBar.value;
    currentPage = 1;
    fetchImages(currentQuery, currentOrder, currentPage);
});

// Event listeners for category buttons
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentQuery = button.getAttribute('data-category');
        currentPage = 1;
        fetchImages(currentQuery, currentOrder, currentPage);
    });
});

// Event listener for sort dropdown
sortDropdown.addEventListener('change', () => {
    currentOrder = sortDropdown.value;
    currentPage = 1;
    fetchImages(currentQuery, currentOrder, currentPage);
});

// Event listeners for pagination buttons
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchImages(currentQuery, currentOrder, currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    fetchImages(currentQuery, currentOrder, currentPage);
});


// Initial fetch of default category images
fetchImages();





const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));
