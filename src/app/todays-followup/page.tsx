
import { FollowUpList } from '@/components/enquiries/follow-up-list';
import { enquiries } from '@/lib/mock-data';

export default function TodaysFollowupPage() {
  return (
    <FollowUpList
      enquiries={enquiries}
      filter="today"
      title="Today's Follow-ups"
      description="All follow-up tasks scheduled for today."
    />
  );
}
