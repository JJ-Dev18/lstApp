import { BorderBeam } from "../ui/BorderBeam";
import ImagePartido  from '../../assets/partidos/1.webp'

export function BorderBeamDemo() {
  return (
    <div className="flex border">
      <img
        src={ImagePartido}
        alt="Hero Image"
        className="hidden w-[700px] rounded-[inherit] border object-contain shadow-lg dark:block"
      />
      <img
        src={ImagePartido}
        alt="Hero Image"
        className="block w-[700px] rounded-[inherit] border object-contain shadow-lg dark:hidden"
      />

      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
