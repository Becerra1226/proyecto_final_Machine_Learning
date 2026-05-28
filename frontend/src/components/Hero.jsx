import { motion } from 'framer-motion';
import {
  HeartPulse,
  ShieldCheck,
  BrainCircuit,
  Activity,
  ArrowRight,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white flex items-center">
      
      {/* BACKGROUND EFFECTS (Diseño de iluminación difusa más moderno) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]"
        />
      </div>

      {/* GRID PATTERN (Rejilla técnica más sutil) */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full space-y-16">
        
        {/* HERO HEADER */}
        <div className="max-w-5xl space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50"
          >
            <BrainCircuit className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold tracking-wider uppercase">
              Inteligencia Artificial Aplicada a la Salud
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05]"
          >
            Predicción Inteligente de{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Accidentes Cerebrovasculares
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl font-medium max-w-3xl leading-relaxed"
          >
            Sistema clínico basado en Machine Learning capaz de clasificar
            pacientes en riesgo bajo o alto de ACV utilizando datos médicos
            básicos de atención primaria.
          </motion.p>

          {/* BUTTONS */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <motion.a
              href="#prediction"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold flex items-center gap-3 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all text-sm tracking-wide"
            >
              Comenzar Predicción
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl font-semibold hover:border-slate-700 hover:bg-slate-900 transition-all text-sm text-slate-300 tracking-wide"
            >
              Ver Información
            </motion.button>
          </motion.div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          
          {/* LEFT BIG CARD (Diseño oscuro integrado con bordes sutiles) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-xl shadow-black/40"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-950 border border-cyan-800/60 text-cyan-400 shadow-md">
                <HeartPulse className="w-7 h-7" />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-100">
                  ¿Qué es un derrame cerebral?
                </h2>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                  Comprendiendo el problema clínico
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed">
              <p>
                Un accidente cerebrovascular ocurre cuando el flujo sanguíneo
                hacia una parte del cerebro se interrumpe, afectando el
                suministro de oxígeno y nutrientes.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800/60 space-y-2">
                  <h3 className="font-bold text-cyan-400 text-lg font-mono tracking-wide uppercase">
                    ACV Isquémico
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Ocurre debido a un coágulo sanguíneo que bloquea una arteria.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800/60 space-y-2">
                  <h3 className="font-bold text-cyan-400 text-lg font-mono tracking-wide uppercase">
                    ACV Hemorrágico
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Provocado por la ruptura de un vaso sanguíneo cerebral.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900/40 border border-cyan-800/30">
                <h3 className="text-lg font-bold text-slate-200 mb-2">
                  Objetivo del Proyecto
                </h3>
                <p className="text-slate-400 text-s leading-relaxed">
                  Automatizar la clasificación de pacientes mediante modelos de
                  inteligencia artificial para apoyar decisiones clínicas
                  tempranas y reducir riesgos asociados a eventos
                  cerebrovasculares.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            
            {/* CARD 1 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-slate-900/60 border border-cyan-950 rounded-3xl p-6 backdrop-blur-xl shadow-xl shadow-black/20 flex flex-col justify-between space-y-4"
            >
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-100 tracking-tight">
                  Detección Temprana
                </h3>
                <p className="text-slate-400 text-s leading-relaxed">
                  Identificación preventiva de pacientes en riesgo antes de que
                  ocurra un evento irreversible.
                </p>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -4 }}
              className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl shadow-xl shadow-black/20 flex flex-col justify-between space-y-4"
            >
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-blue-400 w-fit">
                <Activity className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-100 tracking-tight">
                  Apoyo Clínico Inteligente
                </h3>
                <p className="text-slate-400 text-s leading-relaxed">
                  Plataforma intuitiva para médicos y personal clínico con
                  análisis automatizado basado en Machine Learning.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}