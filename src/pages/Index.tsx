import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/5528d049-ea7f-47d5-9ea8-4ca31a980cb3/files/a3e4b21c-f04c-4bf3-944e-0ee10fa11059.jpg";
const GALLERY_IMG = "https://cdn.poehali.dev/projects/5528d049-ea7f-47d5-9ea8-4ca31a980cb3/files/69306e75-3c78-40a9-adb2-d4689f3027c2.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "О Тёме", href: "#about" },
  { label: "Статистика", href: "#stats" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
];

const STRENGTHS = [
  { icon: "Zap", label: "Скорость", desc: "Делаю всё быстро и эффективно", color: "#aaff00" },
  { icon: "Brain", label: "Интеллект", desc: "Решаю сложные задачи легко", color: "#b44fff" },
  { icon: "Heart", label: "Преданность", desc: "Всегда до конца за своих", color: "#ff6b00" },
  { icon: "Star", label: "Харизма", desc: "Притягиваю людей и идеи", color: "#00e5ff" },
  { icon: "Flame", label: "Энергия", desc: "Заряжаю всех вокруг собой", color: "#ff4466" },
  { icon: "Lightbulb", label: "Креатив", desc: "Нестандартные решения всегда", color: "#aaff00" },
];

const STATS = [
  { value: "21", label: "год", sub: "возраст" },
  { value: "47+", label: "проектов", sub: "завершено" },
  { value: "1000+", label: "идей", sub: "в голове" },
  { value: "∞", label: "амбиций", sub: "без лимита" },
];

const GALLERY_ITEMS = [
  { label: "Путешествия 🌍", colors: ["#7c3aed", "#06b6d4"] },
  { label: "Тусовки 🎉", colors: ["#ea580c", "#ec4899"] },
  { label: "Спорт 💪", colors: ["#65a30d", "#059669"] },
  { label: "Музыка 🎵", colors: ["#7e22ce", "#1d4ed8"] },
  { label: "Фото 📸", colors: ["#ca8a04", "#ea580c"] },
  { label: "Еда 🍕", colors: ["#dc2626", "#f472b6"] },
];

function useInView(ref: React.RefObject<Element>, once = true) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, once]);
  return inView;
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [clickedStrength, setClickedStrength] = useState<number | null>(null);

  const aboutRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const contactsRef = useRef<HTMLElement>(null);

  const aboutInView = useInView(aboutRef as React.RefObject<Element>);
  const statsInView = useInView(statsRef as React.RefObject<Element>);
  const galleryInView = useInView(galleryRef as React.RefObject<Element>);
  const contactsInView = useInView(contactsRef as React.RefObject<Element>);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "stats", "gallery", "contacts"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStrengthClick = (i: number) => {
    setClickedStrength(i);
    setTimeout(() => setClickedStrength(null), 400);
  };

  return (
    <div className="min-h-screen font-golos text-white overflow-x-hidden" style={{
      background: "radial-gradient(ellipse at 20% 20%, rgba(180,79,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(0,229,255,0.1) 0%, transparent 50%), #0a0a0f"
    }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(180,79,255,0.15)" }}>
        <span className="font-unbounded text-xl font-black" style={{ background: "linear-gradient(135deg,#b44fff,#00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ТЁМА</span>

        <div className="hidden md:flex gap-1">
          {NAV_ITEMS.map(({ label, href }) => {
            const id = href.replace("#", "");
            return (
              <a key={id} href={href}
                className="px-4 py-2 rounded-full text-sm font-golos transition-all duration-300"
                style={activeNav === id
                  ? { background: "#b44fff", color: "#fff", fontWeight: 600 }
                  : { color: "#9ca3af" }}
                onMouseEnter={(e) => { if (activeNav !== id) (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { if (activeNav !== id) (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
              >
                {label}
              </a>
            );
          })}
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
          style={{ background: "rgba(10,10,15,0.97)", backdropFilter: "blur(20px)" }}>
          {NAV_ITEMS.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              className="font-unbounded text-2xl font-bold text-white transition-colors duration-300"
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#b44fff"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center pt-20 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute top-32 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #b44fff, transparent)" }} />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #00e5ff, transparent)" }} />

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm animate-fade-in-up"
              style={{ background: "linear-gradient(135deg,rgba(180,79,255,0.15),rgba(0,229,255,0.1))", border: "1px solid rgba(180,79,255,0.3)" }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-300">Открыт к новым возможностям</span>
            </div>

            <h1 className="font-unbounded text-5xl md:text-7xl font-black leading-none mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <span className="block text-white">Привет,</span>
              <span className="block" style={{ background: "linear-gradient(135deg,#b44fff,#00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textShadow: "none" }}>
                я Тёма
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-md animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Живу ярко, мыслю нестандартно, делаю невозможное — и это только начало моей истории 🚀
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <a href="#about"
                className="px-8 py-3 rounded-full font-unbounded text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg,#b44fff,#00e5ff)", color: "#0a0a0f", boxShadow: "0 0 30px rgba(180,79,255,0.4)" }}>
                Узнать больше
              </a>
              <a href="#contacts"
                className="px-8 py-3 rounded-full font-unbounded text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                style={{ border: "1px solid rgba(180,79,255,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(180,79,255,0.1)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                Написать
              </a>
            </div>
          </div>

          <div className="flex justify-center relative animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden animate-float"
                style={{ border: "2px solid rgba(180,79,255,0.4)", boxShadow: "0 0 60px rgba(180,79,255,0.3), 0 0 120px rgba(180,79,255,0.1)" }}>
                <img src={HERO_IMG} alt="Тёма" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-2xl font-unbounded text-xs font-bold animate-pulse-ring"
                style={{ background: "#aaff00", color: "#0a0a0f" }}>
                ✨ TOP 1%
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl font-golos text-sm font-semibold text-white"
                style={{ background: "rgba(255,107,0,0.9)", backdropFilter: "blur(10px)" }}>
                🔥 Артём
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
          <span className="text-xs text-gray-500 font-golos">скролл</span>
          <Icon name="ChevronDown" size={20} style={{ color: "#b44fff" }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-4 overflow-hidden" style={{ background: "rgba(180,79,255,0.08)", borderTop: "1px solid rgba(180,79,255,0.2)", borderBottom: "1px solid rgba(180,79,255,0.2)" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {["ТЁМА", "⚡", "АРТЁМ", "🔥", "СИЛА", "✨", "РОСТ", "💪", "УСПЕХ", "🚀", "ХАРИЗМА", "⭐",
            "ТЁМА", "⚡", "АРТЁМ", "🔥", "СИЛА", "✨", "РОСТ", "💪", "УСПЕХ", "🚀", "ХАРИЗМА", "⭐"].map((w, i) => (
            <span key={i} className="font-unbounded text-sm font-bold px-6" style={{ color: "rgba(180,79,255,0.7)" }}>{w}</span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" ref={aboutRef as React.RefObject<HTMLElement>} className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className={aboutInView ? "animate-fade-in-up" : "opacity-0"} style={{ marginBottom: 64 }}>
            <span className="font-unbounded text-xs tracking-widest uppercase mb-3 block" style={{ color: "#b44fff" }}>О себе</span>
            <h2 className="font-unbounded text-4xl md:text-5xl font-black text-white">
              Кто такой{" "}
              <span style={{ background: "linear-gradient(135deg,#b44fff,#00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Тёма?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className={aboutInView ? "animate-slide-in-left space-y-6" : "opacity-0 space-y-6"}>
              <p className="text-gray-300 text-lg leading-relaxed">
                Привет! Меня зовут Артём, но все зовут меня просто{" "}
                <strong style={{ color: "#b44fff" }}>Тёма</strong>.
                Я человек действия — если загораюсь идеей, то иду до конца.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Люблю встречи с интересными людьми, новые вызовы и нестандартные решения.
                Моя жизнь — это постоянное движение вперёд, и я никогда не стою на месте.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Здесь ты найдёшь всё обо мне — мои достижения, галерею и способ связаться. Заходи, не стесняйся! 👋
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Предприниматель", "Творец", "Командный игрок", "Визионер", "Оптимист"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full text-sm text-gray-200 font-golos transition-all duration-300 cursor-default"
                    style={{ background: "linear-gradient(135deg,rgba(180,79,255,0.15),rgba(0,229,255,0.1))", border: "1px solid rgba(180,79,255,0.3)" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-golos mb-4 font-semibold uppercase tracking-wider" style={{ color: "#aaff00" }}>
                Нажми на достоинство →
              </p>
              <div className="grid grid-cols-2 gap-3">
                {STRENGTHS.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => handleStrengthClick(i)}
                    className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 select-none ${aboutInView ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{
                      animationDelay: `${(i + 1) * 0.1}s`,
                      background: clickedStrength === i
                        ? `linear-gradient(135deg, ${s.color}30, ${s.color}15)`
                        : "rgba(19,19,28,0.9)",
                      border: `1px solid ${clickedStrength === i ? s.color : "rgba(42,42,58,0.8)"}`,
                      boxShadow: clickedStrength === i ? `0 0 25px ${s.color}40` : "none",
                      transform: clickedStrength === i ? "scale(1.06)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (clickedStrength !== i) {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                        (e.currentTarget as HTMLElement).style.borderColor = `${s.color}60`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (clickedStrength !== i) {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(42,42,58,0.8)";
                      }
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={s.icon} size={20} style={{ color: s.color }} fallback="Star" />
                      <span className="font-unbounded text-sm font-bold text-white">{s.label}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-snug">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" ref={statsRef as React.RefObject<HTMLElement>} className="py-24 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(170,255,0,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto relative">
          <div className={`text-center mb-16 ${statsInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-unbounded text-xs tracking-widest uppercase mb-3 block" style={{ color: "#aaff00" }}>Цифры</span>
            <h2 className="font-unbounded text-4xl md:text-5xl font-black text-white">
              Статистика{" "}
              <span style={{ background: "linear-gradient(135deg,#aaff00,#00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>в цифрах</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`rounded-3xl p-8 text-center transition-all duration-300 ${statsInView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{
                  animationDelay: `${(i + 1) * 0.1}s`,
                  background: "rgba(19,19,28,0.8)",
                  border: "1px solid rgba(170,255,0,0.15)",
                  backdropFilter: "blur(10px)"
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
              >
                <div className="font-unbounded text-4xl md:text-5xl font-black mb-1"
                  style={{ background: "linear-gradient(135deg,#aaff00,#00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.value}
                </div>
                <div className="font-golos text-sm font-semibold" style={{ color: "#aaff00" }}>{s.label}</div>
                <div className="text-gray-500 text-xs mt-1 font-golos">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className={`mt-16 grid md:grid-cols-2 gap-8 ${statsInView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.5s" }}>
            {[
              { label: "Коммуникабельность", val: 95, color: "#b44fff" },
              { label: "Целеустремлённость", val: 90, color: "#aaff00" },
              { label: "Командная работа", val: 88, color: "#00e5ff" },
              { label: "Креативность", val: 92, color: "#ff6b00" },
            ].map((bar, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-golos text-sm text-gray-300">{bar.label}</span>
                  <span className="font-unbounded text-xs font-bold" style={{ color: bar.color }}>{bar.val}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: statsInView ? `${bar.val}%` : "0%",
                      background: `linear-gradient(90deg, ${bar.color}, ${bar.color}88)`,
                      boxShadow: `0 0 10px ${bar.color}60`,
                      transitionDelay: `${i * 150 + 300}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" ref={galleryRef as React.RefObject<HTMLElement>} className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-16 ${galleryInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-unbounded text-xs tracking-widest uppercase mb-3 block" style={{ color: "#00e5ff" }}>Моменты</span>
            <h2 className="font-unbounded text-4xl md:text-5xl font-black text-white">
              Моя{" "}
              <span style={{ background: "linear-gradient(135deg,#00e5ff,#b44fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>галерея</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridTemplateRows: "auto" }}>
            <div
              className={`col-span-2 rounded-3xl overflow-hidden relative cursor-pointer transition-transform duration-300 ${galleryInView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ minHeight: 300, border: "1px solid rgba(0,229,255,0.2)" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
            >
              <img src={GALLERY_IMG} alt="Галерея" className="w-full h-full object-cover" style={{ minHeight: 300 }} />
              <div className="absolute inset-0 flex items-end p-6"
                style={{ background: "linear-gradient(to top, rgba(10,10,15,0.8), transparent)" }}>
                <span className="font-unbounded text-white font-bold text-lg">Мои лучшие моменты 📸</span>
              </div>
            </div>

            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`rounded-3xl flex items-center justify-center p-6 cursor-pointer transition-all duration-300 ${galleryInView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{
                  minHeight: 120,
                  background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})`,
                  animationDelay: `${(i + 1) * 0.1}s`,
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = "translateY(-4px) scale(1.02)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)"}
              >
                <span className="font-golos text-sm font-semibold text-white text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" ref={contactsRef as React.RefObject<HTMLElement>} className="py-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`mb-12 ${contactsInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-unbounded text-xs tracking-widest uppercase mb-3 block" style={{ color: "#ff6b00" }}>Связь</span>
            <h2 className="font-unbounded text-4xl md:text-5xl font-black text-white mb-4">
              Напиши{" "}
              <span style={{ background: "linear-gradient(135deg,#ff6b00,#ff4466)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>мне</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Открыт для общения, коллабораций и новых идей — пиши в любое время!
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-4 mb-12 ${contactsInView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}>
            {[
              { icon: "MessageCircle", label: "Telegram", value: "@tyoma", color: "#00e5ff", href: "#" },
              { icon: "Instagram", label: "Instagram", value: "@tyoma.life", color: "#b44fff", href: "#" },
              { icon: "Mail", label: "Email", value: "hi@tyoma.ru", color: "#aaff00", href: "#" },
            ].map((c, i) => (
              <a
                key={i}
                href={c.href}
                className="rounded-3xl p-6 text-center block transition-all duration-300"
                style={{ background: "rgba(19,19,28,0.9)", border: `1px solid ${c.color}30` }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${c.color}80`;
                  el.style.boxShadow = `0 0 30px ${c.color}20`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${c.color}30`;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${c.color}15` }}>
                  <Icon name={c.icon} size={22} style={{ color: c.color }} fallback="Link" />
                </div>
                <div className="font-unbounded text-sm font-bold text-white mb-1">{c.label}</div>
                <div className="text-gray-500 text-sm font-golos">{c.value}</div>
              </a>
            ))}
          </div>

          <div className={`${contactsInView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
            <div className="rounded-3xl p-8 text-center"
              style={{ background: "linear-gradient(135deg,rgba(180,79,255,0.1),rgba(0,229,255,0.08))", border: "1px solid rgba(180,79,255,0.2)" }}>
              <p className="font-unbounded text-xl font-bold text-white mb-2">Хочешь поработать вместе? 🚀</p>
              <p className="text-gray-400 mb-6 font-golos">Всегда рад новым проектам и крутым людям</p>
              <button
                className="px-10 py-3 rounded-full font-unbounded text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#ff6b00,#b44fff)",
                  boxShadow: "0 0 30px rgba(255,107,0,0.3)",
                  color: "#fff"
                }}>
                Давай общаться!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(42,42,58,0.6)" }}>
        <p className="font-golos text-gray-600 text-sm">
          Сделано с <span style={{ color: "#b44fff" }}>♥</span> © 2025 Тёма
        </p>
      </footer>
    </div>
  );
}