
import { AlertTriangle, ShieldCheck, Scale, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

const strokeFacts = [
  {
    icon: HeartPulse,
    number: "6.7M",
    label: "muertes/año",
    color: "border-t-red-500 text-red-500",
    description: "2ª causa de muerte mundial. Principal causa de discapacidad adquirida en adultos.",
  },
  {
    icon: ShieldCheck,
    number: "90%",
    label: "prevenibles",
    color: "border-t-yellow-500 text-yellow-500",
    description: "Factores modificables: hipertensión, diabetes, obesidad, tabaquismo, sedentarismo.",
  },
  {
    icon: ShieldCheck,
    number: "80%",
    label: "reducción riesgo",
    color: "border-t-emerald-500 text-emerald-500",
    description: "Con intervención oportuna: cambios de vida, antihipertensivos, antiagregantes.",
  },
  {
    icon: Scale,
    number: "4.9%",
    label: "casos positivos",
    color: "border-t-cyan-500 text-cyan-500",
    description: "Marcado desbalance 20:1 — exige métricas y técnicas especiales de modelado.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const StrokeInfo = () => {
  return (
    <section className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="info">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="bg-cyan-950 p-2.5 rounded-xl border border-cyan-800">
              <AlertTriangle className="size-8 text-cyan-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              ¿Por qué es importante?
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Cuatro dimensiones clave extraídas de fuentes globales que justifican y dan propósito a este proyecto de Inteligencia Artificial.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {strokeFacts.map((fact, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className={`bg-slate-900 border ${fact.color} border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl shadow-slate-950/20`}
            >
              <div className="mb-6 p-4 rounded-full bg-slate-800/50 border border-slate-700">
                <fact.icon className={`size-10 ${fact.color.split(' ')[1]}`} />
              </div>
              <h3 className={`text-6xl font-extrabold tracking-tighter mb-2 ${fact.color.split(' ')[1]}`}>
                {fact.number}
              </h3>
              <p className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">
                {fact.label}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                {fact.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StrokeInfo;