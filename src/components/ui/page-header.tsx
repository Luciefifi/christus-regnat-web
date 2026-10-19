import { Container } from "./container";

// The intro at the top of every inner page (Join, Contact, About, ...)
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="bg-linear-to-b from-white to-cream">
      <Container className="pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>
        </div>
      </Container>
    </section>
  );
}
