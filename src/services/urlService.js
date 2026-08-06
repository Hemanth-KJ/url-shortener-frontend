import api from "./api";

export const createShortUrl = async (urlData) => {

    const response = await api.post(
        "/urls",
        urlData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    return response.data;
};

export const getMyUrls = async () => {

    const response = await api.get(
        "/users/me/urls",   // ✅ Fixed endpoint
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    return response.data;
};
export const getAnalytics = async (shortCode) => {

    const response = await api.get(

        `/urls/${shortCode}/analytics`,

        {

            headers: {

                Authorization:
                    `Bearer ${localStorage.getItem("token")}`

            }

        }

    );

    return response.data;

};