import { redirect } from "@remix-run/node";

export function loader() {
  // Redirecting the / route to /articles
  return redirect("/articles");
}
