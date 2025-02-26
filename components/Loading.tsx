export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="cube-loader">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="cube-block" />
        ))}
      </div>
    </div>
  );
}
