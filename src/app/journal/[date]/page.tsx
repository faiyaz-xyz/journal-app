"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format, parseISO, isValid } from "date-fns";

interface JournalPageProps {
  params: { date: string | Promise<string> };
}

export default function JournalDayPage({ params }: JournalPageProps) {
  // Since params.date might be Promise, unwrap if needed
  const [date, setDate] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    // unwrap params.date if Promise
    Promise.resolve(params.date).then((realDate) => {
      setDate(realDate);
    });
  }, [params]);

  if (!date || !isValid(parseISO(date))) {
    // invalid or loading date fallback
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading or Invalid Date...
      </div>
    );
  }

  const formattedDate = format(parseISO(date), "MMMM d, yyyy");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // TODO: Auto-save content here
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md border-b border-gray-300">
        <h1 className="text-xl font-semibold text-gray-900">{formattedDate}</h1>
        <button
          onClick={() => router.push("/journal")}
          className="text-sm px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </header>

      {/* Editor */}
      <main className="flex-1 overflow-auto bg-white p-8">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Start writing your journal here..."
          className="w-full h-full resize-none outline-none font-sans text-lg leading-relaxed text-gray-900"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              #fff 0,
              #fff 29px,
              #ccc 30px,
              #fff 31px
            )`,
            backgroundSize: '100% 31px',
            backgroundPosition: 'left 0 top 0',
            backgroundAttachment: 'local',
            lineHeight: '31px',
            paddingLeft: '12px',
            fontFamily: "'VT323', monospace",
            letterSpacing: '0.05em',
          }}
        />
      </main>
    </div>
  );
}
