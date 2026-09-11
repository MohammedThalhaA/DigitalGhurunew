import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Trophy, Award, Lock, Download, CheckCircle2 } from "lucide-react";
import RightSidebarWrapper from "@/components/student/RightSidebarWrapper";
import { getEnrolledCourses } from "@/lib/student-data";
import Link from "next/link";

export default async function CertificatesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const userId = parseInt(session.user.id);
  const courses = await getEnrolledCourses(userId);

  // Separate unlocked and locked certificates
  const unlockedCerts = courses.filter(c => c.progress === 100);
  const lockedCerts = courses.filter(c => c.progress < 100);

  return (
    <RightSidebarWrapper>
      <div className="mb-10">
        <h1 className="heading-md text-ink-900 tracking-tight mb-3">
          My Certificates
        </h1>
        <p className="text-ink-500 font-medium text-lg">
          Download and share your earned course certificates.
        </p>
      </div>

      <div className="space-y-12">
        {/* Unlocked Certificates Section */}
        <div>
          <h2 className="font-display text-base font-bold text-ink-900 mb-6 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            Earned Certificates ({unlockedCerts.length})
          </h2>
          
          {unlockedCerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {unlockedCerts.map((cert) => (
                <div key={cert.id} className="relative group bg-white rounded-3xl p-1 shadow-[0_4px_20px_rgba(20,20,40,0.03)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] transition-all duration-300">
                  {/* Subtle Glowing Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-brand-orange to-amber-500 rounded-3xl opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-white rounded-[28px] h-full overflow-hidden flex flex-col">
                    {/* Top Decorative Banner */}
                    <div className="h-16 w-full bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100/50 flex items-center px-6">
                      <span className="bg-gradient-to-r from-amber-500 to-brand-orange text-transparent bg-clip-text font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-amber-500" /> Official Certification
                      </span>
                    </div>

                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <div className="flex items-start gap-5 mb-6">
                        <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center border border-amber-200/50 shadow-inner group-hover:scale-110 transition-transform duration-500">
                          <Award className="h-8 w-8 text-brand-orange" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-ink-900 text-base leading-tight mb-2 group-hover:text-brand-orange transition-colors">
                            {cert.title}
                          </h3>
                          <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">
                            {cert.completedAt ? `Earned on ${new Date(cert.completedAt).toLocaleDateString()}` : "Completed"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-ink-100">
                        <button className="w-full py-3.5 bg-ink-900 hover:bg-brand-blue text-white font-bold text-sm uppercase tracking-[0.15em] rounded-full transition-all shadow-md flex items-center justify-center gap-2 group/btn">
                          <Download className="h-4 w-4 group-hover/btn:-translate-y-1 transition-transform" />
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-ink-50/50 rounded-3xl border border-ink-100 p-10 text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-ink-100">
                <Trophy className="h-8 w-8 text-ink-300" />
              </div>
              <h3 className="font-display text-base font-bold text-ink-900 mb-2">No certificates yet</h3>
              <p className="text-ink-500 font-medium">Complete courses to 100% to earn your official certificates.</p>
            </div>
          )}
        </div>

        {/* Locked Certificates Section */}
        {lockedCerts.length > 0 && (
          <div>
            <h2 className="font-display text-base font-bold text-ink-900 mb-6 flex items-center gap-2">
              <Lock className="h-6 w-6 text-ink-400" />
              In Progress ({lockedCerts.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lockedCerts.map((cert) => (
                <div key={cert.id} className="bg-white rounded-3xl border border-ink-100 p-6 md:p-8 flex flex-col shadow-sm">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-ink-50 flex items-center justify-center border border-ink-100">
                      <Lock className="h-5 w-5 text-ink-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink-900 leading-tight mb-1 line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-medium text-ink-400 uppercase tracking-[0.15em]">
                        Course in progress
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-brand-blue uppercase tracking-[0.15em]">Progress</span>
                      <span className="text-xs font-bold text-ink-900">{cert.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out bg-brand-blue"
                        style={{ width: `${cert.progress}%` }}
                      ></div>
                    </div>
                    <Link 
                      href={`/student/learn/${cert.id}`}
                      className="block w-full py-2.5 bg-ink-50 hover:bg-brand-blue/10 text-brand-blue font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-colors text-center border border-brand-blue/20"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </RightSidebarWrapper>
  );
}
