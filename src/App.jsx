import { useEffect, useMemo, useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "WAVII Home",
    subtitle: "Indoor Feel Shoe",
    price: 169,
    color: "Indigo",
    material: "IVIVI Barefoot Textile",
    category: "home",
    image: "/wai_front.jpeg",
    hoverImage: "/wai_behind.jpeg",
    tag: "Signature",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Ein leichter Feel Shoe für Zuhause, den Morgen, das Studio und alle Momente dazwischen. Flexibel, atmungsaktiv und so reduziert konstruiert, dass sich der Schuh kaum in den Vordergrund drueckt.",
  },
  {
    id: 2,
    name: "WAVII Travel",
    subtitle: "Packable Loafer",
    price: 179,
    color: "Deep Navy",
    material: "Flexible textile upper",
    category: "travel",
    image: "/wai1_front.jpeg",
    hoverImage: "/wai1_behind.jpeg",
    tag: "Travel",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Gemacht für Wege, Wartezeiten und leichte Routinen unterwegs. Die flexible Konstruktion laesst sich flach verstauen und bleibt trotzdem stabil genug für den ganzen Tag.",
  },
  {
    id: 3,
    name: "WAVII Flex",
    subtitle: "Barefoot Technology",
    price: 189,
    color: "Blue Canvas",
    material: "IVIVI sole system",
    category: "tech",
    image: "/wai2_front.jpeg",
    hoverImage: "/wai2_behind.jpeg",
    tag: "Flexible",
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
    description:
      "Die weiche, rollbare Sohle gibt dem Fuss Raum, ohne den Look eines klassischen Slippers zu verlieren. Ein ruhiger Schuh mit technischer Substanz.",
  },
  {
    id: 4,
    name: "WAVII Lounge",
    subtitle: "Soft Everyday Slip-on",
    price: 159,
    color: "Washed Blue",
    material: "Soft-woven textile",
    category: "home",
    image: "/wai3_front.jpeg",
    hoverImage: "/wai3_behind.jpeg",
    tag: null,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    description:
      "Ein entspannter Slip-on für ruhige Innenraeume, kurze Wege und Tage, an denen Komfort selbstverstaendlich sein soll.",
  },
  {
    id: 5,
    name: "WAVII Studio",
    subtitle: "Natural Movement",
    price: 174,
    color: "Ocean Blue",
    material: "Breathable upper",
    category: "tech",
    image: "/wai2_front.jpeg",
    hoverImage: "/wai2_behind.jpeg",
    tag: null,
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Minimal im Aufbau, weich im Auftritt und praezise dort, wo Halt gebraucht wird. für Training, Reisen und Alltag mit mehr Bewegungsfreiheit.",
  },
  {
    id: 6,
    name: "WAVII Classic",
    subtitle: "All-day Feel Shoe",
    price: 184,
    color: "Midnight",
    material: "Flexible sole",
    category: "travel",
    image: "/wai1_front.jpeg",
    hoverImage: "/wai1_behind.jpeg",
    tag: "New",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Der vielseitige WAI Slip-on für Alltag und Wochenende. Clean genug für Reisen, weich genug für Zuhause, belastbar genug für draussen.",
  },
];

const FEATURES = [
  ["01", "Barefoot feel", "Flexible Sohle und viel Raum für natuerliche Bewegung."],
  ["02", "Packable", "Leicht, weich und flach verstaubar für Reisen."],
  ["03", "Clean design", "Reduzierte Linien, textile Struktur, kein lauter Sportschuh."],
  ["04", "Easy care", "Gemacht für1 Alltag, kurze Wege und unkomplizierte Routinen."],
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

:root {
  --bg: #f7f3ed;
  --paper: #fffaf2;
  --text: #1c1917;
  --muted: #766b61;
  --line: rgba(28, 25, 23, 0.12);
  --line-strong: rgba(28, 25, 23, 0.22);
  --navy: #172333;
  --clay: #b8a898;
  --sand: #ede7de;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); }
button, a { font: inherit; }
button { color: inherit; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.045); }
}

.site {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: "DM Sans", system-ui, sans-serif;
  font-weight: 300;
  overflow-x: hidden;
}

.serif { font-family: "Cormorant Garamond", Georgia, serif; }

.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 28px;
  padding: 22px 44px;
  border-bottom: 1px solid transparent;
  transition: background 0.35s ease, border-color 0.35s ease, padding 0.35s ease;
}

.nav.scrolled {
  background: rgba(247, 243, 237, 0.9);
  border-bottom-color: var(--line);
  backdrop-filter: blur(18px);
}

.nav.dark:not(.scrolled) { color: var(--paper); }
.nav-left, .nav-right { display: flex; align-items: center; gap: 30px; }
.nav-right { justify-content: flex-end; }
.nav a, .nav button {
  text-decoration: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: inherit;
}

.nav-link {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  opacity: 0.72;
}

.brand {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 34px;
  letter-spacing: 0.12em;
  line-height: 1;
  white-space: nowrap;
}

.bag-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid currentColor !important;
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  opacity: 0.88;
}

.bag-count {
  display: inline-grid;
  place-items: center;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: currentColor;
  color: var(--bg);
  font-size: 10px;
}

.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: end;
  padding: 128px 44px 48px;
  color: var(--paper);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 60% center;
  animation: slowZoom 14s ease-out both;
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(20, 17, 14, 0.78) 0%, rgba(20, 17, 14, 0.44) 38%, rgba(20, 17, 14, 0.08) 72%),
    linear-gradient(0deg, rgba(20, 17, 14, 0.25), rgba(20, 17, 14, 0.02));
}

.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 690px) 1fr;
  gap: 40px;
  align-items: end;
  width: 100%;
}

.hero-copy {
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.eyebrow {
  margin: 0 0 18px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  opacity: 0.76;
}

.hero h1 {
  margin: 0;
  max-width: 680px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 92px;
  line-height: 0.93;
  font-weight: 300;
  letter-spacing: 0;
}

.hero-text {
  max-width: 480px;
  margin: 26px 0 0;
  color: rgba(255, 250, 242, 0.78);
  font-size: 17px;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 34px;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border-radius: 999px;
  padding: 0 24px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 12px;
}

.primary-btn { background: var(--paper); color: var(--text); }
.secondary-btn { color: var(--paper); border: 1px solid rgba(255, 250, 242, 0.46); }

.hero-proof {
  justify-self: end;
  width: min(360px, 100%);
  border-top: 1px solid rgba(255, 250, 242, 0.44);
  padding-top: 20px;
  color: rgba(255, 250, 242, 0.78);
  font-size: 13px;
  line-height: 1.65;
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
}

.story-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 32px;
  margin-top: 36px;
  padding-top: 30px;
  border-top: 1px solid var(--line);
}

.story-feature strong {
  display: block;
  margin-bottom: 5px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 500;
}

.story-feature span {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

.section {
  padding: 92px 44px;
}

.section-inner {
  max-width: 1360px;
  margin: 0 auto;
}

.section-head {
  display: grid;
  grid-template-columns: minmax(0, 620px) auto;
  gap: 36px;
  align-items: end;
  margin-bottom: 34px;
}

.section h2 {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 58px;
  line-height: 1;
  font-weight: 300;
  letter-spacing: 0;
}

.section-note {
  margin: 16px 0 0;
  max-width: 520px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
}

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.filter {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  padding: 10px 16px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  cursor: pointer;
}

.filter.active {
  background: var(--text);
  color: var(--paper);
  border-color: var(--text);
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.product-card {
  position: relative;
  display: grid;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  min-height: 520px;
  cursor: pointer;
  text-align: left;
  animation: fadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.product-media {
  position: relative;
  height: 440px;
  overflow: hidden;
  background: var(--sand);
}

.product-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease;
}

.product-card:hover .product-media img { transform: scale(1.045); }

.product-media .hover-img {
  position: absolute;
  inset: 0;
  opacity: 0;
}

.product-card:hover .hover-img { opacity: 1; }
.product-card:hover .main-img { opacity: 0; }

.product-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  border-radius: 999px;
  background: rgba(255, 250, 242, 0.88);
  padding: 7px 12px;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 10px;
}

.quick-add {
  position: absolute;
  right: 14px;
  bottom: 14px;
  z-index: 2;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(28, 25, 23, 0.18);
  background: rgba(255, 250, 242, 0.9);
  cursor: pointer;
  font-size: 23px;
  line-height: 1;
}

.product-info {
  display: grid;
  gap: 18px;
  padding: 22px;
}

.product-title-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: start;
}

.product-name {
  margin: 0 0 6px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 30px;
  line-height: 1;
  font-weight: 400;
}

.product-sub {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}

.price {
  white-space: nowrap;
  font-size: 14px;
  color: var(--muted);
}

.product-meta {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 12px;
}

.story {
  background: #fff;
}

.story-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);
  gap: 52px;
  align-items: center;
}

.story-copy {
  max-width: 490px;
}

.story-copy p {
  color: var(--muted);
  line-height: 1.82;
  font-size: 15px;
}

.story-link {
  display: inline-flex;
  margin-top: 18px;
  color: var(--text);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 12px;
  border-bottom: 1px solid currentColor;
  padding-bottom: 5px;
}

.story-images {
  display: grid;
  grid-template-columns: 1fr 0.72fr;
  gap: 18px;
  align-items: end;
}

.story-image {
  overflow: hidden;
  border-radius: 8px;
  background: var(--sand);
}
.story-image.large { aspect-ratio: 4 / 5; }
.story-image.small { aspect-ratio: 4 / 4.8; margin-bottom: 58px; }
.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner {
  position: relative;
  min-height: 520px;
  display: grid;
  align-items: end;
  color: var(--paper);
  overflow: hidden;
  padding: 44px;
}

.banner img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(13, 17, 20, 0.74), rgba(13, 17, 20, 0.06));
}

.banner-content {
  position: relative;
  z-index: 1;
  max-width: 560px;
}

.banner h2 {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 62px;
  line-height: 1;
  font-weight: 300;
}

.banner p {
  color: rgba(255, 250, 242, 0.78);
  font-size: 16px;
  line-height: 1.75;
}

.footer {
  padding: 58px 44px 38px;
  border-top: 1px solid var(--line);
}

.footer-inner {
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
}

.footer-brand {
  margin: 0 0 10px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 42px;
  letter-spacing: 0.12em;
}

.footer p {
  color: var(--muted);
  margin: 0;
  line-height: 1.7;
}

.footer-links {
  display: flex;
  gap: 34px;
  align-items: start;
}

.footer-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 13px;
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(0, 0, 0, 0.38);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.drawer-overlay.open { opacity: 1; pointer-events: auto; }

.drawer {
  position: fixed;
  inset: 0 0 0 auto;
  z-index: 90;
  width: min(430px, 100vw);
  background: var(--bg);
  border-left: 1px solid var(--line);
  display: grid;
  grid-template-rows: auto 1fr auto;
  transform: translateX(102%);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer.open { transform: translateX(0); }

.drawer-head,
.drawer-foot {
  padding: 26px;
  border-bottom: 1px solid var(--line);
}
.drawer-foot { border-bottom: 0; border-top: 1px solid var(--line); }
.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.drawer-head h2 {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 32px;
  font-weight: 400;
}
.close {
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.drawer-body {
  overflow: auto;
  padding: 18px 26px;
}
.empty {
  display: grid;
  place-items: center;
  min-height: 260px;
  text-align: center;
  color: var(--muted);
}
.cart-row {
  display: grid;
  grid-template-columns: 82px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.cart-row img {
  width: 82px;
  height: 82px;
  object-fit: cover;
  border-radius: 6px;
  background: var(--sand);
}
.cart-row h3 {
  margin: 0 0 6px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 22px;
  font-weight: 400;
}
.cart-row p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}
.remove {
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 20px;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 18px;
}
.checkout {
  width: 100%;
  min-height: 50px;
  border: 0;
  border-radius: 999px;
  background: var(--text);
  color: var(--paper);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 12px;
  cursor: pointer;
}

.detail {
  min-height: 100vh;
  padding-top: 86px;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(390px, 0.9fr);
  min-height: calc(100vh - 86px);
}

.detail-media {
  position: relative;
  background: var(--sand);
  overflow: hidden;
}
.detail-media img {
  width: 100%;
  height: 100%;
  min-height: 620px;
  object-fit: cover;
}
.detail-panel {
  padding: 72px 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.back {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 34px;
  border: 0;
  background: transparent;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  cursor: pointer;
}
.detail-panel h1 {
  margin: 0 0 8px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 68px;
  line-height: 0.98;
  font-weight: 300;
}
.detail-sub {
  margin: 0 0 26px;
  color: var(--muted);
}
.detail-price {
  margin-bottom: 34px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 38px;
}
.size-label {
  margin-bottom: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 12px;
}
.sizes {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.size {
  width: 46px;
  height: 46px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.size.active {
  background: var(--text);
  color: var(--paper);
  border-color: var(--text);
}
.add-to-bag {
  min-height: 54px;
  border: 0;
  border-radius: 999px;
  background: var(--text);
  color: var(--paper);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 12px;
  cursor: pointer;
}
.add-to-bag:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.detail-copy {
  margin-top: 34px;
  padding-top: 28px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  line-height: 1.82;
}

@media (max-width: 980px) {
  .nav {
    grid-template-columns: auto 1fr auto;
    padding: 18px 20px;
  }
  .nav-left { display: none; }
  .brand { font-size: 30px; justify-self: start; }
  .nav-right { gap: 12px; }
  .nav-right .nav-link { display: none; }
  .hero {
    min-height: 86svh;
    padding: 108px 22px 34px;
  }
  .hero-bg { object-position: 67% center; }
  .hero::after {
    background: linear-gradient(90deg, rgba(20, 17, 14, 0.82), rgba(20, 17, 14, 0.34));
  }
  .hero-content { grid-template-columns: 1fr; }
  .hero h1 { font-size: 58px; max-width: 430px; }
  .hero-proof { justify-self: start; width: 100%; max-width: 430px; }
  .feature-strip { grid-template-columns: repeat(2, 1fr); }
  .feature:nth-child(2) { border-right: 0; }
  .section { padding: 68px 20px; }
  .section-head { grid-template-columns: 1fr; }
  .section h2 { font-size: 44px; }
  .filters { justify-content: flex-start; }
  .shop-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .story-layout { grid-template-columns: 1fr; }
  .story-copy { max-width: 650px; }
  .banner { padding: 28px 20px; min-height: 430px; }
  .banner h2 { font-size: 44px; }
  .footer-inner { grid-template-columns: 1fr; }
  .detail-grid { grid-template-columns: 1fr; }
  .detail-media img { min-height: 420px; }
  .detail-panel { padding: 42px 24px 64px; }
}

@media (max-width: 640px) {
  .bag-btn {
    width: 42px;
    height: 42px;
    padding: 0;
    justify-content: center;
  }
  .bag-label { display: none; }
  .hero h1 { font-size: 46px; }
  .hero-text { font-size: 15px; }
  .hero-actions { align-items: stretch; }
  .primary-btn, .secondary-btn { width: 100%; }
  .feature-strip { grid-template-columns: 1fr; }
  .feature { border-right: 0; }
  .shop-grid { grid-template-columns: 1fr; }
  .product-card { min-height: auto; }
  .product-media { height: 330px; }
  .story-images { grid-template-columns: 1fr; }
  .story-image.small { margin-bottom: 0; }
  .footer-links { flex-direction: column; gap: 12px; }
  .detail-panel h1 { font-size: 48px; }
}
`;

export default function App() {
  const [bag, setBag] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeProduct]);

  function openProduct(productId) {
    setSelectedSize("");
    setActiveProduct(productId);
  }

  function closeProduct() {
    setSelectedSize("");
    setActiveProduct(null);
  }

  const product = activeProduct ? PRODUCTS.find((item) => item.id === activeProduct) : null;
  const filteredProducts = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((item) => item.category === filter)),
    [filter],
  );
  const bagCount = bag.reduce((sum, item) => sum + item.qty, 0);
  const bagTotal = bag.reduce((sum, item) => {
    const match = PRODUCTS.find((p) => p.id === item.productId);
    return sum + (match ? match.price * item.qty : 0);
  }, 0);

  function addToBag(productId, size) {
    setBag((current) => {
      const found = current.findIndex((item) => item.productId === productId && item.size === size);
      if (found >= 0) {
        return current.map((item, index) => (index === found ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...current, { productId, size, qty: 1 }];
    });
    setBagOpen(true);
  }

  function removeFromBag(index) {
    setBag((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="site">
      <style>{CSS}</style>
      <Navigation
        scrolled={scrolled}
        dark={!product}
        bagCount={bagCount}
        onBag={() => setBagOpen(true)}
        onHome={closeProduct}
      />

      {product ? (
        <ProductDetail
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          onBack={closeProduct}
          onAdd={() => selectedSize && addToBag(product.id, selectedSize)}
        />
      ) : (
        <main>
          <Hero />
          <Shop
            products={filteredProducts}
            filter={filter}
            setFilter={setFilter}
            onOpen={openProduct}
            onQuickAdd={(productId) => {
              const quickProduct = PRODUCTS.find((item) => item.id === productId);
              addToBag(productId, quickProduct.sizes[Math.floor(quickProduct.sizes.length / 2)]);
            }}
          />
          <Story />
          <MovementBanner />
        </main>
      )}

      <Footer />
      <BagDrawer
        bag={bag}
        open={bagOpen}
        onClose={() => setBagOpen(false)}
        onRemove={removeFromBag}
        total={bagTotal}
      />
    </div>
  );
}

function Navigation({ scrolled, dark, bagCount, onBag, onHome }) {
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${dark ? " dark" : ""}`}>
      <div className="nav-left">
        <a className="nav-link" href="#shop">Shop</a>
        <a className="nav-link" href="#story">Design</a>
        <a className="nav-link" href="#movement">Movement</a>
      </div>
      <button className="brand" onClick={onHome} aria-label="Zur Startseite">WAI</button>
      <div className="nav-right">
        <a className="nav-link" href="#story">Made in Italy</a>
        <button className="bag-btn" onClick={onBag} aria-label="Warenkorb oeffnen">
          <span className="bag-label">Bag</span>
          <span className="bag-count">{bagCount}</span>
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <img className="hero-bg" src="/wai4-opt.jpeg" alt="WAI Feel Shoe in einer ruhigen Interior-Szene" />
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Feel shoes for natural movement</p>
          <h1>Natural freedom, refined.</h1>
          <p className="hero-text">
            WAI verbindet den Komfort eines Hausschuhs mit der Ruhe eines reduzierten Loafers:
            leicht, flexibel und gemacht für Wege drinnen, draussen und unterwegs.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#shop">Shop Collection</a>
            <a className="secondary-btn" href="#story">Discover WAI</a>
          </div>
        </div>
        <p className="hero-proof">
          IVIVI Barefoot Technology, textile Struktur und eine flexible Sohle, die den Fuss arbeiten laesst.
        </p>
      </div>
    </section>
  );
}


function Shop({ products, filter, setFilter, onOpen, onQuickAdd }) {
  const filters = [
    ["all", "All"],
    ["home", "Home"],
    ["travel", "Travel"],
    ["tech", "Flex"],
  ];

  return (
    <section className="section" id="shop">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <p className="eyebrow">WAI Collection</p>
            <h2>Clean shapes. Real comfort.</h2>
            <p className="section-note">
              Der Shop setzt die Produktbilder groesser, klarer und ruhiger ein. Kein lauter Katalog,
              sondern eine kompakte Auswahl mit Fokus auf Material, Bewegung und Alltag.
            </p>
          </div>
          <div className="filters" role="tablist" aria-label="Produkte filtern">
            {filters.map(([key, label]) => (
              <button
                className={`filter${filter === key ? " active" : ""}`}
                key={key}
                onClick={() => setFilter(key)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="shop-grid">
          {products.map((product, index) => (
            <article
              className="product-card"
              key={product.id}
              onClick={() => onOpen(product.id)}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="product-media">
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <img className="main-img" src={product.image} alt={product.name} />
                <img className="hover-img" src={product.hoverImage} alt="" aria-hidden="true" />
                <button
                  className="quick-add"
                  type="button"
                  aria-label={`${product.name} schnell in den Warenkorb legen`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onQuickAdd(product.id);
                  }}
                >
                  +
                </button>
              </div>
              <div className="product-info">
                <div className="product-title-row">
                  <div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-sub">{product.subtitle} · {product.color}</p>
                  </div>
                  <span className="price">EUR {product.price}</span>
                </div>
                <div className="product-meta">
                  <span>{product.material}</span>
                  <span>EU {product.sizes[0]}-{product.sizes[product.sizes.length - 1]}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section story" id="story">
      <div className="section-inner story-layout">
        <div className="story-copy">
          <p className="eyebrow">Designed with restraint</p>
          <h2>Less shoe. More feel.</h2>
          <p>
            Die Website spricht jetzt staerker ueber das, was man am Produkt sieht:
            textile Oberflaechen, flexible Sohlen und eine Formsprache, die nicht nach Performance-Sneaker aussieht.
          </p>
          <p>
            WAI bleibt visuell warm und hochwertig, aber die Komposition ist direkter. Grosse Motive,
            klare Shopkarten und kurze Texte lassen die Bilder arbeiten.
          </p>
          <a className="story-link" href="#shop">Zur Kollektion</a>
          <div className="story-features">
            {FEATURES.map(([, title, text]) => (
              <div className="story-feature" key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="story-images">
          <figure className="story-image large">
            <img src="/wai5-opt.jpeg" alt="WAI Schuhe mit flexibler Sohle auf Holz" />
          </figure>
          <figure className="story-image small">
            <img src="/wai6-opt.jpeg" alt="WAI Produktdetails mit rollbarer Sohle" />
          </figure>
        </div>
      </div>
    </section>
  );
}

function MovementBanner() {
  return (
    <section className="banner" id="movement">
      <img src="/wai7-opt.jpeg" alt="WAI Schuhe beim Reisen" />
      <div className="banner-content">
        <p className="eyebrow">Home, airport, weekend</p>
        <h2>One pair for the in-between.</h2>
        <p>
          Für Orte, an denen normale Schuhe zu hart und Hausschuhe zu wenig sind.
          Leicht am Fuss, ruhig im Look, schnell im Gepaeck.
        </p>
      </div>
    </section>
  );
}

function ProductDetail({ product, selectedSize, setSelectedSize, onBack, onAdd }) {
  return (
    <main className="detail">
      <div className="detail-grid">
        <div className="detail-media">
          <img src={product.hoverImage || product.image} alt={product.name} />
        </div>
        <div className="detail-panel">
          <button className="back" type="button" onClick={onBack}>Back to shop</button>
          <p className="eyebrow">{product.material}</p>
          <h1>{product.name}</h1>
          <p className="detail-sub">{product.subtitle} · {product.color}</p>
          <div className="detail-price">EUR {product.price}</div>

          <div className="size-label">Select size</div>
          <div className="sizes">
            {product.sizes.map((size) => (
              <button
                className={`size${selectedSize === size ? " active" : ""}`}
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <button className="add-to-bag" type="button" disabled={!selectedSize} onClick={onAdd}>
            Add to Bag
          </button>

          <p className="detail-copy">{product.description}</p>
        </div>
      </div>
    </main>
  );
}

function BagDrawer({ bag, open, onClose, onRemove, total }) {
  return (
    <>
      <div className={`drawer-overlay${open ? " open" : ""}`} onClick={onClose} />
      <aside className={`drawer${open ? " open" : ""}`} aria-label="Warenkorb">
        <div className="drawer-head">
          <h2>Your Bag</h2>
          <button className="close" type="button" onClick={onClose} aria-label="Warenkorb schliessen">×</button>
        </div>
        <div className="drawer-body">
          {bag.length === 0 ? (
            <div className="empty">Your bag is empty.</div>
          ) : (
            bag.map((item, index) => {
              const product = PRODUCTS.find((p) => p.id === item.productId);
              if (!product) return null;
              return (
                <div className="cart-row" key={`${item.productId}-${item.size}`}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>Size {item.size} · EUR {product.price} · Qty {item.qty}</p>
                  </div>
                  <button className="remove" type="button" onClick={() => onRemove(index)} aria-label="Produkt entfernen">×</button>
                </div>
              );
            })
          )}
        </div>
        {bag.length > 0 && (
          <div className="drawer-foot">
            <div className="total">
              <span>Total</span>
              <strong>EUR {total}</strong>
            </div>
            <button className="checkout" type="button">Proceed to Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">WAI</p>
          <p>Feel Shoes für natuerliche Bewegung. Ruhig im Design, leicht am Fuss.</p>
        </div>
        <div className="footer-links">
          <a href="#shop">Shop</a>
          <a href="#story">Design</a>
          <a href="#movement">Movement</a>
        </div>
      </div>
    </footer>
  );
}
