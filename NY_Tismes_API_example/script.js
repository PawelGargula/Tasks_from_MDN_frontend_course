// Defining a baseURL and key to as part of the request URL

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = '6FWvhmNWsxLXbai6vPz0spdM0lvvYNGf';

// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const pageNumberElement = document.querySelector('.page-number');
const section = document.querySelector('section');
const nav = document.querySelector('nav');

// Hide the prevBtn, nextBtn and pageNumberElement to begin with, as we don't need it immediately
nextBtn.style.display = 'none';
previousBtn.style.display = 'none';
pageNumberElement.style.display = 'none';

// define the initial page number and status of the navigation being displayed
let pageNumber = 0;

// Event listeners to control the functionality
searchForm.addEventListener('submit', submitSearch);

nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function nextPage(e) {
  pageNumber++;
  pageNumberElement.textContent = `Page ${pageNumber + 1}`;
  fetchResults(e);
};

function previousPage(e) {
  if (pageNumber > 0) {
    pageNumber--;
    pageNumberElement.textContent = `Page ${pageNumber + 1}`;
  } else {
    return;
  }
  fetchResults(e);
};



function submitSearch(e) {
  pageNumber = 0;
  pageNumberElement.textContent = `Page ${pageNumber + 1}`;
  fetchResults(e);
}

function fetchResults(e) {
  // Use preventDefault() to stop the form submitting
  e.preventDefault();

  // Assemble the full URL
  let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;

  if (startDate.value !== '') {
    url = `${url}&begin_date=${startDate.value}`;
  };

  if (endDate.value !== '') {
    url = `${url}&end_date=${endDate.value}`;
  };

  // Use fetch() to make the request to the API
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      } else {
        return response.json();
      }
    })
    .then(json => displayResults(json))
    .catch(error => console.error(`Error fetching data: ${error}`));

}

function displayResults(json) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  const articles = json.response.docs;

  if (articles.length === 10) {
    nextBtn.style.display = 'block';
    pageNumberElement.style.display = 'inline-block';
    previousBtn.style.display = pageNumber === 0 ? 'none' : 'block';
    // If there are no more pages and we are not on first page
  } else if (pageNumber > 0) {
    nextBtn.style.display = 'none';
    pageNumberElement.style.display = 'inline-block';
    previousBtn.style.display = 'block';
  } else {
    nextBtn.style.display = 'none';
    pageNumberElement.style.display = 'none';
    previousBtn.style.display = 'none';
  }

  if (articles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No results returned.'
    section.appendChild(para);
  } else {
    for (const current of articles) {
      const article = document.createElement('article');
      const heading = document.createElement('h2');
      const link = document.createElement('a');
      const img = document.createElement('img');
      const para1 = document.createElement('p');
      const keywordPara = document.createElement('p');
      keywordPara.classList.add('keywords');

      link.href = current.web_url;
      link.textContent = current.headline.main;
      para1.textContent = current.snippet;
      keywordPara.textContent = 'Keywords: ';
      for (const keyword of current.keywords) {
        const span = document.createElement('span');
        span.textContent = `${keyword.value} `;
        keywordPara.appendChild(span);
      }

      if (current.multimedia.length > 0) {
        img.src = `http://www.nytimes.com/${current.multimedia[0].url}`;
        img.alt = current.headline.main;
      }

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para1);
      article.appendChild(keywordPara);
      section.appendChild(article);
    }
  }
};

