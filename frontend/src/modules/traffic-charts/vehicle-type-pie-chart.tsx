import { useEffect, useMemo, useState } from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VehicleTypeData } from "./traffic-charts";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function VehicleTypePieChart({
    vehicleTypeData,
    date,
}: {
    vehicleTypeData: VehicleTypeData[];
    date: DateRange | undefined;
}) {
    const id = "pie-interactive";
    const [activeVehicleType, setActiveVehicleType] = useState(vehicleTypeData[0].vehicleType);
    const [displayDate, setDisplayDate] = useState<string | undefined>(undefined);

    const activeIndex = useMemo(
        () => vehicleTypeData.findIndex((item) => item.vehicleType === activeVehicleType),
        [activeVehicleType, vehicleTypeData]
    );
    const vehicleTypes = useMemo(() => vehicleTypeData.map((item) => item.vehicleType), [vehicleTypeData]);

    const chartConfig = vehicleTypeData.reduce((acc, curr, index) => {
        acc[curr.vehicleType as keyof typeof acc] = {
            label: curr.vehicleType,
            color: `hsl(var(--chart-${index + 1}))`,
        };
        return acc;
    }, {} as ChartConfig);

    useEffect(() => {
        if (date?.from && date?.to) {
            setDisplayDate(`${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`);
        } else {
            setDisplayDate("All Time");
        }
    }, [vehicleTypeData]);

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Traffic Distribution by Vehicle Type</CardTitle>
                    <CardDescription>{displayDate}</CardDescription>
                </div>
                <Select value={activeVehicleType} onValueChange={setActiveVehicleType}>
                    <SelectTrigger className="ml-auto h-7 w-[160px] rounded-lg pl-2.5" aria-label="Select a value">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {vehicleTypes.map((key, index) => {
                            const config = chartConfig[key as keyof typeof chartConfig];

                            if (!config) {
                                return null;
                            }

                            return (
                                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-sm"
                                            style={{
                                                backgroundColor: `var(--chart-${index + 1})`,
                                            }}
                                        />
                                        {config?.label}
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-[350px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={vehicleTypeData.map((item, index) => ({
                                ...item,
                                fill: `var(--chart-${index + 1})`,
                            }))}
                            dataKey="count"
                            nameKey="vehicleType"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {vehicleTypeData[activeIndex].count.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {vehicleTypeData[activeIndex].vehicleType}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
