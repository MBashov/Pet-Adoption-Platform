export default function Header() {
    return (
        <header>
            <div className="container_12">
                <div className="grid_12">
                    <h1>
                        <a href="index.html">
                            <img src="images/logo.png" alt="" />
                        </a>{" "}
                    </h1>
                    <div className="menu_block">
                        <nav>
                            <ul className="sf-menu">
                                <li className="current">
                                    <a href="/">Home</a>
                                </li>
                                <li className="with_ul">
                                    <a href="about-us.html">About Us</a>
                                    <ul>
                                        <li>
                                            <a href="#">Testimonials</a>
                                        </li>
                                        <li>
                                            <a href="#">Archive</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="services.html">Services</a>
                                </li>
                                <li>
                                    <a href="blog.html">Blog</a>
                                </li>
                                <li>
                                    <a href="contacts.html">Contacts </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="clear" />
                    </div>
                    <div className="clear" />
                </div>
            </div>
        </header>

    );
}