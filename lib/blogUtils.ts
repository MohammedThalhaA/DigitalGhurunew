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
export function renderBlogContentHtml(content: string): string {
  if (!content) return "";
  let text = content.trim();

  // If content contains HTML tags:
  if (/<(p|h1|h2|h3|h4|ul|ol|blockquote|hr|div)[\s>]/i.test(text)) {
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
