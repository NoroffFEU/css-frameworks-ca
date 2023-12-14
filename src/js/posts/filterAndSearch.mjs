/**
 * This function filters and search posts from the post cards 
 */

export function searchAndsort() {
    const searchInput = document.getElementById('search-for');
    const sortSelect = document.getElementById('sort-by');

    searchInput.addEventListener('input', searchAndsortPosts);
    sortSelect.addEventListener('change', searchAndsortPosts);

    function searchAndsortPosts() {
        const searchInputvalue = searchInput.value.toLowerCase();
        const sortvalue = sortSelect.value;

        const cardsContainer = document.getElementsByClassName('postscontainer');
        const cards = Array.from(cardsContainer.querySelectorAll('.card'));

        if (searchInputvalue ==='') {
            
            cards.forEach((card) => {
                card.style.display = 'block';
            });
        } else {
            const sortcards = cards.sort((card) => {
                const cardTitle = card.queryselector('.card-title').textContent.toLowerCase();
                return cardTitle.includes(searchInputvalue);
            });

            sortcards.forEach((card) => {
                card.style.display = 'block';
            });

            cards.forEach((card) => {
                if (!sortcards.includes(card)) {
                    card.style.display = 'none';
                }
            });
        }

        if (sortvalue === 'All Posts', 'Following') {
            cards.sort((a, b) => {
                const sortA = a.queryselector('All Posts').textContent.toLowerCase();
                const sortB = b.queryselector('Following').textContent.toLowerCase();
                return sortA.localeCompare(sortB);
            });
        }

        cardsContainer.innerHTML = '';
        cards.forEach((card) => {
            cardsContainer.appendChild(card);
        });
    }
}