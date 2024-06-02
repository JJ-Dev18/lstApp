import { Box, Heading, Text, Grid, Skeleton } from "@chakra-ui/react";

import DotPattern from "../../../components/ui/DotPattern";
import {cn} from '../../../lib/utils'
import GridPattern from "../../../components/ui/GridPattern";
import EquipoImg from '../../../assets/inicio/equipo.webp'
import Equipo2Img from '../../../assets/inicio/equipo2.webp'
import Equipo3Img from '../../../assets/inicio/equipo3.webp'
import Torneo1 from '../../../assets/inicio/torneo1.jpg'
import Torneo2 from '../../../assets/inicio/torneo2.jpg'
import Torneo3 from '../../../assets/inicio/torneo3.webp'
import RealTime from '../../../assets/inicio/realtime.webp'
import estadisticas from '../../../assets/inicio/estadisticas.webp'
import Highlight from '../../../assets/inicio/highlight.webp'
import Tournament from '../../../assets/inicio/tournament.webp'
import { Suspense, lazy } from "react";


const FeatureCard = lazy(() => import('./FeatureCard'));
const CurvedlineChart = lazy(() => import("./CurvedLineChart"));
const Estadisticas = lazy(() => import("./Estadisticas"));
const Testimonials = lazy(() => import("./Testimonials"));
const LikeButton = lazy(() => import("./LikeButton"));
const FeedbackForm = lazy(() => import("./FeedbackForm"));





const stats = [
    {
      title: "Juegos Totales",
      value: "120",
    },
    {
      title: "Escores Totales",
      value: "2400",
    },
    {
      title: "Asistencias Totales",
      value: "350",
    },
  ];
const MainContent: React.FC = () => (
  <>
    <Box py={16} px={8}>
      <Heading as="h3" size="xl" mb={8}>Como funciona ?</Heading>
      <Text fontSize="lg" mb={12}>
        Una plataforma sencilla y potente para gestionar tus mejores torneos y juegos de frisbee.
      </Text>
      <Suspense fallback={<Skeleton height="200px" />}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
          <FeatureCard image={RealTime} title="Seguimiento de puntuaciones en tiempo real" description="Puntuación de juegos a medida que ocurren, desde cualquier lugar" />
          <FeatureCard image={Highlight} title="Destaca tus mejores juegos" description="Sigue juegos de todo el mundo" />
          <FeatureCard image={Tournament} title="Crea tus propios torneos" description="Gestiona tu torneo con facilidad." />
          <FeatureCard image={estadisticas} title="Hermoso panel de estadisticas" description="Gestiona tus estadisticas" />
        </Grid>
      </Suspense>
    </Box>

    <Box py={16} px={8}>
      <DotPattern className={cn("[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]")} />
      <Heading as="h3" size="xl" mb={8}>Torneos destacados</Heading>
      <Suspense fallback={<Skeleton height="200px" />}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          <FeatureCard image={Torneo1} title="USA Ultimate National Championships" description="Divisiones masculina, femenina, y mixta." />
          <FeatureCard image={Torneo3} title="World Flying Disc Federation World Championships" description="El nivel mas alto de ultimate internacional." />
          <FeatureCard image={Torneo2} title="Premier Ultimate League Championship" description="Los equipos profesionales de ultimate femenino mas elites." />
        </Grid>
      </Suspense>
    </Box>

    <Box py={16} px={8}>
      <Heading as="h3" size="xl" mb={8}>Equipos destacados</Heading>
      <Suspense fallback={<Skeleton height="200px" />}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          <FeatureCard image={EquipoImg} title="Revolver" description="San Francisco, CA" />
          <FeatureCard image={Equipo2Img} title="Brute Squad" description="Boston, MA" />
          <FeatureCard image={Equipo3Img} title="Truck Stop" description="Washington, DC" />
        </Grid>
      </Suspense>
    </Box>

    <Box py={16} px={8} position="relative">
      <Suspense fallback={<Skeleton height="200px" />}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          {stats.map(stat => (
            <Estadisticas key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </Grid>
      </Suspense>
    </Box>

    <Box py={16} px={8} position="relative">
      <Suspense fallback={<Skeleton height="200px" />}>
        <Testimonials />
      </Suspense>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [6, 6],
          [10, 5],
          [13, 3],
        ]}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          "hidden md:block"
        )}
      />
    </Box>

    <Box py={16} px={8}>
      <Heading as="h3" size="xl" mb={8}>Estadisticas</Heading>
      <Box width="full" height="500px" position="relative">
        <Suspense fallback={<Skeleton height="500px" />}>
          <CurvedlineChart />
        </Suspense>
      </Box>
      <Suspense fallback={<Skeleton height="200px" />}>
        <FeedbackForm />
        <LikeButton />
      </Suspense>
    </Box>
  </>
);

export default MainContent;
