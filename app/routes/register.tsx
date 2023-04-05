import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { signupSchema } from "~/schemas/signup.schema";
import { validatePassword } from "~/utils";

type SignupErrors = {
  message?: string | null;
};

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const errors: SignupErrors = {};
  if (!username) {
    errors.message = "username can't be blank";
    return json({ errors }, { status: 400 });
  } else if (!email) {
    errors.message = "email can't be blank";
    return json({ errors }, { status: 400 });
  } else if (!password || !validatePassword(password)) {
    errors.message =
      "password must contain one small case letter, one number, minimum of 4 characters and maximum of 30 characters";
    return json({ errors }, { status: 400 });
  } else {
    errors.message = null;
  }
  console.log("bodydddddd", username, email, password);
  const signupResponse = await fetch(
    `${process.env.PUBLIC_API_BASE_URL}/users`,
    {
      method: "POST",
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const signupJsonResponse = await signupResponse.json();
  const parsedSignupResponse = await signupSchema.parse(signupJsonResponse);
  if (parsedSignupResponse?.user) {
    return redirect("/");
  }
  console.log("ssssuuucccc", signupJsonResponse);
  return json({
    formData,
    errors,
    parsedSignupResponse,
  });
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="/">Have an account?</a>
            </p>

            {actionData?.errors && (
              <ul className="error-messages">
                <li>{actionData?.errors?.message}</li>
              </ul>
            )}

            <Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="username"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
