import { auth } from "salesive-api-axios";

const createGhostUser = async () => {
  try {
    const token = localStorage.getItem("SALESIVE_ACCESS_TOKEN");

    if (!token) {
      const result = await auth.createGhost();

      if (Object.keys(result)?.length) {
        localStorage.setItem("USER_LOGGED_IN", "ghost_user");
      }
    }
  } catch (err) {
      if (err instanceof Error) {
          throw new Error(err?.message || "Error occurred while creating ghost user");
      }
      throw new Error("Unexpected error occurred while creating ghost user");
  }
};

export {
  createGhostUser
}