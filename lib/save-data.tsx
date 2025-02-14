"use server";
import "server-only";

interface formTypes {
  username: string;
  email: string;
  password: string;
}

const saveFormData = (formData: formTypes): Promise<formTypes | null> => {
  try {
    console.group("Form Data");
    console.table(formData);
    console.groupEnd();

    throw new Error("Failed to insert post");
  } catch (error) {
    console.error("Error saving post:", error);
    return Promise.resolve(null);
  }
};

export default saveFormData;
