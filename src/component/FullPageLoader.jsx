
const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="h-14 w-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
    </div>
  );
};

export default FullPageLoader;
