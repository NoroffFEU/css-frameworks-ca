import { createProfileId } from "../utils/queryParam.js";
const id = createProfileId();

const baseUrl = "https://api.noroff.dev/api/v1/";

const registerUrl = baseUrl + `social/auth/register`;
const loginUrl = baseUrl + `social/auth/login`;

const postsUrl = baseUrl + `social/posts`;
const postUrl = postsUrl + `/${id}`;
const profilesUrl = baseUrl + `social/profiles`;

const profileParameter = profilesUrl + `/${id}` + `?_followers=true&_following=true`;
const profilePostParameter = profilesUrl + `/${id}/` + `posts?_author=true&_comments=true&_reactions=true`;
const usersUrl = profilesUrl + `/?_following&_followers&_posts`;

const postsParameter = postsUrl + `?_author=true&_comments=true&_reactions=true`;
const postParameter = postUrl + `/?_author=true&_comments=true&_reactions=true`;
const followedPosts = postsUrl + `/following?_author=true&_comments=true&_reactions=true`;
const activePostsUrl = postsParameter + `&_active=true`;

const commentUrl = postUrl + `/comment`;
const avatarUrl = profilesUrl + `/${id}/media`;

export const apiUrls = {
  register_Url: registerUrl,
  login_Url: loginUrl,
  posts_Url: postsUrl,
  post_Url: postUrl,
  profiles_Url: profilesUrl,
  profile_Parameter: profileParameter,
  profile_Posts_Parameter: profilePostParameter,
  users_Url: usersUrl,
  posts_Parameter: postsParameter,
  post_parameter: postParameter,
  followed_posts: followedPosts,
  comment_Url: commentUrl,
  active_Posts_Url: activePostsUrl,
  avatar_Url: avatarUrl,
};
