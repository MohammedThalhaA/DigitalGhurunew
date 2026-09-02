import Button from "@/components/ui/Button";

export default function MentorSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-extrabold text-ink-900 mb-1">Settings</h1>
        <p className="text-ink-500">Manage your profile and account configurations.</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-8">
        <h2 className="text-xl font-bold text-ink-900 mb-6">Instructor Profile</h2>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-2">Full Name</label>
              <input type="text" defaultValue="Demo Instructor" className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue bg-ink-50 text-ink-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-2">Email Address</label>
              <input type="email" disabled defaultValue="instructor@demo.com" className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-ink-100 text-ink-500 cursor-not-allowed" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-ink-900 mb-2">Bio</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue bg-ink-50 text-ink-900" placeholder="Tell students about your experience..."></textarea>
          </div>

          <div className="border-t border-ink-100 pt-6 flex justify-end">
            <Button variant="primary" type="button">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
