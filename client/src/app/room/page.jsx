import { Suspense } from "react";
import RoomPageContent from "../components/Room/RoomPageContent";
import Loader from "@/components/ui/loader";

export default function RoomPage() {
  return (
    <Suspense fallback={<Loader />}>
      <RoomPageContent />
    </Suspense>
  );
}
