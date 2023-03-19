import { ActionArgs, json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import axios from "axios";
import { createUserSession } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import { Card } from "~/_components/card";
import { SubmitButton } from "~/_components/inputs/submitButton";
import { SubtleRedirect } from "~/_components/inputs/subtleRedirect";
import { TextInput } from "~/_components/inputs/textInput";

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const userInfo = {email, password}
    const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
    const remember = formData.get("remember");
    if (!validateEmail(email)) {
      return json(
        { errors: { email: "Email is invalid", password: null } },
        { status: 400 }
      );
    }
    if (typeof password !== "string" || password.length === 0) {
      return json(
        { errors: { email: null, password: "Password is required" } },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return json(
        { errors: { email: null, password: "Password is too short" } },
        { status: 400 }
      );
    }
  
    let user;
    try {
        const {data} = await axios.post(process.env.BACKEND_API + '/user/login', userInfo);
        user=data;
    } catch(e) {
        return json(
            { errors: { error: (e as any)?.message } },
            { status: 400 }
        );
    }
    if (!user) {
      return json(
        { errors: { error: "Invalid email or password", password: null } },
        { status: 400 }
      );
    }
  
    return createUserSession({
      request,
      userObject: user,
      remember: remember === "on" ? true : false,
      redirectTo,
    });
}

export default function Login() {
    const data = useActionData()
    return (
        <Card title="Welcome Back!" description="Log in to continue." error={data?.errors?.error}>
            <form method="post">
                <TextInput placeHolder={'Email'} name={'email'}/>
                <TextInput placeHolder={'Password'} name={'password'} type={'password'}/>
                <SubtleRedirect text="Don’t have an account? Sign up." url="/sign-up"/>
                <SubmitButton text="Log In"/>
            </form>
        </Card>
    );
  }
  