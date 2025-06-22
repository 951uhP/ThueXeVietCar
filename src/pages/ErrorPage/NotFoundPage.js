import React from "react";
import { Link } from "react-router-dom";

import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <main className="not-found">
        <div className={`container-fluid transparan-bg`}>
          <div className="container">
            <div className="err-page">
              <h1 className="font-err-page">404</h1>
              <h3 className="page-not-found">Page Not Found</h3>

              <Link to={"/"}>
                <button className="btn-to-home">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default NotFoundPage;
