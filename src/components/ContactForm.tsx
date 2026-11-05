import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail, Instagram, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

const nameRe = /^[a-zA-ZÀ-ÿ\s'-]+$/;
const makeSchema = (t: TFunction) => z.object({
  firstName: z.string().trim().min(1, t("contactForm.errRequiredFirst")).max(50, t("contactForm.errMax", { count: 50 })).regex(nameRe, t("contactForm.errChars")),
  lastName: z.string().trim().min(1, t("contactForm.errRequiredLast")).max(50, t("contactForm.errMax", { count: 50 })).regex(nameRe, t("contactForm.errChars")),
  email: z.string().trim().min(1, t("contactForm.errRequiredEmail")).email(t("contactForm.errEmail")).max(255, t("contactForm.errMax", { count: 255 })),
  whatsapp: z.string().trim().min(1, t("contactForm.errRequiredWhatsapp")).regex(/^\+?[\d\s()-]{10,20}$/, t("contactForm.errWhatsapp")),
  howDidYouMeetMe: z.string().max(500, t("contactForm.errMax", { count: 500 })).optional().or(z.literal(''))
});

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    howDidYouMeetMe: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const maxLengths: Record<string, number> = { firstName: 50, lastName: 50, email: 255, whatsapp: 20, howDidYouMeetMe: 500 };
    if (maxLengths[name] && value.length > maxLengths[name]) return;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = makeSchema(t).safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: result.data
      });

      if (error) throw error;

      trackFormSubmit();

      // Trigger native hidden form submit for HubSpot Collected Forms capture
      try {
        const hiddenForm = document.createElement("form");
        hiddenForm.setAttribute("action", "about:blank");
        hiddenForm.setAttribute("method", "POST");
        hiddenForm.setAttribute("target", "hs-hidden-iframe");
        hiddenForm.style.display = "none";

        const hiddenIframe = document.createElement("iframe");
        hiddenIframe.name = "hs-hidden-iframe";
        hiddenIframe.style.display = "none";
        document.body.appendChild(hiddenIframe);

        const fields = { firstName: result.data.firstName, lastName: result.data.lastName, email: result.data.email, phone: result.data.whatsapp };
        for (const [name, value] of Object.entries(fields)) {
          const input = document.createElement("input");
          input.type = name === "email" ? "email" : "hidden";
          input.name = name;
          input.value = value;
          hiddenForm.appendChild(input);
        }

        document.body.appendChild(hiddenForm);
        hiddenForm.submit();

        setTimeout(() => {
          hiddenForm.remove();
          hiddenIframe.remove();
        }, 2000);
      } catch (hsErr) {
        console.warn("HubSpot form trigger failed:", hsErr);
      }

      toast({
        title: t("contactForm.successTitle"),
        description: t("contactForm.successDescription")
      });

      setFormData({ firstName: "", lastName: "", email: "", whatsapp: "", howDidYouMeetMe: "" });
      setErrors({});
    } catch (err) {
      console.error('Form submission error:', err);
      toast({
        title: t("contactForm.errorTitle"),
        description: t("contactForm.errorDescription"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-16 sm:py-20 lg:py-24 bg-muted/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left side */}
            <div>
              <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">{t("contactForm.eyebrow")}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-6">{t("contactForm.title")}</h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-10">{t("contactForm.intro")}</p>

              <div className="grid gap-5">
                {[
                { icon: Calendar, label: t("contactForm.doctoralia"), href: "http://bit.ly/psilariruza" },
                { icon: Phone, label: "+34 657 907 439", href: "https://wa.me/34657907439" },
                { icon: Mail, label: "psilariruza@gmail.com", href: "mailto:psilariruza@gmail.com" },
                { icon: Instagram, label: "@lariruza.psi", href: "https://www.instagram.com/lariruza.psi" }].
                map((item, i) =>
                <div key={i} className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-light">
                      {item.label}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="bg-background rounded-2xl p-8 sm:p-10 shadow-sm border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("contactForm.formTitle")}</h3>
              <p className="text-muted-foreground text-sm font-light mb-6">{t("contactForm.formSubtitle")}</p>

              <form onSubmit={handleSubmit} action="" method="POST" className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-foreground mb-1.5 block font-medium">{t("contactForm.firstName")} <span className="text-destructive">*</span></label>
                    <input type="text" name="firstName" placeholder={t("contactForm.firstName")} value={formData.firstName} onChange={handleInputChange} maxLength={50} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-background" />
                    {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-1.5 block font-medium">{t("contactForm.lastName")} <span className="text-destructive">*</span></label>
                    <input type="text" name="lastName" placeholder={t("contactForm.lastName")} value={formData.lastName} onChange={handleInputChange} maxLength={50} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-background" />
                    {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-foreground mb-1.5 block font-medium">{t("contactForm.email")} <span className="text-destructive">*</span></label>
                  <input type="email" name="email" placeholder={t("contactForm.emailPlaceholder")} value={formData.email} onChange={handleInputChange} maxLength={255} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-background" />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-sm text-foreground mb-1.5 block font-medium">{t("contactForm.whatsapp")} <span className="text-destructive">*</span></label>
                  <input type="tel" name="whatsapp" placeholder={t("contactForm.whatsappPlaceholder")} value={formData.whatsapp} onChange={handleInputChange} maxLength={20} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-background" />
                  {errors.whatsapp ? <p className="text-xs text-destructive mt-1">{errors.whatsapp}</p> : <p className="text-xs text-muted-foreground mt-1">{t("contactForm.whatsappHint")}</p>}
                </div>

                <div>
                  <label className="text-sm text-foreground mb-1.5 block font-medium">{t("contactForm.howDidYouMeetMe")}</label>
                  <textarea name="howDidYouMeetMe" value={formData.howDidYouMeetMe} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-background resize-none" />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-sm font-medium rounded-lg transition-colors">
                  {isSubmitting ?
                  <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("contactForm.sending")}
                    </> :

                  <>
                      {t("contactForm.send")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  }
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ContactForm;