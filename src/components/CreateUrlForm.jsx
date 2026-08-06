import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShortUrl } from "../services/urlService";
import "../styles/CreateUrlForm.css";

function CreateUrlForm() {

    const navigate = useNavigate();

    const [originalUrl, setOriginalUrl] = useState("");
    const [customShortCode, setCustomShortCode] = useState("");
    const [expiresAt, setExpiresAt] = useState("");

    const [result, setResult] = useState(null);
    const [createdExpiresAt, setCreatedExpiresAt] = useState("");

    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setResult(null);
        setCopied(false);

        try {

            const response = await createShortUrl({

                originalUrl: originalUrl,

                customShortCode: customShortCode.trim(),

                expiresAt: expiresAt
                    ? expiresAt
                    : null

            });


            console.log(
                "Create URL response:",
                response
            );


            setResult(response.data);

            /*
             * Keep the selected expiration date
             * for displaying in the result card.
             *
             * This is useful even if the backend
             * response does not contain expiresAt.
             */
            setCreatedExpiresAt(expiresAt);


            // Clear form
            setOriginalUrl("");
            setCustomShortCode("");
            setExpiresAt("");


        } catch (error) {

            console.error(
                "Create URL error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Unable to create short URL"

            );

        } finally {

            setLoading(false);

        }

    };


    const copyToClipboard = async () => {

        if (!result?.shortUrl) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                result.shortUrl
            );

            setCopied(true);


            setTimeout(() => {
                setCopied(false);
            }, 2000);


        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

            alert("Failed to copy URL.");

        }

    };


    const openShortUrl = () => {

        if (!result?.shortUrl) {
            return;
        }

        window.open(
            result.shortUrl,
            "_blank",
            "noopener,noreferrer"
        );

    };


    const openQrCode = () => {

        if (!result?.shortCode) {
            return;
        }


        window.open(

            `http://35.255.40.1/api/v1/urls/${result.shortCode}/qrcode`,

            "_blank",
            "noopener,noreferrer"

        );

    };


    const openAnalytics = () => {

        if (!result?.shortCode) {
            return;
        }


        navigate(
            `/analytics/${result.shortCode}`
        );

    };


    return (

        <div className="create-container">


            {/* =========================
                CREATE FORM CARD
            ========================= */}

            <div className="create-card">


                <div className="form-heading">

                    <div className="form-icon">
                        🔗
                    </div>

                    <div>

                        <h2>
                            Create Short URL
                        </h2>

                        <p>
                            Enter your URL and customize
                            your short link.
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>


                    {/* ORIGINAL URL */}

                    <div className="form-group">

                        <label>
                            Original URL
                            <span>*</span>
                        </label>

                        <div className="input-wrapper">

                            <span className="input-icon">
                                🌐
                            </span>

                            <input
                                type="url"
                                placeholder="https://example.com/your-long-url"
                                value={originalUrl}
                                onChange={(e) =>
                                    setOriginalUrl(e.target.value)
                                }
                                required
                            />

                        </div>

                        <small>
                            Enter the complete URL you want
                            to shorten.
                        </small>

                    </div>


                    {/* CUSTOM SHORT CODE */}

                    <div className="form-group">

                        <label>
                            Custom Short Code
                            <span className="optional">
                                Optional
                            </span>
                        </label>

                        <div className="input-wrapper">

                            <span className="input-prefix">
                                /
                            </span>

                            <input
                                type="text"
                                placeholder="my-link"
                                value={customShortCode}
                                onChange={(e) =>
                                    setCustomShortCode(
                                        e.target.value
                                    )
                                }
                                minLength="3"
                                maxLength="20"
                                pattern="[a-zA-Z0-9_-]*"
                                title="Only letters, numbers, hyphens and underscores are allowed"
                            />

                        </div>

                        <small>
                            3–20 characters. Letters, numbers,
                            hyphens and underscores only.
                        </small>

                    </div>


                    {/* EXPIRATION */}

                    <div className="form-group">

                        <label>
                            Expiration Date
                            <span className="optional">
                                Optional
                            </span>
                        </label>

                        <div className="input-wrapper">

                            <span className="input-icon">
                                ⏰
                            </span>

                            <input
                                type="datetime-local"
                                value={expiresAt}
                                onChange={(e) =>
                                    setExpiresAt(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <small>
                            Leave empty if you want the URL
                            to remain active indefinitely.
                        </small>

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="create-button"
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <span className="spinner"></span>
                                Creating your URL...
                            </>

                        ) : (

                            <>
                                ✨ Create Short URL
                            </>

                        )}

                    </button>


                </form>

            </div>


            {/* =========================
                RESULT CARD
            ========================= */}

            {result && (

                <div className="success-card">


                    {/* Success Header */}

                    <div className="success-header">

                        <div className="success-icon">
                            ✓
                        </div>

                        <div>

                            <h2>
                                Your short URL is ready!
                            </h2>

                            <p>
                                Your link has been successfully created.
                            </p>

                        </div>

                    </div>


                    {/* SHORT URL */}

                    <div className="short-url-box">

                        <div>

                            <span className="result-label">
                                YOUR SHORT URL
                            </span>

                            <a
                                href={result.shortUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="short-url"
                            >
                                {result.shortUrl}
                            </a>

                        </div>


                        <button
                            className="copy-button"
                            onClick={copyToClipboard}
                        >

                            {copied
                                ? "✓ Copied"
                                : "📋 Copy"}

                        </button>

                    </div>


                    {/* DETAILS */}

                    <div className="url-details">


                        <div className="detail-item">

                            <span className="detail-label">
                                Original URL
                            </span>

                            <span
                                className="detail-value original-url"
                                title={result.originalUrl}
                            >
                                {result.originalUrl}
                            </span>

                        </div>


                        <div className="detail-item">

                            <span className="detail-label">
                                Short Code
                            </span>

                            <span className="detail-value">
                                {result.shortCode}
                            </span>

                        </div>


                        <div className="detail-item">

                            <span className="detail-label">
                                Expires
                            </span>

                            <span className="detail-value">

                                {createdExpiresAt
                                    ? createdExpiresAt.replace("T", " ")
                                    : "Never"}

                            </span>

                        </div>


                    </div>


                    {/* ACTIONS */}

                    <div className="result-actions">


                        <button
                            className="action-button primary"
                            onClick={openShortUrl}
                        >
                            🔗 Open URL
                        </button>


                        <button
                            className="action-button"
                            onClick={copyToClipboard}
                        >
                            📋 {copied ? "Copied!" : "Copy"}
                        </button>


                        <button
                            className="action-button"
                            onClick={openQrCode}
                        >
                            📱 QR Code
                        </button>


                        <button
                            className="action-button"
                            onClick={openAnalytics}
                        >
                            📊 Analytics
                        </button>


                    </div>

                </div>

            )}

        </div>

    );
}

export default CreateUrlForm;