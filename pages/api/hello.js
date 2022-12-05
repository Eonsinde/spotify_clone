// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

// import { getProviders } from "next-auth/react"

// export default async function handler(req, res) {
//   const providers = await getProviders()
//   console.log("Providers", providers)
//   res.end()
// }