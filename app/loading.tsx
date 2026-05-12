export default function Loading() {
  return (
    <main className="loading-screen">
      <div className="loading-core loading-skeleton">
        <p className="eyebrow">Loading</p>
        <h1>Preparing Portfolio</h1>
        <div className="skeleton-lines">
          <span />
          <span />
          <span />
        </div>
      </div>
    </main>
  );
}
