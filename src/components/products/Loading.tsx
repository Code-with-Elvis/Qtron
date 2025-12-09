const Loading = () => {
  return (
    <div className="flex-1">
      <div className="skeleton h-6 mb-6"></div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 16 }).map((_, index) => (
          <article key={index} className="skeleton h-48 w-full"></article>
        ))}
      </div>
    </div>
  );
};
export default Loading;
