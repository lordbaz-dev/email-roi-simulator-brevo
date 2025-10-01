import brevoLogoFull from "@/assets/brevo-logo-full.svg";

export function BrevoLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center`}>
      <img src={brevoLogoFull} alt="Brevo" className="h-6" />
    </div>
  );
}