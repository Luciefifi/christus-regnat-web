import { site } from "@/config/site";
import { FacebookIcon, InstagramIcon, XIcon, YouTubeIcon } from "@/components/icons/social-icons";

const socials = [
  { href: site.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.socials.x, label: "X (Twitter)", Icon: XIcon },
];

// One look per background: light icons on the dark footer, gold icons on light pages
const variants = {
  dark: "bg-white/5 text-gold-100 ring-white/10 hover:bg-gold-400 hover:text-ink",
  light: "bg-gold-50 text-gold-800 ring-gold-200 hover:bg-gold-400 hover:text-ink",
};

export function SocialLinks({
  variant = "dark",
  className = "",
}: {
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <ul className={`flex gap-3 ${className}`}>
      {socials.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`grid size-10 place-items-center rounded-full ring-1 transition ${variants[variant]}`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
