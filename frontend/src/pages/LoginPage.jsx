import { Form, Link, redirect } from "react-router-dom";

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
                htmlFor="username"
                className="block text-[14px] font-semibold tracking-[2px]"
              >
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
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

export const action = async ({ request }) => {
  const data = await request.formData();
  const authdata = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const { token ,userid} = fetch()

  localStorage.setItem("token", token);
  localStorage.setItem("username", userid);

  return redirect("/");
};
