import { useState, useEffect } from "react";

// ── DATA ────────────────────────────────────────────────
const PRODUCTS = [
    {
        id: 1, name: "Accelerator®", subtitle: "Driving Slippers", price: 406,
        color: "Tan", material: "Nappa Leather", category: "schuhe",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_sideview_1024x1024.jpg?v=1678185665",
        tag: "Bestseller", cardBg: "#EDE7DE",
        sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
        description: "Our signature driving slipper, handcrafted from the finest Italian Nappa leather. The Vibram® HydroGrip sole delivers superior traction on any surface, while the removable Sorbothane® insole lets you go barefoot when the moment calls for it.",
    },
    {
        id: 2, name: "Accelerator®", subtitle: "Driving Slippers", price: 406,
        color: "Navy", material: "Nappa Leather", category: "schuhe",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_frontview_1024x1024.jpg?v=1678185665",
        tag: null, cardBg: "#D8D4CE",
        sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
        description: "The Accelerator in deep Navy — the same iconic driving slipper in a versatile colourway. Hand-stitched Nappa leather upper with Vibram® HydroGrip sole.",
    },
    {
        id: 3, name: "Classic Loafer", subtitle: "Indoor / Outdoor", price: 488,
        color: "Cognac", material: "Calfskin Leather", category: "schuhe",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_topview_1024x1024.jpg?v=1639750464",
        tag: "New", cardBg: "#E8E2D8",
        sizes: ["38", "39", "40", "41", "42", "43", "44"],
        description: "A refined loafer that transitions effortlessly from home to street. Italian calfskin leather with a cushioned insole and flexible sole for all-day comfort.",
    },
    {
        id: 4, name: "Heritage Moccasin", subtitle: "Hybrid Slipper", price: 376,
        color: "Chestnut", material: "Nappa Leather", category: "schuhe",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_backview_1024x1024.jpg?v=1678185665",
        tag: null, cardBg: "#DED8D0",
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        description: "The Heritage Moccasin blends traditional construction with modern comfort. Hand-stitched Nappa leather upper with a dual-density sole.",
    },
    {
        id: 5, name: "Elegance", subtitle: "Women's Loafer", price: 396,
        color: "Blush", material: "Nappa Leather", category: "schuhe",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_bottomview_1024x1024.jpg?v=1678185665",
        tag: "New", cardBg: "#E4DED6",
        sizes: ["36", "37", "38", "39", "40", "41"],
        description: "Designed for her — the Elegance loafer in soft Blush Nappa leather. Lightweight, flexible, and endlessly refined.",
    },
    {
        id: 6, name: "Traveller", subtitle: "Driving Shoe", price: 434,
        color: "Espresso", material: "Calfskin Leather", category: "schuhe",
        image: "https://loungersway.com/cdn/shop/products/20210621_154922_gray_2_1024x1024.jpg?v=1639750464",
        tag: null, cardBg: "#D4CEC6",
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        description: "Built for the road. The Traveller pairs rich calfskin leather with our most flexible sole, making it the ideal companion for long drives and weekend escapes.",
    },
    {
        id: 7, name: "Cashmere Crew", subtitle: "Knitted Pullover", price: 295,
        color: "Sand", material: "100% Cashmere", category: "pullover",
        image: null, tag: "New", cardBg: "#E8DDD0",
        sizes: ["S", "M", "L", "XL"],
        description: "Luxuriously soft Mongolian cashmere, knitted in Italy. A relaxed crew neck with ribbed cuffs and hem — understated warmth for every season.",
    },
    {
        id: 8, name: "Merino V-Neck", subtitle: "Lightweight Pullover", price: 245,
        color: "Charcoal", material: "Extra-Fine Merino", category: "pullover",
        image: null, tag: null, cardBg: "#C8C4BE",
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Extra-fine Italian merino wool in a classic V-neck silhouette. Breathable, temperature-regulating, and impeccably finished.",
    },
    {
        id: 9, name: "Heritage Cable", subtitle: "Cable-Knit Pullover", price: 325,
        color: "Cream", material: "Cashmere Blend", category: "pullover",
        image: null, tag: "Bestseller", cardBg: "#EAE4DC",
        sizes: ["S", "M", "L", "XL"],
        description: "A classic cable-knit pattern in a cashmere-wool blend. Crafted by Italian artisans using traditional knitting techniques passed down through generations.",
    },
    {
        id: 10, name: "Travel Layer", subtitle: "Zip Pullover", price: 265,
        color: "Navy", material: "Merino Wool", category: "pullover",
        image: null, tag: null, cardBg: "#C4CAD2",
        sizes: ["S", "M", "L", "XL"],
        description: "The perfect travel companion. Half-zip merino pullover that packs flat and keeps you comfortable from lounge to landing.",
    },
];

const FEATURES = [
    { icon: "\u2726", title: "Handcrafted in Italy", desc: "Master artisans since 1979" },
    { icon: "\u25C8", title: "Vibram\u00AE HydroGrip", desc: "Superior traction & stability" },
    { icon: "\u25CB", title: "Barefoot Option", desc: "Removable Sorbothane\u00AE insoles" },
    { icon: "\u25C7", title: "Sustainable", desc: "One tree planted per pair" },
];

// ── ICONS ───────────────────────────────────────────────
function BagIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
        </svg>
    );
}

function PlusIcon({ size = 14 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

// ── GLOBAL STYLES (injected once) ───────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-1.5deg); }
  50% { transform: translateY(-24px) rotate(1deg); }
}
@keyframes pulseLine {
  0%, 100% { opacity: 0.3; transform: scaleY(0.85) translateY(0); }
  50% { opacity: 1; transform: scaleY(1.2) translateY(4px); }
}

.hero-section::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.028; mix-blend-mode: multiply; z-index: 1;
}
.hero-section > * { position: relative; z-index: 2; }

.nav-link { position: relative; transition: opacity 0.25s; opacity: 0.6; }
.nav-link:hover { opacity: 1; }

.hero-cta-pill { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
.hero-cta-pill:hover { transform: scale(1.05); }
.hero-cta-pill .arr { display: inline-block; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
.hero-cta-pill:hover .arr { transform: translateX(5px); }

.p-card { cursor: pointer; text-decoration: none; color: inherit; display: block; }
.p-card-img-inner { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
.p-card:hover .p-card-img-inner { transform: scale(1.04); }
.p-card-shoe { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
.p-card:hover .p-card-shoe { transform: translateY(-10px) rotate(2deg); }

.quick-add {
  transition: background 0.25s, color 0.25s, transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.quick-add:hover { background: var(--text-color) !important; color: var(--bg-color) !important; transform: scale(1.08); }

.filter-pill { transition: all 0.3s ease; }
.filter-pill:hover { color: #3D2B1F !important; border-color: #3D2B1F !important; }

.view-all-link { transition: color 0.3s, border-color 0.3s; }
.view-all-link:hover { color: #3D2B1F; border-color: #3D2B1F; }

.feature-card { transition: all 0.4s ease; }
.feature-card:hover { background: rgba(61,43,31,0.03); }

.cta-link { position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
.cta-link::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1.5px;
  background: currentColor; transform: scaleX(0); transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.cta-link:hover::after { transform: scaleX(1); transform-origin: left; }

.bag-overlay { opacity: 0; pointer-events: none; transition: opacity 0.4s; }
.bag-overlay.open { opacity: 1; pointer-events: all; }
.bag-drawer { transform: translateX(105%); transition: transform 0.55s cubic-bezier(0.16,1,0.3,1); }
.bag-drawer.open { transform: translateX(0); }

.size-btn { transition: background 0.25s, color 0.25s, border-color 0.25s; }
.size-btn:hover { background: #EDE7DE; }
.size-btn.active { background: #3D2B1F !important; color: #F7F3ED !important; border-color: #3D2B1F !important; }

.add-bag-btn { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s; }
.add-bag-btn:hover { transform: scale(1.02); background: #2C2520; }

.detail-back { transition: opacity 0.25s; opacity: 0.6; }
.detail-back:hover { opacity: 1; }

.bag-nav-btn { transition: background 0.25s; }
.bag-nav-btn:hover { background: #EDE7DE; }

.cart-close-btn { transition: background 0.2s; }
.cart-close-btn:hover { background: #EDE7DE; }

.checkout-btn { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
.checkout-btn:hover { transform: scale(1.02); }

.ci-del { transition: color 0.2s; }
.ci-del:hover { color: #1C1917; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #F7F3ED; }
::-webkit-scrollbar-thumb { background: #C8B8A0; border-radius: 3px; }
`;

// ── MAIN COMPONENT ──────────────────────────────────────
export default function LoungersShop() {
    const [activePage, setActivePage] = useState(null);
    const [bag, setBag] = useState([]);
    const [bagOpen, setBagOpen] = useState(false);
    const [filter, setFilter] = useState("all");
    const [loaded, setLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
        const handleScroll = () => setScrollY(window.scrollY || 0);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedSize(null);
    }, [activePage]);

    const addToBag = (productId, size) => {
        setBag(prev => {
            const idx = prev.findIndex(i => i.productId === productId && i.size === size);
            if (idx >= 0) {
                const next = [...prev];
                next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
                return next;
            }
            return [...prev, { productId, size, qty: 1 }];
        });
        setBagOpen(true);
    };

    const removeFromBag = (index) => {
        setBag(prev => prev.filter((_, i) => i !== index));
    };

    const bagCount = bag.reduce((s, i) => s + i.qty, 0);
    const bagTotal = bag.reduce((s, i) => {
        const p = PRODUCTS.find(pr => pr.id === i.productId);
        return s + (p ? p.price * i.qty : 0);
    }, 0);

    const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

    // ── DETAIL PAGE ─────────────────────────────────────
    if (activePage !== null) {
        const product = PRODUCTS.find(p => p.id === activePage);
        if (!product) { setActivePage(null); return null; }

        return (
            <div style={s.page}>
                <style>{CSS}</style>
                {/* Detail Nav */}
                <nav style={s.detailNav}>
                    <a onClick={() => setActivePage(null)} className="detail-back" style={s.detailBack}>
                        ← Back
                    </a>
                    <span style={s.detailLogo}>LOUNGERS</span>
                    <button className="bag-nav-btn" style={s.bagNavBtn} onClick={() => setBagOpen(true)}>
                        Bag <span style={s.bagBadge}>{bagCount}</span>
                    </button>
                </nav>

                {/* Product Hero */}
                <section style={s.productHero}>
                    <div style={{ ...s.phVisual, background: product.cardBg }}>
                        {product.image ? (
                            <img src={product.image} alt={product.name} style={s.phShoe} />
                        ) : (
                            <span style={s.phPlaceholder}>{product.name}</span>
                        )}
                    </div>
                    <div style={s.phInfo}>
                        <p style={s.phEyebrow}>Loungers Collection — {product.material}</p>
                        <h1 style={s.phTitle}>{product.name}</h1>
                        <p style={s.phSubtitle}>{product.subtitle} — {product.color}</p>
                        <div style={s.phPrice}>€{product.price}</div>

                        <div style={s.sizeLabel}>Select size {product.category === "schuhe" ? "(EU)" : ""}</div>
                        <div style={s.sizes}>
                            {product.sizes.map(sz => (
                                <button
                                    key={sz}
                                    className={`size-btn${selectedSize === sz ? " active" : ""}`}
                                    style={s.sizeBtn}
                                    onClick={() => setSelectedSize(sz)}
                                >
                                    {sz}
                                </button>
                            ))}
                        </div>

                        <button
                            className="add-bag-btn"
                            style={{
                                ...s.addBagBtn,
                                opacity: selectedSize ? 1 : 0.5,
                                cursor: selectedSize ? "pointer" : "not-allowed",
                            }}
                            onClick={() => selectedSize && addToBag(product.id, selectedSize)}
                        >
                            Add to Bag →
                        </button>

                        <div style={s.trustStrip}>
                            <div style={s.trustItem}><span style={s.trustLabel}>Free shipping</span><span style={s.trustValue}>Orders over €80</span></div>
                            <div style={s.trustItem}><span style={s.trustLabel}>Free returns</span><span style={s.trustValue}>30-day policy</span></div>
                            <div style={s.trustItem}><span style={s.trustLabel}>Made in Italy</span><span style={s.trustValue}>Since 1979</span></div>
                        </div>

                        <div style={s.descSection}>
                            <h3 style={s.descTitle}>Description</h3>
                            <p style={s.descBody}>{product.description}</p>
                        </div>
                    </div>
                </section>

                {/* Bag Drawer */}
                <BagDrawer bag={bag} bagOpen={bagOpen} onClose={() => setBagOpen(false)} onRemove={removeFromBag} bagTotal={bagTotal} />
            </div>
        );
    }

    // ── HOME PAGE ───────────────────────────────────────
    return (
        <div style={s.page}>
            <style>{CSS + `\n:root { --text-color: #1C1917; --bg-color: #F7F3ED; }`}</style>

            {/* Navigation */}
            <nav style={{
                ...s.nav,
                background: scrollY > 60 ? "color-mix(in srgb, #F7F3ED 88%, transparent)" : "transparent",
                backdropFilter: scrollY > 60 ? "blur(24px)" : "none",
                WebkitBackdropFilter: scrollY > 60 ? "blur(24px)" : "none",
                borderBottomColor: scrollY > 60 ? "rgba(28,25,23,0.1)" : "transparent",
            }}>
                <div style={s.navLinks}>
                    {["Men", "Women", "Belts"].map(item => (
                        <a key={item} href={`https://loungersway.com/collections/${item.toLowerCase()}`} className="nav-link" style={s.navLinkText}>{item}</a>
                    ))}
                </div>
                <span style={s.navLogo}>LOUNGERS <span style={s.navLogoSub}>Est. 1979</span></span>
                <div style={{ ...s.navLinks, justifyContent: "flex-end" }}>
                    <a href="https://loungersway.com/pages/about-us" className="nav-link" style={s.navLinkText}>Story</a>
                    <button className="bag-nav-btn" style={s.bagNavBtn} onClick={() => setBagOpen(true)}>
                        Bag <span style={s.bagBadge}>{bagCount}</span>
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero-section" style={s.hero}>
                <div style={{ ...s.heroTop, animation: loaded ? "fadeUp 1.2s cubic-bezier(0.16,1,0.3,1) forwards" : "none", opacity: loaded ? 1 : 0 }}>
                    <p style={s.heroEyebrow}>Handcrafted in Italy — Est. 1979</p>
                    <h1 style={s.heroTitle}>The Art of<br /><em style={s.heroTitleEm}>Walking Well</em></h1>
                </div>
                <div style={s.heroCenter}>
                    <div style={{ ...s.heroShoeWrap, animation: loaded ? "float 7s ease-in-out infinite" : "none", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.4s" }}>
                        <img src="https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_sideview_1024x1024.jpg?v=1678185665" alt="Loungers Accelerator" style={s.heroShoeImg} />
                    </div>
                </div>
                <div style={{ ...s.heroBottom, animation: loaded ? "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s both" : "none" }}>
                    <p style={s.heroSub}>Luxury driving shoes & slippers, designed in London, handmade in Italy.</p>
                    <a href="#shop" className="hero-cta-pill" style={s.heroCtaPill}>Shop Collection <span className="arr">→</span></a>
                    <div style={s.heroScroll}><div style={s.scrollLine} /><span>Scroll</span></div>
                </div>
            </section>

            {/* Features Strip */}
            <section style={s.featureStrip}>
                {FEATURES.map((f, i) => (
                    <div key={i} className="feature-card" style={{ ...s.featureItem, animation: loaded ? `fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s both` : "none" }}>
                        <span style={s.featureIcon}>{f.icon}</span>
                        <span style={s.featureTitle}>{f.title}</span>
                        <span style={s.featureDesc}>{f.desc}</span>
                    </div>
                ))}
            </section>

            {/* Shop Grid */}
            <section id="shop" style={s.shopSection}>
                <div style={s.shopHeader}>
                    <div>
                        <div style={s.pillTag}>SS 2026</div>
                        <h2 style={s.sectionTitle}>The Collection</h2>
                    </div>
                    <div style={s.shopHeaderRight}>
                        <div style={s.filters}>
                            {[
                                { key: "all", label: "All" },
                                { key: "schuhe", label: "Schuhe" },
                                { key: "pullover", label: "Pullover" },
                            ].map(f => (
                                <button
                                    key={f.key}
                                    onClick={() => setFilter(f.key)}
                                    className="filter-pill"
                                    style={{
                                        ...s.filterBtn,
                                        color: filter === f.key ? "#1C1917" : "#7A6E65",
                                        borderColor: filter === f.key ? "#1C1917" : "rgba(28,25,23,0.12)",
                                        background: filter === f.key ? "rgba(28,25,23,0.06)" : "transparent",
                                    }}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <a href="https://loungersway.com/collections/all" className="view-all-link" style={s.viewAll}>View all →</a>
                    </div>
                </div>

                <div style={s.productGrid}>
                    {filtered.map((product, i) => (
                        <div
                            key={product.id}
                            className="p-card"
                            style={{ ...s.pCard, animation: `fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s both` }}
                            onClick={() => setActivePage(product.id)}
                        >
                            <div style={s.pCardImg}>
                                <div className="p-card-img-inner" style={{ ...s.pCardImgInner, background: product.cardBg }}>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="p-card-shoe" style={s.pCardShoe} />
                                    ) : (
                                        <span style={s.pCardPlaceholder}>{product.name}</span>
                                    )}
                                </div>
                                {product.tag && <span style={s.pCardBadge}>{product.tag}</span>}
                                <button
                                    className="quick-add"
                                    style={s.quickAdd}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToBag(product.id, product.sizes[Math.floor(product.sizes.length / 2)]);
                                    }}
                                >
                                    <PlusIcon size={14} />
                                </button>
                            </div>
                            <div style={s.pCardInfo}>
                                <div>
                                    <div style={s.pCardName}>{product.name}</div>
                                    <div style={s.pCardSub}>{product.subtitle} — {product.color}</div>
                                </div>
                                <div style={s.pCardPrice}>€{product.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Craftsmanship Story */}
            <section style={s.storySection}>
                <div style={s.storyGrid}>
                    <div style={s.storyText}>
                        <span style={s.storyLabel}>Our Craft</span>
                        <h2 style={s.storyTitle}>Where London Design<br />Meets Italian Mastery</h2>
                        <div style={s.storyLine} />
                        <p style={s.storyPara}>Every pair of Loungers begins with a vision in London and comes to life in the hands of Italian master craftsmen who have perfected their art over generations. Using only the finest Nappa and calfskin leathers, each shoe is hand-stitched with meticulous attention to detail.</p>
                        <p style={s.storyPara}>The result is footwear that transcends the ordinary — shoes you can drive in, lounge in, travel in, and live in. With Vibram® HydroGrip soles and Sorbothane® cushioning, luxury has never felt this comfortable.</p>
                        <a href="https://loungersway.com/pages/about-us" className="cta-link" style={s.storyLink}>Discover Our Story</a>
                    </div>
                    <div style={s.storyImageGrid}>
                        <div style={s.storyImg1}>
                            <img src="https://loungersway.com/cdn/shop/files/Capture_3f3baa08-9e72-470d-9f6c-656c4001ee7c_643x640.jpg?v=1637065532" alt="Craftsmanship" style={s.storyImage} />
                        </div>
                        <div style={s.storyImg2}>
                            <img src="https://loungersway.com/cdn/shop/files/ig_0410_73a99501-9a53-4e2f-ab85-36327407be75_651x640.jpg?v=1634287927" alt="Italian Artisan" style={s.storyImage} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainability */}
            <section style={s.sustainSection}>
                <div style={s.sustainInner}>
                    <h2 style={s.sustainTitle}>One Pair. One Tree. One Promise.</h2>
                    <p style={s.sustainDesc}>For every pair purchased, we plant a tree with Beyond Trees and protect five existing trees in the rainforest with OneTribe. Because walking well means treading lightly.</p>
                    <a href="https://loungersway.com/pages/the-power-of-sustainable-choices" className="cta-link" style={s.sustainLink}>Our Commitment →</a>
                </div>
            </section>

            {/* Footer */}
            <footer style={s.footer}>
                <div style={s.footerInner}>
                    <div>
                        <span style={s.footerLogo}>LOUNGERS</span>
                        <p style={s.footerTagline}>Designed in London. Handmade in Italy.</p>
                    </div>
                    <div style={s.footerCols}>
                        <div style={s.footerCol}>
                            <h4 style={s.footerColTitle}>Shop</h4>
                            {["Men's Collection", "Women's Collection", "Belts", "Pullovers"].map(item => (
                                <a key={item} href="https://loungersway.com/collections/all" style={s.footerLink}>{item}</a>
                            ))}
                        </div>
                        <div style={s.footerCol}>
                            <h4 style={s.footerColTitle}>Company</h4>
                            {["About Us", "Sustainability", "B2B & Franchise"].map(item => (
                                <a key={item} href="https://loungersway.com/pages/about-us" style={s.footerLink}>{item}</a>
                            ))}
                        </div>
                        <div style={s.footerCol}>
                            <h4 style={s.footerColTitle}>Support</h4>
                            {["Contact", "FAQ", "Shipping", "Returns"].map(item => (
                                <a key={item} href="https://loungersway.com/pages/contact-us" style={s.footerLink}>{item}</a>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={s.footerBottom}>
                    <span style={s.footerCopy}>© 2026 Loungers — Conscious Walk Ltd. London, UK</span>
                    <a href="https://www.instagram.com/loungersway/" style={s.footerSocialLink}>Instagram</a>
                </div>
            </footer>

            {/* Bag Drawer */}
            <BagDrawer bag={bag} bagOpen={bagOpen} onClose={() => setBagOpen(false)} onRemove={removeFromBag} bagTotal={bagTotal} />
        </div>
    );
}

// ── BAG DRAWER ──────────────────────────────────────────
function BagDrawer({ bag, bagOpen, onClose, onRemove, bagTotal }) {
    return (
        <>
            <div className={`bag-overlay${bagOpen ? " open" : ""}`} style={s.bagOverlay} onClick={onClose} />
            <div className={`bag-drawer${bagOpen ? " open" : ""}`} style={s.bagDrawer}>
                <div style={s.bagHead}>
                    <h2 style={s.bagHeadTitle}>Your Bag</h2>
                    <button className="cart-close-btn" style={s.bagClose} onClick={onClose}>✕</button>
                </div>
                <div style={s.bagBody}>
                    {bag.length === 0 ? (
                        <div style={s.bagEmpty}>
                            <p style={s.bagEmptyTitle}>Your bag is empty.</p>
                            <span style={s.bagEmptySub}>Add something beautiful.</span>
                        </div>
                    ) : (
                        bag.map((item, i) => {
                            const p = PRODUCTS.find(pr => pr.id === item.productId);
                            if (!p) return null;
                            return (
                                <div key={i} style={s.ciRow}>
                                    <div style={{ ...s.ciThumb, background: p.cardBg }}>
                                        {p.image ? <img src={p.image} alt={p.name} style={s.ciThumbImg} /> : <span style={s.ciThumbText}>{p.name[0]}</span>}
                                    </div>
                                    <div style={s.ciInfo}>
                                        <div style={s.ciName}>{p.name}</div>
                                        <div style={s.ciMeta}>Size {item.size} — €{p.price} × {item.qty}</div>
                                    </div>
                                    <button className="ci-del" style={s.ciDel} onClick={() => onRemove(i)}>×</button>
                                </div>
                            );
                        })
                    )}
                </div>
                {bag.length > 0 && (
                    <div style={s.bagFoot}>
                        <div style={s.bagTotalRow}>
                            <span style={s.bagTotalLabel}>Total</span>
                            <strong style={s.bagTotalValue}>€{bagTotal}</strong>
                        </div>
                        <button className="checkout-btn" style={s.checkoutBtn}>Proceed to Checkout →</button>
                    </div>
                )}
            </div>
        </>
    );
}

// ── STYLES ──────────────────────────────────────────────
const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS = "'DM Sans', system-ui, sans-serif";

const s = {
    page: { fontFamily: SANS, background: "#F7F3ED", color: "#1C1917", fontWeight: 300, minHeight: "100vh", overflowX: "hidden" },

    // Nav
    nav: {
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "28px 52px",
        borderBottom: "1px solid transparent",
        transition: "background 0.5s, backdrop-filter 0.5s, padding 0.4s, border-color 0.5s",
    },
    navLinks: { display: "flex", gap: 44, alignItems: "center" },
    navLinkText: { fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1C1917", textDecoration: "none", cursor: "pointer" },
    navLogo: { fontFamily: SERIF, fontSize: 30, fontWeight: 400, letterSpacing: "0.18em", color: "#1C1917" },
    navLogoSub: { fontSize: 11, letterSpacing: "0.2em", opacity: 0.35, verticalAlign: "middle", fontFamily: SANS, fontWeight: 300 },
    bagNavBtn: {
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 22px", border: "1px solid rgba(28,25,23,0.1)", borderRadius: 100,
        background: "none", color: "#1C1917", fontFamily: SANS,
        fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
    },
    bagBadge: {
        background: "#1C1917", color: "#F7F3ED",
        width: 18, height: 18, borderRadius: "50%", fontSize: 10,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
    },

    // Hero
    hero: { minHeight: "100svh", display: "grid", gridTemplateRows: "auto 1fr auto", alignItems: "start", textAlign: "center", padding: "0 48px 80px", overflow: "hidden", position: "relative" },
    heroTop: { paddingTop: 140, display: "flex", flexDirection: "column", alignItems: "center" },
    heroEyebrow: { fontSize: 10, letterSpacing: "0.38em", textTransform: "uppercase", color: "#7A6E65", marginBottom: 36 },
    heroTitle: { fontFamily: SERIF, fontSize: "clamp(80px, 12vw, 160px)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.02em", color: "#1C1917", marginBottom: 40 },
    heroTitleEm: { fontStyle: "italic", fontWeight: 300, color: "#B8A898" },
    heroCenter: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
    heroShoeWrap: { width: "min(560px, 75vw)", margin: "0 auto", filter: "drop-shadow(0 50px 80px rgba(0,0,0,0.11))", willChange: "transform" },
    heroShoeImg: { width: "100%", objectFit: "contain" },
    heroBottom: { display: "flex", flexDirection: "column", alignItems: "center", gap: 28 },
    heroSub: { fontSize: 16, color: "#7A6E65", letterSpacing: "0.08em", maxWidth: 440 },
    heroCtaPill: { display: "inline-flex", alignItems: "center", gap: 14, padding: "18px 52px", background: "#1C1917", color: "#F7F3ED", textDecoration: "none", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", borderRadius: 100, fontFamily: SANS },
    heroScroll: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: "#B8A898", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.55 },
    scrollLine: { width: 1, height: 44, background: "linear-gradient(to bottom, #B8A898, transparent)", animation: "pulseLine 2.4s ease-in-out infinite" },

    // Features
    featureStrip: { display: "flex", justifyContent: "center", gap: 0, padding: "0 40px", maxWidth: 1200, margin: "0 auto", borderTop: "1px solid rgba(28,25,23,0.08)", borderBottom: "1px solid rgba(28,25,23,0.08)" },
    featureItem: { flex: 1, textAlign: "center", padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, borderRight: "1px solid rgba(28,25,23,0.06)", cursor: "default" },
    featureIcon: { fontSize: 20, color: "#B8A898", marginBottom: 4 },
    featureTitle: { fontSize: 12, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1C1917" },
    featureDesc: { fontSize: 12, fontWeight: 300, color: "#7A6E65" },

    // Shop
    shopSection: { padding: "120px 52px 100px", maxWidth: 1400, margin: "0 auto" },
    shopHeader: { marginBottom: 56, display: "flex", alignItems: "flex-end", justifyContent: "space-between" },
    pillTag: { display: "inline-block", padding: "7px 22px", border: "1px solid rgba(28,25,23,0.12)", borderRadius: 100, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6E65", marginBottom: 20 },
    sectionTitle: { fontFamily: SERIF, fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.05, color: "#1C1917" },
    shopHeaderRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16 },
    filters: { display: "flex", gap: 10 },
    filterBtn: { background: "none", border: "1px solid rgba(28,25,23,0.12)", borderRadius: 100, fontSize: 10, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", padding: "8px 20px", fontFamily: SANS },
    viewAll: { fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A6E65", textDecoration: "none", borderBottom: "1px solid rgba(28,25,23,0.15)", paddingBottom: 2 },

    productGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 },
    pCard: { cursor: "pointer" },
    pCardImg: { width: "100%", aspectRatio: "4/5", borderRadius: 6, overflow: "hidden", position: "relative", marginBottom: 20 },
    pCardImgInner: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" },
    pCardShoe: { width: "78%", objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.13))" },
    pCardPlaceholder: { fontFamily: SERIF, fontSize: 36, fontWeight: 300, fontStyle: "italic", color: "rgba(28,25,23,0.12)", textAlign: "center", lineHeight: 1.2 },
    pCardBadge: { position: "absolute", top: 16, left: 16, padding: "5px 12px", background: "rgba(247,243,237,0.9)", borderRadius: 100, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1C1917" },
    quickAdd: {
        position: "absolute", bottom: 16, right: 16,
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid rgba(28,25,23,0.15)", background: "rgba(247,243,237,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "#1C1917",
    },
    pCardInfo: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
    pCardName: { fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: "#1C1917", marginBottom: 4 },
    pCardSub: { fontSize: 12, color: "#7A6E65", letterSpacing: "0.05em" },
    pCardPrice: { fontSize: 15, color: "#7A6E65", whiteSpace: "nowrap" },

    // Story
    storySection: { padding: "100px 40px", background: "#FFFFFF" },
    storyGrid: { display: "flex", gap: 80, maxWidth: 1200, margin: "0 auto", alignItems: "center" },
    storyText: { flex: 1 },
    storyLabel: { fontSize: 10, fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A6E65", display: "block", marginBottom: 20 },
    storyTitle: { fontFamily: SERIF, fontSize: 38, fontWeight: 300, lineHeight: 1.2, color: "#1C1917", marginBottom: 24 },
    storyLine: { width: 50, height: 1, background: "#B8A898", marginBottom: 28 },
    storyPara: { fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "#7A6E65", marginBottom: 20 },
    storyLink: { fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1C1917", textDecoration: "none", paddingBottom: 4, marginTop: 12, display: "inline-block" },
    storyImageGrid: { flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    storyImg1: { borderRadius: 4, overflow: "hidden", aspectRatio: "3/4" },
    storyImg2: { borderRadius: 4, overflow: "hidden", aspectRatio: "3/4", marginTop: 40 },
    storyImage: { width: "100%", height: "100%", objectFit: "cover" },

    // Sustainability
    sustainSection: { padding: "100px 40px", background: "#EDE7DE" },
    sustainInner: { maxWidth: 680, margin: "0 auto", textAlign: "center" },
    sustainTitle: { fontFamily: SERIF, fontSize: 36, fontWeight: 300, color: "#1C1917", marginBottom: 20 },
    sustainDesc: { fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "#7A6E65", marginBottom: 32 },
    sustainLink: { fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1C1917", textDecoration: "none", paddingBottom: 4 },

    // Footer
    footer: { padding: "80px 52px 48px", borderTop: "1px solid rgba(28,25,23,0.08)" },
    footerInner: { display: "flex", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto", paddingBottom: 60, borderBottom: "1px solid rgba(28,25,23,0.08)" },
    footerLogo: { fontFamily: SERIF, fontSize: 54, fontWeight: 300, color: "#1C1917", lineHeight: 1, marginBottom: 20, letterSpacing: "0.08em", display: "block" },
    footerTagline: { fontSize: 13, color: "#7A6E65", lineHeight: 1.85, maxWidth: 220 },
    footerCols: { display: "flex", gap: 80 },
    footerCol: { display: "flex", flexDirection: "column", gap: 12 },
    footerColTitle: { fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6E65", marginBottom: 10 },
    footerLink: { fontSize: 14, color: "#1C1917", textDecoration: "none", opacity: 0.62 },
    footerBottom: { display: "flex", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto", paddingTop: 40, fontSize: 11, color: "#7A6E65" },
    footerCopy: { fontSize: 11, fontWeight: 300, color: "#7A6E65" },
    footerSocialLink: { fontSize: 12, fontWeight: 300, color: "#7A6E65", textDecoration: "none", letterSpacing: "0.1em" },

    // Detail page
    detailNav: {
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 52px",
        background: "color-mix(in srgb, #F7F3ED 88%, transparent)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(28,25,23,0.1)",
    },
    detailBack: { display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1C1917", textDecoration: "none", cursor: "pointer" },
    detailLogo: { fontFamily: SERIF, fontSize: 28, fontWeight: 400, letterSpacing: "0.18em", color: "#1C1917" },
    productHero: { minHeight: "100svh", paddingTop: 80, display: "grid", gridTemplateColumns: "1fr 1fr" },
    phVisual: { position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100svh" },
    phShoe: { width: "75%", objectFit: "contain", filter: "drop-shadow(0 40px 70px rgba(0,0,0,0.12))" },
    phPlaceholder: { fontFamily: SERIF, fontSize: 64, fontWeight: 300, fontStyle: "italic", color: "rgba(28,25,23,0.1)", textAlign: "center", lineHeight: 1.1 },
    phInfo: { padding: "120px 72px 80px 64px", display: "flex", flexDirection: "column", justifyContent: "center" },
    phEyebrow: { fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "#7A6E65", marginBottom: 24 },
    phTitle: { fontFamily: SERIF, fontSize: "clamp(56px, 5.5vw, 88px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 12 },
    phSubtitle: { fontSize: 15, color: "#7A6E65", marginBottom: 40, letterSpacing: "0.05em" },
    phPrice: { fontFamily: SERIF, fontSize: 36, fontWeight: 300, marginBottom: 40, color: "#1C1917" },
    sizeLabel: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6E65", marginBottom: 14 },
    sizes: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 },
    sizeBtn: { width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(28,25,23,0.12)", background: "none", fontSize: 12, color: "#1C1917", cursor: "pointer", fontFamily: SANS },
    addBagBtn: {
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        width: "100%", padding: 20, background: "#1C1917", color: "#F7F3ED",
        border: "none", borderRadius: 100, fontSize: 12, letterSpacing: "0.2em",
        textTransform: "uppercase", fontFamily: SANS, marginBottom: 32,
    },
    trustStrip: { display: "flex", gap: 28, paddingTop: 32, borderTop: "1px solid rgba(28,25,23,0.08)" },
    trustItem: { display: "flex", flexDirection: "column", gap: 4 },
    trustLabel: { fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1C1917" },
    trustValue: { fontSize: 12, color: "#7A6E65" },
    descSection: { marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(28,25,23,0.08)" },
    descTitle: { fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1C1917", marginBottom: 16 },
    descBody: { fontSize: 14, lineHeight: 1.9, color: "#7A6E65" },

    // Bag drawer
    bagOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.38)", zIndex: 200 },
    bagDrawer: { position: "fixed", top: 0, right: 0, bottom: 0, width: 420, background: "#F7F3ED", zIndex: 201, display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(28,25,23,0.1)" },
    bagHead: { padding: "32px 32px 24px", borderBottom: "1px solid rgba(28,25,23,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" },
    bagHeadTitle: { fontFamily: SERIF, fontSize: 26, fontWeight: 400, color: "#1C1917" },
    bagClose: { background: "none", border: "none", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#7A6E65", fontSize: 20 },
    bagBody: { flex: 1, overflowY: "auto", padding: "24px 32px" },
    bagEmpty: { textAlign: "center", padding: "80px 0" },
    bagEmptyTitle: { fontFamily: SERIF, fontSize: 22, color: "#7A6E65", fontStyle: "italic" },
    bagEmptySub: { fontSize: 12, color: "#7A6E65", display: "block", marginTop: 8, letterSpacing: "0.08em" },
    ciRow: { display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid rgba(28,25,23,0.08)" },
    ciThumb: { width: 76, height: 76, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
    ciThumbImg: { width: "100%", height: "100%", objectFit: "contain" },
    ciThumbText: { fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: "rgba(28,25,23,0.2)" },
    ciInfo: { flex: 1 },
    ciName: { fontFamily: SERIF, fontSize: 18, color: "#1C1917", marginBottom: 4 },
    ciMeta: { fontSize: 13, color: "#7A6E65" },
    ciDel: { background: "none", border: "none", color: "#7A6E65", cursor: "pointer", fontSize: 18, alignSelf: "flex-start", marginTop: 2 },
    bagFoot: { padding: "24px 32px 40px", borderTop: "1px solid rgba(28,25,23,0.08)" },
    bagTotalRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 },
    bagTotalLabel: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A6E65" },
    bagTotalValue: { fontFamily: SERIF, fontSize: 30, fontWeight: 400, color: "#1C1917" },
    checkoutBtn: { display: "block", width: "100%", padding: 18, background: "#1C1917", color: "#F7F3ED", border: "none", borderRadius: 100, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", fontFamily: SANS },
};
