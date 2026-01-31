import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap, FiLayers } from "react-icons/fi";

const SLIDES = [
  {
    id: 1,
    tag: "MODERN COMFORT",
    title: "Soft. Clean. Elevated.",
    description:
      "A new way to experience simplicity — where design stays quiet and quality speaks.",
    icon: FiLayers,
  },
  {
    id: 2,
    tag: "DESIGNED TO FLOW",
    title: "Effortlessly Premium",
    description:
      "Products shaped by clarity, intention, and timeless appeal.",
    icon: FiZap,
  },
];

export default function GlassIntroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 6500);

    return () => clearTimeout(timer);
  }, [index]);

  const slide = SLIDES[index];
  const Icon = slide.icon;

  return (
    <section className="relative mt-35 max-md:mt-28 max-sm:mt-26  rounded-[2.8rem] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
      <div className=" mx-auto ">
        {/* <div className="max-w-6xl mx-auto "></div> */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[2.8rem]
            border border-white/20
            bg-white/10
            backdrop-blur-xl
            shadow-[0_40px_120px_rgba(0,0,0,0.25)]
          "
        >
          {/* floating glow */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/30 rounded-full blur-3xl" />

          <div className="relative min-h-[360px] flex items-center px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full text-white"
              >
                {/* TEXT */}
                <div className="flex flex-col justify-center">
                  <span className="mb-5 text-xs tracking-[0.3em] text-cyan-200">
                    {slide.tag}
                  </span>

                  <h2 className="text-[clamp(2.4rem,4vw,3.2rem)] font-light leading-tight">
                    {slide.title}
                  </h2>

                  <p className="mt-6 max-w-md text-white/70 leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                {/* ICON */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-64 h-64 rounded-full bg-white/10"
                  />

                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
                  >
                    <Icon size={36} />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-cyan-300"
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
