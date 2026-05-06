import { EyeIcon } from "./Icons";

function AnalyzeButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-md bg-lime-300 px-5 py-3 font-mono text-base font-semibold text-zinc-950 shadow-[0_0_24px_rgba(163,230,53,0.16)] transition hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-300/50 sm:px-6 sm:py-4"
    >
      <EyeIcon className="h-5 w-5" />
      Analyze JSON
    </button>
  );
}

export default AnalyzeButton;
