import { API_KEY, API_URL } from "../constants";

type RemoveBackgroundRequestBody = {
  image_file_b64: string;
};

export const removeBackground = async (data: RemoveBackgroundRequestBody) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  const result = await response.json();
  return result;
};
