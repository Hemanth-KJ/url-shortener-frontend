import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyUrls } from "../services/urlService";
import "../styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await getMyUrls();

                console.log("Dashboard URLs:", response);

                if (response.success) {
                    setUrls(response.data || []);
                }
            } catch (error) {
                console.error(
                    "Unable to load dashboard data:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUrls();
    }, []);

    const totalUrls = urls.length;

    if (loading) {
        return (
            <div className="dashboard">
                <div className="dashboard-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">

            {/* Hero Section */}

            <section className="dashboard-hero">
                <div>
                    <span className="welcome-label">
                        Welcome back 👋
                    </span>

                    <h1>
                        Manage your links
                    </h1>

                    <p>
                        Create, organize and manage all your
                        shortened URLs from one place.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => navigate("/create")}
                >
                    <span>＋</span>
                    Create Short URL
                </button>
            </section>

            {/* Statistics */}

            <section className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon blue">
                        🔗
                    </div>

                    <div>
                        <span className="stat-label">
                            Total URLs
                        </span>

                        <h2>{totalUrls}</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple">
                        📄
                    </div>
   <div>
                        <span className="stat-label">
                           URLs
                        </span>

                        <h2>{totalUrls}</h2>
                    </div>
                </div>
                 

                <div className="stat-card">
                    <div className="stat-icon green">
                        🌐
                    </div>

                    <div>
                        <span className="stat-label">
                            Domain
                        </span>

                        <h2>URL</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">
                        ⚡
                    </div>

                    <div>
                        <span className="stat-label">
                            Status
                        </span>

                        <h2>Online</h2>
                    </div>
                </div>

            </section>

            {/* Quick Actions */}

            <section className="section">

                <div className="section-heading">

                    <div>
                        <h2>
                            Quick Actions
                        </h2>

                        <p>
                            Manage your shortened URLs
                        </p>
                    </div>

                </div>

                <div className="quick-actions">

                    <button
                        className="action-card"
                        onClick={() => navigate("/create")}
                    >
                        <div className="action-icon blue">
                            🔗
                        </div>

                        <div className="action-content">
                            <h3>Create Short URL</h3>

                            <p>
                                Create a new shortened URL.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </button>

                   

                    <button
                        className="action-card"
                        onClick={() => navigate("/my-urls")}
                    >
                        <div className="action-icon green">
                            📊
                        </div>

                        <div className="action-content">
                            <h3>Manage URLs</h3>

                            <p>
                                Open, copy and view your links.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </button>

                </div>

            </section>

            {/* Recent URLs */}

            <section className="section">

                <div className="section-heading">

                    <div>
                        <h2>
                            Recent URLs
                        </h2>

                        <p>
                            Your recently created links
                        </p>
                    </div>

                    {urls.length > 0 && (
                        <button
                            className="view-all-button"
                            onClick={() => navigate("/my-urls")}
                        >
                            View all →
                        </button>
                    )}

                </div>

                {urls.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            🔗
                        </div>

                        <h3>No URLs yet</h3>

                        <p>
                            Create your first shortened URL to get started.
                        </p>

                        <button
                            className="primary-button"
                            onClick={() => navigate("/create")}
                        >
                            Create your first URL
                        </button>

                    </div>

                ) : (

                    <div className="recent-urls">

                        {urls.slice(0, 5).map((url) => (

                            <div
                                className="recent-url"
                                key={url.shortCode}
                            >

                                <div className="url-main">

                                    <div className="url-icon">
                                        🔗
                                    </div>

                                    <div className="url-details">

                                        <a
                                            href={url.shortUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="short-url"
                                        >
                                            {url.shortUrl}
                                        </a>

                                        <span className="original-url">
                                            {url.originalUrl}
                                        </span>

                                    </div>

                                </div>

                                <div className="url-meta">

                                    <div className="click-info">

                                        <strong>
                                            /{url.shortCode}
                                        </strong>

                                        <span>
                                            Short Code
                                        </span>

                                    </div>

                                     <button className="url-action-btn"
                                                onClick={() => {

                                                    console.log(
                                                        "Analytics shortCode:",
                                                        url.shortCode
                                                    );

                                                    navigate(
                                                        `/analytics/${url.shortCode}`
                                                    );

                                                }}
                                                title="Analytics"
                                            >
                                                ◔
                                                <span>
                                                    Analytics
                                                </span>
                                            </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default Dashboard;