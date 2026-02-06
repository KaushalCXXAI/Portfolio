function SocialCard({ href, title, icon }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="social-card" title={title}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {icon}
            </svg>
        </a>
    )
}

export default SocialCard
