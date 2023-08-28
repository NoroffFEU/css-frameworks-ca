const avatars = [
    'avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg' // ... add more avatar filenames
  ];
  
  const usernames = [
    'johndoe', 'janedoe', 'user123', 'webdev', 'socmed' // ... add more usernames
  ];
  
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  function updateProfile() {
    const userAvatar = document.querySelector('.user-avatar img');
    const usernameElement = document.getElementById('username');
    const followBtn = document.getElementById('followBtn');
  
    const randomAvatar = getRandomElement(avatars);
    const randomUsername = getRandomElement(usernames);
  
    userAvatar.src = `src/images/${randomAvatar}`;
    usernameElement.textContent = randomUsername;
    followBtn.textContent = 'Follow';
  }
  
  const words = [
    'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
    'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
    'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'
    // Add more words as needed
  ];
  
  function generateRandomText(numWords) {
    return Array.from({ length: numWords }, () => getRandomElement(words)).join(' ');
  }
  
  function generateRandomPosts(numPosts, numWordsPerPost) {
    const posts = [];
  
    for (let i = 0; i < numPosts; i++) {
      const randomText = generateRandomText(numWordsPerPost);
      posts.push({
        image: `post${i + 1}.jpg`, // Assuming you have post images named post1.jpg, post2.jpg, ...
        content: randomText
      });
    }
  
    return posts;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    updateProfile();
  
    const numPosts = 5; // Number of posts to generate
    const numWordsPerPost = 20; // Number of words in each generated post
    const posts = generateRandomPosts(numPosts, numWordsPerPost);
  
    const profileContent = document.querySelector('.profile-content');
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('profile-post');
  
      const postImage = document.createElement('img');
      postImage.src = `src/images/${post.image}`;
      postImage.alt = 'Post Image';
  
      const postContent = document.createElement('div');
      postContent.classList.add('post-content');
  
      const postText = document.createElement('p');
      postText.textContent = post.content;
  
      postContent.appendChild(postText);
  
      const postIcons = document.createElement('div');
      postIcons.classList.add('post-icons');
  
      const likeIcon = document.createElement('i');
      likeIcon.classList.add('fas', 'fa-heart', 'icon', 'like-icon');
      likeIcon.style.color = 'red'; // Set like icon color to red
      const shareIcon = document.createElement('i');
      shareIcon.classList.add('fas', 'fa-share', 'icon', 'share-icon');
      shareIcon.style.color = 'green'; // Set share icon color to green
  
      postIcons.appendChild(likeIcon);
      postIcons.appendChild(shareIcon);
  
      postElement.appendChild(postImage);
      postElement.appendChild(postContent);
      postElement.appendChild(postIcons);
  
      profileContent.appendChild(postElement);
    });
  
    const followBtn = document.getElementById('followBtn');
    const menuBtn = document.getElementById('menuBtn');
    const profileMenu = document.querySelector('.profile-menu');
  
    followBtn.addEventListener('click', function() {
      followBtn.textContent = (followBtn.textContent === 'Follow') ? 'Following' : 'Follow';
    });
  
    menuBtn.addEventListener('click', function() {
      profileMenu.classList.toggle('show-menu');
    });
  });
  