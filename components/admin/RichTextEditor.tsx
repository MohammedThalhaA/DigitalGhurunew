"use client";

import React, { useRef, useEffect } from "react";
import {
  Heading2,
  Heading3,
  Type,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Minus,
  AlignLeft,
  Sparkles,
  Info,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

/**
 * Converts Markdown string into clean HTML for WYSIWYG display
 */
export function markdownToHtml(md: string): string {
  if (!md) return "<p><br></p>";

  const blocks = md.split(/\n\s*\n/).filter(Boolean);
  if (blocks.length === 0) return "<p><br></p>";

  const htmlBlocks = blocks.map((block) => {
    const trimmed = block.trim();

    // H2
    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace(/^##\s+/, "");
      return `<h2>${formatInline(text)}</h2>`;
    }

    // H3
    if (trimmed.startsWith("### ")) {
      const text = trimmed.replace(/^###\s+/, "");
      return `<h3>${formatInline(text)}</h3>`;
    }

    // Horizontal Rule
    if (trimmed === "---" || trimmed === "***") {
      return "<hr>";
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      const text = trimmed.replace(/^>\s*/gm, "");
      return `<blockquote>${formatInline(text)}</blockquote>`;
    }

    // Unordered List (- or *)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items = trimmed
        .split(/\n/)
        .map((l) => l.replace(/^[-*]\s+/, "").trim())
        .filter(Boolean);
      return `<ul>${items.map((i) => `<li>${formatInline(i)}</li>`).join("")}</ul>`;
    }

    // Numbered List
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed
        .split(/\n/)
        .map((l) => l.replace(/^\d+\.\s+/, "").trim())
        .filter(Boolean);
      return `<ol>${items.map((i) => `<li>${formatInline(i)}</li>`).join("")}</ol>`;
    }

    // Paragraph
    return `<p>${formatInline(trimmed)}</p>`;
  });

  return htmlBlocks.join("\n");
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
}

/**
 * Converts HTML content from contentEditable into clean Markdown for storage
 */
export function htmlToMarkdown(html: string): string {
  if (!html) return "";

  const md = html
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n")
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n\n## $1\n\n")
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, "\n\n> $1\n\n")
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (m, list) => {
      const items = [...list.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(
        (x) => `- ${cleanInlineText(x[1])}`
      );
      return "\n\n" + items.join("\n") + "\n\n";
    })
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (m, list) => {
      const items = [...list.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(
        (x, i) => `${i + 1}. ${cleanInlineText(x[1])}`
      );
      return "\n\n" + items.join("\n") + "\n\n";
    })
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n\n$1\n\n")
    .replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, "\n\n$1\n\n")
    .replace(/<hr[^>]*>/gi, "\n\n---\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return md;
}

function cleanInlineText(text: string): string {
  return text
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/**
 * Sanitizes rich HTML pasted from MS Word or Google Docs
 */
function sanitizePastedHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<link[^>]*>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/class="[^"]*"/gi, "")
    .replace(/style="[^"]*"/gi, "")
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1")
    .replace(/<font[^>]*>([\s\S]*?)<\/font>/gi, "$1");
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing or paste your content here...",
  minHeight = "360px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChangeRef = useRef(false);

  // Sync incoming value to innerHTML on mount or external reset
  useEffect(() => {
    if (editorRef.current && !isInternalChangeRef.current) {
      const currentMd = htmlToMarkdown(editorRef.current.innerHTML);
      if (currentMd !== value.trim()) {
        editorRef.current.innerHTML = markdownToHtml(value);
      }
    }
  }, [value]);

  const triggerChange = () => {
    if (!editorRef.current) return;
    isInternalChangeRef.current = true;
    const md = htmlToMarkdown(editorRef.current.innerHTML);
    onChange(md);
    setTimeout(() => {
      isInternalChangeRef.current = false;
    }, 100);
  };

  const exec = (command: string, value: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    triggerChange();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text/plain");
    const html = e.clipboardData.getData("text/html");

    // Case 1: Pasted markdown text with symbols (##, -, **)
    if (
      text &&
      (/^#{1,6}\s/m.test(text) ||
        /\*\*.*?\*\*/m.test(text) ||
        /^[-*]\s/m.test(text) ||
        /^\d+\.\s/m.test(text) ||
        /^>\s/m.test(text))
    ) {
      e.preventDefault();
      const convertedHtml = markdownToHtml(text);
      document.execCommand("insertHTML", false, convertedHtml);
      triggerChange();
      return;
    }

    // Case 2: Pasted rich text from Word or Google Docs
    if (html && (html.includes("<h") || html.includes("<ul") || html.includes("<b") || html.includes("<strong"))) {
      e.preventDefault();
      const cleanHtml = sanitizePastedHtml(html);
      document.execCommand("insertHTML", false, cleanHtml);
      triggerChange();
      return;
    }

    // Case 3: Regular text with multiple paragraphs
    if (text && text.includes("\n")) {
      e.preventDefault();
      const paragraphs = text
        .split(/\r?\n\s*\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);
      const htmlToInsert = paragraphs.map((p) => `<p>${p}</p>`).join("");
      document.execCommand("insertHTML", false, htmlToInsert || `<p>${text}</p>`);
      triggerChange();
    }
  };

  const handleAutoSplit = () => {
    if (!editorRef.current) return;
    const rawText = editorRef.current.innerText.trim();
    if (!rawText) return;

    // Split sentences into groups of 2-3 sentences per paragraph
    const sentences = rawText.split(/(?<=[.!?])\s+/).filter(Boolean);
    const paragraphs: string[] = [];
    let currentChunk: string[] = [];

    sentences.forEach((sentence, idx) => {
      currentChunk.push(sentence);
      if (currentChunk.length >= 2 || idx === sentences.length - 1) {
        paragraphs.push(`<p>${currentChunk.join(" ")}</p>`);
        currentChunk = [];
      }
    });

    editorRef.current.innerHTML = paragraphs.join("");
    triggerChange();
  };

  return (
    <div className="rounded-2xl border border-ink-200 overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-blue/40 focus-within:border-brand-blue transition-all">
      {/* ── Visual WYSIWYG Toolbar ── */}
      <div className="bg-ink-50/90 border-b border-ink-200 p-2.5 flex flex-wrap items-center justify-between gap-2 select-none">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400 mr-1 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-brand-blue" />
            Format Tools:
          </span>

          {/* Heading 2 */}
          <button
            type="button"
            onClick={() => exec("formatBlock", "<h2>")}
            title="Make selected line a Main Section Heading"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-800 text-xs font-bold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
          >
            <Heading2 className="h-3.5 w-3.5 text-brand-blue" />
            <span>Heading</span>
          </button>

          {/* Heading 3 */}
          <button
            type="button"
            onClick={() => exec("formatBlock", "<h3>")}
            title="Make selected line a Subheading"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-800 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
          >
            <Heading3 className="h-3.5 w-3.5 text-brand-blue" />
            <span>Subheading</span>
          </button>

          {/* Normal Paragraph */}
          <button
            type="button"
            onClick={() => exec("formatBlock", "<p>")}
            title="Convert line back to Normal Body Text"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-600 text-xs font-medium hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
          >
            <Type className="h-3.5 w-3.5" />
            <span>Normal Text</span>
          </button>

          <div className="h-5 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Bold */}
          <button
            type="button"
            onClick={() => exec("bold")}
            title="Make selected text bold (Ctrl+B)"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-800 text-xs font-bold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
          >
            <Bold className="h-3.5 w-3.5" />
            <span>Bold</span>
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => exec("italic")}
            title="Make selected text italic (Ctrl+I)"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-700 text-xs italic hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
          >
            <Italic className="h-3.5 w-3.5" />
            <span>Italic</span>
          </button>

          <div className="h-5 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            title="Convert lines to a Bulleted List with real bullet dots"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-800 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
          >
            <List className="h-3.5 w-3.5 text-emerald-600" />
            <span>Bullet Points</span>
          </button>

          {/* Numbered List */}
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            title="Convert lines to a Numbered List (1, 2, 3)"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-800 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
          >
            <ListOrdered className="h-3.5 w-3.5 text-indigo-600" />
            <span>Numbered List</span>
          </button>

          {/* Callout Quote */}
          <button
            type="button"
            onClick={() => exec("formatBlock", "<blockquote>")}
            title="Format line as an eye-catching Quote Box"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-800 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
          >
            <Quote className="h-3.5 w-3.5 text-amber-600" />
            <span>Callout Quote</span>
          </button>

          {/* Divider */}
          <button
            type="button"
            onClick={() => exec("insertHorizontalRule")}
            title="Insert a horizontal separator line"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-700 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
          >
            <Minus className="h-3.5 w-3.5" />
            <span>Divider</span>
          </button>
        </div>

        {/* Auto Split Big Paragraphs */}
        <button
          type="button"
          onClick={handleAutoSplit}
          title="If you pasted a single large wall of text, click here to split it into clean spaced paragraphs"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-brand-blue/30 text-brand-blue text-xs font-bold hover:bg-brand-blue/10 transition-all shadow-xs shrink-0"
        >
          <AlignLeft className="h-3.5 w-3.5 text-brand-blue" />
          <span>Auto-Split Paragraphs</span>
        </button>
      </div>

      {/* ── Instructional Tip Bar ── */}
      <div className="bg-blue-50/50 border-b border-blue-100/60 px-4 py-2 flex items-center justify-between text-xs text-ink-600">
        <span className="flex items-center gap-2">
          <Info className="h-4 w-4 text-brand-blue shrink-0" />
          <span>
            <strong>Visual WYSIWYG Mode:</strong> What you see here is exactly what visitors see on the site. Bold looks bold, headings look big, and bullet points show real dots — no raw code or symbols!
          </span>
        </span>
      </div>

      {/* ── WYSIWYG Content Editable Canvas ── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={triggerChange}
        onBlur={triggerChange}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="w-full bg-white p-6 sm:p-8 text-ink-800 font-body text-base leading-relaxed focus:outline-none overflow-y-auto cursor-text
          [&>h2]:font-heading [&>h2]:font-black [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:text-ink-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-ink-100
          [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:text-ink-900 [&>h3]:mt-6 [&>h3]:mb-2.5
          [&>p]:text-base [&>p]:sm:text-lg [&>p]:leading-relaxed [&>p]:text-ink-700 [&>p]:mb-4
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:my-4 [&>ul]:text-ink-700 [&>ul]:text-base [&>ul]:sm:text-lg
          [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:my-4 [&>ol]:text-ink-700 [&>ol]:text-base [&>ol]:sm:text-lg
          [&>blockquote]:p-5 [&>blockquote]:rounded-2xl [&>blockquote]:bg-gradient-to-r [&>blockquote]:from-brand-blue/5 [&>blockquote]:to-transparent [&>blockquote]:border-l-4 [&>blockquote]:border-brand-blue [&>blockquote]:text-ink-800 [&>blockquote]:italic [&>blockquote]:text-base [&>blockquote]:sm:text-lg [&>blockquote]:my-6
          [&>hr]:my-8 [&>hr]:border-ink-200
          [&>strong]:font-bold [&>strong]:text-ink-900
          [&>b]:font-bold [&>b]:text-ink-900
          empty:before:content-[attr(data-placeholder)] empty:before:text-ink-300 empty:before:pointer-events-none"
      />
    </div>
  );
}
