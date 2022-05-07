import cookie from "cookie";
import { Request } from "express";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export function parseCookies(
  req:
    | Request
    | IncomingMessage
    | (IncomingMessage & {
        cookies: NextApiRequestCookies;
      })
) {
  const parsedCookies = cookie.parse(req.headers.cookie || "");
  if (parsedCookies.user) {
    parsedCookies["user"] = JSON.parse(parsedCookies["user"]);
  }

  return parsedCookies;
  // return {};
}
