import { memo } from "react";

interface IProps {
  headers: string[];
  className?: string;
  children: React.ReactNode;
}

function Table({ headers, className = "", children }: IProps) {
  return (
    <div
      className="relative text-sm overflow-x-scroll text-gray-700"
      id="customTable"
      data-aos="fade-up"
    >
      <table
        className={`rounded-2xl overflow-hidden w-full min-w-[850px] lg:min-w-full ${className}`}
      >
        <thead className="bg-[var(--dark-gray)] text-white ">
          <tr>
            <th className="capitalize p-4">#</th>
            {headers.map((header: any, idx: number) => (
              <th key={idx} className="capitalize p-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default memo(Table);
