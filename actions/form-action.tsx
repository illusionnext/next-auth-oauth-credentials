"use server";
import "server-only";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import saveFormData from "@/lib/save-data";

interface PostFormState {
  message: string | null;
  errors: Record<string, string>;
}

const FormAction = async (
  prevState: PostFormState | null,
  formData: FormData,
): Promise<PostFormState> => {
  const errors: Record<string, string> = {};
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const formValues = {
    username,
    email,
    password,
  };

  if (!username) {
    errors.username = "Username is required.";
  }
  if (!email) {
    errors.email = "Email is required.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: "Validation failed. Please fix the errors above.",
      errors,
    };
  }

  try {
    await saveFormData(formValues);
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      message: "An error occurred while creating the post. Please try again.",
      errors: {},
    };
  }

  return redirect("/");
};

export default FormAction;
