const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const fileNames = [ 
    'pic1.jpg',
    'pic2.jpg',
    'pic3.jpg',
    'pic4.jpg',
    'pic5.jpg', 
];

/* Looping through images */
fileNames.forEach(fileName => {
    const newImg = new Image();
    newImg.src = `images/${fileName}`;
    thumbBar.appendChild(newImg);
    newImg.addEventListener('click', e => displayedImage.src = e.target.src);
});

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', e => {
    let currentClass = e.target.getAttribute('class');
    if (currentClass === 'dark') {
        e.target.setAttribute('class', 'light');
        e.target.textContent = 'Lighten';
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else {
        e.target.setAttribute('class', 'dark');
        e.target.textContent = 'Darken';
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
})