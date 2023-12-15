import { API_SOCIAL_URL } from "../api/constants.mjs";
import { authFetch } from "../api/authFetch.mjs";
import { displayError } from "../handlers/error.mjs";

/**
 * Allows us to view single post from the api by id
 */
    
     export async function singlePost() {
        const resultById = document.querySelector("#singlePost");
         try {
            const queryString = document.location.search;
            const params = new URLSearchParams(queryString);
             const id = params.get("id");
             const singleUrl = API_SOCIAL_URL + "/posts/" + id + "?_author=true";
            const response = await authFetch(singleUrl);
            const singleResult = await response.json();
             
             function createHtml() {
                let image = `<img
                src="../images/food-712665_640.jpg"
                class="card-img-top"
                alt="post image"
                 />`;
               if (singleResult.media) {
               image = `<img
               src="${singleResult.media}"
               class="card-img-top"
               alt="post image"
               />`;
                 }
                resultById.innerHTML += `<div>
                <h4>${singleResult.title}</h4>
                ${image}
                <p>${singleResult.body}</p>
                </div>`;  
             }
                createHtml();
            
        }
        catch (error) {
            resultById.innerHTML += displayError(
              "An error occurred when calling the API");
          }
    }
    
      

