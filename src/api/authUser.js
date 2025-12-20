import {auth} from "salesive-api-axios";

const createGhostUser = async () => {
  try {
      const token = localStorage.getItem("SALESIVE_ACCESS_TOKEN");
      if (token) return;
      const response = await auth.createGhost();
      return response?.data;
  }catch(err) {
      if(err instanceof Error) {
        throw new Error(err.message || "Error occurred while trying to create ghost user");
      }
      throw new Error("Unexpected error occurred while trying to create ghost user");
  }
}

export {
  createGhostUser
}