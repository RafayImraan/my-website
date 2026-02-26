import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="top-nav" data-reveal>
      <div className="container nav-wrap">
        <p className="brand">Abdul Rafay Imran</p>
        <nav>
          <Link className="nav-link" data-magnetic data-magnetic-strength="8" href="/">
            Home
          </Link>
          <Link className="nav-link" data-magnetic data-magnetic-strength="8" href="/services">
            Services
          </Link>
          <Link className="nav-link" data-magnetic data-magnetic-strength="8" href="/case-studies">
            Case Studies
          </Link>
          <Link className="nav-link" data-magnetic data-magnetic-strength="8" href="/blog">
            Insights
          </Link>
          <Link className="nav-link" data-magnetic data-magnetic-strength="8" href="/recruiters">
            Recruiters
          </Link>
          <Link className="nav-link" data-magnetic data-magnetic-strength="8" href="/admin">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
