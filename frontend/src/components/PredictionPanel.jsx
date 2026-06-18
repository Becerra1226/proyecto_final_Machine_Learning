import { useState } from 'react';
import axios from 'axios';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  HeartPulse,
  User,
  BrainCircuit,
  ShieldAlert,
  Sparkles,
  Zap,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Info,
  Scale,
  ListChecks
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================
// DATOS PREDEFINIDOS (5 PERFILES)
// Ajustados para activar los scores clínicos de test.py
// ============================

const RIESGO_BAJO_DATA = {
  gender: 'Female',
  age: 28, // < 50
  hypertension: 0,
  heart_disease: 0,
  ever_married: 'No',
  Residence_type: 'Urban',
  avg_glucose_level: 82, // < 126
  bmi: 22, // < 25
  work_type: 'Private',
  smoking_status: 'never smoked'
};

const RIESGO_MODERADO_DATA = {
  gender: 'Male',
  age: 52, // > 50 (+0.5)
  hypertension: 0,
  heart_disease: 0,
  ever_married: 'Yes',
  Residence_type: 'Urban',
  avg_glucose_level: 110, // < 126
  bmi: 26, // > 25 (+0.5)
  work_type: 'Private',
  smoking_status: 'formerly smoked' // (+0.3)
};

const RIESGO_ELEVADO_DATA = {
  gender: 'Female',
  age: 50, // > 60 (+1.0)
  hypertension: 1, // (+2.0)
  heart_disease: 0,
  ever_married: 'Yes',
  Residence_type: 'Rural',
  avg_glucose_level: 135, // > 126 (+1.0)
  bmi: 29, // > 25 (+0.5)
  work_type: 'Govt_job',
  smoking_status: 'never smoked'
};

const RIESGO_ALTO_DATA = {
  gender: 'Male',
  age: 65, // > 60 (+1.0)
  hypertension: 1, // (+2.0)
  heart_disease: 1, // (+2.0)
  ever_married: 'Yes',
  Residence_type: 'Urban',
  avg_glucose_level: 145, // > 126 (+1.0)
  bmi: 32, // >= 30 (+1.0)
  work_type: 'Self-employed',
  smoking_status: 'formerly smoked' // (+0.3)
};

const RIESGO_MUY_ALTO_DATA = {
  gender: 'Male',
  age: 80, // > 60 (+1.0)
  hypertension: 1, // (+2.0)
  heart_disease: 1, // (+2.0)
  ever_married: 'Yes',
  Residence_type: 'Urban',
  avg_glucose_level: 220, // > 200 (+1.5)
  bmi: 38, // >= 30 (+1.0)
  work_type: 'Self-employed',
  smoking_status: 'smokes' // (+1.0)
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(RIESGO_BAJO_DATA);

  // ============================
  // CAMBIO INPUTS
  // ============================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        ['age', 'avg_glucose_level', 'bmi'].includes(name)
          ? parseFloat(value)
          : ['hypertension', 'heart_disease'].includes(name)
          ? parseInt(value)
          : value
    }));
  };

  // ============================
  // CARGAR CASOS PREDEFINIDOS
  // ============================

  const loadProfile = (profileData) => {
    setFormData(profileData);
    setResult(null);
    setError(null);
  };

  // ============================
  // FACTORES DE RIESGO (Visuales)
  // ============================

  const getRiskFactors = () => {
    const factors = [];

    if (formData.age > 60) factors.push('Edad avanzada (>60)');
    else if (formData.age > 50) factors.push('Edad media-alta (>50)');
    
    if (formData.hypertension === 1) factors.push('Hipertensión');
    if (formData.heart_disease === 1) factors.push('Enfermedad cardíaca');
    
    if (formData.avg_glucose_level > 200) factors.push('Glucosa muy elevada');
    else if (formData.avg_glucose_level > 126) factors.push('Glucosa elevada');
    
    if (formData.bmi >= 30) factors.push('Obesidad');
    else if (formData.bmi >= 25) factors.push('Sobrepeso');

    if (formData.smoking_status === 'smokes') factors.push('Fumador activo');
    else if (formData.smoking_status === 'formerly smoked') factors.push('Exfumador');

    return factors;
  };

  // ============================
  // UTILIDADES DE UI Y RECOMENDACIONES (Desde test.py)
  // ============================
  
  const getRiskColor = (category) => {
    const cat = category?.toUpperCase() || '';
    if (cat.includes('MUY ALTO')) return 'text-red-500';
    if (cat.includes('ALTO')) return 'text-orange-400';
    if (cat.includes('ELEVADO')) return 'text-amber-400';
    if (cat.includes('MODERADO')) return 'text-yellow-400';
    return 'text-emerald-400';
  };

  const getRiskGradient = (category) => {
    const cat = category?.toUpperCase() || '';
    if (cat.includes('MUY ALTO')) return 'bg-gradient-to-r from-red-600 to-red-400';
    if (cat.includes('ALTO')) return 'bg-gradient-to-r from-orange-500 to-amber-500';
    if (cat.includes('ELEVADO')) return 'bg-gradient-to-r from-amber-500 to-yellow-400';
    if (cat.includes('MODERADO')) return 'bg-gradient-to-r from-yellow-400 to-lime-400';
    return 'bg-gradient-to-r from-emerald-400 to-cyan-400';
  };

  const getRecommendationHeader = (category) => {
    const cat = category?.toUpperCase() || '';
    if (cat.includes('MUY ALTO')) return "🚨 RIESGO MUY ALTO - EVALUACIÓN CLÍNICA URGENTE INMEDIATA";
    if (cat.includes('ALTO')) return "🚨 RIESGO ALTO - EVALUACIÓN CLÍNICA URGENTE RECOMENDADA";
    if (cat.includes('ELEVADO')) return "⚠️ RIESGO ELEVADO - SEGUIMIENTO CLÍNICO CERCANO RECOMENDADO";
    if (cat.includes('MODERADO')) return "⚠️ RIESGO MODERADO - SEGUIMIENTO CLÍNICO RECOMENDADO";
    return "✓ RIESGO BAJO - MONITOREO RUTINARIO";
  };

  const getRecommendedActions = (category) => {
    const cat = category?.toUpperCase() || '';
    if (cat.includes('MUY ALTO')) {
      return [
        'Consulta neurológica inmediata',
        'Considerar ingreso hospitalario',
        'Realizar estudios de neuroimagen urgentes'
      ];
    }
    if (cat.includes('ALTO')) {
      return [
        'Consulta neurológica inmediata',
        'Considerar ingreso hospitalario',
        'Realizar estudios de neuroimagen'
      ];
    }
    if (cat.includes('ELEVADO')) {
      return [
        'Seguimiento médico en 1-2 semanas',
        'Optimizar control de factores de riesgo',
        'Educar al paciente sobre síntomas de ACV'
      ];
    }
    if (cat.includes('MODERADO')) {
      return [
        'Seguimiento médico en 2-4 semanas',
        'Optimizar factores de riesgo modificables',
        'Educación en estilos de vida saludables'
      ];
    }
    return [
      'Continuar control rutinario',
      'Mantener estilos de vida saludables',
      'Revisar anualmente'
    ];
  };

  // ============================
  // PETICIÓN BACKEND
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://proyecto-final-machine-learning-m00e.onrender.com/predict',
        formData
      );

      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.message ||
          'Error de conexión'
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // INPUTS
  // ============================

  const fields = [
    { name: 'age', label: 'Edad', type: 'number' },
    { name: 'avg_glucose_level', label: 'Glucosa Promedio', type: 'number' },
    { name: 'bmi', label: 'IMC', type: 'number' },
  ];

  const selects = [
    { name: 'gender', label: 'Género', options: [{ value: 'Male', label: 'Masculino' }, { value: 'Female', label: 'Femenino' }] },
    { name: 'hypertension', label: 'Hipertensión', options: [{ value: '0', label: 'No' }, { value: '1', label: 'Sí' }] },
    { name: 'heart_disease', label: 'Enfermedad Cardíaca', options: [{ value: '0', label: 'No' }, { value: '1', label: 'Sí' }] },
    { name: 'ever_married', label: 'Estado Civil', options: [{ value: 'Yes', label: 'Casado' }, { value: 'No', label: 'Soltero' }] },
    { name: 'Residence_type', label: 'Residencia', options: [{ value: 'Urban', label: 'Urbana' }, { value: 'Rural', label: 'Rural' }] },
    { name: 'work_type', label: 'Trabajo', options: [{ value: 'Private', label: 'Privado' }, { value: 'Self-employed', label: 'Independiente' }, { value: 'Govt_job', label: 'Público' }, { value: 'children', label: 'Niños' }, { value: 'Never_worked', label: 'Nunca ha trabajado' }] },
    { name: 'smoking_status', label: 'Tabaquismo', options: [{ value: 'never smoked', label: 'Nunca' }, { value: 'formerly smoked', label: 'Exfumador' }, { value: 'smokes', label: 'Fumador' }, { value: 'Unknown', label: 'Desconocido' }] },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative flex items-center py-10">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
        />
      </div>

      {/* GRID PATTERN */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full space-y-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-900 pb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center shadow-xl shadow-cyan-950/20">
              <HeartPulse className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter">
                Neuro
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Guard
                </span>
              </h1>
              <p className="text-slate-400 text-sm font-medium mt-0.5">
                Evaluación Híbrida de Riesgo de ACV
              </p>
            </div>
          </div>

          {/* METRICS */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Enfoque', value: 'Híbrido (ML + Reglas)' },
              { label: 'Modelo Base', value: 'Log Reg (SMOTE)' },
              { label: 'Backend', value: 'FastAPI' },
            ].map((metric, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 px-5 py-3 rounded-2xl min-w-[140px]"
              >
                <p className="text-slate-500 text-xs font-mono tracking-wider uppercase">
                  {metric.label}
                </p>
                <h3 className="font-bold text-slate-200 mt-0.5 text-sm tracking-tight">
                  {metric.value}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GRID CONTENEDOR PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT PANEL - FORMULARIO */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-xl shadow-black/20 space-y-6 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
              <User className="text-cyan-400 w-5 h-5" />
              <h2 className="text-xl font-bold tracking-tight text-slate-100">
                Información del Paciente
              </h2>
            </div>

            {/* BOTONES PREDEFINIDOS (5 OPCIONES) */}
            <div className="flex flex-wrap gap-3">
              
              <motion.button type="button" onClick={() => loadProfile(RIESGO_BAJO_DATA)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 min-w-[120px] rounded-xl border border-emerald-900/60 bg-emerald-950/20 py-3 px-4 text-center transition-colors hover:border-emerald-800/80">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="text-emerald-400 w-4 h-4" />
                  <span className="font-bold text-sm text-slate-200">Riesgo bajo</span>
                </div>
              </motion.button>

              <motion.button type="button" onClick={() => loadProfile(RIESGO_MODERADO_DATA)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 min-w-[120px] rounded-xl border border-yellow-900/60 bg-yellow-950/20 py-3 px-4 text-center transition-colors hover:border-yellow-800/80">
                <div className="flex items-center justify-center gap-2">
                  <Activity className="text-yellow-400 w-4 h-4" />
                  <span className="font-bold text-sm text-slate-200">Riesgo moderado</span>
                </div>
              </motion.button>

              <motion.button type="button" onClick={() => loadProfile(RIESGO_ELEVADO_DATA)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 min-w-[120px] rounded-xl border border-amber-900/60 bg-amber-950/20 py-3 px-4 text-center transition-colors hover:border-amber-800/80">
                <div className="flex items-center justify-center gap-2">
                  <Scale className="text-amber-400 w-4 h-4" />
                  <span className="font-bold text-sm text-slate-200">Riesgo elevado</span>
                </div>
              </motion.button>

              <motion.button type="button" onClick={() => loadProfile(RIESGO_ALTO_DATA)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 min-w-[120px] rounded-xl border border-orange-900/60 bg-orange-950/20 py-3 px-4 text-center transition-colors hover:border-orange-800/80">
                <div className="flex items-center justify-center gap-2">
                  <FlaskConical className="text-orange-400 w-4 h-4" />
                  <span className="font-bold text-sm text-slate-200">Riesgo alto</span>
                </div>
              </motion.button>

              <motion.button type="button" onClick={() => loadProfile(RIESGO_MUY_ALTO_DATA)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 min-w-[120px] rounded-xl border border-red-900/60 bg-red-950/20 py-3 px-4 text-center transition-colors hover:border-red-800/80">
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="text-red-400 w-4 h-4" />
                  <span className="font-bold text-sm text-slate-200">Riesgo muy alto</span>
                </div>
              </motion.button>

            </div>

            {/* FORMULARIO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 flex-grow">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">{field.label}</label>
                  <input type={field.type} step="0.1" name={field.name} value={formData[field.name]} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 font-medium text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 transition-all" />
                </div>
              ))}
              {selects.map((select) => (
                <div key={select.name} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">{select.label}</label>
                  <select name={select.name} value={formData[select.name]} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 font-medium text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 transition-all">
                    {select.options.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-slate-900 text-sm">{opt.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl py-4 font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/10 mt-4 transition-all">
              {loading ? (
                <><Activity className="w-5 h-5 animate-spin" /> Analizando Ensemble...</>
              ) : (
                <><BrainCircuit className="w-5 h-5" /> Generar Evaluación Híbrida</>
              )}
            </motion.button>
          </motion.form>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 min-h-[500px] shadow-xl shadow-black/20 flex flex-col justify-center h-full"
          >
            <AnimatePresence mode="wait">

              {!result && !loading && !error && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center py-12">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl mb-6">
                    <ShieldAlert className="w-16 h-16 text-cyan-500/80" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-2">Sistema Ensemble Listo</h2>
                  <p className="text-sm text-slate-400 max-w-sm leading-relaxed">Selecciona uno de los perfiles rápidos a la izquierda o ingresa los datos manualmente.</p>
                </motion.div>
              )}

              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center py-12">
                  <Zap className="w-16 h-16 text-cyan-400 animate-pulse mb-4" />
                  <h2 className="text-xl font-bold tracking-tight text-slate-200">Cruzando Datos con Reglas Clínicas...</h2>
                </motion.div>
              )}

              {error && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-red-950/30 border border-red-900/60 rounded-2xl p-6 w-full space-y-3">
                  <div className="flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-6 h-6" />
                    <h2 className="text-lg font-bold tracking-tight">Error en el análisis</h2>
                  </div>
                  <p className="text-sm text-red-300/90 leading-relaxed">{error}</p>
                </motion.div>
              )}

              {result && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col justify-between space-y-6 w-full">
                  <div className="space-y-6">

                    {/* CABECERA RESULTADO HÍBRIDO */}
                    <div className="flex items-center justify-between border-b border-slate-900 pb-6">
                      <div>
                        <p className="text-slate-500 uppercase text-sm font-mono tracking-widest font-bold">
                          Diagnóstico Ensemble
                        </p>
                        <h2 className={`text-3xl lg:text-4xl font-black mt-2 tracking-tight ${getRiskColor(result.hybrid_ensemble.final_category)}`}>
                          {result.hybrid_ensemble.final_category}
                        </h2>
                      </div>
                      
                      <div className={`p-4 border rounded-2xl ${
                        result.hybrid_ensemble.final_category.includes('ALTO') ? 'bg-red-950/40 border-red-900/50 text-red-400' :
                        result.hybrid_ensemble.final_category.includes('BAJO') ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400' :
                        'bg-amber-950/40 border-amber-900/50 text-amber-400'
                      }`}>
                        {result.hybrid_ensemble.final_category.includes('ALTO') ? <AlertCircle className="w-10 h-10" /> : 
                         result.hybrid_ensemble.final_category.includes('BAJO') ? <CheckCircle2 className="w-10 h-10" /> : 
                         <Activity className="w-10 h-10" />}
                      </div>
                    </div>

                    {/* PROBABILIDAD PRINCIPAL */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-400">Probabilidad Final de ACV</span>
                        <span className="font-bold text-cyan-400 text-lg">
                          {(result.hybrid_ensemble.final_probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full h-4 bg-slate-950 border border-slate-900 rounded-full overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.hybrid_ensemble.final_probability * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${getRiskGradient(result.hybrid_ensemble.final_category)}`}
                        />
                      </div>
                    </div>

                    {/* DESGLOSE DEL ENSEMBLE */}
                    <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                        <div className="flex items-center gap-2 mb-2">
                          <BrainCircuit className="w-4 h-4 text-cyan-500" />
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modelo ML</span>
                        </div>
                        <div className="text-xl font-bold text-slate-200">
                          {(result.ml_model.probability_stroke * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Peso asignado: {result.hybrid_ensemble.weights_used.ml * 100}%
                        </div>
                      </div>

                      <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Stethoscope className="w-4 h-4 text-purple-500" />
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reglas Clínicas</span>
                        </div>
                        <div className="text-xl font-bold text-slate-200">
                          {result.clinical_rules.score} pts
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Peso asignado: {result.hybrid_ensemble.weights_used.clinical * 100}%
                        </div>
                      </div>
                    </div>

                    {/* FACTORES CLÍNICOS DETECTADOS */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="text-cyan-400 w-4 h-4" />
                        <h3 className="text-sm font-bold tracking-tight text-slate-300">
                          Factores Clínicos Presentes
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getRiskFactors().length > 0 ? (
                          getRiskFactors().map((factor, index) => (
                            <div key={index} className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 font-medium text-xs">
                              {factor}
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-emerald-300 font-medium text-xs">
                            ✓ Sin factores de riesgo mayores detectados
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RECOMENDACIÓN Y ACCIONES EXACTAS (test.py) */}
                    <div className="mt-4 bg-blue-950/20 border border-blue-900/40 rounded-xl p-5 space-y-4">
                      {/* Texto General Override Local */}
                      <div className="flex gap-3">
                        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-blue-300 mb-1">Recomendación Final</h4>
                          <p className="text-sm text-blue-200/80 leading-relaxed font-semibold">
                            {getRecommendationHeader(result.hybrid_ensemble.final_category)}
                          </p>
                        </div>
                      </div>

                      {/* Lista de Acciones Recomendadas */}
                      <div className="flex gap-3 pt-3 border-t border-blue-900/40">
                        <ListChecks className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                        <div className="w-full">
                          <h4 className="text-sm font-bold text-indigo-300 mb-2">Acciones a tomar</h4>
                          <ul className="space-y-2">
                            {getRecommendedActions(result.hybrid_ensemble.final_category).map((action, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-indigo-200/80">
                                <span className="text-indigo-400 font-bold mt-0.5">-</span>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}