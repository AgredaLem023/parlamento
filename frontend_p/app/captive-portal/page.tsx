import { CaptivePortalForm } from "@/components/captive-portal-form";

export default function CaptivePortalPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/patron_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0" />
      {/* Content */}
      <div className="w-full max-w-md px-4 z-10">
        <CaptivePortalForm />
      </div>
    </div>
  );
}