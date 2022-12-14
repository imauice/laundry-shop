import { useState, useEffect } from "react";
import { Data } from "../model/machine";



export default function GetIdlemachine() {
  const [data, setData] = useState<Data[]>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: { "public_key": `${process.env.NEXT_PUBLIC_KEY}` },
      redirect: 'follow'
    };

    fetch(`/api/machinelist?status=idle`, requestOptions)
      .then((res) => res.json())
      .then((data: Data[]) => {
        setData(data)
        setLoading(false)

      })
  }, [])

  if (isLoading) return <p>loading ...</p>
  if (!data) return <p>No data</p>

  return data

}