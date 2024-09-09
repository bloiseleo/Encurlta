import React from "react";
import { TailSpin } from 'react-loader-spinner';

type Props = {
  value: string;
  loading?: boolean;
}

export default function Submit({ value, loading = false }: Props) {
  return loading ? <div className={"w-full bg-green-500 rounded-lg p-2 flex justify-center"}><TailSpin
      visible={loading}
      width={25}
      height={25}
      color={"blue"}/></div> : <input className="bg-green-500 font-sans text-white p-2 rounded-lg" type="submit" value={value} />
}