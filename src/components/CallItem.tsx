import { useUIStore } from "../store/uiStore";
import type { Call } from "../types";

type CallItemProps = { call: Call }

export function CallItem({ call }: CallItemProps) {
  const setSelectedCall = useUIStore((s) => s.setSelectedCall);

  return (
    <div
      onClick={() => setSelectedCall(call)}
      className="p-2 border-b cursor-pointer"
    >
      <div>{call.phone}</div>
      <div>{call.status}</div>
    </div>
  );
}
