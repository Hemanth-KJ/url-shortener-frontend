import { useState, useEffect } from "react";
import { getMyUrls } from "../services/urlService";
import { useNavigate } from "react-router-dom";
import "../styles/MyUrls.css";

function MyUrls() {

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedUrl, setCopiedUrl] = useState(null);

    const navigate = useNavigate();



    // Copy URL

    const copyToClipboard = async (shortUrl) => {

        try {

            await navigator.clipboard.writeText(shortUrl);

            setCopiedUrl(shortUrl);


            setTimeout(() => {

                setCopiedUrl(null);

            }, 2000);


        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

        }

    };




    // Fetch URLs

    useEffect(() => {


        const fetchUrls = async () => {


            try {


                const response = await getMyUrls();


                console.log(
                    "API Response:",
                    response
                );


                if(response.success){

                    setUrls(
                        response.data || []
                    );

                }



            } catch(error){


                console.error(
                    "Fetching URLs failed:",
                    error
                );


            }
            finally{


                setLoading(false);


            }


        };


        fetchUrls();


    }, []);





    // Loading

    if(loading){


        return(

            <div className="my-urls-page">

                <div className="my-urls-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading your URLs...
                    </p>

                </div>

            </div>

        );

    }






    return (

        <div className="my-urls-page">



            {/* Header */}

            <div className="my-urls-header">


                <div>


                    <span className="my-urls-label">
                        URL MANAGEMENT
                    </span>


                    <h1>
                        My URLs
                    </h1>


                    <p>
                        Manage all your shortened links.
                    </p>


                </div>





                <button

                    className="create-url-btn"

                    onClick={() =>
                        navigate("/create")
                    }

                >

                    +

                    Create New URL


                </button>


            </div>








            {/* URLs Section */}


            <div className="urls-section">



                <div className="section-heading">


                    <div>


                        <h2>
                            Your Links
                        </h2>


                        <p>

                            {urls.length}

                            {" "}

                            {urls.length === 1
                                ? "link"
                                : "links"}

                            {" "}
                            created

                        </p>


                    </div>


                </div>







                {
                    urls.length === 0 ?


                    (

                        <div className="empty-state">


                            <div className="empty-icon">
                                🔗
                            </div>


                            <h2>
                                No URLs yet
                            </h2>


                            <p>
                                Create your first shortened URL.
                            </p>



                            <button

                                className="create-url-btn"

                                onClick={() =>
                                    navigate("/create")
                                }

                            >

                                Create URL

                            </button>



                        </div>


                    )


                    :



                    (

                        <div className="url-list">


                            {
                                urls.map((url)=>(



                                    <div

                                        className="url-card"

                                        key={
                                            url.shortCode
                                        }

                                    >





                                        {/* Short Code */}


                                        <div className="url-card-top">


                                            <span className="url-code">

                                                /

                                                {
                                                    url.shortCode
                                                }

                                            </span>


                                        </div>









                                        {/* Original URL */}


                                        <div className="original-url">


                                            <span className="url-field-label">

                                                ORIGINAL URL

                                            </span>


                                            <a

                                                href={
                                                    url.originalUrl
                                                }

                                                target="_blank"

                                                rel="noreferrer"

                                            >

                                                {
                                                    url.originalUrl
                                                }

                                            </a>


                                        </div>









                                        {/* Short URL */}



                                        <div className="short-url-container">


                                            <div className="short-url-content">


                                                <span className="url-field-label">

                                                    SHORT URL

                                                </span>



                                                <a

                                                    href={
                                                        url.shortUrl
                                                    }

                                                    target="_blank"

                                                    rel="noreferrer"

                                                >

                                                    {
                                                        url.shortUrl
                                                    }

                                                </a>


                                            </div>






                                            <button

                                                className={
                                                    copiedUrl === url.shortUrl

                                                    ?

                                                    "copy-btn copied"

                                                    :

                                                    "copy-btn"
                                                }


                                                onClick={() =>
                                                    copyToClipboard(
                                                        url.shortUrl
                                                    )
                                                }

                                            >

                                                {
                                                    copiedUrl === url.shortUrl

                                                    ?

                                                    "✓ Copied"

                                                    :

                                                    "📋 Copy"

                                                }


                                            </button>



                                        </div>









                                        {/* Footer */}



                                        <div className="url-card-bottom">



                                            <div className="url-details">



                                                <div className="url-detail">


                                                    <span className="detail-icon">
                                                        🔗
                                                    </span>



                                                    <div>


                                                        <small>
                                                            Short Code
                                                        </small>



                                                        <strong>

                                                            {
                                                                url.shortCode
                                                            }

                                                        </strong>



                                                    </div>


                                                </div>



                                            </div>








                                            {/* Actions */}



                                            <div className="url-actions">



                                                <button

                                                    className="url-action-btn"

                                                    onClick={() =>
                                                        window.open(
                                                            url.shortUrl,
                                                            "_blank"
                                                        )
                                                    }

                                                >

                                                    ↗

                                                    <span>
                                                        Open
                                                    </span>


                                                </button>








                                                <button

                                                    className="url-action-btn"

                                                    onClick={() =>
                                                        window.open(
                                                            `http://35.255.40.1/api/v1/urls/${url.shortCode}/qrcode`,
                                                            "_blank"
                                                        )
                                                    }

                                                >

                                                    ▦

                                                    <span>
                                                        QR
                                                    </span>


                                                </button>








                                                <button

                                                    className="url-action-btn"

                                                    onClick={() =>
                                                        navigate(
                                                            `/analytics/${url.shortCode}`
                                                        )
                                                    }

                                                >

                                                    ◔

                                                    <span>
                                                        Analytics
                                                    </span>


                                                </button>




                                            </div>






                                        </div>





                                    </div>



                                ))
                            }



                        </div>


                    )

                }





            </div>





        </div>


    );

}


export default MyUrls;