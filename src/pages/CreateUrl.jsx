import CreateUrlForm from "../components/CreateUrlForm";
import "../styles/CreateUrl.css";

function CreateUrl() {
    return (
        <div className="create-page">

            <div className="create-hero">

                <div className="create-badge">
                    🔗 URL SHORTENER
                </div>

                <h1>
                    Create a shorter,
                    <span> smarter URL.</span>
                </h1>

                <p>
                    Transform long URLs into clean, memorable links
                    that are easy to share and track.
                </p>

            </div>

            <CreateUrlForm />

        </div>
    );
}

export default CreateUrl;