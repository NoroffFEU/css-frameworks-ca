var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function callApi(endpoint, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (_a = document.querySelector(".spinner-border")) === null || _a === void 0 ? void 0 : _a.style.display = "block";
            const response = yield fetch(endpoint, options);
            const data = yield response.json();
            console.log(data);
            if (data.length > 0 && data) {
                return data;
            }
            else if (data.title) {
                return data;
            }
            else {
                throw new Error("response is empty, or not what expected");
            }
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            (_b = document.querySelector(".spinner-border")) === null || _b === void 0 ? void 0 : _b.style.display = "none";
        }
    });
}
