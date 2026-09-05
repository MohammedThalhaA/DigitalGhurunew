const fs = require('fs');

const pagePath = 'app/(marketing)/courses/[slug]/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');

// Step 1: Add import for CourseCurriculum
if (!page.includes('CourseCurriculum')) {
  page = page.replace('import AIToolsCurriculum from "@/components/sections/course/AIToolsCurriculum";', 
    'import AIToolsCurriculum from "@/components/sections/course/AIToolsCurriculum";\nimport CourseCurriculum from "@/components/sections/course/CourseCurriculum";');
}

// Step 2: Extract the CoursePage function content.
// Since it's large, we can just replace everything from `export default function CoursePage() {` to the end of the file.

const coursePageStart = page.indexOf('export default function CoursePage() {');
const beforeCoursePage = page.slice(0, coursePageStart);

const newCoursePage = `export default function CoursePage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;
  const course = courseMap[slug];

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadErr, setLeadErr] = useState("");

  const { triggerAction, GateModalComponent } = useCourseGate(course?.title || "");

  // Sync lead submitted state globally
  useEffect(() => {
    if (localStorage.getItem("dg_lead_submitted") === "true") {
      setLeadSubmitted(true);
    }
  }, []);

  if (!course) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="heading-lg mb-4 text-[var(--tw-colors-ink-900)]">Course Not Found</h1>
        <p className="body-lg mb-8 text-ink-500">
          The course you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="primary" href="/">
          Back to Home
        </Button>
      </div>
    );
  }

  const isDigitalMarketing = course.title.includes("Digital Marketing");

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <HeroSection course={course} />
      <StatsBanner />
      <NextBatchGrid />
      <WhyUsDifferentiators />
      <FeesAndInclusions course={course} />
      <ComparisonTable course={course} />
      {isDigitalMarketing ? <AIToolsCurriculum /> : <CourseCurriculum course={course} />}
      <PlacementReportTable />
      {isDigitalMarketing && <FreelanceSuccessStats />}
      <PlacementProcess />
      <TrainersProfile />
      <StudentReviewsGrid />
      <ContactAndMap />
      <MediaAndFAQ />
      <EnrollmentProcess />
      
      <GateModalComponent />
    </main>
  );
}
`;

fs.writeFileSync(pagePath, beforeCoursePage + newCoursePage, 'utf8');
console.log('Successfully refactored page.tsx');
