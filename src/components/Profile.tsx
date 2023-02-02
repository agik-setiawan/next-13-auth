"use client";

import { useSession } from "next-auth/react";

export default function Profile(){
    const {data} = useSession();
    return(
        <>
        <h1 className="font-bold text-3xl">{data?.user?.name}</h1>
        </>
    )
}