export default function Panel({ title, children, className = "" }) {
    return (
        <div className={`bg-blue-800 rounded-xl shadow p-4 overflow-y-auto ${className}`}>
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}