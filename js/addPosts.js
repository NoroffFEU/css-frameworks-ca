
// Array of specific image filenames
const imageFilenames = [
    'blonde-1868701_1280.jpg',
    'girl-1562025_1280.jpg',
    'woman-1139397_1280.jpg',
    'woman-2667455_1280.jpg',
    'woman-3432069_1280.jpg',
    'man-2425121_1280.jpg',
    'people-2591874_1280.jpg',
    'photographer-407068_1280.jpg',
    'wedding-2784455_1280.jpg',
    'woman-1274056_1280.jpg',
    'woman-1853939_1280.jpg',
    'girl-5623231_1280.jpg',
    'woman-4366034_1280.jpg',
    'woman-1869116_1280.jpg'
];

// Create an array of complete image sources
const imageSrcs = imageFilenames.map(filename => `${filename}`);

// Display the images in the gallery
function addPosts(displayCount){
console.log("dsfsdf")
    const feedContainer = document.getElementById('feedContainer');
let count = 0
    for(let i = 0; i<displayCount; i++){
        if(!imageSrcs[count]){
            count-=imageSrcs.length
        }
        let src=imageSrcs[count]
        count ++
        feedContainer.innerHTML+=`
            <a href="../profile/index.html" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <img class="img-thumbnail" src="../images/${src}">
            </a>
        `
        
    }
}
