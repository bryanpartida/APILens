import AnalyzeButton from "./AnalyzeButton";

function ActionBar({ onAnalyze }) {
  return (
    <div className="flex w-full min-w-0">
      <AnalyzeButton onClick={onAnalyze} />
    </div>
  );
}

export default ActionBar;
