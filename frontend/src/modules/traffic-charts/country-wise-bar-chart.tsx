import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CountryTrafficData } from "./traffic-charts";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subDays, subMonths } from "date-fns";

export function CountryWiseBarChart({
    countryTrafficData,
    fetchCountryWiseTraffic,
    selectedTimeRange,
    setSelectedTimeRange,
}: {
    countryTrafficData: CountryTrafficData[];
    fetchCountryWiseTraffic: (startDate: string | null) => void;
    selectedTimeRange: string;
    setSelectedTimeRange: (value: string) => void;
}) {
    const chartConfig: ChartConfig = countryTrafficData.reduce((acc, curr, index) => {
        acc[curr.country as keyof typeof acc] = {
            label: curr.country,
            color: `hsl(var(--chart-${index + 1}))`,
        };
        return acc;
    }, {} as ChartConfig);

    const handleDateRangeChange = (value: string) => {
        setSelectedTimeRange(value);
        const endDate = new Date();
        let startDate = null;
        switch (value) {
            case "last30days":
                startDate = subDays(endDate, 30);
                break;
            case "last3months":
                startDate = subMonths(endDate, 3);
                break;
            case "last6months":
                startDate = subMonths(endDate, 6);
                break;
            case "alltime":
            default:
                break;
        }
        fetchCountryWiseTraffic(startDate ? startDate.toISOString() : null);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row justify-between">
                    <CardTitle>Country Wise Traffic Distribution</CardTitle>

                    <Select value={selectedTimeRange} onValueChange={handleDateRangeChange}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Select a time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="alltime">All time</SelectItem>
                                <SelectItem value="last30days">Last 30 days</SelectItem>
                                <SelectItem value="last3months">Last 3 months</SelectItem>
                                <SelectItem value="last6months">Last 6 months</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer className="flex flex-col mx-auto" config={chartConfig}>
                    <BarChart
                        className="h-96"
                        accessibilityLayer
                        data={countryTrafficData.map((item, index) => ({
                            ...item,
                            fill: `var(--chart-${index + 1})`,
                        }))}
                        layout="horizontal"
                        margin={{
                            left: 0,
                        }}
                    >
                        <XAxis
                            dataKey="country"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <YAxis dataKey="count" type="number" />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar dataKey="count" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default CountryWiseBarChart;
