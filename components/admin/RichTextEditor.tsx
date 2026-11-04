"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Heading1,
  Heading2,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link2,
  Unlink2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
  RotateCw,
  RemoveFormatting,
  Code,
  PenTool,
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

  // If already full HTML, return as-is
  if (/<(p|h1|h2|h3|h4|ul|ol|blockquote|hr)[\s>]/i.test(md.trim())) {
    return md;
  }

  const blocks = md.split(/\r?\n\s*\r?\n/).filter(Boolean);
  if (blocks.length === 0) return "<p><br></p>";

  const htmlBlocks = blocks.map((block) => {
    const trimmed = block.trim();

    // H1
    if (trimmed.startsWith("# ")) {
      const text = trimmed.replace(/^#\s+/, "");
      return `<h2>${formatInline(text)}</h2>`;
    }

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
        .split(/\r?\n/)
        .map((l) => l.replace(/^[-*]\s+/, "").trim())
        .filter(Boolean);
      return `<ul>${items.map((i) => `<li>${formatInline(i)}</li>`).join("")}</ul>`;
    }

    // Numbered List (1. 2.)
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed
        .split(/\r?\n/)
        .map((l) => l.replace(/^\d+\.\s+/, "").trim())
        .filter(Boolean);
      return `<ol>${items.map((i) => `<li>${formatInline(i)}</li>`).join("")}</ol>`;
    }

    // Regular Paragraph
    return `<p>${formatInline(trimmed)}</p>`;
  });

  return htmlBlocks.join("\n");
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

/**
 * Universal blog content renderer:
 * Ensures any stored blog content (whether Markdown or HTML) renders as clean, semantic HTML.
 */
export function renderBlogContentHtml(content: string): string {
  if (!content) return "";
  const trimmed = content.trim();

  // If content contains HTML tags, return cleaned HTML
  if (/<(p|h1|h2|h3|h4|ul|ol|blockquote|hr|div)[\s>]/i.test(trimmed)) {
    return trimmed;
  }

  // Otherwise convert standard Markdown to HTML
  return markdownToHtml(trimmed);
}

/**
 * Sanitizes rich HTML pasted from MS Word, Google Docs, or other websites
 */
function sanitizePastedHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<link[^>]*>/gi, "")
    .replace(/<span[^>]*style="[^"]*font-weight:\s*(?:bold|700)[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, "<strong>$1</strong>")
    .replace(/<span[^>]*style="[^"]*font-style:\s*italic[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, "<em>$1</em>")
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1")
    .replace(/<font[^>]*>([\s\S]*?)<\/font>/gi, "$1")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/<o:p>[\s\S]*?<\/o:p>/gi, "");
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Tell your story... Write or paste your article content here.",
  minHeight = "460px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChangeRef = useRef(false);
  const [viewMode, setViewMode] = useState<"compose" | "html">("compose");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readTimeMinutes, setReadTimeMinutes] = useState(1);

  // Update statistics (word count, reading time)
  const updateStats = useCallback((htmlOrText: string) => {
    // Strip HTML tags for stats
    const text = htmlOrText.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = text.length;
    setWordCount(words);
    setCharCount(chars);
    setReadTimeMinutes(Math.max(1, Math.ceil(words / 200)));
  }, []);

  // Sync incoming value to innerHTML on mount or external reset
  useEffect(() => {
    if (editorRef.current && !isInternalChangeRef.current) {
      const currentHtml = editorRef.current.innerHTML.trim();
      const targetHtml = markdownToHtml(value).trim();
      if (currentHtml !== targetHtml) {
        editorRef.current.innerHTML = targetHtml;
        updateStats(targetHtml);
      }
    }
  }, [value, updateStats]);

  const triggerChange = () => {
    if (!editorRef.current) return;
    isInternalChangeRef.current = true;
    const currentHtml = editorRef.current.innerHTML;
    onChange(currentHtml);
    updateStats(currentHtml);
    setTimeout(() => {
      isInternalChangeRef.current = false;
    }, 100);
  };

  /**
   * Execute document.execCommand with selection preservation
   */
  const exec = (command: string, val: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, val);
    triggerChange();
  };

  /**
   * Format block command (Normal, H2, H3, Blockquote)
   */
  const formatBlock = (tag: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand("formatBlock", false, tag);
    triggerChange();
  };

  /**
   * Insert link with prompt
   */
  const handleInsertLink = () => {
    if (!editorRef.current) return;
    const selection = window.getSelection();
    const selectedText = selection?.toString() || "";

    const url = window.prompt("Enter destination URL (e.g. https://...):", "https://");
    if (!url || url === "https://") return;

    editorRef.current.focus();
    if (!selectedText) {
      document.execCommand("insertHTML", false, `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    } else {
      document.execCommand("createLink", false, url);
    }
    triggerChange();
  };

  /**
   * Smart Paste Handler:
   * Supports ChatGPT Markdown, Word/Google Docs Rich Text, or plain text
   */
  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text/plain");
    const html = e.clipboardData.getData("text/html");

    // Case 1: ChatGPT or Markdown pasted (contains ##, **, -, etc.)
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

    // Case 2: Rich HTML pasted from Word, Google Docs, or Web
    if (html && (html.includes("<h") || html.includes("<p") || html.includes("<ul") || html.includes("<b") || html.includes("<strong"))) {
      e.preventDefault();
      const cleaned = sanitizePastedHtml(html);
      document.execCommand("insertHTML", false, cleaned);
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

  return (
    <div className="rounded-2xl border border-ink-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-blue/30 focus-within:border-brand-blue transition-all overflow-hidden">
      {/* ── BLOGGER / MEDIUM STYLE TOOLBAR ── */}
      <div className="bg-[#f8f9fa] border-b border-ink-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2 select-none sticky top-0 z-20">
        <div className="flex flex-wrap items-center gap-1">
          {/* Mode Switcher: Compose (Visual) vs HTML Mode */}
          <div className="flex items-center bg-ink-200/60 p-0.5 rounded-lg mr-1.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setViewMode("compose")}
              title="Compose View (Visual WYSIWYG)"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === "compose"
                  ? "bg-white text-brand-blue shadow-xs"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              <PenTool className="h-3.5 w-3.5" />
              <span>Compose</span>
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setViewMode("html")}
              title="HTML Code View"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === "html"
                  ? "bg-white text-brand-blue shadow-xs"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>HTML</span>
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Undo / Redo */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec("undo")}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec("redo")}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
          >
            <RotateCw className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Block Formatting Selector */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => formatBlock("<p>")}
              title="Paragraph / Normal Text"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200/80 text-ink-700 text-xs font-medium hover:border-brand-blue hover:text-brand-blue transition-all"
            >
              <Type className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Normal</span>
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => formatBlock("<h2>")}
              title="Heading 1 (Main Section Title)"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200/80 text-ink-800 text-xs font-bold hover:border-brand-blue hover:text-brand-blue transition-all"
            >
              <Heading1 className="h-3.5 w-3.5 text-brand-blue" />
              <span className="hidden sm:inline">Heading</span>
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => formatBlock("<h3>")}
              title="Heading 2 (Subheading)"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200/80 text-ink-800 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue transition-all"
            >
              <Heading2 className="h-3.5 w-3.5 text-brand-blue" />
              <span className="hidden sm:inline">Subhead</span>
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Inline Styles: Bold, Italic, Underline, Strikethrough */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("bold")}
              title="Bold (Ctrl+B)"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors font-bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("italic")}
              title="Italic (Ctrl+I)"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("underline")}
              title="Underline (Ctrl+U)"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors"
            >
              <Underline className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("strikeThrough")}
              title="Strikethrough"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors"
            >
              <Strikethrough className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Lists: Bullets & Numbers */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("insertUnorderedList")}
              title="Bulleted List"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-emerald-600 transition-colors"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("insertOrderedList")}
              title="Numbered List"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-indigo-600 transition-colors"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Blockquote, Divider, Link */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => formatBlock("<blockquote>")}
              title="Quote Callout"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-amber-600 transition-colors"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("insertHorizontalRule")}
              title="Horizontal Divider"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleInsertLink}
              title="Insert Link"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors"
            >
              <Link2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("unlink")}
              title="Remove Link"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-red-600 transition-colors"
            >
              <Unlink2 className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Alignments */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("justifyLeft")}
              title="Align Left"
              className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("justifyCenter")}
              title="Align Center"
              className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("justifyRight")}
              title="Align Right"
              className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
            >
              <AlignRight className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Clear Formatting */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec("removeFormat")}
            title="Clear Formatting"
            className="p-1.5 rounded-lg text-ink-500 hover:bg-ink-200 hover:text-red-600 transition-colors"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── EDITOR BODY ── */}
      {viewMode === "compose" ? (
        /* Visual Medium/Blogger Style Canvas */
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={triggerChange}
          onBlur={triggerChange}
          onPaste={handlePaste}
          data-placeholder={placeholder}
          style={{ minHeight }}
          className="w-full bg-white p-6 sm:p-10 text-ink-800 font-body text-base leading-relaxed focus:outline-none overflow-y-auto cursor-text
            [&>h2]:font-heading [&>h2]:font-black [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:text-ink-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:pt-4 [&>h2]:border-t [&>h2]:border-ink-100 first:[&>h2]:border-t-0 first:[&>h2]:mt-0
            [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:text-ink-900 [&>h3]:mt-6 [&>h3]:mb-2.5
            [&>p]:text-base [&>p]:sm:text-lg [&>p]:leading-[1.8] [&>p]:text-ink-700 [&>p]:mb-5
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2.5 [&>ul]:my-5 [&>ul]:text-ink-700 [&>ul]:text-base [&>ul]:sm:text-lg
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2.5 [&>ol]:my-5 [&>ol]:text-ink-700 [&>ol]:text-base [&>ol]:sm:text-lg
            [&>li]:leading-relaxed [&>li]:pl-1
            [&>blockquote]:p-5 [&>blockquote]:rounded-2xl [&>blockquote]:bg-gradient-to-r [&>blockquote]:from-brand-blue/5 [&>blockquote]:to-transparent [&>blockquote]:border-l-4 [&>blockquote]:border-brand-blue [&>blockquote]:text-ink-800 [&>blockquote]:italic [&>blockquote]:text-base [&>blockquote]:sm:text-lg [&>blockquote]:my-6
            [&>hr]:my-8 [&>hr]:border-ink-200
            [&>strong]:font-bold [&>strong]:text-ink-900
            [&>b]:font-bold [&>b]:text-ink-900
            [&>a]:text-brand-blue [&>a]:underline [&>a]:font-semibold
            empty:before:content-[attr(data-placeholder)] empty:before:text-ink-300 empty:before:pointer-events-none"
        />
      ) : (
        /* Raw HTML / Code View (Blogger style) */
        <textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            updateStats(e.target.value);
          }}
          style={{ minHeight }}
          placeholder="Paste or write raw HTML code here..."
          className="w-full bg-[#1e293b] text-emerald-400 p-6 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y selection:bg-brand-blue/40"
        />
      )}

      {/* ── BOTTOM METRICS & STATUS BAR (MEDIUM STYLE) ── */}
      <div className="bg-[#f8f9fa] border-t border-ink-200 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] font-medium text-ink-500">
        <div className="flex items-center gap-4">
          <span>
            <strong className="text-ink-800 font-semibold">{wordCount}</strong> words
          </span>
          <span>•</span>
          <span>
            <strong className="text-ink-800 font-semibold">{charCount}</strong> characters
          </span>
          <span>•</span>
          <span>
            <strong className="text-ink-800 font-semibold">~{readTimeMinutes}</strong> min read
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-ink-400">
          <span>Highlight text to apply formatting</span>
          <span>•</span>
          <kbd className="px-1.5 py-0.5 rounded bg-ink-200/60 text-ink-700 text-[10px] font-mono">Ctrl+B</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-ink-200/60 text-ink-700 text-[10px] font-mono">Ctrl+I</kbd>
        </div>
      </div>
    </div>
  );
}
