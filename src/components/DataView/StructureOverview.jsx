function TreeNode({ node, depth = 0 }) {
  return (
    <li className="min-w-0">
      <div className="flex min-w-0 flex-wrap items-start gap-x-3 gap-y-1">
        <span className="font-mono text-sm text-slate-200">{node.label}</span>
        {node.summary ? (
          <span className="break-words text-sm text-slate-500">{node.summary}</span>
        ) : null}
      </div>

      {node.children?.length ? (
        <ul className="mt-3 min-w-0 space-y-3 border-l border-white/8 pl-4">
          {node.children.map((child) => (
            <TreeNode
              key={`${node.label}-${child.label}-${depth}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function StructureOverview({ structure }) {
  return (
    <section className="panel-inset w-full min-w-0 overflow-hidden p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-[1.2rem] font-medium text-slate-200">Structure Overview</h3>
        <p className="mt-1 text-sm text-slate-500">
          A simplified tree of the JSON shape so developers can understand nested
          objects and arrays quickly.
        </p>
      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-md border border-white/6 bg-zinc-950 p-4">
        <ul className="min-w-0 space-y-3">
          <TreeNode node={structure} />
        </ul>
      </div>
    </section>
  );
}

export default StructureOverview;
