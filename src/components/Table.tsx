interface IProps {
  headers: string[];
  children: React.ReactNode;
}

function Table({ headers, children }: IProps) {
  return (
    <div className="relative text-sm max-w-full" id="customTable">
      <table className=" rounded-2xl overflow-hidden w-full">
        <thead className="bg-[var(--dark-gray)] text-white ">
          <tr>
            <th className="text-start capitalize p-4">#</th>
            {headers.map((header: any, idx: number) => (
              <th key={idx} className="text-start capitalize p-4">
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

export default Table;
