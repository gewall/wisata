import React, { ReactNode } from "react";

const SectionLayout = ({ children }: { children: ReactNode }) => {
  return <div className="p-4 m-4 bg-white rounded-md">{children}</div>;
};

export default SectionLayout;
