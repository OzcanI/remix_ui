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
    const name = formData.get("email");
    const email = formData.get("email");
    const password = formData.get("password");
    const userInfo = {email, password, name}
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
        const {data} = await axios.post(process.env.BACKEND_API + '/user/register', userInfo);
        user=data;
    } catch(e) {
        console.log((e as any).response?.data)
        return json(
            { errors: { error: (e as any)?.message, errorObject: (e as any).response?.data} },
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

export default function SignUp() {
    const data = useActionData()
    return (
        <Card title="Welcome" description="Sign up to start using Simpledo today." error={data?.errors?.error}>
            <form method="post">
                <TextInput placeHolder={'Name'} name={'name'}/>
                <TextInput placeHolder={'Email'} name={'email'}/>
                <TextInput placeHolder={'Password'} name={'password'} type={'password'}/>
                <SubtleRedirect text="Do have an account? Sign in." url="/login"/>
                <SubmitButton text="Sign Up"/>
            </form>
        </Card>
    );
  }
  