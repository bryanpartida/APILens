const tabs = [
  { id: "data", label: "Data View" },
  { id: "preview", label: "UI Preview" },
];

function Tabs({ activeTab, onChange }) {
  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-slate-900/80 p-1">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-cyan-400 text-slate-950"
                : "text-slate-300 hover:bg-white/6 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
