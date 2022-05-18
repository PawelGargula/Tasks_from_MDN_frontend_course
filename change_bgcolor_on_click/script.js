const buttonBar = document.querySelector('.button-bar');

buttonBar.addEventListener('click', e => {
    const choosedColor = e.target.getAttribute('data-color');
    if (choosedColor) {
        e.currentTarget.style.backgroundColor = choosedColor;
    }
});