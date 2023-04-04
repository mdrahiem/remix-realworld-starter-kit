import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { validatePassword } from "~/utils";

type SignupErrors = {
  email?: string;
  username?: string;
  password?: string;
};

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const errors: SignupErrors = {};
  if (!email) {
    errors.email = "email can't be blank";
  }
  if (!username) {
    errors.username = "username can't be blank";
  }
  if (!password) {
    errors.password =
      "password must contain one small case letter, one number, minimum of 4 characters and maximum of 30 characters";
  }
  if (!password || !validatePassword(password)) {
    console.log("faillllll");
    return json({ errors }, { status: 400 });
  }
  console.log("ssssuuucccc");
  return json({
    formData,
    errors,
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
                <li>{actionData?.errors?.username}</li>
                <li>{actionData?.errors?.email}</li>
                <li>{actionData?.errors?.password}</li>
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
