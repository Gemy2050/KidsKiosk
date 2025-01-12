import { memo } from "react";

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-aos="fade-down"
      className="flex justify-between items-center bg-[var(--dark-gray)] text-white p-2 md:p-3 lg:px-5 rounded-2xl"
    >
      {children}
    </div>
  );
}

export default memo(PageTitle);
