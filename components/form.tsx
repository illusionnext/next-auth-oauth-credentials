"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import FormAction from "@/actions/form-action";
import Form from "next/form";

const ProfileForm = () => {
  const [state, formAction, isPending] = useActionState(FormAction, {
    message: null,
    errors: {},
  });

  return (
    <main className={`grid place-content-center place-items-center h-dvh`}>
      <h1 className="text-2xl font-bold m-4">Create a new post</h1>
      <Form
        action={formAction}
        className={`grid gap-2 w-full max-w-md place-items-center border-2 border-gray-500 rounded-lg p-6 drop-shadow-lg`}
      >
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          name="username"
          spellCheck={true}
          lang="en-us"
          placeholder="Enter your username"
          required
        />
        {state?.errors?.username && (
          <span className="text-red-500 text-sm">{state.errors.username}</span>
        )}

        <label htmlFor="email">Email</label>
        <Input
          type="text"
          id="email"
          name="email"
          spellCheck={true}
          lang="en-us"
          placeholder="Enter your email"
          required
        />
        {state?.errors?.email && (
          <span className="text-red-500 text-sm">{state.errors.email}</span>
        )}

        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          spellCheck={true}
          lang="en-us"
          placeholder="Enter your password"
          required
        />

        {isPending ? (
          <Button mt-4 disabled>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Please wait
          </Button>
        ) : (
          <Button
            className={`cursor-pointer drop-shadow-2xl mt-4`}
            variant={`default`}
            type="submit"
            disabled={isPending}
          >
            Submit
          </Button>
        )}
      </Form>
    </main>
  );
};

export default ProfileForm;
