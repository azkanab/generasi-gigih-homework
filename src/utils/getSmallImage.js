const BASIC_IMG_URL = './smiley.png'
const IMAGE_HEIGHT = 300 /* Choices: 640, 300, 64 */

export default function getSmallImage(images) {
    return images.find(image => { return image.height === IMAGE_HEIGHT }) || BASIC_IMG_URL
}