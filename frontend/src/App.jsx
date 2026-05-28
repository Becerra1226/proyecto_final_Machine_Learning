import PredictionPanel from './components/PredictionPanel'
import Hero from './components/Hero';
import StrokeInfo from './components/StrokeInfo';
import DatasetInfo from './components/DatasetInfo';
import SolutionPipeline from './components/SolutionPipeline';

export default function App() {
  return (
    <div>
      <Hero />
      <StrokeInfo />
      <DatasetInfo />
      <SolutionPipeline />
      <div id="prediction">
        <PredictionPanel />
      </div>
    </div>
  )
}