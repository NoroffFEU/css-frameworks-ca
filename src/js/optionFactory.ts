interface endpointObject {
  register: string;
  login: string;
  baseUrl: string;
  profileOneUser: string;
  profileOneUserAllEnabled: string;
  profileAllUsers: string;
  follow: string;
  unfollow: string;
  postsByOneUser: string;
  changeMedia: string;
  allPostsFollowed: string;
  createPost: string;
  getId: Function;
  react: Function;
  getToken: Function;
}

type htmlMethod = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";

export default function optionFactory(
  method: htmlMethod,
  body: {},
  endpointObject: endpointObject
) {
  const newObject: {
    method: htmlMethod;
    headers: { Authorization: string; "Content-type": string };
    body?: {};
  } = {
    method: method,
    headers: {
      Authorization: `Bearer ${endpointObject.getToken()}`,
      "Content-type": "application/json",
    },
  };
  if (Object.keys(body).length !== 0) {
    newObject.body = JSON.stringify(body);
  }
  return newObject;
}
