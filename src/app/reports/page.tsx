'use client';

import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { enquiries } from '@/lib/mock-data';
import { EnquirySource, EnquiryStatus, EnquiryType } from '@/lib/types';

export default function ReportsPage() {
  const sourceData = (['Website', 'Referral', 'Advertisement', 'Other'] as EnquirySource[]).map(source => ({
    name: source,
    total: enquiries.filter(e => e.source === source).length,
  }));

  const statusData = (['New', 'In Progress', 'Closed-Won', 'Closed-Lost'] as EnquiryStatus[]).map(status => ({
    name: status,
    total: enquiries.filter(e => e.status === status).length,
    fill: `var(--color-${status.toLowerCase().replace(' ', '-')})`,
  }));

  const typeData = (['Sales', 'Support', 'General Inquiry'] as EnquiryType[]).map(type => ({
    name: type,
    total: enquiries.filter(e => e.type === type).length,
  }));

  const chartConfig = {
    total: {
      label: 'Total',
    },
    'closed-won': { label: 'Closed-Won', color: 'hsl(var(--chart-2))' },
    'closed-lost': { label: 'Closed-Lost', color: 'hsl(var(--destructive))' },
    'in-progress': { label: 'In Progress', color: 'hsl(var(--chart-4))' },
    new: { label: 'New', color: 'hsl(var(--chart-1))' },
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Analytics and insights on your customer enquiries.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Enquiries by Source</CardTitle>
            <CardDescription>Distribution of enquiries from different sources.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sourceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Current status of all enquiries.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                  <Pie data={statusData} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      index,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = 25 + innerRadius + (outerRadius - innerRadius);
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          className="fill-muted-foreground text-xs"
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                        >
                          {statusData[index].name} ({value})
                        </text>
                      )
                    }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Enquiries by Type</CardTitle>
            <CardDescription>Breakdown of enquiries by their type.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={typeData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
