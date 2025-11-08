import React from 'react';
import Link from "next/link";

export default function Index (params) {
  return (
    <div>
      <h1>SUP - Sistema Único de Pets</h1>
      <button><Link href = '/auth/Login'>Login</Link></button>
      <button><Link href = '/auth/SignUp'>SignUp</Link></button>
    </div>
  )
}
