export async function fetchPostsByUsername(username) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/social/profiles/${username}/posts`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
