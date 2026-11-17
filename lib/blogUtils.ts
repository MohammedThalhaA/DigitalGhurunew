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

  // If content contains HTML tags:
  if (/<(p|h1|h2|h3|h4|ul|ol|blockquote|hr|div|article)[\s>]/i.test(text)) {
    // Ensure any <h1> tags inside blog body become <h2> so the page title remains the sole <h1>
    text = text.replace(/<h1(\s[^>]*)?>([\s\S]*?)<\/h1>/gi, "<h2$1>$2</h2>");
    // 1. Convert spans with large heading styles into real <h2>
    text = text.replace(/<div>\s*<span[^>]*font-size:\s*1\.875rem[^>]*>([\s\S]*?)<\/span>\s*<\/div>/gi, "<h2>$1</h2>");
    // 2. Strip browser metadata attributes like data-path-to-node
    text = text.replace(/\sdata-[a-z0-9-]+="[^"]*"/gi, "");
    // 3. Clean malformed headings
    return cleanMalformedHeadings(text);
  }

  // Otherwise convert standard Markdown to HTML
  return markdownToHtml(text);
}

