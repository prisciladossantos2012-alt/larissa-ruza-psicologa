import { Star, Quote } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const testimonials = [
  {
    name: "Erica",
    rating: 5,
    comment: "Foi a minha primeira consulta, e ja amei! O posicionamento dela, o olhar de atenção a empatia e os insights de visão sobre os assuntos. Ela é maravilhosa e indico desde ja!",
    date: "30 de julho de 2025",
    location: "Terapia Presencial - Santo André (ABC)"
  },
  {
    name: "LP",
    rating: 5,
    comment: "Ter a habilidade de escutar e acolher, é um diferencial para quem sofre, e senti isso por parte da Larissa, me senti acolhida e segura.",
    date: "7 de julho de 2025",
    location: "Terapia Online - São Paulo"
  },
  {
    name: "Joana",
    rating: 5,
    comment: "Adoro a Lari, ela me ajuda muito! Me sinto acolhida e sem julgamentos, as consultas são leves",
    date: "31 de maio de 2025",
    location: "Terapia Online - São Paulo"
  },
  {
    name: "Marina Reis",
    rating: 5,
    comment: "A Larissa é uma profissional super acolhedora, com escuta ativa e perguntas que ajudam no processo de imigração que estou passando. Me sinto confortável durante toda a sessão.",
    date: "7 de maio de 2025",
    location: "Terapia Online - Brasil e exterior"
  },
  {
    name: "Julia a",
    rating: 5,
    comment: "A Larissa tem uma escuta que acolhe de verdade, sabe olhar pro outro com empatia e sem julgamentos. É o tipo de profissional que faz a gente se sentir à vontade logo de cara — e isso, pra mim, faz toda a diferença. Indico demais de olhos fechados.",
    date: "2 de maio de 2025",
    location: "Atendimento Online Psicóloga Larissa Ruza"
  },
  {
    name: "Michelli",
    rating: 5,
    comment: "Muito atenciosa, carismática amei o atendimento, hiper recomendo!",
    date: "30 de abril de 2025",
    location: "Atendimento Online Psicóloga Larissa Ruza"
  },
  {
    name: "Renata F.",
    rating: 5,
    comment: "A Larissa me ajudou a encontrar caminhos pra entender coisas que eu nem sabia que precisava. Ela tem uma gentileza ímpar, delicada, firme e é super dedicada.",
    date: "30 de abril de 2025",
    location: "Atendimento Online Psicóloga Larissa Ruza"
  },
  {
    name: "Fernanda Luz",
    rating: 5,
    comment: "Me sinto vista, acolhida. Obrigada, Larissa pela ajuda!",
    date: "30 de abril de 2025",
    location: "Atendimento Online Psicóloga Larissa Ruza"
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-80"} bg-gradient-to-br from-primary/5 to-primary/10 border-r border-primary/10`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-primary font-semibold text-lg mb-4">
            <Quote className="w-5 h-5" />
            {!collapsed && "Depoimentos"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <SidebarMenuItem key={index}>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-primary/10 hover:shadow-md transition-all duration-300">
                    {!collapsed && (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3 font-light leading-relaxed">
                          "{testimonial.comment}"
                        </p>
                        
                        <div className="border-t pt-3">
                          <p className="font-medium text-primary text-sm">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">Paciente verificado</p>
                        </div>
                      </>
                    )}
                    
                    {collapsed && (
                      <div className="flex flex-col items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mb-1" />
                        <span className="text-xs font-medium text-primary">{testimonial.name.split(' ')[0]}</span>
                      </div>
                    )}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {!collapsed && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-700 font-medium">5.0</span>
              <span className="text-xs text-muted-foreground">• Feedbacks verificados</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}