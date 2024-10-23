import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid form-control m-2">
                <a className="navbar-brand" href="#">
                    <img
                        src="/nav_logo.png"
                        alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mx-auto">
                        <Link className="nav-link active" to="/calculator">Calculator</Link>
                        <Link className="nav-link" to="/emoji-search">Emoji Search</Link>
                        <Link className="nav-link" to="/Snap_shot">Snap Shot</Link>
                        <Link className="nav-link" to="/BMI_Calculator">Bmi Calculator</Link>
                        <Link className="nav-link" to="/Image_Compressor">Image Compressor</Link>
                        <Link className="nav-link" to="/Counter">Counter App</Link>
                        <Link className="nav-link" to="/GSA">Search Me</Link>
                    </div>
                    <div className="navbar-nav ">
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Dropdown link
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="/sendMail">SendEmail</a></li>
                                <li><a className="dropdown-item" href="/sheetSystem">Students</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
