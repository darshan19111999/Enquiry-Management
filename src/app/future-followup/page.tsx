
import { FollowUpList } from '@/components/enquiries/follow-up-list';
import { enquiries } from '@/lib/mock-data';

export default function FutureFollowupPage() {
  return (
    <FollowUpList
      enquiries={enquiries}
      filter="future"
      title="Future Follow-ups"
      description="View all follow-up tasks scheduled for the future."
    />
  );
}
