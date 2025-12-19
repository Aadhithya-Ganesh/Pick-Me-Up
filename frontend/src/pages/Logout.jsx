import { redirect } from "react-router-dom";

export async function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("gender");
  localStorage.removeItem("userId");
  localStorage.removeItem("member_since");
  return redirect("/");
}
