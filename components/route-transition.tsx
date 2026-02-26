"use client";

import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function RouteTransition({ children }: Props) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-enter">
      {children}
    </div>
  );
}
