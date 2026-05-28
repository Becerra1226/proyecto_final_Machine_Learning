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
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================
// DATOS PREDEFINIDOS
// ============================

const LOW_RISK_DATA = {
  gender: 'Female',
  age: 28,
  hypertension: 0,
  heart_disease: 0,
  ever_married: 'No',
  Residence_type: 'Urban',
  avg_glucose_level: 82,
  bmi: 22,
  work_type: 'Private',
  smoking_status: 'never smoked'
};

const HIGH_RISK_DATA = {
  gender: 'Male',
  age: 78,
  hypertension: 1,
  heart_disease: 1,
  ever_married: 'Yes',
  Residence_type: 'Urban',
  avg_glucose_level: 220,
  bmi: 38,
  work_type: 'Self-employed',
  smoking_status: 'smokes'
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(LOW_RISK_DATA);

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

  const loadLowRisk = () => {
    setFormData(LOW_RISK_DATA);
    setResult(null);
    setError(null);
  };

  const loadHighRisk = () => {
    setFormData(HIGH_RISK_DATA);
    setResult(null);
    setError(null);
  };

  // ============================
  // FACTORES DE RIESGO
  // ============================

  const getRiskFactors = () => {
    const factors = [];

    if (formData.age > 65) factors.push('Edad avanzada');
    if (formData.hypertension === 1) factors.push('Hipertensión');
    if (formData.heart_disease === 1)
      factors.push('Enfermedad cardíaca');
    if (formData.avg_glucose_level > 140)
      factors.push('Glucosa elevada');
    if (formData.bmi > 30) factors.push('IMC elevado');

    if (
      formData.smoking_status === 'smokes' ||
      formData.smoking_status === 'formerly smoked'
    ) {
      factors.push('Tabaquismo');
    }

    return factors;
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
        'http://127.0.0.1:8000/predict',
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
    {
      name: 'age',
      label: 'Edad',
      type: 'number'
    },
    {
      name: 'avg_glucose_level',
      label: 'Glucosa Promedio',
      type: 'number'
    },
    {
      name: 'bmi',
      label: 'IMC',
      type: 'number'
    },
  ];

  const selects = [
    {
      name: 'gender',
      label: 'Género',
      options: [
        { value: 'Male', label: 'Masculino' },
        { value: 'Female', label: 'Femenino' }
      ]
    },
    {
      name: 'hypertension',
      label: 'Hipertensión',
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Sí' }
      ]
    },
    {
      name: 'heart_disease',
      label: 'Enfermedad Cardíaca',
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Sí' }
      ]
    },
    {
      name: 'ever_married',
      label: 'Estado Civil',
      options: [
        { value: 'Yes', label: 'Casado' },
        { value: 'No', label: 'Soltero' }
      ]
    },
    {
      name: 'Residence_type',
      label: 'Residencia',
      options: [
        { value: 'Urban', label: 'Urbana' },
        { value: 'Rural', label: 'Rural' }
      ]
    },
    {
      name: 'work_type',
      label: 'Trabajo',
      options: [
        { value: 'Private', label: 'Privado' },
        { value: 'Self-employed', label: 'Independiente' },
        { value: 'Govt_job', label: 'Público' }
      ]
    },
    {
      name: 'smoking_status',
      label: 'Tabaquismo',
      options: [
        { value: 'never smoked', label: 'Nunca' },
        { value: 'formerly smoked', label: 'Exfumador' },
        { value: 'smokes', label: 'Fumador' }
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative flex items-center">
      
      {/* BACKGROUND EFFECTS (Efectos lumínicos premium suavizados) */}
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

      {/* GRID PATTERN (Rejilla técnica integrada) */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full space-y-10">

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
                Predicción de ACV con Inteligencia Artificial
              </p>
            </div>
          </div>

          {/* METRICS */}
          <div className="flex flex-wrap gap-4">
            {[
              {
                label: 'Modelo',
                value: 'Logistic Regression',
              },
              {
                label: 'Accuracy',
                value: '79%',
              },
              {
                label: 'Backend',
                value: 'FastAPI',
              },
            ].map((metric, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 px-5 py-3 rounded-2xl min-w-[140px]"
              >
                {/* Ajustado a text-sm mínimo */}
                <p className="text-slate-500 text-sm font-mono tracking-wider uppercase">
                  {metric.label}
                </p>

                <h3 className="font-bold text-slate-200 mt-0.5 text-base tracking-tight">
                  {metric.value}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GRID CONTENEDOR PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT PANEL */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-xl shadow-black/20 space-y-6"
          >
            {/* TITLE */}
            <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
              <User className="text-cyan-400 w-5 h-5" />
              <h2 className="text-xl font-bold tracking-tight text-slate-100">
                Información del Paciente
              </h2>
            </div>

            {/* BOTONES PREDEFINIDOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* BAJO RIESGO */}
              <motion.button
                type="button"
                onClick={loadLowRisk}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative overflow-hidden rounded-2xl border border-emerald-900/60 bg-emerald-950/20 p-5 text-left group transition-colors hover:border-emerald-800/80"
              >
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="text-emerald-400 w-5 h-5" />
                  <h3 className="font-bold text-base text-slate-200">
                    Bajo Riesgo
                  </h3>
                </div>

                {/* Ajustado a text-sm mínimo */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  Carga automáticamente datos clínicos saludables.
                </p>
              </motion.button>

              {/* ALTO RIESGO */}
              <motion.button
                type="button"
                onClick={loadHighRisk}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative overflow-hidden rounded-2xl border border-red-900/60 bg-red-950/20 p-5 text-left group transition-colors hover:border-red-800/80"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FlaskConical className="text-red-400 w-5 h-5" />
                  <h3 className="font-bold text-base text-slate-200">
                    Alto Riesgo
                  </h3>
                </div>

                {/* Ajustado a text-sm mínimo */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  Carga automáticamente un paciente crítico.
                </p>
              </motion.button>
            </div>

            {/* FORMULARIO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">

              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  {/* Ajustado a text-sm mínimo */}
                  <label className="block text-sm font-semibold text-slate-300">
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    step="0.1"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 font-medium text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 transition-all"
                  />
                </div>
              ))}

              {selects.map((select) => (
                <div key={select.name} className="space-y-2">
                  {/* Ajustado a text-sm mínimo */}
                  <label className="block text-sm font-semibold text-slate-300">
                    {select.label}
                  </label>

                  <select
                    name={select.name}
                    value={formData[select.name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 font-medium text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 transition-all"
                  >
                    {select.options.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-slate-900 text-sm"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl py-4 font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/10 pt-4 transition-all"
            >
              {loading ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-5 h-5" />
                  Generar Predicción
                </>
              )}
            </motion.button>
          </motion.form>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 min-h-[500px] shadow-xl shadow-black/20 flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">

              {!result && !loading && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl mb-6">
                    <ShieldAlert className="w-16 h-16 text-cyan-500/80" />
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-2">
                    Sistema Listo
                  </h2>

                  {/* Ajustado a text-sm mínimo */}
                  <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                    Puede usar casos predefinidos o ingresar datos manualmente.
                  </p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <Zap className="w-16 h-16 text-cyan-400 animate-pulse mb-4" />

                  <h2 className="text-xl font-bold tracking-tight text-slate-200">
                    Analizando Paciente...
                  </h2>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-950/30 border border-red-900/60 rounded-2xl p-6 w-full space-y-3"
                >
                  <div className="flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-6 h-6" />
                    <h2 className="text-lg font-bold tracking-tight">
                      Error detectado
                    </h2>
                  </div>

                  {/* Ajustado a text-sm mínimo */}
                  <p className="text-sm text-red-300/90 leading-relaxed">
                    {error}
                  </p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-between space-y-8 w-full"
                >
                  <div className="space-y-8">

                    {/* RESULTADO */}
                    <div className="flex items-center justify-between border-b border-slate-900 pb-6">
                      <div>
                        {/* Ajustado a text-sm mínimo */}
                        <p className="text-slate-500 uppercase text-sm font-mono tracking-widest font-bold">
                          Predicción IA
                        </p>

                        <h2
                          className={`text-4xl font-black mt-2 tracking-tight ${
                            result.prediction === 1
                              ? 'text-red-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {result.prediction === 1
                            ? 'ALTO RIESGO'
                            : 'BAJO RIESGO'}
                        </h2>
                      </div>

                      {result.prediction === 1 ? (
                        <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-2xl">
                          <AlertCircle className="w-12 h-12 text-red-400" />
                        </div>
                      ) : (
                        <div className="p-3 bg-emerald-950/40 border border-emerald-900/50 rounded-2xl">
                          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        </div>
                      )}
                    </div>

                    {/* PROBABILIDAD */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        {/* Ajustado a text-sm mínimo */}
                        <span className="text-sm font-medium text-slate-400">
                          Probabilidad de acierto
                        </span>

                        <span className="font-bold text-cyan-400 text-lg">
                          {(result.probability * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="w-full h-4 bg-slate-950 border border-slate-900 rounded-full overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${result.probability * 100}%`
                          }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            result.prediction === 1
                              ? 'bg-gradient-to-r from-red-500 to-orange-400'
                              : 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* FACTORES */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="text-cyan-400 w-5 h-5" />
                        <h3 className="text-lg font-bold tracking-tight text-slate-200">
                          Factores Detectados
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {getRiskFactors().length > 0 ? (
                          getRiskFactors().map((factor, index) => (
                            /* Ajustado a text-sm mínimo */
                            <div
                              key={index}
                              className="px-3.5 py-2 rounded-xl bg-amber-950/30 border border-amber-900/50 text-amber-300 font-medium text-sm"
                            >
                              {factor}
                            </div>
                          ))
                        ) : (
                          /* Ajustado a text-sm mínimo */
                          <div className="px-3.5 py-2 rounded-xl bg-emerald-950/30 border border-emerald-900/50 text-emerald-300 font-medium text-sm">
                            ✓ Parámetros normales
                          </div>
                        )}
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