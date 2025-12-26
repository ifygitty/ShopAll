import {auth} from "salesive-api-axios";

export const createGhostUser = async () => {
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

export const checkEmailExists = async ({email}) => {
    try {
        const response = await auth.checkUser({email});
        return response;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to check if user exists");
        }
        throw new Error("Unexpected Error occurred while trying to check if email exists");
    }
}

export const sendAuthOtp = async ({email, name, phone}) => {
    try {
        const response = await auth.authenticate({email, name, phone});
        return response;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to create user");
        }
        throw new Error("Unexpected error occurred while trying to create user");
    }
}

export const verifyOtp = async ({email, otp}) => {
    try {
        const response = await auth.verify({email, otp});
        return response;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying verify user email");
        }
        throw new Error("Unexpected Error occurred while trying verify user email");
    }
}

export const resendOtp = async ({email}) => {
    try {
        const response = await auth.resendOtp({email});
        return response;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to resend otp");
        }
        throw new Error("Unexpected error while trying to resend otp");
    }
}
