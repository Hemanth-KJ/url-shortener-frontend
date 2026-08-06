import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnalytics } from "../services/urlService";
import "../styles/Analytics.css";

function Analytics() {
    const { shortCode } = useParams();
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!shortCode) {
                setLoading(false);
                return;
            }
            try {
                console.log("Fetching analytics for:", shortCode);
                const response = await getAnalytics(shortCode);
                console.log("Analytics response:", response);

                if (response.success) {
                    setAnalytics(response.data || null);
                }
            } catch (error) {
                console.error("Analytics error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [shortCode]);

    const copyToClipboard = async (shortUrl) => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (date) => {
        if (!date) {
            return "Never";
        }
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (loading) {
        return (
            <div className="analytics-page">
                <div className="analytics-loading">
                    <div className="analytics-spinner"></div>
                    <p>Loading analytics...</p>
                </div>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="analytics-page">
                <div className="analytics-empty">
                    <div className="analytics-empty-icon">📊</div>
                    <h2>No Analytics Available</h2>
                    <p>Unable to load analytics.</p>
                    <button
                        className="back-button"
                        onClick={() => navigate("/my-urls")}
                    >
                        ← Back
                    </button>
                </div>
            </div>
        );
    }

    const shortUrl = `http://35.255.40.1/${analytics.shortCode}`;
    const clickCount = analytics.clickCount || 0;
    const isActive =
        !analytics.expiresAt || new Date(analytics.expiresAt) > new Date();

    return (
        <div className="analytics-page">
            {/* =========================================
                HEADER
            ========================================= */}
            <div className="analytics-header">
                <div>
                    <span className="analytics-eyebrow">URL ANALYTICS</span>
                    <h1>Analytics</h1>
                    <p>Monitor the performance of your shortened URL.</p>
                </div>
                <button
                    className="back-button"
                    onClick={() => navigate("/my-urls")}
                >
                    ← Back to My URLs
                </button>
            </div>

            {/* =========================================
                SHORT URL HERO
            ========================================= */}
            <section className="analytics-url-card">
                <div className="analytics-url-info">
                    <span className="analytics-field-label">SHORT URL</span>
                    <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="analytics-short-url"
                    >
                        {shortUrl}
                    </a>
                </div>

                <div className="analytics-url-actions">
                    <button
                        className={
                            copied ? "analytics-action copied" : "analytics-action"
                        }
                        onClick={() => copyToClipboard(shortUrl)}
                    >
                        {copied ? "✓ Copied" : "📋 Copy"}
                    </button>

                    {isActive && (
                        <button
                            className="analytics-action primary"
                            onClick={() => window.open(shortUrl, "_blank")}
                        >
                            ↗ Visit URL
                        </button>
                    )}
                </div>

                {!isActive && (
                    <div className="expired-message">
                        ⏱ This URL has expired and can no longer be accessed.
                    </div>
                )}
            </section>

            {/* =========================================
                STATISTICS
            ========================================= */}
            <section className="analytics-stats">
                <div className="analytics-stat-card">
                    <div className="analytics-stat-icon blue">↗</div>
                    <div>
                        <span>Total Clicks</span>
                        <strong>{clickCount}</strong>
                    </div>
                </div>

                <div className="analytics-stat-card">
                    <div className="analytics-stat-icon green">🔗</div>
                    <div>
                        <span>Short Code</span>
                        <strong className="stat-code">/{analytics.shortCode}</strong>
                    </div>
                </div>

                <div className="analytics-stat-card">
                    <div className="analytics-stat-icon purple">📅</div>
                    <div>
                        <span>Created</span>
                        <strong className="stat-date">
                            {formatDate(analytics.createdAt)}
                        </strong>
                    </div>
                </div>

                <div className="analytics-stat-card">
                    <div
                        className={
                            isActive
                                ? "analytics-stat-icon green"
                                : "analytics-stat-icon red"
                        }
                    >
                        {isActive ? "✓" : "✕"}
                    </div>
                    <div>
                        <span>Status</span>
                        <strong
                            className={
                                isActive ? "status-active" : "status-expired"
                            }
                        >
                            {isActive ? "Active" : "Expired"}
                        </strong>
                    </div>
                </div>
            </section>

            {/* =========================================
                ANALYTICS CONTENT
            ========================================= */}
            <section className="analytics-content">
                {/* =========================================
                    CLICK OVERVIEW
                ========================================= */}
                <div className="analytics-panel click-panel">
                    <div className="panel-header">
                        <div>
                            <h2>Click Overview</h2>
                            <p>Total visits received by this shortened URL.</p>
                        </div>
                    </div>

                    <div className="click-overview">
                        <div className="big-click-number">{clickCount}</div>
                        <span>Total Clicks</span>
                    </div>

                    <div className="analytics-message">
                        <span>📈</span>
                        <div>
                            <strong>Link Performance</strong>
                            <p>
                                {clickCount === 0
                                    ? "Your shortened URL has not received any clicks yet."
                                    : `Your shortened URL has received ${clickCount} click${clickCount > 1 ? "s" : ""}.`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    URL INFORMATION
                ========================================= */}
                <div className="analytics-panel">
                    <div className="panel-header">
                        <div>
                            <h2>URL Information</h2>
                            <p>Details about this shortened link.</p>
                        </div>
                    </div>

                    <div className="url-information">
                        <div className="info-row">
                            <span>Original URL</span>
                            <a
                                href={analytics.originalUrl}
                                target="_blank"
                                rel="noreferrer"
                                title={analytics.originalUrl}
                            >
                                {analytics.originalUrl}
                            </a>
                        </div>

                        <div className="info-row">
                            <span>Short Code</span>
                            <strong>{analytics.shortCode}</strong>
                        </div>

                        <div className="info-row">
                            <span>Status</span>
                            <strong
                                className={
                                    isActive ? "status-active" : "status-expired"
                                }
                            >
                                {isActive ? "Active" : "Expired"}
                            </strong>
                        </div>

                        <div className="info-row">
                            <span>Created At</span>
                            <strong>{formatDate(analytics.createdAt)}</strong>
                        </div>

                        <div className="info-row">
                            <span>Expires At</span>
                            <strong>{formatDate(analytics.expiresAt)}</strong>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
                BOTTOM ACTION
            ========================================= */}
            <div className="analytics-bottom">
                <button
                    className="bottom-back-button"
                    onClick={() => navigate("/my-urls")}
                >
                    ← Return to My URLs
                </button>
            </div>
        </div>
    );
}

export default Analytics;