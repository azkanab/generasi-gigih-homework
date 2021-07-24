const BASIC_IMG_URL = '/smiley.png'

export default function getImageBasedOnSize(images, size) {
    return images.find(image => { return image.width === size }) || BASIC_IMG_URL
}