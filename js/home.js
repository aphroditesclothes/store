const commContainers = [...document.querySelectorAll('.comm-container')];
const prev = [...document.querySelectorAll('.pre-button')];
const next = [...document.querySelectorAll('.nxt-button')];

commContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    next[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    prev[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
});