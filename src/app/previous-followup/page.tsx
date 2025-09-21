
import { FollowUpList } from '@/components/enquiries/follow-up-list';
import { enquiries } from '@/lib/mock-data';

export default function PreviousFollowupPage() {
  return (
    <FollowUpList
      enquiries={enquiries}
      filter="previous"
      title="Previous Follow-ups"
      description="View all past due follow-up tasks."
    />
  );
}
