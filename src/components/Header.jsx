function Header({ onWorkClick }) {
    return (
        <header className="header">
            <div className="logo">Kaushal</div>
            <nav className="nav">
                <a href="#" className="nav-link" onClick={(e) => {
                    e.preventDefault()
                    onWorkClick()
                }}>
                    Work & Links
                </a>
            </nav>
        </header>
    )
}

export default Header
