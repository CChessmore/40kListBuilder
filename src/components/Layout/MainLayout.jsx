import Panel from "./Panel";

export default function MainLayout({ armyBar, left, center, right, assistant}) {
    return (
      <div className="h-screen w-screen flex flex-col bg-gray-700 p-4">
        <div className="mb-4">
          <Panel title="Army Controls">{armyBar}</Panel>
        </div>
      <div className="h-screen w-full grid grid-cols-16 gap-4 bg-gray-700 p-4 overflow-auto">
        <div className="col-span-3">
          <Panel title="Available Units">{left}</Panel>
        </div>
        <div className="col-span-5">
          <Panel title="Your Army">{center}</Panel>
        </div>
        <div className="col-span-4">
          <Panel title="Unit Details">{right}</Panel>
        </div>
        <div className="col-span-4">
          <Panel title="AI Assistant (Coming Soon)" className="text-gray-300 italic">
            {assistant ?? <p>Under construction...</p>}
          </Panel>
        </div>
      </div>
    </div>
    )
}