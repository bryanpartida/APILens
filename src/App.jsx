import { useMemo, useState } from "react";
import DataView from "./components/DataView/DataView.jsx";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import JsonInput from "./components/JsonInput";
import Tabs from "./components/Tabs";
import UIPreview from "./components/UIPreview/UIPreview.jsx";
import sampleJson from "./data/sampleJson";
import { analyzeJson } from "./utils/jsonAnalysis";
import { safeParseJson } from "./utils/parseJson";
import { choosePrimaryCollection } from "./utils/previewDetection";

function App() {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState(undefined);
  const [activeTab, setActiveTab] = useState("data");
  const [error, setError] = useState("");
  const [selectedCollectionPath, setSelectedCollectionPath] = useState(null);
  const [selectedPreviewCollectionPath, setSelectedPreviewCollectionPath] = useState(null);
  const isAnalyzed = parsedData !== undefined;
  const analysis = useMemo(
    () => (parsedData === undefined ? null : analyzeJson(parsedData)),
    [parsedData],
  );
  const primaryCollection = useMemo(
    () => (analysis ? choosePrimaryCollection(parsedData, analysis.collections) : null),
    [analysis, parsedData],
  );

  const handleLoadSample = () => {
    setInput(JSON.stringify(sampleJson, null, 2));
    setError("");
  };

  const handleAnalyze = () => {
    const result = safeParseJson(input);

    if (result.error) {
      setParsedData(undefined);
      setSelectedCollectionPath(null);
      setSelectedPreviewCollectionPath(null);
      setError(result.error);
      return;
    }

    const nextAnalysis = analyzeJson(result.data);
    const nextPrimaryCollection = choosePrimaryCollection(
      result.data,
      nextAnalysis.collections,
    );
    const nextPreviewCollections = nextAnalysis.collections.filter(
      (collection) => collection.kind === "array-of-objects",
    );

    setParsedData(result.data);
    setSelectedCollectionPath(
      nextPrimaryCollection?.path || nextAnalysis.collections[0]?.path || null,
    );
    setSelectedPreviewCollectionPath(
      (nextPrimaryCollection?.kind === "array-of-objects"
        ? nextPrimaryCollection.path
        : null) ||
        nextPreviewCollections[0]?.path ||
        null,
    );
    setActiveTab("data");
    setError("");
  };

  return (
    <main id="top" className="min-h-screen overflow-x-hidden text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] min-w-0 flex-col gap-6 px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
        <Header compact={isAnalyzed} />

        <section id="workspace" className="min-w-0 space-y-4 pb-10">
          <div
            className={`mx-auto w-full min-w-0 transition-all duration-500 ease-out ${
              isAnalyzed ? "max-w-none" : "max-w-5xl"
            }`}
          >
            <JsonInput
              value={input}
              onChange={setInput}
              onLoadSample={handleLoadSample}
              onAnalyze={handleAnalyze}
              compact={isAnalyzed}
            />
            <ErrorMessage message={error} />
          </div>

          {isAnalyzed ? (
            <div className="glass-panel w-full min-w-0 p-4 transition-all duration-500 ease-out sm:p-5 lg:p-6">
              <div className="min-w-0 space-y-5">
                <Tabs activeTab={activeTab} onChange={setActiveTab} />
                <div className="min-w-0">
                  {analysis
                    ? activeTab === "data"
                      ? (
                        <DataView
                          analysis={analysis}
                          selectedCollectionPath={selectedCollectionPath}
                          onSelectCollectionPath={setSelectedCollectionPath}
                          primaryCollection={primaryCollection}
                        />
                      )
                      : (
                        <UIPreview
                          analysis={analysis}
                          selectedCollectionPath={selectedPreviewCollectionPath}
                          onSelectCollectionPath={setSelectedPreviewCollectionPath}
                          primaryCollection={primaryCollection}
                        />
                      )
                    : null}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <Footer />
      </div>
    </main>
  );
}

export default App;
