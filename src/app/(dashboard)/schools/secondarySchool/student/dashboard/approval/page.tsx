// app/approval/page.tsx
import { leaveRequests } from "./approval-data";
import ApprovalClient from "./_components/approval-client";


export default function ApprovalPage() {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 px-6 py-6">
      <ApprovalClient requests={leaveRequests} />
    </div>
  );
}