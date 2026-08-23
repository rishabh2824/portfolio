import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Drop the compiled PDF here: public/Resume.pdf
const RESUME_PATH = "/Resume.pdf";

export default function ResumeView() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@media (max-width: 767px){ header { display: none !important; } }",
        }}
      />

      {/* Top bar: back (left) + download (right) */}
      <div className="mx-auto w-full max-w-4xl shrink-0 px-4 pt-16 md:pt-24">
        <div className="animate-fade-in-down mb-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <Button asChild>
            <a
              href={RESUME_PATH}
              download
              className="flex gap-2 text-sm transition-colors hover:text-foreground"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-4xl px-2 pb-6 md:px-4 md:pb-12">
        <div className="animate-fade-in aspect-[612/792] w-full overflow-hidden rounded-2xl bg-white shadow-xl">
          <iframe
            src={`${RESUME_PATH}#toolbar=0&navpanes=0&view=FitH`}
            title="Rishabh-Resume"
            className="block h-full w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
