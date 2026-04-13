import VehicleDetailClient from "./VehicleDetailClient";

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  return <VehicleDetailClient vehicleId={Number(params.id)} />;
}
