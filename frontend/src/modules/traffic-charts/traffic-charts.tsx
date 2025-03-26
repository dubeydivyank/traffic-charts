import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { getCountryWiseTraffic, getVehicleTypeDistribution } from "@/api/api";
import VehicleTypePieChart from "./vehicle-type-pie-chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import CountryWiseBarChart from "./country-wise-bar-chart";

export interface VehicleTypeData {
    vehicleType: string;
    count: number;
}

export interface CountryTrafficData {
    country: string;
    count: number;
}

const TrafficCharts = () => {
    const [countryWiseTraffic, setCountryWiseTraffic] = useState<CountryTrafficData[]>([]);
    const [vehicleTypeDistribution, setVehicleTypeDistribution] = useState<VehicleTypeData[]>([]);
    const [isLoadingCountryData, setIsLoadingCountryData] = useState(false);
    const [isLoadingVehicleData, setIsLoadingVehicleData] = useState(false);
    const [date, setDate] = React.useState<DateRange | undefined>();
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>("");

    const fetchCountryWiseTraffic = async (startDate: string | null) => {
        setIsLoadingCountryData(true);
        const response = await getCountryWiseTraffic(startDate);
        setCountryWiseTraffic(
            response.map((item: CountryTrafficData) => ({
                ...item,
                count: Number(item.count),
            }))
        );
        setIsLoadingCountryData(false);
    };

    const fetchVehicleTypeDistribution = async (startDate: string | null, endDate: string | null) => {
        setIsLoadingVehicleData(true);
        const response = await getVehicleTypeDistribution(startDate, endDate);
        setVehicleTypeDistribution(
            response.map((item: VehicleTypeData) => ({
                ...item,
                count: Number(item.count),
            }))
        );
        setIsLoadingVehicleData(false);
    };

    useEffect(() => {
        fetchCountryWiseTraffic(null);
    }, []);

    return (
        <div className="container mx-auto  max-w-[800px] p-6 border-1 border-gray-300 rounded-lg bg-white">
            <Tabs
                defaultValue="country-wise"
                className="w-full"
                onValueChange={(value) => {
                    if (value === "vehicle-type") {
                        fetchVehicleTypeDistribution(null, null);
                    } else if (value === "country-wise") {
                        fetchCountryWiseTraffic(null);
                    }
                }}
            >
                <TabsList className="grid w-full grid-cols-2 h-16">
                    <TabsTrigger className="text-lg" value="country-wise">
                        Country-wise Traffic
                    </TabsTrigger>
                    <TabsTrigger className="text-lg" value="vehicle-type">
                        Vehicle type Distribution
                    </TabsTrigger>
                </TabsList>

                {/* Country Wise Traffic */}
                <TabsContent value="country-wise" className="my-4 h-96">
                    {isLoadingCountryData && (
                        <Card>
                            <CardContent>
                                <p>Loading country data...</p>
                            </CardContent>
                        </Card>
                    )}
                    {!isLoadingCountryData && countryWiseTraffic.length > 0 ? (
                        <CountryWiseBarChart
                            countryTrafficData={countryWiseTraffic}
                            fetchCountryWiseTraffic={fetchCountryWiseTraffic}
                            selectedTimeRange={selectedTimeRange}
                            setSelectedTimeRange={setSelectedTimeRange}
                        />
                    ) : (
                        <Card>
                            <CardContent>
                                <p>No country data available</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Vehicle Type Distribution */}
                <TabsContent value="vehicle-type" className=" h-96">
                    <Card className="my-4">
                        <CardContent className="flex flex-row justify-between">
                            <Popover>
                                <PopoverTrigger>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "w-[300px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={1}
                                    />
                                </PopoverContent>
                            </Popover>
                            <Button
                                variant="default"
                                className="cursor-pointer w-1/3"
                                onClick={() =>
                                    fetchVehicleTypeDistribution(
                                        date?.from ? date.from.toISOString() : null,
                                        date?.to ? date.to.toISOString() : null
                                    )
                                }
                            >
                                Search
                            </Button>
                        </CardContent>
                    </Card>

                    {isLoadingVehicleData && (
                        <Card>
                            <CardContent>
                                <p>Loading vehicle type data...</p>
                            </CardContent>
                        </Card>
                    )}

                    {!isLoadingVehicleData && vehicleTypeDistribution.length > 0 ? (
                        <VehicleTypePieChart vehicleTypeData={vehicleTypeDistribution} date={date} />
                    ) : (
                        <Card>
                            <CardContent>
                                <p>No vehicle type data available</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TrafficCharts;
