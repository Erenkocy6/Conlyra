import { navItems } from "@/data/landing";
import { MagneticButton } from "@/components/MagneticButton";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between rounded-[2px] border border-white/10 bg-ink/58 px-3 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-4">
        <a
          href="#top"
          aria-label="NovaIQ Startseite"
          data-cursor-label="Home"
          className="group flex h-10 items-center gap-2 rounded-[2px] px-3 text-sm font-semibold text-paper transition-colors duration-300 ease-cinematic hover:text-cyan sm:h-11 sm:px-4"
        >
          <span className="size-2.5 rounded-full bg-[linear-gradient(135deg,#7C3AED,#22D3EE)] shadow-[0_0_22px_rgba(34,211,238,0.72)]" />
          <span>NovaIQ</span>
        </a>

        <nav
          className="hidden rounded-[2px] border border-white/10 bg-white/[0.045] px-5 py-3 text-xs font-semibold uppercase text-muted backdrop-blur-md lg:flex lg:items-center lg:gap-5"
          aria-label="Hauptnavigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor-label={item.label}
              className="transition-colors duration-300 ease-cinematic hover:text-cyan"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:block">
          <MagneticButton
            href="#kontakt"
            variant="secondary"
            className="min-h-11 px-5 text-sm"
            data-cursor-label="Demo"
          >
            Demo anfragen
          </MagneticButton>
        </div>
        <a
          href="#kontakt"
          aria-label="Demo anfragen"
          data-cursor-label="Demo"
          className="grid h-10 place-items-center rounded-[2px] border border-cyan/25 bg-[linear-gradient(135deg,#7C3AED,#22D3EE)] px-4 text-xs font-bold uppercase text-paper shadow-[0_12px_38px_rgba(34,211,238,0.22)] sm:hidden"
        >
          Demo
        </a>
      </div>
    </header>
  );
}
