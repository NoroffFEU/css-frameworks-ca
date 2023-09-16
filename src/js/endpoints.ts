export const endpoints = {
  register: "/social/auth/register",
  login: "/social/auth/login",
  baseUrl: "https://api.noroff.dev/api/v1",
  oneUser: "/social/profiles/<name>",
  allUsers: "/social/profiles",
  postsByOneUser: "/social/profiles/<name>/posts",
};

export default function endpointObject(userId: string | null) {
  return {
    register: "https://api.noroff.dev/api/v1/social/auth/register",
    login: "https://api.noroff.dev/api/v1/social/auth/login",
    baseUrl: "https://api.noroff.dev/api/v1",
    profileOneUser: `https://api.noroff.dev/api/v1/social/profiles/${userId}`,
    profileOneUserAllEnabled: `https://api.noroff.dev/api/v1/social/profiles/${userId}?_posts=true&_followers=true&_following=true`,
    profileAllUsers: "https://api.noroff.dev/api/v1/social/profiles",
    follow: `https://api.noroff.dev/api/v1/social/profiles/${userId}/follow`,
    unfollow: `https://api.noroff.dev/api/v1/social/profiles/${userId}/unfollow`,
    postsByOneUser: `https://api.noroff.dev/api/v1/social/profiles/${userId}/posts`,
    changeMedia: `https://api.noroff.dev/api/v1/social/profiles/${userId}/media`,
    allPostsFollowed: `https://api.noroff.dev/api/v1/social/posts/following?_author=true`,
    react: function (symbol: string) {
      return `/social/posts/<id>/react/${symbol}`;
    },
    getToken: function () {
      return JSON.parse(localStorage.getItem("token") || "");
    },
  };
}
