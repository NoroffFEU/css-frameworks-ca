// DENNE ER NY ETTER Å FØLGE OLIVER PÅ YOUTUBE

import { BASE_URL } from "../api.mjs";
import * as stringify from "../../handler/storage.mjs";

const action = "auth/login";
const method = "post";

export async function login(profile){
  const loginURL = BASE_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
    "Content-Type": "application/json"
    },
    method,
    body
  })

  const { accessToken, ...userProfile} = await response.json()

	storage.save("token", accessToken)
	storage.save("profile", userProfile)

}

