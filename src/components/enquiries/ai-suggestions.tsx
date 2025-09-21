"use client";

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getAiFollowUpSuggestions } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

type AiSuggestionsProps = {
  enquiryDetails: string;
  pastSuccessfulCases: string;
};

export function AiSuggestions({
  enquiryDetails,
  pastSuccessfulCases,
}: AiSuggestionsProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    suggestedFollowUpTimes: string;
    suggestedCommunicationStrategies: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await getAiFollowUpSuggestions({
        enquiryDetails,
        pastSuccessfulCases,
      });
      setSuggestions(result);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!suggestions && !loading && (
        <div className='flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg'>
          <Lightbulb className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-1">Get AI-powered insights</h3>
          <p className="text-muted-foreground mb-4 text-sm max-w-sm">
            Leverage AI to analyze this enquiry and suggest the best way to follow up based on past successful interactions.
          </p>
          <Button onClick={handleGetSuggestions} disabled={loading}>
            <Lightbulb className="mr-2 h-4 w-4" />
            Generate Suggestions
          </Button>
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {error && <p className="text-destructive">{error}</p>}

      {suggestions && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Follow-up Times</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{suggestions.suggestedFollowUpTimes}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Communication Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{suggestions.suggestedCommunicationStrategies}</p>
            </CardContent>
          </Card>
          <Button onClick={handleGetSuggestions} variant="outline" size="sm" disabled={loading}>
            <Lightbulb className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
        </div>
      )}
    </div>
  );
}
