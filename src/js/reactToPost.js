var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import callApi from "./callApi";
import endpointObject from "./endpoints";
import optionFactory from "./optionFactory";
const endpoint = endpointObject("Jarle");
const put = optionFactory("PUT", {}, endpoint);
export default function reactToPost(symbol, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield callApi(endpoint.react(symbol, id), put);
        console.log(data);
    });
}
