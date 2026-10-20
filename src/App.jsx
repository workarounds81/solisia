import GlobeBackground from './components/GlobeBackground.jsx';
import Masthead from './components/Masthead.jsx';
import NowBuilding from './components/NowBuilding.jsx';
import Services from './components/Services.jsx';
import EngagementWorkflow from './components/EngagementWorkflow.jsx';
import TrackRecord from './components/TrackRecord.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  return (
    <>
      <GlobeBackground />
      <Masthead />
      <main id="top">
        <NowBuilding />
        <Services />
        <EngagementWorkflow />
        <TrackRecord />
      </main>
      <Contact />
    </>
  );
}
