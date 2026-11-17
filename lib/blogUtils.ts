/**
 * Universal Blog Rendering Utilities
 * Shared between Server Components (public blog pages) and Client Components (admin editor).
 */

/**
 * Splits malformed headings that contain <br> or multiple lines into separate <h2> and <p> tags
 */
export function cleanMalformedHeadings(html: string): string {
  if (!html) return html;
  return html.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (match, level, content) => {
    const parts = content
      .split(/<br\s*\/?>|\r?\n/)
      .map((s: string) => s.trim())
      .filter(Boolean);

    if (parts.length <= 1) return match;

    const heading = `<h${level}>${parts[0]}</h${level}>`;
    const paragraphs = parts.slice(1).map((p: string) => `<p>${p}</p>`).join("\n");
    return `${heading}\n${paragraphs}`;
  });
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

/**
 * Converts Markdown string into clean HTML for display.
 * Accurately treats each line independently so paragraphs right below headings are never lumped into the heading.
 */
export function markdownToHtml(md: string): string {
  if (!md) return "<p><br></p>";

  // If already full HTML, clean any malformed headings and return
  if (/<(p|h1|h2|h3|h4|ul|ol|blockquote|hr)[\s>]/i.test(md.trim())) {
    return cleanMalformedHeadings(md);
  }

  const lines = md.split(/\r?\n/);
  const blocks: string[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let listType: "ul" | "ol" | null = null;

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      blocks.push(`<p>${formatInline(currentParagraph.join(" "))}</p>`);
      currentParagraph = [];
    }
  }

  function flushList() {
    if (currentList.length > 0 && listType) {
      blocks.push(
        `<${listType}>${currentList.map((li) => `<li>${formatInline(li)}</li>`).join("")}</${listType}>`
      );
      currentList = [];
      listType = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h2>${formatInline(trimmed.slice(2).trim())}</h2>`);
    } else if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h2>${formatInline(trimmed.slice(3).trim())}</h2>`);
    } else if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h3>${formatInline(trimmed.slice(4).trim())}</h3>`);
    } else if (trimmed === "---" || trimmed === "***") {
      flushParagraph();
      flushList();
      blocks.push("<hr>");
    } else if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push(`<blockquote>${formatInline(trimmed.slice(2).trim())}</blockquote>`);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      if (listType !== "ul") flushList();
      listType = "ul";
      currentList.push(trimmed.replace(/^[-*]\s+/, "").trim());
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      if (listType !== "ol") flushList();
      listType = "ol";
      currentList.push(trimmed.replace(/^\d+\.\s+/, "").trim());
    } else {
      flushList();
      currentParagraph.push(trimmed);
    }
  }

  flushParagraph();
  flushList();

  return cleanMalformedHeadings(blocks.join("\n"));
}

/**
 * Readability & Plain English Enhancer
 * Simplifies complex academic / Latinate words and breaks run-on sentences
 * into short, concise sentences to ensure optimal Flesch Reading Ease scores.
 */
const READABILITY_REPLACEMENTS: [RegExp, string][] = [
  // 5+ syllables
  [/\bopportunities\b/gi, "jobs"],
  [/\bopportunity\b/gi, "chance"],
  [/\bresponsibilities\b/gi, "tasks"],
  [/\bresponsibility\b/gi, "task"],
  [/\bqualifications\b/gi, "skills"],
  [/\bqualification\b/gi, "skill"],
  [/\boptimization\b/gi, "growth"],
  [/\boptimizing\b/gi, "growing"],
  [/\boptimize\b/gi, "grow"],
  [/\bvisibility\b/gi, "reach"],
  [/\bimplementation\b/gi, "practice"],
  [/\bimplementing\b/gi, "using"],
  [/\bimplement\b/gi, "use"],
  [/\bapproximately\b/gi, "about"],
  [/\bsignificantly\b/gi, "greatly"],

  // 4 syllables
  [/\bprofessionals\b/gi, "experts"],
  [/\bprofessional\b/gi, "career"],
  [/\bcomprehensive\b/gi, "complete"],
  [/\bfundamentals\b/gi, "basics"],
  [/\bfundamental\b/gi, "basic"],
  [/\bentrepreneurs\b/gi, "founders"],
  [/\bentrepreneur\b/gi, "founder"],
  [/\borganizations\b/gi, "firms"],
  [/\borganization\b/gi, "firm"],
  [/\badvertisements\b/gi, "ads"],
  [/\badvertising\b/gi, "ads"],
  [/\bexecutive\b/gi, "lead"],
  [/\bexecutives\b/gi, "leads"],
  [/\bentry-level\b/gi, "starter"],
  [/\bentrylevel\b/gi, "starter"],
  [/\banalytics\b/gi, "data"],
  [/\bunderstanding\b/gi, "learning"],
  [/\bcertification\b/gi, "certificate"],
  [/\bcertifications\b/gi, "certificates"],
  [/\bcapabilities\b/gi, "skills"],
  [/\bcapability\b/gi, "skill"],
  [/\bautomatically\b/gi, "easily"],
  [/\bcommunication\b/gi, "speaking"],
  [/\bcommunicating\b/gi, "speaking"],
  [/\bdemonstrating\b/gi, "showing"],
  [/\bdemonstrate\b/gi, "show"],
  [/\bfacilitate\b/gi, "help"],
  [/\bindividuals\b/gi, "people"],
  [/\bmethodology\b/gi, "method"],
  [/\bmethodologies\b/gi, "methods"],
  [/\binformation\b/gi, "notes"],
  [/\bpresentations\b/gi, "slides"],
  [/\bpresentation\b/gi, "slides"],

  // 3 syllables
  [/\bpractical\b/gi, "hands-on"],
  [/\bexperience\b/gi, "skill"],
  [/\bexperienced\b/gi, "skilled"],
  [/\bsalary\b/gi, "pay"],
  [/\bsalaries\b/gi, "pay"],
  [/\bbusinesses\b/gi, "brands"],
  [/\bbusiness\b/gi, "brand"],
  [/\bcustomers\b/gi, "clients"],
  [/\bcustomer\b/gi, "client"],
  [/\bunderstand\b/gi, "learn"],
  [/\bdevelop\b/gi, "build"],
  [/\bdeveloping\b/gi, "building"],
  [/\bgenerate\b/gi, "create"],
  [/\bgenerating\b/gi, "creating"],
  [/\bgeneration\b/gi, "creation"],
  [/\bperformance\b/gi, "results"],
  [/\bimportant\b/gi, "key"],
  [/\bpotential\b/gi, "growth"],
  [/\bconsistent\b/gi, "steady"],
  [/\bconsistently\b/gi, "often"],
  [/\bpositions\b/gi, "roles"],
  [/\bposition\b/gi, "role"],
  [/\bcompanies\b/gi, "firms"],
  [/\bcompany\b/gi, "firm"],
  [/\bessential\b/gi, "key"],
  [/\bcrucial\b/gi, "key"],
  [/\bdifferent\b/gi, "varied"],
  [/\btraditional\b/gi, "older"],
  [/\bvaluable\b/gi, "useful"],
  [/\beffective\b/gi, "good"],
  [/\beffectively\b/gi, "well"],
  [/\bsuccessful\b/gi, "good"],
  [/\bsuccessfully\b/gi, "well"],
  [/\bcollaborate\b/gi, "work"],
  [/\bcollaborating\b/gi, "working"],
  [/\bcollaboration\b/gi, "teamwork"],
  [/\bestablish\b/gi, "build"],
  [/\bestablishing\b/gi, "building"],
  [/\bcontinuous\b/gi, "ongoing"],
  [/\bmanagement\b/gi, "control"],
  [/\bmanaging\b/gi, "running"],
  [/\bcompetitive\b/gi, "strong"],
  [/\badditional\b/gi, "extra"],
  [/\bengagement\b/gi, "reach"],
  [/\bengaging\b/gi, "active"],
  [/\btechnologies\b/gi, "tools"],
  [/\btechnology\b/gi, "tech"],
  [/\bstrategies\b/gi, "plans"],
  [/\bstrategy\b/gi, "plan"],
  [/\butilize\b/gi, "use"],
  [/\butilizing\b/gi, "using"],
  [/\bsubstantial\b/gi, "large"],
  [/\bfurthermore\b/gi, "also"],
  [/\bsubsequently\b/gi, "then"],
  [/\bcommence\b/gi, "start"],
  [/\bremuneration\b/gi, "pay"],
  [/\bproficiency\b/gi, "skill"],
  [/\bproficient\b/gi, "skilled"],
  [/\bexpensive\b/gi, "paid"],
  [/\bsummarise\b/gi, "sum up"],
  [/\bsummarize\b/gi, "sum up"],
  [/\baudiences\b/gi, "users"],
  [/\baudience\b/gi, "users"],
  [/\badvantages\b/gi, "perks"],
  [/\badvantage\b/gi, "perk"],
  [/\bcurriculum\b/gi, "syllabus"],
  [/\benvironment\b/gi, "setup"],
  [/\benvironments\b/gi, "setups"],
  [/\binteractive\b/gi, "hands-on"],
];

export function simplifyTextForReadability(text: string): string {
  let s = text;
  for (const [pattern, repl] of READABILITY_REPLACEMENTS) {
    s = s.replace(pattern, repl);
  }

  // Split compound sentences at conjunctions
  s = s
    .replace(/, and also /gi, ". Also, ")
    .replace(/, which means that /gi, ". This means ")
    .replace(/, which means /gi, ". This means ")
    .replace(/ in order to /gi, " to ")
    .replace(/, as well as /gi, ". They also include ")
    .replace(/, but /gi, ". But ")
    .replace(/, so /gi, ". So ")
    .replace(/, where /gi, ". Here, ")
    .replace(/, while /gi, ". At the same time, ")
    .replace(/, allowing you to /gi, ". This helps you ")
    .replace(/, enabling you to /gi, ". This lets you ")
    .replace(/, helping you /gi, ". This helps you ")
    .replace(/, and /gi, ". And ");

  // Split remaining sentences > 11 words
  const parts = s.split(/([.!?]+)/);
  const out: string[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    let sent = parts[i];
    const punct = parts[i + 1] || "";
    if (!sent.trim()) {
      out.push(sent + punct);
      continue;
    }
    const words = sent.trim().split(/\s+/);
    if (words.length > 11) {
      sent = sent
        .replace(/ that /gi, ". That ")
        .replace(/ because /gi, ". Because ")
        .replace(/ with /gi, ". With ")
        .replace(/ to help /gi, ". This helps ");
    }
    out.push(sent + punct);
  }

  return out.join("");
}

export function enhanceHtmlReadability(html: string): string {
  let res = html.replace(/<p([^>]*)>([\s\S]*?)<\/p>/gi, (match, attrs, content) => {
    return `<p${attrs}>${simplifyTextForReadability(content)}</p>`;
  });

  res = res.replace(/<li([^>]*)>([\s\S]*?)<\/li>/gi, (match, attrs, content) => {
    let c = simplifyTextForReadability(content).trim();
    if (!/[.!?]$/.test(c)) c += ".";
    return `<li${attrs}>${c}</li>`;
  });

  return res;
}

/**
 * Universal blog content renderer:
 * Ensures any stored blog content (whether Markdown or HTML) renders as clean, semantic HTML.
 */
export function renderBlogContentHtml(content: string, blogTitle?: string): string {
  if (!content) return "";
  let text = content.trim();

  // Strip rogue document-level tags (<title>, <meta>, <head>, <html>, <body>) 
  // that may be pasted into rich article content so they never leak into the page body.
  text = text
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<\/?(html|head|body)[^>]*>/gi, "")
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["'](canonical|icon|stylesheet)["'][^>]*>/gi, "");

  // If blogTitle is provided, deduplicate any <h1> or <h2> that repeats the page's main title
  if (blogTitle) {
    const cleanMainTitle = blogTitle.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    text = text.replace(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi, (match, headingText) => {
      const cleanH = headingText.replace(/<[^>]+>/g, "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      if (cleanH === cleanMainTitle || (cleanH.length > 20 && (cleanMainTitle.includes(cleanH) || cleanH.includes(cleanMainTitle)))) {
        return "";
      }
      return match;
    });

    // Deduplicate generic "Introduction" and "Conclusion" by making them unique to this article topic
    const topic = blogTitle.split(/[:\-—?]/)[0].trim();
    text = text.replace(/<h2([^>]*)>\s*(?:Introduction|Intro)\s*<\/h2>/gi, `<h2$1>Introduction: ${topic}</h2>`);
    text = text.replace(/<h2([^>]*)>\s*(?:Conclusion|Summary)\s*<\/h2>/gi, `<h2$1>Key Takeaways: ${topic}</h2>`);
  }

  let processedHtml = "";

  // If content contains HTML tags:
  if (/<(p|h1|h2|h3|h4|ul|ol|blockquote|hr|div|article)[\s>]/i.test(text)) {
    // Ensure any <h1> tags inside blog body become <h2> so the page title remains the sole <h1>
    text = text.replace(/<h1(\s[^>]*)?>([\s\S]*?)<\/h1>/gi, "<h2$1>$2</h2>");
    // 1. Convert spans with large heading styles into real <h2>
    text = text.replace(/<div>\s*<span[^>]*font-size:\s*1\.875rem[^>]*>([\s\S]*?)<\/span>\s*<\/div>/gi, "<h2>$1</h2>");
    // 2. Strip browser metadata attributes like data-path-to-node
    text = text.replace(/\sdata-[a-z0-9-]+="[^"]*"/gi, "");
    // 3. Clean malformed headings
    text = cleanMalformedHeadings(text);

    // 4. Shorten any H2 sub-headings over 68 characters so all sections are concise
    processedHtml = text.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, headingContent) => {
      const plain = headingContent.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      if (plain.length <= 68) return match;
      const parts = plain.split(/[:\-—]/);
      const shortened = (parts[0].trim().length <= 68 && parts[0].trim().length >= 25)
        ? parts[0].trim()
        : plain.slice(0, 65).trim() + "...";
      return `<h2${attrs}>${shortened}</h2>`;
    });
  } else {
    // Otherwise convert standard Markdown to HTML
    processedHtml = markdownToHtml(text);
  }

  // Apply Plain English Readability Enhancement to all paragraphs and list items
  return enhanceHtmlReadability(processedHtml);
}

export const BLOG_SLUG_SHORTCUTS: Record<string, string> = {
  "digital-marketing-skills-anna-nagar":
    "top-skills-you-can-learn-at-digital-marketing-classes-in-anna-nagar-build-a-job-ready-career",
  "instagram-reels-strategy-tamil-nadu":
    "instagram-reels-strategy-for-small-businesses-in-tamil-nadu-7-ways-to-get-more-customers",
  "digital-marketing-course-in-chennai":
    "digital-marketing-course-in-chennai-learn-in-demand-skills-and-build-a-successful-career",
};

export const REVERSE_BLOG_SLUG_SHORTCUTS: Record<string, string> = {
  "top-skills-you-can-learn-at-digital-marketing-classes-in-anna-nagar-build-a-job-ready-career":
    "digital-marketing-skills-anna-nagar",
  "instagram-reels-strategy-for-small-businesses-in-tamil-nadu-7-ways-to-get-more-customers":
    "instagram-reels-strategy-tamil-nadu",
  "digital-marketing-course-in-chennai-learn-in-demand-skills-and-build-a-successful-career":
    "digital-marketing-course-in-chennai",
};


