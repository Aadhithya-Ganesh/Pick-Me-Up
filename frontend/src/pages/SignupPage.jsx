import { Form, Link, redirect } from "react-router-dom";

function SignupPage() {
  return (
    <main className="grid h-screen w-full grid-cols-1">
      {/* Left - Signup Form (2/3) */}
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-120 flex-col gap-4 p-10 sm:max-w-175">
          <h1 className="text-center text-4xl font-bold">Register</h1>

          {/* <div className="mb-5 flex items-center justify-between gap-2">
            <hr className="flex-1" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-1" />
          </div> */}

          <Form method="post" action="/signup" className="mt-5">
            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold tracking-[2px]"
                >
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-semibold tracking-[2px]"
                >
                  PHONE
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold tracking-[2px]"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold tracking-[2px]"
                >
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary m-auto block w-2/3 cursor-pointer rounded-full px-[25px] py-3 text-sm font-bold text-white shadow-xl hover:bg-yellow-200"
            >
              Submit
            </button>
          </Form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* <div>
        <img src="signup.svg" className="h-full"></img>
      </div> */}
    </main>
  );
}

export default SignupPage;

export const action = async ({ request }) => {
  console.log("signup action");
  return redirect("/login");
};
