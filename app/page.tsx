import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { cache, useEffect, useState } from "react";
import StationSelect from "./station-select";

export const revalidate = 43200;

const getOptions = cache(async () => {
  const res = await fetch("https://data.pid.cz/stops/json/stops.json", {
    cache: "no-cache",
  });
  const stops = await res.json();
  const options: { value: string[]; label: string }[] = [];

  stops.stopGroups.forEach((stopGroup: any) => { 
    if (
      stopGroup.stops.length > 0 &&
      stopGroup.stops.some((stop: any) =>
        ["P", "0", "B"].some((zone) => stop.zone.includes(zone))
      )
    ) {
      options.push({
        value: stopGroup.stops.flatMap((stop: any) => stop.gtfsIds),
        label: stopGroup.name,
      });
    }
  });

  return options;
});

export default async function Home() {
  const options = await getOptions();

  return (
    <main className="p-12">
      <StationSelect options={options}></StationSelect>
    </main>
  );
}
