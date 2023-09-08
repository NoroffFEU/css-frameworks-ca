"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = void 0;
exports.endpoints = {
    register: "/social/auth/register",
    login: "/social/auth/login",
    baseUrl: "https://api.noroff.dev/api/v1",
    oneUser: "/social/profiles/<name>",
    allUsers: "/social/profiles",
    postsByOneUser: "/social/profiles/<name>/posts"
};
function endpointObject(userId) {
    return { register: "/social/auth/register",
        login: "/social/auth/login",
        baseUrl: "https://api.noroff.dev/api/v1",
        oneUser: `/social/profiles/${userId}`,
        allUsers: "/social/profiles",
        postsByOneUser: `/social/profiles/${userId}/posts`
    };
}
exports.default = endpointObject;
function getUserUrl(userID) {
    return ``;
}
