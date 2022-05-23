const section = document.querySelector('section');

let para1 = document.createElement('p');
let para2 = document.createElement('p');
let motherInfo = 'The mother cats are called ';
let kittenInfo;
const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/tasks/json/sample.json';

fetch(requestURL)
    .then(response => response.text())
    .then(text => displayCatInfo(text))

function displayCatInfo(catString) {
    // Add your code here
    const mothers = JSON.parse(catString);

    const kittensQuantity = {
        all: 0,
        male: 0,
        female: 0
    }

    for (let i = 0; i < mothers.length; i++) {
        // Create string with mothers names
        let separator = '';
        // If one before last 
        if (mothers.length > 1 && i === mothers.length - 2) {
            separator = ' and ';
        } else if (i === mothers.length - 1) {
            separator = '.';
        } else {
            separator = ', ';
        }
        motherInfo += `${mothers[i]['name']}${separator}`;

        // Count kittens
        motherKittens = mothers[i]['kittens'];
        for (const kitten of motherKittens) {
            kittensQuantity['all']++;
            kitten['gender'] === 'm' ? kittensQuantity['male']++ : kittensQuantity['female']++; 
        }
    }

    kittenInfo = `Together they have ${kittensQuantity['all']} kittens, ${kittensQuantity['male']} male and ${kittensQuantity['female']} female.`
    
    // Don't edit the code below here!

    para1.textContent = motherInfo;
    para2.textContent = kittenInfo;
}
section.appendChild(para1);
section.appendChild(para2);