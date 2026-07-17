import { useOffers } from "@/lib/candidate/hooks";

import OfferCard from "./OfferCard";

export default function OfferList() {
  const { data, isLoading } = useOffers();

  if (isLoading) return <div>Loading offers...</div>;

  if (!data?.length)
    return <div className="rounded-xl border p-12 text-center">No offers received.</div>;

  return (
    <div className="space-y-5">
      {data.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
