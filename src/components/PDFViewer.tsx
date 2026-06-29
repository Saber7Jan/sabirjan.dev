import * as React from "react";
import { Loader2, ExternalLink, Download } from "lucide-react";

interface PDFViewerProps {
  file: string;
  title?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file, title = "Digital Document" }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // FIXED: Properly handle GitHub Pages base path (/sabirjan.dev/)
  const base = import.meta.env.BASE || '/';
  
  const cleanUrl = (() => {
    let url = file.startsWith("./") ? file.substring(1) : file;
    if (!url.startsWith("http")) {
      const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
      const cleanPath = url.startsWith('/') ? url : `/${url}`;
      url = cleanBase + cleanPath;
    }
    return url;
  })();

  const isPPTX = file.toLowerCase().endsWith(".pptx") || file.toLowerCase().endsWith(".ppt");

  // Build the correct direct iframe source
  let iframeSrc = `${cleanUrl}#toolbar=1&navpanes=1&scrollbar=1`;
 
  if (isPPTX) {
    const origin = window.location.origin + window.location.pathname.split("/#")[0];
    let srcUrl = cleanUrl;  // Use the fixed cleanUrl
    iframeSrc = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(srcUrl)}&wdStartOn=0&wdAr=1.7777777777777777`;
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div
      className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[75vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[650px] bg-zinc-950 border-2 border-white/10 rounded-lg overflow-hidden flex flex-col group select-none transition-all duration-300"
      id="portfolio-pdf-viewer"
    >
      <div className="relative flex-1 w-full h-full bg-zinc-950 flex flex-col justify-center items-center overflow-hidden min-h-0" id="pdf-frame-area">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 z-20" id="pdf-loading-cover">
            <Loader2 className="w-8 h-8 animate-spin text-[#00FF41] mb-2" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">
              Loading document view...
            </span>
          </div>
        )}

        {/* Error fallback */}
        {hasError ? (
          <div className="flex flex-col items-center justify-center p-8 bg-zinc-900 border border-white/10 rounded-lg max-w-md text-center mx-4 z-10">
            <div className="p-3 bg-red-500/10 rounded-full border border-red-500/30 mb-4 text-red-500">
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            </div>
            <h5 className="font-display text-base font-black uppercase text-white">Document Load Failed</h5>
            <p className="font-mono text-[10px] text-zinc-400 mt-2 leading-relaxed">
              Try the "New Tab" or "Download" buttons below.
            </p>
          </div>
        ) : (
          /* Native document frame */
          <iframe
            src={iframeSrc}
            className="w-full h-full border-none select-text pointer-events-auto block bg-zinc-900"
            onLoad={handleLoad}
            onError={handleError}
            title={title}
            id="native-pdf-iframe"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          />
        )}

        {/* Floating Toolbar */}
        <div className="absolute bottom-4 right-4 left-4 sm:left-auto flex items-center justify-between sm:justify-start gap-4 z-10 bg-zinc-900/90 border border-white/15 px-3 py-2 rounded-lg backdrop-blur-md shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse shrink-0" />
            <span className="font-mono text-[9px] uppercase font-black text-zinc-300 tracking-wider truncate max-w-[100px] sm:max-w-[180px]">
              {title}
            </span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 text-[9px] font-mono uppercase font-black text-white hover:text-black hover:bg-[#00FF41] border border-white/10 hover:border-[#00FF41] rounded transition-all cursor-pointer flex items-center gap-1 min-h-[30px]"
              title="Open document in a new tab"
            >
              <ExternalLink className="w-3 h-3" /> New Tab
            </a>
            <a
              href={cleanUrl}
              download
              className="px-2.5 py-1.5 text-[9px] font-mono uppercase font-black text-white hover:text-black hover:bg-[#00FF41] border border-white/10 hover:border-[#00FF41] rounded transition-all cursor-pointer flex items-center gap-1 min-h-[30px]"
              title="Download original file"
            >
              <Download className="w-3 h-3" /> Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};