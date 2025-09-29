
// import dynamic from "next/dynamic";
import Tobbar from "../_components/Tobbar";
// import Link from "next/link";
import AccessManeger from "../_components/manegerScreenCm/AccessManeger";

// const PolygonPreviewMap = dynamic(() => import("../_components/UserLoc"), {
//   ssr: false,
// });

export default function AttendPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex flex-col">
      <Tobbar />

      {/* کانتینر وسط */}
      <AccessManeger />
    </div>
  );
}
