import { GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reload } from "./reload";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';

export default async function Departures({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let ids = searchParams["ids"] || [];
  if (typeof ids === "string") {
    ids = [ids];
  }

  const headers = new Headers();
  headers.append("X-Access-Token", process.env.API_KEY || "");
  //U854Z2P U854Z1P
  const res = await fetch(
    "https://api.golemio.cz/v2/pid/departureboards?" +
      new URLSearchParams(
        ids.map((id) => ["ids[]", id])
      ),
    {
      headers,
      next: {
        revalidate: 30,
      },
    }
  );
  const departures = await res.json();

  return (
    <main className=" min-h-screen flex justify-center">
      <div className="grid custom-grid mt-5 w-1/2">
        {departures.departures.map((departure: any) => (
          <>
            <span className="text-right">{departure.route.short_name}</span>
            <span className="text-center">➡️ {departure.trip.headsign}</span>
            <span className="px-5">
              in {departure.departure_timestamp.minutes} minutes
            </span>
            <span className="text-right">{departure.trip.is_wheelchair_accessible ? "♿" : ""} {departure.trip.is_air_conditioned ? "❄️" : "🥵"}</span>
          </>
        ))}
      </div>
      <Reload></Reload>
      <Link href="/" className="absolute text-3xl bg-blue-500 hover:bg-blue-800 text-white rounded-full w-16 h-16 left-4 top-4 flex items-center justify-center"><FaArrowLeft></FaArrowLeft></Link>
    </main>
  );
}
