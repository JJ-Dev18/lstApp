import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SectionTitle from "./components/SectionTitle";
import FeatureCard from "./components/FeatureCard";
import TournamentCard from "./components/TournamentCard";
import TeamCard from "./components/TeamCard";
import MatchCard from "./components/MatchCard";
import CurvedLineChart from "./components/CurvedLineChart";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-[#0f172a] text-white">
      <Navbar />
      <Header />
      <section className="py-16 px-4 md:px-8">
        <SectionTitle title="How it works" />
        <p className="text-lg mb-12 text-center md:text-left">
          A simple and powerful platform for managing your ultimate frisbee games and tournaments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            imageSrc="/real-time-scoring.jpg"
            title="Real-time scoring"
            description="Score games as they happen, from anywhere."
          />
          <FeatureCard
            imageSrc="/global-coverage.jpg"
            title="Global coverage"
            description="Track games from around the world."
          />
          <FeatureCard
            imageSrc="/tournament-management.jpg"
            title="Tournament management"
            description="Manage your tournament with ease."
          />
        </div>
      </section>
      <section className="py-16 px-4 md:px-8">
        <SectionTitle title="Featured Tournaments" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TournamentCard
            imageSrc="/usa-ultimate.jpg"
            title="USA Ultimate National Championships"
            description="Men's, Women's, and Mixed club divisions."
          />
          <TournamentCard
            imageSrc="/wfdf-world.jpg"
            title="World Flying Disc Federation World Championships"
            description="The highest level of international competition."
          />
          <TournamentCard
            imageSrc="/premier-ultimate.jpg"
            title="Premier Ultimate League Championship"
            description="The top professional women's ultimate teams."
          />
        </div>
      </section>
      <section className="py-16 px-4 md:px-8">
        <SectionTitle title="Featured Teams" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamCard
            imageSrc="/revolver.jpg"
            name="Revolver"
            location="San Francisco, CA"
          />
          <TeamCard
            imageSrc="/brute-squad.jpg"
            name="Brute Squad"
            location="Boston, MA"
          />
          <TeamCard
            imageSrc="/truck-stop.jpg"
            name="Truck Stop"
            location="Washington, DC"
          />
        </div>
      </section>
      <section className="py-16 px-4 md:px-8">
        <SectionTitle title="Upcoming Matches" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MatchCard
            imageSrc="/usau-college.jpg"
            title="USAU College Nationals"
            date="May 20-22, 2022"
          />
          <MatchCard
            imageSrc="/wfdf-beach.jpg"
            title="WFDF World Beach Ultimate Championships"
            date="July 19-23, 2022"
          />
        </div>
      </section>
      <section className="py-16 px-4 md:px-8">
        <SectionTitle title="Statistics" />
        <CurvedLineChart className="w-full h-[300px] md:h-[500px]" />
      </section>
      <Footer />
    </div>
  );
}
