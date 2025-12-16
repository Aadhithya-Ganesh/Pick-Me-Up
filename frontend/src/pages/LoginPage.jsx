import { Form, Link, redirect } from "react-router-dom";
import axios from "axios";

{new URLSearchParams(location.search).get("error") && (
  <p className="text-red-600 text-center font-semibold mt-2">
    Invalid email or password
  </p>
)}

function LoginPage() {
  return (
    <main className="flex h-screen w-full flex-col lg:flex-row">
      <div className="flex w-full items-center justify-center bg-[url(/form-graphic.svg)] bg-contain bg-bottom-right bg-no-repeat">
        <div className="w-full max-w-150 p-10">
          <h1 className="my-5 text-center text-4xl font-bold">Sign In</h1>

          <Form
            className="mt-5 flex flex-col gap-4"
            action="/login"
            method="post"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-[14px] font-semibold tracking-[2px]"
              >
                EMAIL ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                pattern="^[^\s@]+@[^\s@]+\.com$"
                title="Enter a valid email, example: user@example.com"
                className="mt-2 w-full rounded-2xl border-2 border-gray-200 px-3 py-3"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[14px] font-semibold tracking-[2px]"
              >
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$"
                title="Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character"
                className="mt-2 w-full rounded-2xl border-2 border-gray-200 px-3 py-3"
              />
            </div>

            <button
              type="submit"
              className="bg-primary m-auto my-5 block w-2/3 cursor-pointer rounded-full px-[25px] py-3 text-xs font-bold text-white shadow-xl transition-colors ease-in hover:bg-yellow-200 md:text-sm"
            >
              Submit
            </button>
          </Form>

          <p className="mt-4 text-center text-[14px]">
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;

export async function action({ request }) {
  console.log("Login action running...");
  const form = await request.formData();

  const payload = {
    email: form.get("email"),       
    password: form.get("password"),
  };

  try {
    const res = await axios.post(`http://${import.meta.env.VITE_GATEWAY}/api/auth/login`, payload);
    // const res = await axios.post(`http://localhost:8082/api/auth/login`, payload);

    const token = res.data.access_token;
    
    localStorage.setItem("token", token);
    localStorage.setItem("email", payload.email);

        // Fetch user details with /users/me
    const me = await axios.get(`http://${import.meta.env.VITE_GATEWAY}/api/users/me`, {
    // const me = await axios.get(`http://localhost:8082/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const fullName = me.data.firstName + " " + me.data.lastName;
    localStorage.setItem("username", fullName);
    localStorage.setItem("gender", me.data.gender);

    localStorage.setItem("userId", me.data.id);

    return redirect("/");
  } catch (err) {
    console.error("LOGIN_FAILED:", err.response?.data || err.message);
    return redirect("/login?error=1");
  }
}