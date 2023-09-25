/**
 * This will filter and sort a list of cards based on search input and sorting option.
 * ```js
* function filterAndSortPosts() {
* // ... (rest of the function remains the same)

* if (sortValue === 'title') {
* // Sort cards by title
*   cards.sort((a, b) => {
*      const titleA = a.querySelector('.card-title').textContent.toLowerCase();
*      const titleB = b.querySelector('.card-title').textContent.toLowerCase();
*      return titleA.localeCompare(titleB);
*    });
*  }
*
*  // Clear and re-add the sorted cards to the container
*  cardsContainer.innerHTML = '';
*  cards.forEach((card) => {
*    cardsContainer.appendChild(card);
*  });
*}
*
 * Event listener for the search input. Calls the filterAndSortPosts function.
 * @listens input
 */


export function filterAndSort() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  searchInput.addEventListener('input', filterAndSortPosts);
  sortSelect.addEventListener('change', filterAndSortPosts);

  function filterAndSortPosts() {
    const searchInputValue = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    const cardsContainer = document.getElementById('postContainer');
    const cards = Array.from(cardsContainer.querySelectorAll('.card'));

    if (searchInputValue === '') {

      cards.forEach((card) => {
        card.style.display = 'block';
      });
      
    } else {
      const filteredCards = cards.filter((card) => {
        const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
        const cardText = card.querySelector('.card-text').textContent.toLowerCase();
        return cardTitle.includes(searchInputValue) || cardText.includes(searchInputValue);
      });

      filteredCards.forEach((card) => {
        card.style.display = 'block';
      });

      cards.forEach((card) => {
        if (!filteredCards.includes(card)) {
          card.style.display = 'none';
        }
      });
    }

    if (sortValue === 'title') {
      cards.sort((a, b) => {
        const titleA = a.querySelector('.card-title').textContent.toLowerCase();
        const titleB = b.querySelector('.card-title').textContent.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    }

    cardsContainer.innerHTML = '';
    cards.forEach((card) => {
      cardsContainer.appendChild(card);
    });
  }
}
    /*if (sortValue === 'date') {
    filteredCards.sort((a, b) => {
      const dateA = new Date(a.dataset.created);
      const dateB = new Date(b.dataset.created);
      console.log('dateA:', dateA);
      console.log('dateB:', dateB);
      return dateB - dateA;
    })
  };*/
