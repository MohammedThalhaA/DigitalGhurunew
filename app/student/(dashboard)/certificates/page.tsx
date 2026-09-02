import { Trophy, Award, Lock } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CertificatesPage() {
  const dummyCertificates = [
    { id: 1, course: "SEO Mastery", date: "2025-12-15", url: "#", locked: false },
    { id: 2, course: "Advanced Digital Marketing", date: null, url: "#", locked: true },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink-900 tracking-tight mb-3">My Certificates</h1>
        <p className="text-lg text-ink-500 font-medium">Download and share your earned course certificates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyCertificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden flex">
            <div className={`w-32 flex shrink-0 items-center justify-center ${cert.locked ? 'bg-ink-100' : 'bg-brand-blue/10'}`}>
              {cert.locked ? (
                <Lock className="h-10 w-10 text-ink-300" />
              ) : (
                <Award className="h-12 w-12 text-brand-blue" />
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-ink-900 text-lg mb-1 line-clamp-1">{cert.course}</h3>
              {cert.locked ? (
                <>
                  <p className="text-sm text-ink-500 mb-4">Complete the course to unlock</p>
                  <div className="w-full bg-ink-100 rounded-full h-1.5">
                    <div className="bg-brand-orange h-1.5 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-ink-500 mb-4">Earned on {cert.date}</p>
                  <Button variant="outline" size="sm" className="w-fit">Download PDF</Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
