import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Cpu, 
  GitCompare, 
  Eye, 
  Server, 
  ArrowRight, 
  LogIn, 
  LogOut 
} from 'lucide-react';

const pipelineSteps = [
  {
    step: "1",
    title: "Preprocesamiento & EDA",
    description: "Análisis exploratorio, limpieza de datos y codificación de variables clínicas crudas.",
    icon: BarChart3,
    color: "border-t-sky-500 text-sky-400 bg-sky-950/20",
  },
  {
    step: "2",
    title: "Entrenamiento ML",
    description: "Evaluación de 3 modelos candidatos: Random Forest, XGBoost y Regresión Logística.",
    icon: Cpu,
    color: "border-t-purple-500 text-purple-400 bg-purple-950/20",
  },
  {
    step: "3",
    title: "Evaluación Comparativa",
    description: "Selección de Regresión Logística como el modelo final óptimo optimizando el recall ante el desbalance.",
    icon: GitCompare,
    color: "border-t-emerald-500 text-emerald-400 bg-emerald-950/20",
  },
  {
    step: "4",
    title: "Interpretabilidad & SHAP",
    description: "Análisis de importancia de variables para entender qué factores clínicos disparan el riesgo.",
    icon: Eye,
    color: "border-t-amber-500 text-amber-400 bg-amber-950/20",
  },
  {
    step: "5",
    title: "Despliegue Full-Stack",
    description: "Puesta en producción mediante una API de alto rendimiento con FastAPI y cliente interactivo en React.",
    icon: Server,
    color: "border-t-rose-500 text-rose-400 bg-rose-950/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

const SolutionPipeline = () => {
  return (
    <section className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="solucion">
      {/* Fondo con sutil cuadrícula difuminada */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* ENCABEZADO */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter"
          >
            Nuestra Solución
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-3xl mx-auto font-medium"
          >
            Pipeline completo de 5 etapas: desde los datos crudos hasta la interfaz web moderna
          </motion.p>
        </div>

        {/* CONTENEDOR DEL PIPELINE (PASOS DEL 1 AL 5) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative"
        >
          {pipelineSteps.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className={`bg-slate-900/80 border border-slate-800 border-t-4 ${item.color.split(' ')[0]} rounded-2xl p-6 flex flex-col justify-between shadow-xl relative group`}
            >
              {/* Conector visual entre tarjetas (Solo visible en pantallas grandes) */}
              {index < 4 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 z-20 transform -translate-y-1/2 text-slate-700 group-hover:text-cyan-500/50 transition-colors duration-300">
                  <ArrowRight size={20} />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-5xl font-black opacity-30 font-mono ${item.color.split(' ')[1]}`}>
                    {item.step}
                  </span>
                  <div className={`p-2 rounded-xl bg-slate-800 border border-slate-700/60 ${item.color.split(' ')[1]}`}>
                    <item.icon size={22} />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-100 tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* SECCIÓN INFERIOR: INPUT / OUTPUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* CAJA INPUT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex gap-4 items-start"
          >
            <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-cyan-400 mt-1">
              <LogIn size={22} />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-500">INPUT</span>
              <h4 className="text-xl font-bold text-slate-200">Datos del Paciente</h4>
              <p className="text-sm text-slate-400">
                Ingreso de parámetros clínicos estructurados (edad, nivel de glucosa, IMC, estado de hipertensión, tabaquismo, etc.).
              </p>
            </div>
          </motion.div>

          {/* CAJA OUTPUT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex gap-4 items-start"
          >
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-400 mt-1">
              <LogOut size={22} />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500">OUTPUT</span>
              <h4 className="text-xl font-bold text-slate-200">Clasificación de Riesgo</h4>
              <p className="text-sm text-slate-400">
                Diagnóstico predictivo binario (Bajo / Alto Riesgo) acompañado de la probabilidad e indicadores de los factores con mayor peso clínico.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SolutionPipeline;