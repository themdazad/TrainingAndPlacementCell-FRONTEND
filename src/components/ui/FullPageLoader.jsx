import { Spinner } from '@heroui/react';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <Spinner
          size="lg"
          color="primary"
          classNames={{
            circle1: 'border-b-blue-600',
            circle2: 'border-b-blue-600',
          }}
        />
        <p className="text-sm text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
