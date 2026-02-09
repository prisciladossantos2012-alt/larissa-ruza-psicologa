import { Clock, Globe, Award, MapPin } from "lucide-react";

const stats = [
  { icon: Clock, value: "11+", label: "Anos de experiência" },
  { icon: Globe, value: "Online", label: "Brasil e exterior" },
  { icon: MapPin, value: "Presencial", label: "Santo André/SP" },
  { icon: Award, value: "5.0", label: "Nota no Doctoralia" },
];

const SocialProof = () => {
  return (
    <section className="bg-primary py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-primary-foreground">
              <stat.icon className="w-6 h-6 mx-auto mb-2 opacity-80" strokeWidth={1.5} />
              <div className="text-2xl sm:text-3xl font-semibold">{stat.value}</div>
              <div className="text-sm text-primary-foreground/75 font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
