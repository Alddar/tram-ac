"use client";

import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select, { components } from "react-select";

const CustomOption = ({ children, ...props }: any) => {
  // eslint-disable-next-line no-unused-vars
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return <components.Option {...newProps}>{children}</components.Option>;
};

export default function StationSelect({
  options,
}: {
  options: { value: string[]; label: string }[];
}) {
  const router = useRouter();

  return (
    <main>
      <Select
        options={options}
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        onChange={(option) =>
          router.push(
            "/departures?" +
              new URLSearchParams([...(option?.value.map((id) => ["ids", id || ""]) || []), ["stop_name", option?.label]])
          )
        }
        components={{ Option: CustomOption }}
      ></Select>
    </main>
  );
}
