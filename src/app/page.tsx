"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Dumbbell,
  Gamepad2,
  Home,
  Leaf,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Utensils,
  X
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import ScrollExpandMedia from "@/components/ScrollExpandMedia";
import SmoothScroll from "@/components/SmoothScroll";

const brochureName = "Sahya Greens-Brouchure (draft-10).pdf";
const brochureFile = `/${encodeURIComponent(brochureName)}`;
const heroVideo = "/uploaded-assets/hero-cinematic.mp4";

const brochurePhotos = {
  coverEstate: "/brochure-photos/cover-estate.jpg",
  aboutLowerLandscape: "/brochure-photos/about-lower-landscape.jpg",
  aboutUpperHills: "/brochure-photos/about-upper-hills.jpg",
  signatureVillaBackground: "/brochure-photos/signature-villa-background.jpg",
  premiumPlotsLandscape: "/brochure-photos/premium-plots-landscape.jpg",
  duplexVilla: "/brochure-photos/duplex-villa.jpg",
  courtyardDuplexVilla: "/brochure-photos/courtyard-duplex-villa.jpg",
  traditionalVilla: "/brochure-photos/traditional-villa.jpg",
  villaDetailLeft: "/brochure-photos/villa-detail-left.jpg",
  villaDetailRight: "/brochure-photos/villa-detail-right.jpg",
  sahyaLayoutMasterplan: "/brochure-photos/sahya-layout-masterplan.jpg",
  amenityCommunitySpace: "/brochure-photos/amenity-community-space.jpg",
  amenityFarmRoad: "/brochure-photos/amenity-farm-road.jpg",
  greenhouseVegetableGarden: "/brochure-photos/greenhouse-vegetable-garden.jpg",
  fishPond: "/brochure-photos/fish-pond.jpg",
  sahyaResortPoolResidence: "/brochure-photos/sahya-resort-pool-residence.jpg",
  contactEstateRoad: "/brochure-photos/contact-estate-road.jpg"
};

const uploadedPhotos = {
  wayanadMountains: "/uploaded-assets/wayanad-mountains.png",
  wayanadPalms01: "/uploaded-assets/wayanad-palms-01.png",
  wayanadPalms02: "/uploaded-assets/wayanad-palms-02.png",
  courtyardLuxury: "/uploaded-assets/courtyard-luxury.png",
  traditionalKeralaVilla: "/uploaded-assets/traditional-kerala-villa.png",
  fishPondWide: "/uploaded-assets/fish-pond-wide.png",
  greenhouseWhite: "/uploaded-assets/greenhouse-white.png",
  greenhouseGreen: "/uploaded-assets/greenhouse-green.png",
  sahyaEntrance01: "/uploaded-assets/sahya-entrance-01.png",
  sahyaEntrance02: "/uploaded-assets/sahya-entrance-02.png",
  sahyaEntrance03: "/uploaded-assets/sahya-entrance-03.png",
  masterplanUploaded: "/uploaded-assets/masterplan-uploaded.png"
};

const navItems = [
  ["About", "about"],
  ["Philosophy", "philosophy"],
  ["Wayanad", "wayanad"],
  ["Masterplan", "masterplan"],
  ["Villas", "villas"],
  ["Amenities", "amenities"],
  ["Resort", "resort"],
  ["Contact", "contact"]
];

const facts = [
  ["12 acres", "Carefully planned residential community"],
  ["1720 sq. ft.", "Premium villa plots from 4 cents"],
  ["750 sq. ft.", "Home plan with hall, kitchen, sit-out, bedroom, bathroom and car parking"],
  ["Rs. 920 / sq. ft.", "Starting reference for premium villa plots"],
  ["Rs. 38 Lakhs", "Starting reference for Sahya Signature Villas"]
];

const villaCollections = [
  {
    name: "Duplex",
    image: brochurePhotos.duplexVilla,
    copy:
      "A spacious two-level residence shaped for privacy, fluid living space and panoramic views, designed for modern families seeking elegance, functionality and refined premium living."
  },
  {
    name: "Traditional",
    image: uploadedPhotos.traditionalKeralaVilla,
    copy:
      "A home inspired by Kerala's architectural heritage, with sloping tiled roofs, deep verandahs and natural materials that age gracefully with time."
  },
  {
    name: "Courtyard Duplex",
    image: uploadedPhotos.courtyardLuxury,
    copy:
      "Architecturally crafted around a private courtyard, bringing light, air and greenery into the heart of the home for a tranquil indoor-outdoor experience."
  }
];

const amenities = [
  ["24/7 Security & Medical Support", "Comfort with complete peace of mind.", ShieldCheck],
  ["Health Club & Gymnasium", "Designed to support an active, balanced lifestyle.", Dumbbell],
  ["Open Kitchen & Community Dining", "Spaces that encourage connection and shared experiences.", Utensils],
  ["Library & Indoor Games", "Quiet corners for relaxation and mindful leisure.", Gamepad2],
  ["Recreation Pavilion", "Created for gatherings and community moments.", Building2]
];

const natureLiving = [
  "Green farming within the community with fresh vegetables, fruits and spices grown close to home.",
  "Managed cattle and goat breeding bringing authenticity to countryside living.",
  "Integrated poultry farm with access to farm fresh produce.",
  "Natural ponds with fish breeding enhancing the landscape with living water ecosystems.",
  "Fresh vegetables, fruits, spices, dairy products, farm products, fish and meat from Sahya Farms used in the kitchen of Sahya Greens."
];

const lifestyleSupport = [
  "Gardening",
  "Maintenance",
  "On-demand healthcare",
  "Nursing support",
  "Home care",
  "Housekeeping",
  "Personal chef services"
];

const infrastructure = [
  "Security",
  "Water connection",
  "Electricity",
  "Sewage systems",
  "Compound wall",
  "Interlock roads",
  "Tar roads"
];

const hotspots = [
  { label: "Plots - 1", top: "29%", left: "73%" },
  { label: "Plots - 2", top: "43%", left: "73%" },
  { label: "Plots - 3", top: "29%", left: "31%" },
  { label: "Plots - 4", top: "43%", left: "31%" },
  { label: "Plots - 5", top: "60%", left: "25%" },
  { label: "Cottages and Amenities", top: "56%", left: "68%" },
  { label: "Poultry", top: "79%", left: "39%" },
  { label: "Vegetable Garden", top: "79%", left: "58%" },
  { label: "Green House", top: "79%", left: "78%" },
  { label: "Farm", top: "88%", left: "51%" },
  { label: "Arch", top: "18%", left: "64%" }
];

const gallery = [
  uploadedPhotos.wayanadPalms02,
  uploadedPhotos.sahyaEntrance02,
  uploadedPhotos.sahyaEntrance03,
  brochurePhotos.aboutLowerLandscape,
  brochurePhotos.signatureVillaBackground,
  brochurePhotos.premiumPlotsLandscape,
  brochurePhotos.traditionalVilla,
  brochurePhotos.courtyardDuplexVilla,
  brochurePhotos.villaDetailLeft,
  brochurePhotos.villaDetailRight,
  brochurePhotos.amenityCommunitySpace
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-6 inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.42em] text-gold">
      <span className="h-px w-10 bg-gold/55" />
      {children}
    </p>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42, filter: "blur(16px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-14%" }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton({ href = "#contact", children = "Book a Site Visit", dark = false }: { href?: string; children?: ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      className={`luxury-button inline-flex min-h-14 items-center justify-center gap-3 border-2 px-8 text-sm font-bold uppercase tracking-[0.18em] shadow-[0_18px_48px_rgba(23,59,47,0.16),0_0_34px_rgba(184,138,68,0.12)] backdrop-blur-2xl ${
        dark
          ? "border-ivory/30 bg-ivory/10 text-ivory hover:border-gold/80 hover:bg-ivory/18 hover:text-gold"
          : "border-forest/28 bg-forest/12 text-forest hover:border-gold/70 hover:bg-forest/82 hover:text-ivory"
      }`}
    >
      {children}
      <CalendarDays size={18} />
    </a>
  );
}

function SecondaryButton() {
  return (
    <a
      href={brochureFile}
      download={brochureName}
      className="luxury-button inline-flex min-h-14 items-center justify-center gap-3 border-2 border-gold/45 bg-ivory/28 px-8 text-sm font-bold uppercase tracking-[0.18em] text-forest shadow-[0_18px_44px_rgba(184,138,68,0.18)] backdrop-blur-2xl hover:border-gold hover:bg-forest/78 hover:text-ivory"
    >
      Download Brochure
      <ArrowDown size={18} />
    </a>
  );
}

function TertiaryButton() {
  return (
    <a
      href="#philosophy"
      className="luxury-button inline-flex min-h-14 items-center justify-center gap-3 border-2 border-charcoal/22 bg-ivory/18 px-8 text-sm font-bold uppercase tracking-[0.18em] text-charcoal backdrop-blur-2xl hover:border-gold/70 hover:bg-charcoal/78 hover:text-ivory"
    >
      Explore
      <ArrowUpRight size={18} />
    </a>
  );
}

function CtaRow({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <PrimaryButton dark={dark} />
      <SecondaryButton />
      <a
        href="#contact"
        className={`luxury-button inline-flex min-h-14 items-center justify-center gap-3 border px-8 text-sm font-bold uppercase tracking-[0.18em] ${
          dark ? "border-ivory/28 bg-ivory/8 text-ivory hover:border-gold hover:bg-ivory/16 hover:text-gold" : "border-charcoal/22 bg-ivory/18 text-charcoal hover:border-gold/70 hover:bg-charcoal/76 hover:text-ivory"
        }`}
      >
        Talk to an Advisor
        <ArrowUpRight size={18} />
      </a>
    </div>
  );
}

function Navigation() {
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);
  const background = useTransform(scrollY, [0, 140], ["rgba(246,241,232,0)", "rgba(246,241,232,0.78)"]);
  const border = useTransform(scrollY, [0, 140], ["rgba(246,241,232,0)", "rgba(255,255,255,0.42)"]);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b px-3 py-3 backdrop-blur-2xl md:px-5"
      style={{ backgroundColor: background, borderColor: border }}
    >
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4">
        <a href="#home" className="leading-none text-ivory mix-blend-difference">
          <span className="block font-serif text-2xl font-semibold tracking-normal md:text-3xl">SAHYA GREENS</span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] md:text-[11px]">
            by Megha Builders & Developers
          </span>
        </a>
        <div className="glass hidden items-center gap-6 rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-forest xl:flex">
          {navItems.map(([item, id]) => (
            <a key={id} href={`#${id}`} className="transition hover:text-gold">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href={brochureFile} download={brochureName} className="luxury-button hidden h-12 items-center border-2 border-white/38 bg-white/10 px-5 text-xs font-bold uppercase tracking-[0.18em] text-ivory backdrop-blur-2xl hover:border-gold hover:bg-forest/70 hover:text-gold md:inline-flex">
            Brochure
          </a>
          <a href="#contact" className="luxury-button inline-flex h-12 items-center border-2 border-gold/60 bg-gold/24 px-5 text-xs font-bold uppercase tracking-[0.18em] text-ivory backdrop-blur-2xl hover:bg-gold hover:text-forest">
            Visit
          </a>
          <button
            className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-ivory backdrop-blur-xl xl:hidden"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="glass mx-auto mt-3 grid w-[calc(100%-16px)] max-w-[1480px] gap-1 rounded-lg p-3 xl:hidden"
            initial={{ opacity: 0, y: -12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
          >
            {navItems.map(([item, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-between rounded-md px-4 text-sm font-semibold uppercase tracking-[0.2em] text-forest">
                {item}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function JsonLd() {
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Residence",
      name: "Sahya Greens",
      brand: "Megha Builders & Developers",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Kerala",
        addressCountry: "IN"
      },
      description:
        "Sahya Greens is a thoughtfully planned community in the hills of Wayanad, developed by Megha Builders & Developers.",
      amenityFeature: amenities.map(([name]) => ({ "@type": "LocationFeatureSpecification", name }))
    }),
    []
  );

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.article
      className={`editorial-card rounded-lg ${className}`}
      whileHover={{ y: -10, rotateX: 2.5, rotateY: -2.5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.article>
  );
}

export default function HomePage() {
  const [activeMarker, setActiveMarker] = useState(hotspots[0].label);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <>
      <JsonLd />
      <SmoothScroll />
      <Navigation />
      <main id="home">
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc={heroVideo}
          bgImageSrc={uploadedPhotos.wayanadMountains}
          title="SAHYA GREENS"
          date="Wayanad"
          subtitle="A Place to Call Home"
          supportingText="A thoughtfully planned community in the hills of Wayanad by Megha Builders & Developers."
          scrollToExpand="Scroll to enter"
          textBlend
        >
          <Reveal className="mx-auto grid max-w-6xl gap-8 py-14 text-center">
            <p className="font-serif text-5xl leading-[0.92] text-forest md:text-8xl">
              A Place to Call Home
            </p>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-charcoal/70">
              Set in the hills of Wayanad, Sahya Greens by Megha Builders & Developers is planned for elevated living,
              modern infrastructure, lasting value, peace, privacy and permanence.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
              <PrimaryButton />
              <SecondaryButton />
              <TertiaryButton />
            </div>
          </Reveal>
        </ScrollExpandMedia>

        <section id="about" className="container-lux grid gap-14 py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="image-mask image-hover relative min-h-[620px] overflow-hidden shadow-[0_35px_120px_rgba(23,59,47,0.16)]">
            <Image src={uploadedPhotos.wayanadPalms01} alt="Wayanad palms and hills visual uploaded for Sahya Greens" fill className="object-cover" sizes="(min-width: 1024px) 48vw, 100vw" priority />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionLabel>About Sahya Greens</SectionLabel>
            <h2 className="font-serif text-5xl leading-none text-forest md:text-7xl">
              Hills, privacy and permanence, composed into a residential community.
            </h2>
            <p className="mt-8 text-lg leading-8 text-charcoal/70">
              Sahya Greens is a thoughtfully planned community set in the hills of Wayanad. Developed by Megha Builders
              & Developers, it brings together elevated living, modern infrastructure and lasting value for those who
              seek peace, privacy and permanence.
            </p>
            <p className="mt-5 text-lg leading-8 text-charcoal/70">
              The brochure invites investors, nature enthusiasts and those seeking a serene retirement into a captivating
              community built on trust for calm and pleasant living.
            </p>
            <CtaRow />
          </Reveal>
        </section>

        <section id="philosophy" className="ambient-line border-y hairline bg-[#fbf7ef]/70 py-28">
          <div className="container-lux grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <Reveal>
              <SectionLabel>The Sahya Philosophy</SectionLabel>
              <h2 className="font-serif text-6xl leading-[0.9] text-forest md:text-8xl">
                Peace. Privacy. Permanence.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-3xl text-2xl leading-10 text-charcoal/70 md:text-3xl">
                A residential community by Megha Builders & Developers, designed around calm living, nature and
                infrastructure that makes the environment ready to live in.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="wayanad" className="container-lux py-24">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <Reveal>
              <SectionLabel>Why Wayanad</SectionLabel>
              <h2 className="font-serif text-5xl leading-none text-forest md:text-7xl">
                A community set in the hills, surrounded by nature.
              </h2>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                ["For calm living", "A place for those who seek peace, privacy and permanence."],
                ["For nature enthusiasts", "A community surrounded by nature and designed for peaceful living."],
                ["For investors", "A planned community offering modern infrastructure and lasting value."],
                ["For serene retirement", "A calm and pleasant living environment in the hills of Wayanad."]
              ].map(([title, copy], index) => (
                <Reveal key={title} delay={index * 0.05}>
                  <TiltCard className="min-h-56 p-8">
                    <h3 className="font-serif text-4xl text-forest">{title}</h3>
                    <p className="mt-5 leading-7 text-charcoal/68">{copy}</p>
                    <ArrowUpRight className="mt-8 text-gold opacity-70" size={20} />
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="masterplan" className="relative overflow-hidden bg-forest py-28 text-ivory">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(184,138,68,0.18),transparent_28%),linear-gradient(180deg,#173b2f,#0d1e18)]" />
          <div className="container-lux relative z-10">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1fr]">
              <Reveal>
                <SectionLabel>Masterplan</SectionLabel>
                <h2 className="font-serif text-5xl leading-none md:text-7xl">
                  Sahya Layout, spread across 12 acres.
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="max-w-2xl text-lg leading-8 text-ivory/70">
                The brochure describes Sahya Layout as a carefully planned residential community featuring premium
                plots, cottages, modern amenities and a unique farm experience.
              </Reveal>
            </div>
            <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
              <Reveal className="group relative overflow-hidden rounded-lg border border-white/12 bg-white/[0.05] p-3 shadow-[0_42px_140px_rgba(0,0,0,0.28)]">
                <div className="relative aspect-[0.74] max-h-[900px] overflow-hidden rounded-md xl:aspect-[0.82]">
                  <Image src={uploadedPhotos.masterplanUploaded} alt="Sahya Layout masterplan from uploaded assets" fill className="object-cover transition duration-1000 group-hover:scale-[1.035]" sizes="(min-width: 1280px) 70vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/25 via-transparent to-transparent" />
                  {hotspots.map((spot) => (
                    <button
                      key={spot.label}
                      onMouseEnter={() => setActiveMarker(spot.label)}
                      onFocus={() => setActiveMarker(spot.label)}
                      className="absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/80 bg-forest/50 text-gold shadow-[0_0_24px_rgba(184,138,68,0.38)] backdrop-blur-md transition hover:scale-125 hover:bg-gold hover:text-forest"
                      style={{ top: spot.top, left: spot.left }}
                      aria-label={spot.label}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                    </button>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.12} className="rounded-lg border border-white/12 bg-white/[0.07] p-8 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.38em] text-gold">Interactive point</p>
                <h3 className="mt-8 font-serif text-5xl leading-none">{activeMarker}</h3>
                <p className="mt-6 leading-7 text-ivory/68">
                  Hover the brochure masterplan to explore plots, cottages, amenities, farm, poultry, vegetable garden,
                  green house, road and arch labels shown in the layout.
                </p>
                <a href="#contact" className="mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                  Book a site visit <ChevronRight size={16} />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="villas" className="container-lux py-24">
          <Reveal className="mb-12 max-w-4xl">
            <SectionLabel>Villa Collections</SectionLabel>
            <h2 className="font-serif text-5xl leading-none text-forest md:text-7xl">
              The Prime Collection from the brochure.
            </h2>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {villaCollections.map((villa, index) => (
              <Reveal key={villa.name} delay={index * 0.06}>
                <TiltCard className="overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={villa.image} alt={`${villa.name} villa photo from brochure`} fill className="object-cover transition duration-700 hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
                  </div>
                  <div className="p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">Sahya Signature Villas</p>
                    <h3 className="mt-8 font-serif text-5xl leading-none text-forest">{villa.name}</h3>
                    <p className="mt-7 leading-8 text-charcoal/68">{villa.copy}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y hairline bg-[#fbf7ef]/72 py-24">
          <div className="container-lux grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <SectionLabel>Premium Villa Plots</SectionLabel>
              <h2 className="font-serif text-5xl leading-none text-forest md:text-7xl">
                Your dream home starts here.
              </h2>
              <p className="mt-7 text-lg leading-8 text-charcoal/68">
                The brochure presents premium villa plots from 1720 sq. ft. (4 cents), planned for privacy and long-term
                value, starting from Rs. 920 per sq. ft. Sahya Signature Villas start from Rs. 38 Lakhs with customizable
                designs that blend with the landscape.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {facts.map(([value, label]) => (
                  <div key={value} className="rounded-lg border hairline bg-ivory/70 p-5">
                    <p className="font-serif text-4xl text-forest">{value}</p>
                    <p className="mt-2 text-sm leading-6 text-charcoal/65">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg border hairline bg-ivory/70 p-6">
                  <h3 className="font-serif text-3xl text-forest">Modern amenities included</h3>
                  <div className="mt-5 grid gap-3">
                    {infrastructure.map((item) => (
                      <p key={item} className="flex items-center gap-3 text-sm text-charcoal/68">
                        <Check className="text-gold" size={16} />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border hairline bg-ivory/70 p-6">
                  <h3 className="font-serif text-3xl text-forest">Lifestyle support</h3>
                  <div className="mt-5 grid gap-3">
                    {lifestyleSupport.map((item) => (
                      <p key={item} className="flex items-center gap-3 text-sm text-charcoal/68">
                        <Check className="text-gold" size={16} />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="image-mask image-hover relative min-h-[620px] overflow-hidden shadow-[0_34px_120px_rgba(23,59,47,0.14)]">
              <Image src={uploadedPhotos.sahyaEntrance01} alt="Sahya Greens entrance visual uploaded for premium villa plots" fill className="object-cover" sizes="(min-width: 1024px) 48vw, 100vw" />
            </Reveal>
          </div>
        </section>

        <section id="amenities" className="container-lux py-24">
          <Reveal className="mb-12 max-w-4xl">
            <SectionLabel>Amenities</SectionLabel>
            <h2 className="font-serif text-5xl leading-none text-forest md:text-7xl">
              Essential comforts, listed exactly from the brochure.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map(([name, copy, Icon], index) => (
              <Reveal key={String(name)} delay={index * 0.045}>
                <TiltCard className="min-h-64 p-8">
                  <Icon className="text-gold" size={32} />
                  <h3 className="mt-10 font-serif text-3xl text-forest">{String(name)}</h3>
                  <p className="mt-4 leading-7 text-charcoal/65">{String(copy)}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="nature" className="relative overflow-hidden bg-[#111712] py-28 text-ivory">
          <Image src={uploadedPhotos.fishPondWide} alt="Natural ponds with fish breeding uploaded visual" fill className="object-cover opacity-28" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111712] via-[#111712]/88 to-[#111712]/54" />
          <div className="container-lux relative z-10 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <Reveal>
              <SectionLabel>Nature-Centered Living</SectionLabel>
              <h2 className="font-serif text-5xl leading-none md:text-7xl">
                Fresh produce, living water and countryside authenticity.
              </h2>
            </Reveal>
            <div className="grid gap-4">
              {natureLiving.map((item, index) => (
                <Reveal key={item} delay={index * 0.04}>
                  <div className="flex gap-4 rounded-lg border border-white/12 bg-white/[0.06] p-5 backdrop-blur-md">
                    <Leaf className="mt-1 shrink-0 text-gold" size={20} />
                    <p className="leading-7 text-ivory/75">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="farm" className="container-lux grid gap-14 py-24 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <Reveal>
            <SectionLabel>Farm Experience</SectionLabel>
            <h2 className="font-serif text-5xl leading-none text-forest md:text-7xl">
              A farm experience inside a residential community.
            </h2>
            <p className="mt-7 text-lg leading-8 text-charcoal/68">
              Sahya Layout features a unique farm experience with poultry, vegetable garden, green house and farm areas
              shown on the masterplan. The brochure connects this farm experience to sustainable living and the kitchen
              of Sahya Greens.
            </p>
            <CtaRow />
          </Reveal>
          <Reveal delay={0.08} className="grid gap-4 sm:grid-cols-2">
            {[
              ["Poultry", brochurePhotos.amenityFarmRoad],
              ["Vegetable Garden", uploadedPhotos.greenhouseWhite],
              ["Green House", uploadedPhotos.greenhouseGreen],
              ["Natural Ponds with Fish Breeding", brochurePhotos.fishPond]
            ].map(([item, image]) => (
              <TiltCard key={item} className="overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <Image src={image} alt={`${item} photo from Sahya Greens brochure`} fill className="object-cover transition duration-700 hover:scale-105" sizes="(min-width: 1024px) 25vw, 50vw" />
                </div>
                <div className="p-7">
                <Sparkles className="text-gold" size={22} />
                <h3 className="mt-8 font-serif text-3xl text-forest">{item}</h3>
                </div>
              </TiltCard>
            ))}
          </Reveal>
        </section>

        <section id="resort" className="relative overflow-hidden bg-forest py-28 text-ivory">
          <Image src={brochurePhotos.sahyaResortPoolResidence} alt="Sahya Resorts private pool residence photo from brochure" fill className="object-cover opacity-36" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/88 to-forest/34" />
          <Reveal className="container-lux relative z-10 max-w-4xl">
            <SectionLabel>Sahya Resort</SectionLabel>
            <h2 className="font-serif text-6xl leading-none md:text-8xl">
              Crafted seamlessly into the Sahya landscape.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-ivory/72">
              The brochure presents Sahya Resorts with private pool residence and signature leisure spaces, curated for
              Sahya residents with Golden membership.
            </p>
            <CtaRow dark />
          </Reveal>
        </section>

        <section id="gallery" className="container-lux py-24">
          <Reveal className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <SectionLabel>Gallery</SectionLabel>
              <h2 className="font-serif text-5xl leading-none text-forest md:text-7xl">
                Visuals from the final Sahya Greens brochure.
              </h2>
            </div>
            <a href="#contact" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.24em] text-forest">
              Book a private viewing <ArrowUpRight size={17} />
            </a>
          </Reveal>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {gallery.map((image, index) => (
              <motion.button
                key={image}
                onClick={() => setActiveImage(image)}
                className="image-hover group mb-5 block w-full overflow-hidden rounded-lg bg-transparent text-left shadow-[0_18px_70px_rgba(23,59,47,0.1)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.74, delay: (index % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                aria-label={`Open brochure visual ${index + 1}`}
              >
                <span className="relative block" style={{ height: index % 3 === 0 ? 520 : index % 2 === 0 ? 430 : 360 }}>
                  <Image src={image} alt={`Sahya Greens brochure visual ${index + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" loading="lazy" />
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        <section id="brochure" className="container-lux py-24">
          <Reveal className="grid items-center gap-12 rounded-lg border hairline bg-[linear-gradient(135deg,#fffaf2,#efe2cc)] p-6 shadow-[0_34px_120px_rgba(23,59,47,0.14)] md:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div whileHover={{ rotate: -2, y: -10, rotateY: -7 }} className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-lg bg-forest shadow-[0_30px_90px_rgba(23,59,47,0.25)]" style={{ transformStyle: "preserve-3d" }}>
              <Image src={brochurePhotos.coverEstate} alt="Sahya Greens brochure cover visual" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/86 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xs uppercase tracking-[0.42em] text-gold">Final brochure</p>
                <h3 className="mt-4 font-serif text-5xl leading-none text-ivory">Sahya Greens</h3>
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-ivory/70">by Megha Builders & Developers</p>
              </div>
            </motion.div>
            <div>
              <SectionLabel>Download Brochure</SectionLabel>
              <h2 className="font-serif text-5xl leading-none text-forest md:text-7xl">
                Download the final Sahya Greens brochure.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-charcoal/68">
                The button downloads the uploaded final brochure directly and preserves the original filename.
              </p>
              <div className="mt-10">
                <SecondaryButton />
              </div>
            </div>
          </Reveal>
        </section>

        <section id="developer" className="border-y hairline bg-[#fbf7ef]/72 py-28">
          <div className="container-lux grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionLabel>About Megha Builders & Developers</SectionLabel>
              <h2 className="font-serif text-5xl leading-none text-forest md:text-7xl">
                Backed by over a decade of experience.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-xl leading-9 text-charcoal/72">
                The brochure states that Megha Builders & Developers is known for delivering creatively planned,
                prestigious projects. With a strong foundation built on trust and execution, the company has successfully
                brought diverse project concepts to life.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["Over a decade of experience", "Creatively planned prestigious projects", "Foundation built on trust", "Execution-led project delivery"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border hairline bg-ivory/70 p-5">
                    <Check className="text-gold" size={18} />
                    <span className="text-charcoal/72">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-forest py-28 text-ivory">
          <Image src={brochurePhotos.contactEstateRoad} alt="Sahya Greens estate road contact visual from brochure" fill className="object-cover opacity-24" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-forest/62" />
          <div className="container-lux relative z-10 grid gap-12 lg:grid-cols-[0.82fr_1fr]">
            <Reveal>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="font-serif text-5xl leading-none md:text-7xl">
                Speak with Megha Builders & Developers.
              </h2>
              <div className="mt-10 grid gap-6 text-ivory/82">
                <p className="flex items-start gap-4">
                  <MapPin className="mt-1 shrink-0 text-gold" />
                  <span><strong className="text-ivory">Regional Office:</strong><br /># 101, Sahya Commercial complex, Sahya Greens, Appadi - Meenangadi Road, Wayanad, Kerala, 673591</span>
                </p>
                <p className="flex items-start gap-4">
                  <Home className="mt-1 shrink-0 text-gold" />
                  <span><strong className="text-ivory">Corporate HQ:</strong><br />H No. 85/1, New Rajanna layout, 1st main, Horamavu Agara, Bangalore 560043</span>
                </p>
                <a className="flex items-center gap-4" href="tel:+919036767007"><Phone className="text-gold" /> +91 90367 67007</a>
                <a className="flex items-center gap-4" href="tel:+917892585435"><Phone className="text-gold" /> +91 78925 85435</a>
                <a className="flex items-center gap-4" href="mailto:abcd@gmail.com"><BookOpen className="text-gold" /> abcd@gmail.com</a>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="https://wa.me/919036767007" className="luxury-button inline-flex min-h-14 items-center justify-center gap-3 bg-gold px-8 text-sm font-bold uppercase tracking-[0.18em] text-forest">
                  <FaWhatsapp /> WhatsApp
                </a>
                <a href="https://www.google.com/maps?q=%23101%20Sahya%20Commercial%20complex%20Sahya%20Greens%20Appadi%20Meenangadi%20Road%20Wayanad%20Kerala%20673591" target="_blank" rel="noreferrer" className="luxury-button inline-flex min-h-14 items-center justify-center gap-3 border border-ivory/20 px-8 text-sm font-bold uppercase tracking-[0.18em] text-ivory">
                  Google Maps <MapPin size={18} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <form onSubmit={submit} className="rounded-lg border border-white/12 bg-white/[0.08] p-6 backdrop-blur-xl md:p-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="sr-only" htmlFor="name">Name</label>
                  <input id="name" required placeholder="Name" className="h-14 rounded-none border-b border-white/20 bg-transparent outline-none placeholder:text-ivory/45 focus:border-gold" />
                  <label className="sr-only" htmlFor="phone">Phone</label>
                  <input id="phone" required placeholder="Phone" className="h-14 rounded-none border-b border-white/20 bg-transparent outline-none placeholder:text-ivory/45 focus:border-gold" />
                </div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Email" className="mt-4 h-14 w-full rounded-none border-b border-white/20 bg-transparent outline-none placeholder:text-ivory/45 focus:border-gold" />
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea id="message" placeholder="Tell us about your Sahya Greens enquiry." rows={5} className="mt-4 w-full resize-none rounded-none border-b border-white/20 bg-transparent py-4 outline-none placeholder:text-ivory/45 focus:border-gold" />
                <button className="luxury-button mt-8 inline-flex min-h-14 items-center justify-center gap-3 bg-gold px-8 text-sm font-bold uppercase tracking-[0.18em] text-forest">
                  Submit Enquiry <ArrowUpRight size={18} />
                </button>
                {sent ? <p className="mt-5 text-sm text-gold">Thank you. Your enquiry has been received.</p> : null}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#111712] px-4 py-10 text-ivory">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-8 border-t border-white/12 pt-8 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-3xl">SAHYA GREENS</p>
            <p className="mt-2 text-sm text-ivory/55">by Megha Builders & Developers</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-ivory/58">
            <a href="#developer">About Developer</a>
            <a href={brochureFile} download={brochureName}>Download Brochure</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="text-sm text-ivory/45">Copyright 2026 Sahya Greens. All rights reserved.</p>
        </div>
      </footer>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-[#07110c]/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <button className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-ivory text-forest" aria-label="Close gallery">
              <X size={20} />
            </button>
            <motion.div initial={{ scale: 0.96, rotateX: 4 }} animate={{ scale: 1, rotateX: 0 }} exit={{ scale: 0.96 }} className="relative h-[86vh] w-full max-w-6xl overflow-hidden rounded-lg">
              <Image src={activeImage} alt="Expanded Sahya Greens brochure visual" fill className="object-contain" sizes="100vw" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
