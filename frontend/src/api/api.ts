import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getCountryWiseTraffic = async (startDate: string | null) => {
    try {
        const response = await apiClient.get("/traffic-data/country-wise-traffic", {
            params: { startDate },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Country-wise Traffic:", error);
        throw error;
    }
};

export const getVehicleTypeDistribution = async (startDate: string | null, endDate: string | null) => {
    try {
        const response = await apiClient.get("/traffic-data/vehicle-type-distribution", {
            params: { startDate, endDate },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Vehicle Type Distribution:", error);
        throw error;
    }
};
