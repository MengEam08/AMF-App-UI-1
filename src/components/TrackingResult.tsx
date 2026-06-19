import React from "react";
import { View } from "react-native";

import TrackingInfoCard from "./TrackingInfoCard";
import TimelineComponent from "./TimelineComponent";
import ChinaWarehouseCard from "./ChinaWarehouseCard";

type Props = {
  tracking: any;
};

export default function TrackingResult({ tracking }: Props) {
  const showCard = tracking.status !== "CHINA_WAREHOUSE";
  const showImage = tracking.status === "CHINA_WAREHOUSE";

  return (
    <View style={{ gap: 20 }}>

      {showCard && (
        <TrackingInfoCard
          packageId={tracking.packageId}
          barcode={tracking.barcode}
          status={tracking.status}
          volume={tracking.volume}
          cost={tracking.cost}
          destination={tracking.destination}
        />
      )}

      {showImage && (
        <ChinaWarehouseCard
          packageId={tracking.packageId}
          barcode={tracking.barcode}
        />
      )}

      <TimelineComponent
        timelineData={tracking.timeline}
      />

    </View>
  );
}