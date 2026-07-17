import { createFileRoute } from "@tanstack/react-router";

import OfferStats from "@/components/Candidate/offers/OfferStats";
import OfferList from "@/components/Candidate/offers/OfferList";

export const Route = createFileRoute("/Candidates/offers")({
  component: CandidateOffersPage,
});

function CandidateOffersPage() {
  return (
    <div className="space-y-6">
      <OfferStats />

      <OfferList />
    </div>
  );
}
