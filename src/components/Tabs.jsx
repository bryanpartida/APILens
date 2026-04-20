import { EyeIcon, GridIcon } from "./Icons";

const tabs = [
  { id: "data", label: "Data View", icon: GridIcon },
  { id: "preview", label: "UI Preview", icon: EyeIcon },
];

function Tabs({ activeTab, onChange }) {
  return (
    <div className="flex w-full min-w-0 flex-col rounded-[1.6rem] border border-white/8 bg-[#0a1126]/90 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:flex-row">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex min-w-0 flex-1 items-center justify-center gap-3 rounded-[1.15rem] px-4 py-3 text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 sm:py-4 sm:text-lg ${
              isActive
                ? "bg-cyan-400/18 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(0,217,255,0.12)]"
                : "text-slate-400 hover:bg-white/4 hover:text-slate-200"
            }`}
          >
            <Icon className="h-5 w-5" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
