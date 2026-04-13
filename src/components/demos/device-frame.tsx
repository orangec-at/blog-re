type DeviceFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export function DeviceFrame({ children, className = "" }: DeviceFrameProps) {
  return (
    <div
      className={`rounded-[28px] border border-zapier-sand bg-zapier-black/95 p-3 shadow-lg ${className}`.trim()}
    >
      <div className="flex items-center gap-2 px-2 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <div className="overflow-hidden rounded-[20px] border border-zapier-sand bg-cream p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
}
