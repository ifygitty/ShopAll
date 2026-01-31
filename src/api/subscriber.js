import {api, auth} from "salesive-api-axios";



export const checkNewsletterEmail = async (email) => {
  try {
    const response = await api.get("/newsletter/check", {
      params: { email }, 
    });

    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || "Failed to check email"
    );
  }
};


export const subscribeNewsletter = async ({
  email,
  name,
  source = "website",
}) => {
  try {
    const response = await api.post("/newsletter/subscribe", {
      email,
      name,
      source,
    });

    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || "Failed to subscribe"
    );
  }
};

