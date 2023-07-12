import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Reload } from './reload';

export default async function Home() {
  const headers = new Headers();
  headers.append('X-Access-Token', process.env.API_KEY || '');
  
    const res = await fetch(
        'https://api.golemio.cz/v2/pid/departureboards?' +
            new URLSearchParams([
                ['ids[]', 'U854Z1P'],
                ['ids[]', 'U854Z2P']
            ]),
        {
            headers,
            next: {
                revalidate: 30
            }
        }
    );
    const departures = await res.json();


    return (
        <main className=" min-h-screen flex justify-center">
            <div className="grid custom-grid mt-5 w-1/2">
            {departures.departures.map((departure: any) => (
                <>
                    <span className='text-right'>{departure.route.short_name}</span>
                    <span className="text-center">➡️ {departure.trip.headsign}</span>
                    <span className='px-5'>in {departure.departure_timestamp.minutes} minutes</span>
                    <span>
                        {departure.trip.is_air_conditioned ? '❄️' : '🥵'}
                    </span>
                </>
            ))}
            </div>
            <Reload></Reload>
        </main>
    );
}
