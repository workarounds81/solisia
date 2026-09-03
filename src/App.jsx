import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import HostingCallout from './components/HostingCallout.jsx';
import EngagementWorkflow from './components/EngagementWorkflow.jsx';
import TrackRecord from './components/TrackRecord.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <HostingCallout />
        <EngagementWorkflow />
        <TrackRecord />
      </main>
      <Contact />
    </>
  );
}
