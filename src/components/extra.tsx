"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Droplet, Leaf, RotateCcw, Sun, Snowflake, Flower2, CloudRain } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] ${light ? "text-sage" : "text-clay-deep"}`}>
      <Leaf className="h-3.5 w-3.5" strokeWidth={1.6} /> {children}
    </p>
  );
}

function Title({ a, b, light = false }: { a: string; b: string; light?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const v = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <h2 ref={ref} className={`font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] ${light ? "text-oat" : "text-forest"}`}>
      {[a, b].map((l, i) => (
        <span key={i} className="-mt-[0.2em] block overflow-hidden pb-[0.08em] pt-[0.2em]">
          <motion.span className={`block ${i ? "italic text-clay-deep" : ""}`} initial={{ y: "110%" }} animate={v ? { y: "0%" } : undefined} transition={{ duration: 1.1, delay: i * 0.1, ease }}>
            {l}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/* ---------------- Bir günün ritmi ---------------- */
const day = [
  { time: "08:00", t: "Kahvaltı", img: "/images/breakfast.jpg", d: "Güne protein ve lif içeren bir kahvaltıyla başlamak tokluğu destekler.", ideas: ["Yumurta, peynir, zeytin", "Bol yeşillik ve domates", "Tam tahıllı ekmek veya yulaf"] },
  { time: "11:00", t: "Ara öğün", img: "/images/fruit.jpg", d: "İhtiyaca göre planlanan küçük bir ara öğün, uzun açlık aralarını dengeler.", ideas: ["Bir porsiyon mevsim meyvesi", "Bir avuç çiğ kuruyemiş", "Yoğurt veya kefir"] },
  { time: "13:00", t: "Öğle", img: "/images/salad.jpg", d: "Dengeli tabak modeli: yarısı sebze, çeyreği tahıl, çeyreği protein.", ideas: ["Zeytinyağlı sebze yemeği", "Bulgur pilavı", "Cacık veya ayran"] },
  { time: "16:00", t: "İkindi", img: "/images/egg-plate.jpg", d: "Akşam yemeğine aşırı acıkmadan ulaşmak için hafif bir mola.", ideas: ["Haşlanmış yumurta", "Havuç ve salatalık dilimleri", "Bitki çayı"] },
  { time: "19:00", t: "Akşam", img: "/images/bowl.jpg", d: "Gün içinde eksik kalan besin gruplarını tamamlayan sakin bir sofra.", ideas: ["Fırında balık veya tavuk", "Mevsim salatası", "Baklagil çorbası"] },
];

export function DayFlow() {
  const [i, setI] = useState(2);
  const m = day[i];
  return (
    <section id="gun" className="px-4 py-28 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Kicker>Bir günün ritmi</Kicker>
            <Title a="Gün boyu" b="dengeli sofralar." />
          </div>
          <p className="max-w-sm text-muted">Bir saat seç; o öğün için genel öneriler gör. Öğün sayısı ve saatleri kişiye göre birlikte belirlenir.</p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-[22px] h-px bg-forest/15" />
          <motion.div className="absolute left-0 top-[22px] h-px bg-clay" animate={{ width: `${(i / (day.length - 1)) * 100}%` }} transition={{ duration: 0.8, ease }} />
          <div className="relative grid grid-cols-5">
            {day.map((d, k) => (
              <button key={d.time} onClick={() => setI(k)} className="group flex flex-col items-center gap-3 text-center" aria-pressed={k === i}>
                <span className={`grid h-11 w-11 place-items-center rounded-full border-2 transition duration-500 ${k <= i ? "border-clay bg-clay text-white" : "border-forest/20 bg-oat text-forest"} ${k === i ? "scale-110 shadow-[0_0_0_6px_rgba(216,167,125,0.2)]" : ""}`}>
                  <Sun className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="font-serif text-lg text-forest sm:text-2xl">{d.time}</span>
                <span className="hidden text-sm text-muted sm:block">{d.t}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={m.time} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease }} className="mt-12 grid overflow-hidden rounded-[2.25rem] bg-oat-2 md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image src={m.img} alt={m.t} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-8 sm:p-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay-deep">{m.time}</p>
              <h3 className="mt-2 font-serif text-5xl text-forest">{m.t}</h3>
              <p className="mt-4 text-lg leading-relaxed text-muted">{m.d}</p>
              <ul className="mt-8 grid gap-3">
                {m.ideas.map((x, k) => (
                  <motion.li key={x} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.08 }} className="flex items-center gap-3 rounded-2xl bg-oat px-5 py-4 text-forest">
                    <span className="h-2 w-2 rounded-full bg-sage" /> {x}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
        <p className="mt-5 text-xs text-muted">Öneriler genel niteliktedir; enerji ve besin ihtiyacı kişiden kişiye değişir.</p>
      </div>
    </section>
  );
}

/* ---------------- Mevsim sepeti ---------------- */
const seasons = [
  { k: "İlkbahar", I: Flower2, c: "#a9b89b", items: [["Enginar", "#7f9a6c"], ["Bakla", "#a9c08a"], ["Çilek", "#d65a5a"], ["Taze soğan", "#b9cf98"], ["Ispanak", "#4e7a4a"], ["Erik", "#8fae4b"], ["Kuşkonmaz", "#7c9a5a"], ["Semizotu", "#6f9a5f"]] },
  { k: "Yaz", I: Sun, c: "#d8a77d", items: [["Domates", "#d9534f"], ["Kayısı", "#f0a24a"], ["Karpuz", "#e46b6b"], ["Fasulye", "#6f9a4f"], ["Kabak", "#9fbf6a"], ["Şeftali", "#f2a77a"], ["Biber", "#4f8a3f"], ["Patlıcan", "#5b3d6e"]] },
  { k: "Sonbahar", I: CloudRain, c: "#b9825a", items: [["Balkabağı", "#e08b3a"], ["Nar", "#b0303f"], ["Ayva", "#e3c04f"], ["Mantar", "#a6896b"], ["Üzüm", "#6b3f6e"], ["İncir", "#7a4a6a"], ["Pırasa", "#8fb06a"], ["Elma", "#c94a3a"]] },
  { k: "Kış", I: Snowflake, c: "#8fb3b8", items: [["Portakal", "#f08a2a"], ["Mandalina", "#f29b3a"], ["Lahana", "#7f9a6c"], ["Karnabahar", "#e8e2cf"], ["Brokoli", "#3f7a4a"], ["Kereviz", "#c8c39a"], ["Turp", "#c0436a"], ["Greyfurt", "#ef7a5a"]] },
];

export function Seasons() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const m = new Date().getMonth();
    setS(m >= 2 && m <= 4 ? 0 : m >= 5 && m <= 7 ? 1 : m >= 8 && m <= 10 ? 2 : 3);
  }, []);
  const cur = seasons[s];
  return (
    <section id="mevsim" className="relative overflow-hidden bg-forest px-4 py-28 text-oat sm:px-6 lg:py-36">
      <motion.div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full blur-[120px]" animate={{ backgroundColor: cur.c, opacity: 0.25 }} transition={{ duration: 1.2 }} />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker light>Mevsim sepeti</Kicker>
          <Title a="Mevsiminde," b="en lezzetlisi." light />
          <p className="mt-6 max-w-md text-oat/70">Mevsiminde tüketilen ürünler hem daha lezzetli hem de çoğu zaman daha ekonomiktir. Bir mevsim seç ve sepetini keşfet.</p>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {seasons.map((x, k) => (
              <button key={x.k} onClick={() => setS(k)} className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left transition duration-500 ${k === s ? "border-oat bg-oat text-forest" : "border-oat/15 hover:border-oat/40"}`}>
                <x.I className="h-5 w-5" strokeWidth={1.6} />
                <span className="font-serif text-xl">{x.k}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="relative rounded-[2.5rem] border border-oat/10 bg-forest-2/60 p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.ul key={cur.k} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {cur.items.map(([n, c], k) => (
                  <motion.li key={n} initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: k * 0.05, type: "spring", stiffness: 260, damping: 20 }} className="flex flex-col items-center gap-3 rounded-3xl bg-oat/5 p-5 text-center">
                    <motion.span className="block h-14 w-14 rounded-full shadow-inner" style={{ background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.6), rgba(255,255,255,0) 42%), ${c}` }} animate={{ y: [0, -4, 0] }} transition={{ duration: 3 + (k % 3), repeat: Infinity, ease: "easeInOut" }} />
                    <span className="text-sm font-semibold">{n}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Doğru bilinen yanlışlar ---------------- */
const myths = [
  { m: "Akşam altıdan sonra yemek kilo aldırır.", f: "Belirleyici olan tek başına saat değil; gün içindeki toplam enerji dengesi ve öğünlerin kalitesidir." },
  { m: "Ekmek tamamen bırakılmalı.", f: "Tam tahıllı ekmek dengeli bir planın parçası olabilir. Türü ve miktarı kişiye göre ayarlanır." },
  { m: "Detoks içecekleri vücudu arındırır.", f: "Vücudun karaciğer ve böbrekler gibi kendi arınma sistemleri vardır; tek bir içecek mucize sağlamaz." },
  { m: "Sağlıklı beslenmek pahalıdır.", f: "Mevsim ürünleri, baklagiller ve tahıllarla ekonomik, lezzetli ve dengeli sofralar kurulabilir." },
];

export function Myths() {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
  return (
    <section className="px-4 py-28 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Kicker>Doğru bilinen yanlışlar</Kicker>
            <Title a="Duyduğun her şeye" b="inanma." />
          </div>
          <p className="max-w-sm text-muted">Kartın üzerine dokun, arkasındaki bilgiyi gör.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {myths.map((x, i) => {
            const on = open.includes(i);
            return (
              <button key={x.m} onClick={() => toggle(i)} className="group h-[320px] text-left [perspective:1200px]" aria-pressed={on} aria-label={x.m}>
                <motion.div className="relative h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: on ? 180 : 0 }} transition={{ duration: 0.8, ease }}>
                  <div className="absolute inset-0 flex flex-col justify-between rounded-[2rem] bg-oat-2 p-7 [backface-visibility:hidden]">
                    <span className="w-fit rounded-full bg-clay/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-clay-deep">Yaygın inanış</span>
                    <p className="font-serif text-[1.7rem] leading-tight text-forest">“{x.m}”</p>
                    <span className="flex items-center gap-2 text-sm text-muted transition group-hover:text-forest">
                      <RotateCcw className="h-4 w-4" /> Gerçeği gör
                    </span>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between rounded-[2rem] bg-forest p-7 text-oat [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="w-fit rounded-full bg-sage/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sage">Bilinmesi gereken</span>
                    <p className="text-lg leading-relaxed">{x.f}</p>
                    <span className="flex items-center gap-2 text-sm text-oat/60">
                      <RotateCcw className="h-4 w-4" /> Geri çevir
                    </span>
                  </div>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Su takibi (yalnızca bu cihazda) ---------------- */
const WKEY = "diyetisyen-su";
export function Water() {
  const [n, setN] = useState(0);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(WKEY) || "null");
      if (v && v.d === new Date().toDateString()) setN(v.n);
    } catch {}
  }, []);
  const set = (v: number) => {
    setN(v);
    try {
      localStorage.setItem(WKEY, JSON.stringify({ d: new Date().toDateString(), n: v }));
    } catch {}
  };
  const goal = 8;
  return (
    <section className="px-4 pb-28 sm:px-6 lg:pb-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[2.5rem] bg-[#e4ece9] p-8 sm:p-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker>Küçük bir alışkanlık</Kicker>
          <h2 className="font-serif text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1] text-forest">
            Bugün kaç bardak <em className="text-clay-deep">su içtin?</em>
          </h2>
          <p className="mt-5 max-w-sm text-muted">Bardaklara dokunarak işaretle. Kayıt yalnızca bu cihazda, bugünle sınırlı tutulur.</p>
        </div>
        <div className="lg:col-span-7">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {Array.from({ length: goal }).map((_, i) => {
              const full = i < n;
              return (
                <button key={i} onClick={() => set(full && i === n - 1 ? i : i + 1)} aria-label={`${i + 1}. bardak`} className="group relative mx-auto h-24 w-14">
                  <svg viewBox="0 0 56 96" className="h-full w-full">
                    <defs>
                      <clipPath id={`g${i}`}>
                        <path d="M6 6h44l-5 82a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4Z" />
                      </clipPath>
                    </defs>
                    <motion.rect x="0" width="56" height="96" fill="#8fb3b8" clipPath={`url(#g${i})`} initial={false} animate={{ y: full ? 18 : 96 }} transition={{ type: "spring", stiffness: 120, damping: 16 }} />
                    <path d="M6 6h44l-5 82a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4Z" fill="none" stroke="#293d32" strokeOpacity=".35" strokeWidth="2" />
                  </svg>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <Droplet className="h-5 w-5 text-[#5f8f96]" />
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/70">
              <motion.div className="h-full rounded-full bg-[#5f8f96]" animate={{ width: `${(n / goal) * 100}%` }} transition={{ duration: 0.6, ease }} />
            </div>
            <span className="font-serif text-2xl text-forest tabular-nums">{n}/{goal}</span>
          </div>
          <p className="mt-3 text-xs text-muted">Günlük sıvı ihtiyacı yaş, aktivite, iklim ve sağlık durumuna göre değişir.</p>
        </div>
      </div>
    </section>
  );
}
