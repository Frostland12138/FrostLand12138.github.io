var imageUrls = [
	"./images/image1.jpg",
	"./images/image2.jpg",
	"./images/image3.jpg",
	"./images/image4.jpg",
	"./images/image5.jpg",
	"./images/image6.jpg",
	"./images/image7.jpg",
	"./images/image8.jpg"
];

current_img = 0;

timer = null;

function WindowChange(_str)
{
	console.log(_str);

	// Create new imagesGrid.
	var new_imagesGrid = PhotoGalleryLib.generateGrid (imageUrls, _str);
	var table = document.getElementById("imagesTable");
	var old_imagesGrid = document.getElementById("imagesGrid");

	// Delete old imagesGrid.
	if(old_imagesGrid != null) {
		table.removeChild(old_imagesGrid);
	}

	table.appendChild(new_imagesGrid);
	PhotoGalleryLib.addImageClickHandlers(image_click);
}

function image_click(index) {
	PhotoGalleryLib.setModalImgSrc(imageUrls[index]);
	PhotoGalleryLib.openPresentationModal();
	current_img = index;
}

function next_image() {
	current_img = (current_img + 1) % imageUrls.length;
	PhotoGalleryLib.setModalImgSrc(imageUrls[current_img]);
}

function previous_img() {
	current_img = (current_img + imageUrls.length - 1) % imageUrls.length;
	PhotoGalleryLib.setModalImgSrc(imageUrls[current_img]);
}

// After clicking close button, the timer is also stopped.
function close_button() {
	PhotoGalleryLib.closePresentationModal();
	clearInterval(timer);
}

// The slideshow starts from the first image.
function start_slideshow() {
	current_img = 0;
	PhotoGalleryLib.openPresentationModal();
	image_click(0);
	timer = setInterval(next_image, 1000);
}

PhotoGalleryLib.createModal();
PhotoGalleryLib.initModal(close_button, previous_img, next_image);

var slideshowButton = document.getElementById('slideshowButton');
slideshowButton.addEventListener('click', start_slideshow);

PhotoGalleryLib.onSizeClassChange(WindowChange);
