import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID; // Replace with your GA4 property ID

// Initialize the Analytics Data API client
const analyticsDataClient = new BetaAnalyticsDataClient();

export async function GET() {
  try {
    // Run the report
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "2025-01-01",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "city",
        },
      ],
      metrics: [
        {
          name: "activeUsers",
        },
        {
          name: "eventCount", // Include event count metric
        },
      ],
    });

    // Format the response
    // @ts-ignore
    const reportData = response.rows.map((row: any) => ({
      city: row.dimensionValues[0]?.value,
      activeUsers: row.metricValues[0]?.value,
      eventCount: row.metricValues[1]?.value,
    }));

    // Send the report data as JSON
    return NextResponse.json(reportData, { status: 200 });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
