var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import callApi from "./callApi.js";
import endpointObject from "./endpoints.js";
import optionFactory from "./optionFactory.js";
const endpoint = endpointObject("Jarle");
const getOption = optionFactory("GET", {}, endpoint);
export default function filterPosts(searchword, category) {
    return __awaiter(this, void 0, void 0, function* () {
        endpoint.filterUrl.resetCount();
        console.log(searchword, category);
        const data = yield callApi(endpoint.filterUrl.incrementUrl(), getOption);
        const allPosts = yield recursiveFilter(data);
        console.log(allPosts);
        let filteredPost;
        if (Array.isArray(allPosts[0][category])) {
            console.log("tags ROUTE TAKEN");
            filteredPost = allPosts.filter((post) => {
                var _a;
                return (_a = post[category]) === null || _a === void 0 ? void 0 : _a.some((element) => (element === null || element === void 0 ? void 0 : element.toLowerCase()) === (searchword === null || searchword === void 0 ? void 0 : searchword.toLowerCase()));
            });
        }
        else if (category === "author") {
            filteredPost = allPosts.filter((post) => { var _a; return ((_a = post[category]) === null || _a === void 0 ? void 0 : _a.name.toLowerCase()) === (searchword === null || searchword === void 0 ? void 0 : searchword.toLowerCase()); });
        }
        else {
            console.log(allPosts[0][category]);
            filteredPost = allPosts.filter((post) => { var _a; return ((_a = post[category]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === (searchword === null || searchword === void 0 ? void 0 : searchword.toLowerCase()); });
        }
        console.log(filteredPost);
        return filteredPost;
    });
}
function recursiveFilter(prevArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const postsPerPage = 100;
        const data = yield callApi(endpoint.filterUrl.incrementUrl(), getOption);
        if (data.length < postsPerPage) {
            return [...prevArray, ...data];
        }
        else if (data === undefined || data === null) {
            return [...prevArray];
        }
        else {
            return recursiveFilter([...prevArray, ...data]);
        }
    });
}
