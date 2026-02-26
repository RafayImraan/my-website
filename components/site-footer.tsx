import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer" data-reveal>
      <div className="container footer-wrap">
        <p>Abdul Rafay Imran | Enterprise Portfolio</p>
        <p>
          <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms">Terms</Link>
        </p>
      </div>
    </footer>
  );
}
