const images = [
  { src: "./kitten-1.jpg", alt: "Kitten 1" },
  { src: "./kitten-2.jpg", alt: "Kitten 2" },
  { src: "./kitten-3.jpg", alt: "Kitten 3" },
  { src: "./kitten-4.jpg", alt: "Kitten 4" },
  { src: "./puppy-1.jpg", alt: "Puppy 1" },
  { src: "./puppy-2.jpg", alt: "Puppy 2" }
];



let currentIndex = 0;
let slideshowInterval;
let isPlaying = true;

const gallery = document.getElementById("gallery");
const thumbnails = document.getElementById("thumbnails");

// Load gallery
images.forEach((img, index) => {
  const image = document.createElement("img");
  image.src = img.src;
  image.alt = img.alt;
  image.onclick = () => openModal(index);
  gallery.appendChild(image);
});

// Open modal
function openModal(index) {
  currentIndex = index;
  document.getElementById("modal").style.display = "block";
  updateModal();
  startSlideshow();
}

// Close modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
  clearInterval(slideshowInterval);
}

// Navigate
function changeImage(dir) {
  currentIndex = (currentIndex + dir + images.length) % images.length;
  updateModal();
}

// Update modal
function updateModal() {
  const modalImg = document.getElementById("modalImg");
  const caption = document.getElementById("caption");

  modalImg.src = images[currentIndex].src;
  caption.innerText = images[currentIndex].alt;

  thumbnails.innerHTML = "";
  images.forEach((img, i) => {
    const thumb = document.createElement("img");
    thumb.src = img.src;
    thumb.className = i === currentIndex ? "active" : "";
    thumb.onclick = () => {
      currentIndex = i;
      updateModal();
    };
    thumbnails.appendChild(thumb);
  });
}

// Slideshow
function startSlideshow() {
  slideshowInterval = setInterval(() => {
    changeImage(1);
  }, 3000);
}

function toggleSlideshow() {
  if (isPlaying) {
    clearInterval(slideshowInterval);
  } else {
    startSlideshow();
  }
  isPlaying = !isPlaying;
}

// Theme toggle
document.getElementById("toggleMode").onclick = () => {
  document.body.classList.toggle("dark");
};
