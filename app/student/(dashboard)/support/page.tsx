import { HelpCircle, Mail, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SupportPage() {
  return (
    <div className="space-y-10 w-full">
      {/* Hero Section */}
      <div className="bg-brand-blue/5 rounded-3xl p-10 md:p-16 text-center border border-brand-blue/10">
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink-900 tracking-tight mb-4">How can we help?</h1>
        <p className="text-lg text-ink-500 font-medium max-w-xl mx-auto mb-8">
          Search our knowledge base or get in touch with our support team.
        </p>
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Ask a question (e.g. 'How do I download certificates?')" 
            className="w-full px-6 py-4 rounded-2xl border-2 border-white bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:border-brand-blue transition-colors text-ink-900 font-medium"
          />
          <Button variant="primary" className="absolute right-2 top-2 bottom-2 px-6">
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: FAQs */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-display font-black text-ink-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-brand-orange" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="font-bold text-lg text-ink-900 mb-2">How do I access my certificates?</h4>
              <p className="text-ink-600">Once you reach 100% completion on a course, the certificate will automatically unlock in the 'Certificates' tab in your sidebar. You can download it as a PDF or share it directly to LinkedIn.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="font-bold text-lg text-ink-900 mb-2">Can I download videos offline?</h4>
              <p className="text-ink-600">Currently, videos must be streamed while connected to the internet to ensure you receive the most up-to-date content and to protect our proprietary curriculum.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="font-bold text-lg text-ink-900 mb-2">How do I contact my mentor?</h4>
              <p className="text-ink-600">You can leave feedback or questions directly inside the video player interface of any course module. Mentors are notified instantly and usually respond within 24 hours.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Methods */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-black text-ink-900 tracking-tight">Still need help?</h2>
          
          <div className="bg-white rounded-2xl border border-ink-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-ink-900 mb-2">Email Support</h3>
            <p className="text-sm text-ink-500 mb-6">
              Send us a detailed email regarding your issue and our team will get back to you within 24 hours.
            </p>
            <Button variant="primary" className="w-full">support@digitalghuru.com</Button>
          </div>

          <div className="bg-white rounded-2xl border border-ink-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-ink-900 mb-2">Community Discord</h3>
            <p className="text-sm text-ink-500 mb-6">
              Join our exclusive Discord server to ask questions, network with peers, and get immediate help.
            </p>
            <Button variant="outline" className="w-full">Join Discord</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
