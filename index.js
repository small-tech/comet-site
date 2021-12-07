//
// Calculate the current slide index based on the scroll position and viewport
// width of the carousel and use it to keep the same screenshot in view if
// the window is resized and also to display the currently-selected index
// in the navigation.
//

let lastKnownViewportWidth = null
let lastKnownViewportScrollPosition = null
let currentSlideIndex = 0
let transitioning = false

let navigationIndicators = null

function updateNavigationIndicators () {
  let navigationIndicatorIndex = 0
  navigationIndicators.forEach(navigationIndicator => {
    if (navigationIndicatorIndex === currentSlideIndex) {
      if (transitioning) {
        navigationIndicator.className = 'transitioning'
      } else {
        navigationIndicator.className = 'selected'
      }
    } else {
      navigationIndicator.className = ''
    }
    navigationIndicatorIndex++
  })
}

window.addEventListener('resize', () => {
  // Update the scroll position so the same slide stays perfectly
  // positioned within the carousel.
  const viewport = document.getElementById('viewport')
  viewport.scrollLeft = viewport.offsetWidth * currentSlideIndex
})

window.addEventListener('load', () => {

  // Save references to the navigation indicators.
  navigationIndicators = document.querySelectorAll('nav ol li a')

  // When a navigation indicator is clicked, we augment the default behaviour
  // by updating the indicators to display the requested position with a dimmed
  // indicator. When the transition is complete, our scroll event will pick it
  // up and brighten the indicator.
  navigationIndicators.forEach(navigationIndicator => {
    navigationIndicator.addEventListener('click', event => {
      const requestedIndex = Number(event.target.toString().replace(/.*?screenshot/, '')) - 1
      transitioning = true
      currentSlideIndex = requestedIndex
      updateNavigationIndicators()
    })
  })

  updateNavigationIndicators()

  document.getElementById('viewport').addEventListener('scroll', (event) => {
    const currentViewportWidth = event.target.offsetWidth;
    const currentViewportScrollPosition = event.target.scrollLeft;

    if (currentViewportScrollPosition % currentViewportWidth === 0) {
      currentSlideIndex = currentViewportScrollPosition / currentViewportWidth
      transitioning = false
      updateNavigationIndicators()
    }

    lastKnownViewportWidth = currentViewportWidth
    lastKnownViewportScrollPosition = currentViewportScrollPosition

    // console.log(`${lastKnownViewportWidth}: ${lastKnownViewportScrollPosition}`);
  })
})
