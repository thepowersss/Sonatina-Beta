import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Sonatina</a>
        </Link>
        <Link href="/newscore">
            <a className="create">Create New Score</a>
        </Link>
    </nav>
)

export default Navbar;
