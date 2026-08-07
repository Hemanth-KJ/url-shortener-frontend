export default async function handler(req, res) {

    const backendUrl =
        "https://wide-somehow-omaha-backing.trycloudflare.com";

    try {

        const path =
            req.url.replace(/^\/api\/proxy/, "");

        const targetUrl =
            `${backendUrl}${path}`;

        const headers = {
            "Content-Type":
                req.headers["content-type"] || "application/json"
        };

        if (req.headers.authorization) {

            headers.Authorization =
                req.headers.authorization;

        }

        const response = await fetch(targetUrl, {

            method: req.method,

            headers,

            body:
                req.method === "GET" ||
                req.method === "HEAD"
                    ? undefined
                    : JSON.stringify(req.body)

        });

        const contentType =
            response.headers.get("content-type");

        if (contentType) {

            res.setHeader(
                "Content-Type",
                contentType
            );

        }

        const data =
            await response.text();

        res.status(response.status).send(data);

    } catch (error) {

        console.error(
            "Proxy error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to connect to backend"

        });

    }

}