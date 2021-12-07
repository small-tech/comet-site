//
// Calculate the current slide index based on the scroll position and viewport
// width of the carousel and use it to keep the same screenshot in view if
// the window is resized and also to display the currently-selected index
// in the navigation.
//

let lastKnownViewportWidth
let lastKnownViewportScrollPosition
let currentSlideIndex = 0

window.addEventListener('resize', () => {
  // Update the scroll position so the same slide stays perfectly
  // positioned within the carousel.
  const viewport = document.getElementById('viewport')
  viewport.scrollLeft = viewport.offsetWidth * currentSlideIndex
})

window.addEventListener('load', () => {
  document.getElementById('viewport').addEventListener('scroll', (event) => {
    lastKnownViewportWidth = event.target.offsetWidth;
    lastKnownViewportScrollPosition = event.target.scrollLeft;

    if (lastKnownViewportScrollPosition % lastKnownViewportWidth === 0) {
      currentSlideIndex = lastKnownViewportScrollPosition / lastKnownViewportWidth
      console.log(`>>>> ${currentSlideIndex}`)
    }

    console.log(`${lastKnownViewportWidth}: ${lastKnownViewportScrollPosition}`);
  })
})
