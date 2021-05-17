import React from "react";
import MainLayout from "../src/components/layout/index";
import ShipmentTracking from "../src/components/shipment/index";
import Head from "next/head";

export default function TrackShipmentPage() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: Track Shipment</title>
        <meta property="og:title" content="Nutrisafe: Track Shipment" key="title" />
      </Head>
      <ShipmentTracking />
    </MainLayout>
  );
}
