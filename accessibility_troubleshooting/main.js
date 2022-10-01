// functionality for showing/hiding the comments section

const showHideCommentsBtn = document.querySelector('.show-hide.comments-button');
const commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';

showHideCommentsBtn.onclick = function() {
  let showHideText = showHideCommentsBtn.textContent;
  if(showHideText === 'Show comments') {
    showHideCommentsBtn.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
  } else {
    showHideCommentsBtn.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
  }
};

const showHideTranscriptionBtn = document.querySelector('.transcription-button');
const transcription = document.querySelector('.transcription');

showHideTranscriptionBtn.onclick = () => {
  if (transcription.classList.contains('hidden')) {
    transcription.classList.remove('hidden');
  } else {
    transcription.classList.add('hidden');
  }
};

// functionality for adding a new comment via the comments form

const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.onsubmit = function(e) {
  e.preventDefault();
  submitComment();
};

function submitComment() {
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  const nameValue = nameField.value;
  const commentValue = commentField.value;

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  nameField.value = '';
  commentField.value = '';
}
