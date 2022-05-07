import cookie from "cookie";
import { parseCookies } from "./cookieParser";

export const initUser = (incomingCookie: string | undefined) => {
  if (incomingCookie) {
    const cookieData = cookie.parse(incomingCookie);
    if (cookieData.user) {
      cookieData["user"] = JSON.parse(cookieData["user"]);
    }
    console.log(incomingCookie);
    console.log(cookieData);
    const token = cookieData.user;
    if (token) {
      return token;
    }
  }
  return null;
};
