import { useState } from "react";
import ActionBar from "./components/ActionBar";
import DataView from "./components/DataView";
import EmptyState from "./components/EmptyState";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header";
import JsonInput from "./components/JsonInput";
import Tabs from "./components/Tabs";
import UIPreview from "./components/UIPreview";
import sampleJson from "./data/sampleJson";
import { safeParseJson } from "./utils/parseJson";

function App() {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState(undefined);
  const [activeTab, setActiveTab] = useState("data");
  const [error, setError] = useState("");

  const handleLoadSample = () => {
    setInput(JSON.stringify(sampleJson, null, 2));
    setError("");
  };

  const handleAnalyze = () => {
    const result = safeParseJson(input);

    if (result.error) {
      setParsedData(undefined);
      setError(result.error);
      return;
    }

    setParsedData(result.data);
    setActiveTab("data");
    setError("");
  };

  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Header />

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <JsonInput value={input} onChange={setInput} />
            <ActionBar onLoadSample={handleLoadSample} onAnalyze={handleAnalyze} />
            <ErrorMessage message={error} />
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/55 p-5 sm:p-6">
            {parsedData === undefined ? (
              <EmptyState />
            ) : (
              <div className="space-y-5">
                <Tabs activeTab={activeTab} onChange={setActiveTab} />
                {activeTab === "data" ? (
                  <DataView data={parsedData} />
                ) : (
                  <UIPreview data={parsedData} />
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
