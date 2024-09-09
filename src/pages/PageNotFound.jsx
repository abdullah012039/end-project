import React from "react";
import IncomingMoviesList from "../components/widgets/IncomingMoviesList";

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="/">Go to Home</a>
        </div>
    );
};

export default PageNotFound;