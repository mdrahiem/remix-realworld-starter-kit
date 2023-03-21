import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { validatePassword } from "~/utils";

// export const RegisterFormSchema = z.object({

// })

type SignupErrors = {
  email?: string;
  username?: string;
  password?: string;
};

export async function action({ request }: ActionArgs) {
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
  if (password && validatePassword(password))
    return json({
      formData,
      errors,
    });
}

export const loader: LoaderFunction = async () => redirect("/");
