import { EyeIcon } from "./Icons";

function AnalyzeButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-[1.35rem] bg-cyan-400 px-5 py-3 text-base font-medium text-slate-950 shadow-[0_0_28px_rgba(0,217,255,0.28)] transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 sm:px-6 sm:py-4 sm:text-xl"
    >
      <EyeIcon className="h-5 w-5" />
      Analyze JSON
    </button>
  );
}

export default AnalyzeButton;
