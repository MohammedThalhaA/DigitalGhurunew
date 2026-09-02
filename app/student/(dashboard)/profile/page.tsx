import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Button from "@/components/ui/Button";

export default async function StudentProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-4xl space-y-10">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink-900 tracking-tight mb-3">My Profile</h1>
        <p className="text-lg text-ink-500 font-medium">Manage your personal details and account settings.</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-ink-100">
          <div className="h-24 w-24 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-display font-bold text-4xl">
            {(session?.user?.name || "S").charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">{session?.user?.name}</h2>
            <p className="text-ink-500">{session?.user?.email}</p>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-2">Full Name</label>
              <input type="text" defaultValue={session?.user?.name || ""} className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue bg-ink-50 text-ink-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-2">Email Address</label>
              <input type="email" disabled defaultValue={session?.user?.email || ""} className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-ink-100 text-ink-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-2">Phone Number</label>
              <input type="tel" placeholder="+91 88259 48859" className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue bg-ink-50 text-ink-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-2">Timezone</label>
              <select className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue bg-ink-50 text-ink-900 appearance-none">
                <option>Asia/Kolkata (IST)</option>
                <option>America/New_York (EST)</option>
                <option>Europe/London (GMT)</option>
              </select>
            </div>
          </div>
          
          <div className="border-t border-ink-100 pt-6 flex justify-end">
            <Button variant="primary" type="button">Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
