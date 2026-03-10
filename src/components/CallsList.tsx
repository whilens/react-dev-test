import { useMemo } from "react";
import { useCalls } from "../hooks/useCalls";
import { CallItem } from "./CallItem";

export function CallsList() {
  const { callsQuery } = useCalls();

  const items = useMemo(
    () =>
      (callsQuery.data ?? []).map((call) => (
        <CallItem key={call.id} call={call} />
      )),
    [callsQuery.data],
  );

  if (callsQuery.isLoading) return <div>Loading...</div>;
  if (callsQuery.isError) return <div>Error</div>;

  return <div className="h-screen overflow-auto">{items}</div>;
}
