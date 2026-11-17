"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, Clock, Leaf, Menu, Plus, Users, X } from "lucide-react";
import { faqs, macros, plate, pro, recipes, services } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.2 });
    let id = 0;
    const r = (t: number) => {
      l.raf(t);
      id = requestAnimationFrame(r);
    };
    id = requestAnimationFrame(r);
    return () => {
      cancelAnimationFrame(id);
      l.destroy();
    };
  }, []);
  return null;
}

function Rise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

function Lines({ lines, className = "", as: Tag = "h2" }: { lines: React.ReactNode[]; className?: string; as?: "h1" | "h2" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const v = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="-mt-[0.2em] block overflow-hidden pb-[0.08em] pt-[0.2em]">
          <motion.span className="block" initial={{ y: "110%" }} animate={v ? { y: "0%" } : undefined} transition={{ duration: 1.1, delay: i * 0.1, ease }}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] ${light ? "text-sage" : "text-clay-deep"}`}>
      <Leaf className="h-3.5 w-3.5" strokeWidth={1.6} /> {children}
    </p>
  );
}

/* ---------------- Logo ---------------- */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2 font-serif text-[1.85rem] leading-none tracking-tight ${light ? "text-oat" : "text-forest"}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <path d="M16 29V15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M16 17C16 9 10.5 5 4 5c0 7.5 5 12 12 12Z" fill="#a9b89b" />
        <path d="M16 14c0-6 4.5-10 12-10 0 6.5-4.5 10-12 10Z" fill="#d8a77d" />
      </svg>
      <span>
        Filiz<span className="text-clay">.</span>
        <span className={`ml-1.5 align-middle font-sans text-[10px] font-bold uppercase tracking-[0.24em] ${light ? "text-oat/60" : "text-muted"}`}>Beslenme</span>
      </span>
    </span>
  );
}

/* ---------------- Üst menü ---------------- */
const nav = [
  { h: "#yaklasim", l: "Yaklaşım" },
  { h: "#tabak", l: "Dengeli Tabak" },
  { h: "#gun", l: "Günün Ritmi" },
  { h: "#mevsim", l: "Mevsim" },
  { h: "#tarifler", l: "Tarifler" },
  { h: "#sss", l: "SSS" },
];

export function Header() {
  const [s, setS] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${s ? "bg-oat/85 shadow-[0_10px_40px_-20px_rgba(41,61,50,0.35)] backdrop-blur-xl" : ""}`}>
          <a href="#top" aria-label="Ana sayfa">
            <Logo />
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a key={n.h} href={n.h} className="rounded-full px-4 py-2 text-sm font-semibold text-forest/70 transition hover:bg-sage-soft hover:text-forest">
                {n.l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#iletisim" className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-oat transition hover:bg-forest-2 sm:inline-block">
              İletişim
            </a>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full bg-forest text-oat lg:hidden" aria-label="Menüyü aç">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-[60] flex flex-col bg-forest px-6 pb-10 pt-5 text-oat">
            <div className="flex items-center justify-between">
              <Logo light />
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-oat/10" aria-label="Menüyü kapat">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-14 grid">
              {[...nav, { h: "#iletisim", l: "İletişim" }].map((n, i) => (
                <motion.a key={n.h} href={n.h} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="border-b border-oat/10 py-4 font-serif text-4xl">
                  {n.l}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Besin çizimleri (özgün SVG) ---------------- */
const Avocado = () => (
  <svg viewBox="0 0 100 130" className="h-full w-full drop-shadow-xl" aria-hidden="true">
    <path d="M50 4 C30 4 22 30 18 52 C12 84 22 124 50 124 C78 124 88 84 82 52 C78 30 70 4 50 4 Z" fill="#4f6b3c" />
    <path d="M50 12 C35 12 29 34 26 54 C21 82 30 116 50 116 C70 116 79 82 74 54 C71 34 65 12 50 12 Z" fill="#c9d98a" />
    <circle cx="50" cy="78" r="18" fill="#9a6a3f" />
    <circle cx="44" cy="72" r="5" fill="#b8865a" />
  </svg>
);
const Lemon = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-xl" aria-hidden="true">
    <circle cx="50" cy="50" r="46" fill="#f2d16b" />
    <circle cx="50" cy="50" r="39" fill="#fbeaa8" />
    {Array.from({ length: 8 }).map((_, i) => (
      <path key={i} d="M50 50 L50 15 A35 35 0 0 1 74.7 25.3 Z" fill="#f6dc7f" transform={`rotate(${i * 45} 50 50)`} stroke="#fbeaa8" strokeWidth="3" />
    ))}
    <circle cx="50" cy="50" r="4" fill="#fbeaa8" />
  </svg>
);
const LeafSvg = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-lg" aria-hidden="true">
    <path d="M14 86 C10 40 40 10 90 10 C90 60 60 90 14 86 Z" fill="#7f9a6c" />
    <path d="M14 86 C40 60 60 40 86 14" stroke="#dfe5d6" strokeWidth="3" fill="none" />
    <path d="M36 64 L36 46 M50 52 L50 34 M62 40 L64 26 M40 60 L56 60 M52 48 L68 46" stroke="#dfe5d6" strokeWidth="2" />
  </svg>
);
const Tomato = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-xl" aria-hidden="true">
    <circle cx="50" cy="50" r="46" fill="#d9573e" />
    <circle cx="50" cy="50" r="38" fill="#ef7c5f" />
    {[0, 120, 240].map((r) => (
      <g key={r} transform={`rotate(${r} 50 50)`}>
        <path d="M50 50 C44 34 46 22 50 20 C54 22 56 34 50 50 Z" fill="#f7b49d" />
        <circle cx="47" cy="30" r="2" fill="#f2e2b8" />
        <circle cx="53" cy="34" r="2" fill="#f2e2b8" />
      </g>
    ))}
  </svg>
);
const Berries = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-lg" aria-hidden="true">
    {[[34, 54], [60, 46], [50, 72], [70, 70]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="16" fill="#3d4a8a" />
        <circle cx={x - 5} cy={y - 5} r="4" fill="#7f8cc7" opacity="0.7" />
        <path d={`M${x - 4} ${y - 14} l4 4 4 -4`} stroke="#2a3366" strokeWidth="2" fill="none" />
      </g>
    ))}
  </svg>
);

/* ---------------- Giriş ---------------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const floats = [
    { C: Avocado, cls: "left-[2%] top-[8%] w-24 sm:w-32", y: y2, delay: 0.9 },
    { C: Lemon, cls: "right-[0%] top-[18%] w-20 sm:w-28", y: y1, delay: 1.0 },
    { C: LeafSvg, cls: "left-[10%] bottom-[6%] w-20 sm:w-24", y: y3, delay: 1.1 },
    { C: Tomato, cls: "right-[8%] bottom-[2%] w-20 sm:w-28", y: y2, delay: 1.2 },
    { C: Berries, cls: "left-[44%] -top-[2%] w-16 sm:w-20", y: y1, delay: 1.3 },
  ];

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:min-h-[100svh] lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-sage/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-clay/25 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mb-7 inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-forest">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" /> Bilimsel ve kişiye özel beslenme
          </motion.p>
          <Lines
            as="h1"
            className="font-serif text-[clamp(3rem,6.8vw,6.4rem)] leading-[0.98] tracking-[-0.01em] text-forest"
            lines={[<>Beslenmeni değiştir.</>, <em key="e" className="text-clay-deep">Yaşamına iyi bak.</em>]}
          />
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
            Kısıtlamalardan uzak, sürdürülebilir ve bilimsel temelli bir beslenme yaklaşımı. Hedeflerine, yaşam tarzına ve sofrana uyan bir plan.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#yaklasim" className="group inline-flex items-center justify-between gap-6 rounded-full bg-forest py-2 pl-7 pr-2 font-bold text-oat transition hover:bg-forest-2">
              Beslenme yaklaşımım
              <span className="grid h-11 w-11 place-items-center rounded-full bg-clay text-forest transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </a>
            <a href="#hakkimda" className="inline-flex items-center justify-center rounded-full border border-forest/20 px-7 py-4 font-bold text-forest transition hover:bg-white">
              Hakkımda
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-6">
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease }} className="absolute inset-[8%] rounded-full bg-white shadow-[0_60px_120px_-50px_rgba(41,61,50,0.5)]" />
          <div className="absolute inset-[3%] animate-spin-slow rounded-full border border-dashed border-forest/20" />
          <motion.div style={{ rotate: rot }} initial={{ scale: 0.6, opacity: 0, rotate: -30 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, delay: 0.2, ease }} className="absolute inset-[12%] overflow-hidden rounded-full">
            <Image src="/images/bowl.jpg" alt="Sebze ve proteinden oluşan renkli bir kase" fill priority sizes="(min-width:1024px) 460px, 80vw" className="scale-[1.32] object-cover" />
          </motion.div>
          {floats.map(({ C, cls, y, delay }, i) => (
            <motion.div key={i} style={{ y }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }} className={`absolute ${cls}`}>
              <div className="animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
                <C />
              </div>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }} className="absolute bottom-[14%] left-[-2%] rounded-2xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur sm:left-[-6%]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-clay-deep">Yaklaşım</p>
            <p className="font-serif text-lg text-forest">Kısıtlama değil, denge</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Kayan şerit ---------------- */
export function Ribbon() {
  const w = ["Bilimsel temelli", "Kişiye özel", "Sürdürülebilir", "Mevsiminde", "Dengeli tabak", "Keyifli sofralar"];
  return (
    <div className="overflow-hidden bg-forest py-6 text-oat" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center">
        {[...w, ...w].map((t, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 font-serif text-3xl italic sm:text-4xl">
            {t} <Leaf className="h-6 w-6 text-sage" strokeWidth={1.4} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Yaklaşım ---------------- */
const pillars = [
  { t: "Bilimsel temelli", d: "Öneriler güncel beslenme bilimine ve kanıta dayalı kaynaklara dayanır.", icon: "M24 8 v10 M16 18 h16 l-4 22 h-8 z M14 40 h20" },
  { t: "Kişiye özel", d: "Alışkanlıklar, kültür, bütçe ve günlük rutin planın merkezindedir.", icon: "M24 6 a7 7 0 1 1 0 14 a7 7 0 1 1 0-14 z M10 42 c0-8 6-14 14-14 s14 6 14 14" },
  { t: "Sürdürülebilir", d: "Kısa süreli kısıtlamalar yerine, uzun vadede yaşanabilir alışkanlıklar.", icon: "M24 42 C10 34 8 18 24 6 C40 18 38 34 24 42 Z M24 42 V18" },
];

export function Approach() {
  return (
    <section id="yaklasim" className="px-4 py-28 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker>Beslenme yaklaşımım</Kicker>
            <Lines className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] text-forest" lines={[<>Diyet değil,</>, <em key="e" className="text-clay-deep">yaşam biçimi.</em>]} />
          </div>
          <Rise delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <p className="text-xl leading-relaxed text-muted">
              Beslenme; yalnızca ne yediğimiz değil, nasıl, ne zaman ve kiminle yediğimizdir. Bu yüzden her plan, kişinin hayatına uyacak şekilde birlikte tasarlanır.
            </p>
          </Rise>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Rise key={p.t} delay={i * 0.08}>
              <div className="group h-full rounded-[2rem] bg-white p-9 transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(41,61,50,0.35)]">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-sage-soft text-forest transition-colors group-hover:bg-forest group-hover:text-oat">
                  <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={p.icon} />
                  </svg>
                </span>
                <h3 className="mt-10 font-serif text-3xl text-forest">{p.t}</h3>
                <p className="mt-3 text-muted">{p.d}</p>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Dengeli tabak (etkileşimli) ---------------- */
function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.cos(((a - 90) * Math.PI) / 180), cy + r * Math.sin(((a - 90) * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`;
}
const slices = [
  { id: "sebze", a0: 180, a1: 360 },
  { id: "tahil", a0: 0, a1: 90 },
  { id: "protein", a0: 90, a1: 180 },
];

export function PlateModel() {
  const [sel, setSel] = useState<string>("sebze");
  const item = plate.find((p) => p.id === sel)!;
  return (
    <section id="tabak" className="relative overflow-hidden bg-forest px-4 py-28 text-oat sm:px-6 lg:py-36">
      <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-sage/20 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker light>Dengeli tabak</Kicker>
          <Lines className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]" lines={[<>Tabağına</>, <em key="e" className="text-clay">bir bak.</em>]} />
          <p className="mt-6 max-w-md text-oat/70">Tabağın bir bölümüne dokun; her besin grubunun dengeli bir öğündeki yerini keşfet.</p>
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="mt-10 rounded-[1.75rem] bg-oat/5 p-7 ring-1 ring-oat/10">
              <p className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ background: item.color }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay">{item.share}</span>
              </p>
              <h3 className="mt-3 font-serif text-3xl">{item.label}</h3>
              <p className="mt-3 leading-relaxed text-oat/75">{item.d}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-5 flex flex-wrap gap-2">
            {plate.map((p) => (
              <button key={p.id} onClick={() => setSel(p.id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${sel === p.id ? "bg-oat text-forest" : "bg-oat/10 text-oat/80 hover:bg-oat/20"}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <Rise>
            <svg viewBox="0 0 420 400" className="mx-auto w-full max-w-[560px]" role="group" aria-label="Dengeli tabak modeli">
              <circle cx="190" cy="205" r="178" fill="#f5f1e8" />
              <circle cx="190" cy="205" r="160" fill="#ffffff" />
              {slices.map((s) => {
                const p = plate.find((x) => x.id === s.id)!;
                const on = sel === s.id;
                const mid = ((s.a0 + s.a1) / 2 - 90) * (Math.PI / 180);
                return (
                  <motion.g
                    key={s.id}
                    animate={{ x: on ? Math.cos(mid) * 12 : 0, y: on ? Math.sin(mid) * 12 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    onClick={() => setSel(s.id)}
                    onMouseEnter={() => setSel(s.id)}
                    className="cursor-pointer"
                    role="button"
                    aria-label={p.label}
                  >
                    <path d={arc(190, 205, 146, s.a0 + 1, s.a1 - 1)} fill={p.color} opacity={on ? 1 : 0.78} />
                    <text x={190 + Math.cos(mid) * 82} y={205 + Math.sin(mid) * 82} textAnchor="middle" className="fill-white font-sans text-[13px] font-bold">
                      {({ sebze: "Sebze", tahil: "Tahıl", protein: "Protein" } as Record<string, string>)[p.id] ?? p.label}
                    </text>
                  </motion.g>
                );
              })}
              {/* Yağ ve su */}
              {[
                { id: "yag", cx: 384, cy: 88, r: 26, label: "Yağ" },
                { id: "su", cx: 384, cy: 300, r: 32, label: "Su" },
              ].map((c) => {
                const p = plate.find((x) => x.id === c.id)!;
                const on = sel === c.id;
                return (
                  <motion.g key={c.id} animate={{ scale: on ? 1.12 : 1 }} style={{ originX: `${c.cx}px`, originY: `${c.cy}px` }} onClick={() => setSel(c.id)} onMouseEnter={() => setSel(c.id)} className="cursor-pointer" role="button" aria-label={p.label}>
                    <circle cx={c.cx} cy={c.cy} r={c.r} fill={p.color} opacity={on ? 1 : 0.75} />
                    <text x={c.cx} y={c.cy + 4} textAnchor="middle" className="fill-white text-[12px] font-bold">
                      {c.label}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </Rise>
          <p className="mt-4 text-center text-xs text-oat/50">Genel bir dengeli tabak modelidir; kişisel ihtiyaçlar diyetisyen değerlendirmesiyle belirlenir.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Besin öğeleri halkaları ---------------- */
function Ring({ v, label, go }: { v: number; label: string; go: boolean }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 130 130" className="h-32 w-32">
      <circle cx="65" cy="65" r={R} fill="none" stroke="#dfe5d6" strokeWidth="10" />
      <motion.circle cx="65" cy="65" r={R} fill="none" stroke="#293d32" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} initial={{ strokeDashoffset: C }} animate={go ? { strokeDashoffset: C * (1 - v / 100) } : undefined} transition={{ duration: 1.6, ease }} transform="rotate(-90 65 65)" />
      <circle cx="65" cy="65" r="30" fill="#a9b89b" opacity=".35" />
      <path d="M52 76c0-16 10-26 26-28-1 16-10 26-26 28Zm0 0 14-14" fill="none" stroke="#293d32" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Macros() {
  const ref = useRef<HTMLDivElement>(null);
  const go = useInView(ref, { once: true, margin: "-20%" });
  return (
    <section className="px-4 py-28 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Kicker>Beslenmenin temelleri</Kicker>
        <Lines className="max-w-3xl font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] text-forest" lines={[<>Besin öğelerini</>, <em key="e" className="text-clay-deep">tanıyalım.</em>]} />
        <div ref={ref} className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {macros.map((m, i) => (
            <Rise key={m.k} delay={i * 0.08}>
              <div className="flex h-full flex-col items-start rounded-[2rem] bg-oat-2 p-7">
                <div className="flex items-center gap-4">
                  <Ring v={m.v} label={m.k} go={go} />
                </div>
                <h3 className="mt-5 font-serif text-3xl text-forest">{m.k}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.d}</p>
              </div>
            </Rise>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">Halkalar yalnızca görsel anlatım içindir; kişisel besin ihtiyacını göstermez.</p>
      </div>
    </section>
  );
}

/* ---------------- Çalışma alanları ---------------- */
export function Services() {
  return (
    <section id="alanlar" className="bg-white px-4 py-28 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Kicker>Çalışma alanları</Kicker>
            <Lines className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] text-forest" lines={[<>Her ihtiyaca</>, <em key="e" className="text-clay-deep">özenli bir plan.</em>]} />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Rise key={s.t} delay={(i % 3) * 0.08}>
              <article className="group overflow-hidden rounded-[2rem] bg-oat">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={s.img} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-[1.2s] group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-forest">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl text-forest">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              </article>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tarifler ---------------- */
export function Recipes() {
  const [open, setOpen] = useState<number | null>(null);
  const r = open !== null ? recipes[open] : null;
  return (
    <section id="tarifler" className="px-4 py-28 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Kicker>Mutfaktan</Kicker>
        <Lines className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] text-forest" lines={[<>Sağlıklı ve</>, <em key="e" className="text-clay-deep">lezzetli tarifler.</em>]} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {recipes.map((rc, i) => (
            <Rise key={rc.t} delay={i * 0.08}>
              <button onClick={() => setOpen(i)} className="group block w-full text-left">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <Image src={rc.img} alt={rc.t} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-oat">
                    <div className="flex gap-2">
                      {rc.tags.map((t) => (
                        <span key={t} className="rounded-full bg-oat/20 px-3 py-1 text-[11px] font-bold backdrop-blur">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 font-serif text-3xl">{rc.t}</h3>
                    <p className="mt-2 flex items-center gap-4 text-sm text-oat/80">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" /> {rc.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" /> {rc.serves}
                      </span>
                    </p>
                  </div>
                  <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-forest transition-transform duration-500 group-hover:rotate-90">
                    <Plus className="h-5 w-5" />
                  </span>
                </div>
              </button>
            </Rise>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {r && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-forest/60 p-4 backdrop-blur-sm" onClick={() => setOpen(null)}>
            <motion.div
              initial={{ y: 40, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              onClick={(e) => e.stopPropagation()}
              className="grid max-h-[90svh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-oat md:grid-cols-2"
              data-lenis-prevent
              role="dialog"
              aria-label={r.t}
            >
              <div className="relative min-h-[240px]">
                <Image src={r.img} alt={r.t} fill sizes="450px" className="object-cover" />
              </div>
              <div className="relative p-8">
                <button onClick={() => setOpen(null)} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Kapat">
                  <X className="h-5 w-5" />
                </button>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-clay-deep">
                  {r.time} · {r.serves}
                </p>
                <h3 className="mt-2 font-serif text-4xl text-forest">{r.t}</h3>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted">Malzemeler</p>
                <ul className="mt-3 grid gap-2">
                  {r.ing.map((x) => (
                    <li key={x} className="flex gap-3 text-ink">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" /> {x}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted">Hazırlanışı</p>
                <ol className="mt-3 grid gap-3">
                  {r.steps.map((x, k) => (
                    <li key={x} className="flex gap-3 text-ink">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-xs font-bold text-oat">{k + 1}</span> {x}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Süreç + Hakkımda ---------------- */
const steps = [
  { t: "Ön görüşme", d: "Hedefler, alışkanlıklar ve beklentiler konuşulur." },
  { t: "Değerlendirme", d: "Beslenme öyküsü, ölçümler ve günlük rutin incelenir." },
  { t: "Kişisel plan", d: "Sofrana ve yaşamına uyan bir plan birlikte oluşturulur." },
  { t: "Takip", d: "Düzenli görüşmelerle plan ihtiyaca göre güncellenir." },
];

export function About() {
  return (
    <section id="hakkimda" className="bg-sage-soft px-4 py-28 sm:px-6 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Rise>
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
              <Image src="/images/flatlay.jpg" alt="Renkli ve dengeli bir sofra" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </Rise>
        </div>
        <div className="lg:col-span-7">
          <Kicker>Hakkımda</Kicker>
          <Lines className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] text-forest" lines={[<>{pro.name}</>, <em key="e" className="text-clay-deep">{pro.title}</em>]} />
          <Rise delay={0.15}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Beslenme ve Diyetetik alanında lisans eğitimini tamamlamış; danışanlarıyla birlikte, günlük yaşama uyan ve bilimsel temelli beslenme alışkanlıkları oluşturmayı hedefler. Her danışanın sofrası, temposu ve hedefi farklıdır; bu yüzden hazır listeler yerine birlikte kurulan, esnek ve uygulanabilir planlarla çalışır.
            </p>
          </Rise>
          <div className="mt-8 flex flex-wrap gap-2 text-sm">
            {["Beslenme ve Diyetetik (Lisans)", "Yüz yüze · Çevrim içi", "Kişiye özel takip"].map((t) => (
              <span key={t} className="rounded-full border border-forest/15 bg-oat/60 px-4 py-2 text-forest">{t}</span>
            ))}
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] bg-forest/10 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Rise key={s.t} delay={i * 0.06} className="bg-sage-soft p-6">
                <span className="font-serif text-4xl text-clay-deep">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-2xl text-forest">{s.t}</h3>
                <p className="mt-1 text-sm text-muted">{s.d}</p>
              </Rise>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SSS ---------------- */
export function Faq() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section id="sss" className="px-4 py-28 sm:px-6 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Kicker>Sıkça sorulanlar</Kicker>
          <Lines className="font-serif text-[clamp(2.4rem,4.6vw,4rem)] leading-[1] text-forest" lines={[<>Merak</>, <em key="e" className="text-clay-deep">edilenler.</em>]} />
        </div>
        <div className="lg:col-span-8">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-forest/15">
              <button onClick={() => setO(o === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={o === i}>
                <span className="font-serif text-2xl text-forest">{f.q}</span>
                <motion.span animate={{ rotate: o === i ? 45 : 0 }} className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${o === i ? "bg-forest text-oat" : "bg-oat-2 text-forest"}`}>
                  <Plus className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {o === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- İletişim + alt bilgi ---------------- */
export function Contact() {
  return (
    <section id="iletisim" className="px-4 pb-10 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-forest px-6 py-20 text-oat sm:px-14 lg:py-24">
        <div className="pointer-events-none absolute -bottom-10 right-6 w-40 opacity-90 sm:w-56">
          <Avocado />
        </div>
        <Kicker light>İletişim</Kicker>
        <Lines className="font-serif text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98]" lines={[<>Sofrana iyi bir</>, <em key="e" className="text-clay">başlangıç.</em>]} />
        <p className="mt-6 max-w-md text-oat/70">Görüşme için aşağıdaki kanallardan ulaşabilirsin. Lütfen ilk iletişimde ayrıntılı sağlık bilgisi paylaşma; bunlar görüşmede konuşulur.</p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] bg-oat/10 sm:grid-cols-2 lg:max-w-3xl">
          {[
            ["Telefon", pro.phoneDisplay, pro.phoneHref],
            ["E-posta", pro.email, `mailto:${pro.email}`],
            ["Adres", pro.address, null],
            ["Görüşme saatleri", pro.hours, null],
          ].map(([k, v, h]) => (
            <div key={k} className="bg-forest p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sage">{k}</p>
              {h ? (
                <a href={h} className="mt-1 block font-serif text-2xl hover:text-clay">{v}</a>
              ) : (
                <p className="mt-1 font-serif text-2xl">{v}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-12 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-forest/15 pt-8 text-sm text-muted md:flex-row">
        <div>
          <Logo />
          <p className="mt-3 max-w-md text-xs leading-relaxed">
            Sitedeki içerikler genel bilgilendirme amaçlıdır; kişiye özel tıbbi beslenme önerisi yerine geçmez. Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik gözetilerek hazırlanmıştır.
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="/kvkk" className="hover:text-forest">KVKK</Link>
          <span>© {new Date().getFullYear()} Filiz Beslenme</span>
        </div>
      </div>
    </footer>
  );
}
