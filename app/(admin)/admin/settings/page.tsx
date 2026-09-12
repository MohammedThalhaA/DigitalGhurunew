import { Settings } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-xl bg-white shadow-md border border-ink-100/50 flex items-center justify-center">
          <Settings className="h-6 w-6 text-brand-blue" />
        </div>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900">Platform Settings</h1>
          <p className="font-body text-ink-500 text-sm md:text-base mt-1">Configure global platform settings, payment gateways, and notifications.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-ink-100 shadow-card flex flex-col items-center justify-center text-center py-24">
        <h2 className="text-xl font-bold text-ink-900 mb-2">Settings module is coming soon!</h2>
        <p className="text-ink-500 mb-6 max-w-md">
          We are currently working on adding comprehensive platform settings. Check back later for updates.
        </p>
        <Button variant="primary" href="/admin/dashboard">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
