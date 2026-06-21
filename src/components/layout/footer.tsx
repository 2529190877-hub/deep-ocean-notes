import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-bg-tertiary py-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} {SITE.name}
        </p>

        <div className="flex items-center gap-5">
          <a
            href={SITE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors text-sm"
            aria-label="GitHub"
          >
            GitHub
          </a>
          {SITE.social.twitter && (
            <a
              href={SITE.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors text-sm"
              aria-label="Twitter"
            >
              Twitter
            </a>
          )}
          <a
            href={`mailto:${SITE.social.email}`}
            className="text-text-muted hover:text-text-primary transition-colors text-sm"
            aria-label="Email"
          >
            邮件
          </a>
        </div>
      </div>
    </footer>
  );
}
