import React from "react";

type Props = {
  value: string;
}

export default function Submit({ value }: Props) {
  return <input className="bg-green-500 font-sans text-white p-2 rounded-lg" type="submit" value={value} />
}