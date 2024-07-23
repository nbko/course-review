const Navbar = () => {
	return (
		<nav className="content-row">
			<a href={`/`} label="logo" className="prof-nav__bar logo">
				Maroon Review
			</a>
			<div className="prof-nav__bar search-bar">Search Bar</div>
			<div className="prof-nav__bar login">Login</div>
			<div className="prof-nav__bar sign-up">Sign Up</div>
		</nav>
	);
};

export default Navbar;
