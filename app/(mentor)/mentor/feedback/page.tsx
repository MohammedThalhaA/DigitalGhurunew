import { Star, MessageSquare } from "lucide-react";

export default function MentorFeedbackPage() {
  const reviews = [
    { id: 1, student: "Priya Patel", course: "SEO Mastery", rating: 5, comment: "This course completely changed my career! The instructor explains everything so clearly.", date: "2 days ago" },
    { id: 2, student: "Rahul Sharma", course: "Advanced Digital Marketing", rating: 4, comment: "Great content, but would love more practical assignments on Facebook Ads.", date: "1 week ago" },
    { id: 3, student: "Neha Gupta", course: "Social Media Bootcamp", rating: 5, comment: "Best course I've ever taken. Highly recommend!", date: "2 weeks ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-extrabold text-ink-900 mb-1">Student Feedback</h1>
        <p className="text-ink-500">Read reviews and messages from your students.</p>
      </div>

      <div className="grid gap-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 flex flex-col items-center sm:items-start">
              <div className="h-12 w-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xl mb-2">
                {review.student.charAt(0)}
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-ink-200"}`} />
                ))}
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="font-bold text-ink-900 text-lg">{review.student}</h3>
                <span className="text-xs text-ink-400 font-semibold">{review.date}</span>
              </div>
              <p className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">{review.course}</p>
              <p className="text-ink-600 italic">"{review.comment}"</p>
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <button className="text-brand-blue hover:bg-brand-blue/10 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
