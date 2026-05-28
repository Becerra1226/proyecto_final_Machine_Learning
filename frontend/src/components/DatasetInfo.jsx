import { Database, FileText, Stethoscope, AlertTriangle, KeyRound, Info, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATOS EXTRAÍDOS DE LA DIAPOSITIVA ---
const keyMetrics = [
  {
    icon: Database,
    value: "5,110",
    label: "registros de pacientes",
    color: "cyan"
  },
  {
    icon: Stethoscope,
    value: "11",
    label: "características clínicas",
    color: "cyan"
  },
  {
    icon: AlertTriangle,
    value: "20:1",
    label: "ratio desbalance clases",
    color: "red"
  }
];

const datasetVariables = [
  { name: "age", desc: "Edad del paciente" },
  { name: "gender", desc: "Sexo" },
  { name: "hypertension", desc: "Hipertensión (0/1)" },
  { name: "heart_disease", desc: "Enf. cardíaca (0/1)" },
  { name: "ever_married", desc: "Estado civil" },
  { name: "work_type", desc: "Tipo de trabajo" },
  { name: "Residence_type", desc: "Tipo de residencia" },
  { name: "avg_glucose_level", desc: "Glucosa promedio" },
  { name: "bmi", desc: "Índice de masa corporal" },
  { name: "smoking_status", desc: "Hábito tabáquico" },
  { name: "stroke", desc: "Variable objetivo (0/1)", isTarget: true }, // Resaltamos la variable objetivo
];

// --- VARIANTES DE ANIMACIÓN ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const DatasetInfo = () => {
  return (
    <section className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="dataset">
      {/* Sutil gradiente de fondo cyan/blue para integrar con el Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* ENCABEZADO Y FUENTE */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between space-y-3 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-cyan-400">
              <Zap size={18} />
              <span className="text-sm font-semibold tracking-wider uppercase">Ficha Técnica de Datos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Origen del Modelo
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 text-sm md:text-base font-medium max-w-xl border-l border-cyan-800 md:pl-4"
          >
            Este sistema ha sido entrenado con el <span className="font-bold text-slate-200">Stroke Prediction Dataset</span> de Kaggle, derivado de análisis de McKinsey & Company, garantizando una base de datos robusta de registros reales.
          </motion.p>
        </div>

        {/* MÉTRICAS CLAVE (Top Row) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: `0 20px 25px -5px rgb(8 145 178 / 0.1)` }}
              className={`bg-slate-900 border ${metric.color === 'red' ? 'border-red-900/50' : 'border-slate-800'} rounded-3xl p-8 flex items-center gap-6 shadow-xl shadow-slate-950/20`}
            >
              <div className={`p-4 rounded-2xl ${metric.color === 'red' ? 'bg-red-950/30 border border-red-800' : 'bg-slate-800 border border-slate-700'}`}>
                <metric.icon className={`size-10 ${metric.color === 'red' ? 'text-red-400' : 'text-cyan-400'}`} />
              </div>
              <div>
                <h3 className={`text-6xl font-extrabold tracking-tighter mb-1 ${metric.color === 'red' ? 'text-red-400' : 'text-white'}`}>
                  {metric.value}
                </h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* VARIABLES DEL DATASET (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-950/20"
          >
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
              <FileText className="text-cyan-400 size-6" />
              <h4 className="text-2xl font-bold text-white tracking-tight">Variables de Entrada</h4>
              <span className="ml-auto text-xs font-mono text-slate-600 bg-slate-800 px-3 py-1 rounded-full">(11 características)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-mono text-sm leading-relaxed">
              {datasetVariables.map((variable, index) => (
                <div key={index} className={`flex items-start gap-3 p-3 rounded-xl ${variable.isTarget ? 'bg-cyan-950 border border-cyan-800 shadow-lg' : 'bg-slate-800/50 border border-slate-700'}`}>
                  {variable.isTarget ? (
                    <KeyRound className="size-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="size-2 rounded-full bg-slate-600 mt-2 flex-shrink-0" />
                  )}
                  <div className="flex-grow">
                    <span className={`font-bold ${variable.isTarget ? 'text-cyan-300' : 'text-slate-100'}`}>
                      {variable.name}
                    </span>
                    <span className="text-slate-400 mx-2">—</span>
                    <span className={`${variable.isTarget ? 'text-cyan-100/90 font-medium' : 'text-slate-400'}`}>
                      {variable.desc}
                    </span> 
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* VISUALIZACIÓN DE DESBALANCE (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-5 bg-slate-900 border border-red-900/50 rounded-3xl p-8 shadow-xl shadow-slate-950/20 space-y-8 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-400 size-7" />
              <h4 className="text-2xl font-bold text-white tracking-tight">Análisis de Clases</h4>
            </div>

            {/* Representación Visual del Desbalance */}
            <div className="flex items-end gap-1 font-sans">
              {/* Barra Clase 1 (Sano - Gigante) */}
              <div className="w-1/2 space-y-2">
                <p className="text-xs font-mono text-center text-slate-500">Clase 1: Sano</p>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: '240px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="w-full bg-cyan-900/50 border border-cyan-700 rounded-t-2xl flex items-end justify-center pb-4"
                >
                  <span className="text-5xl font-black text-cyan-200 tracking-tighter">95.1%</span>
                </motion.div>
              </div>

              {/* Barra Clase 2 (Riesgo - Minúscula) */}
              <div className="w-1/2 space-y-6">
                <p className="text-xs font-mono text-center text-red-500 font-bold uppercase tracking-widest">Clase 2: Riesgo (ACV)</p>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: '12px' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                  className="w-full bg-red-950/70 border border-red-800 rounded-t-2xl flex items-center justify-center relative shadow-xl shadow-red-950"
                >
                    <span className="absolute -top-7 text-lg font-black text-red-400 tracking-tight">4.9%</span>
                </motion.div>
              </div>
            </div>

            <div className="bg-red-950/30 border border-red-900 rounded-xl p-4 flex gap-3 text-red-100 text-xs">
                <Info size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p>Este marcado desbalance de <span className='font-bold text-red-400'>20 registros sanos por cada registro de riesgo</span> es el principal desafío técnico, exigiendo técnicas especiales de modelado (Oversampling/Undersampling) para que la IA aprenda a detectar casos positivos sin sesgos.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DatasetInfo;