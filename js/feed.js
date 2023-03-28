const fetchData = async () => {
    const response = await fetch('https://www.acheap.shop/wp-json/wp/v2/posts?_embed');
    const data = await response.json();
    
    // Loop through the data and create cards
    data.slice(0, 10).forEach(post => {
      // Create card elements
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');
      const card = document.createElement('div');
      card.classList.add('card');
      const img = document.createElement('img');
      img.classList.add('card-img-top');
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      const title = document.createElement('h5');
      title.classList.add('card-title');
      const description = document.createElement('p');
      description.classList.add('card-text');
      
      // Populate card elements with data
      if (post._embedded && post._embedded['wp:featuredmedia']) {
        const imgURL = post._embedded['wp:featuredmedia'][0].source_url;
        img.src = imgURL;
      } else {
        img.src = 'https://via.placeholder.com/150';
      }
      title.innerText = post.title.rendered;
      description.innerHTML = post.excerpt.rendered;
      
      // Append elements to card and card to cardDiv
      cardBody.appendChild(title);
      // cardBody.appendChild(description);
      card.appendChild(img);
      card.appendChild(cardBody);
      cardDiv.appendChild(card);
      
      // Add cardDiv to HTML document
      document.getElementById('post-cards').appendChild(cardDiv);
    });
  };
  
  // Call the fetchData function to display data on page load
  fetchData();