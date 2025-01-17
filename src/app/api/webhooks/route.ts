import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/actions/user.action'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type

  if(eventType === "user.created"){
    const {id, username, email_addresses, image_url} = evt.data
    console.log("User details", id, username, email_addresses[0].email_address);

    const userCreated = await createUser({
      clerkId: id,
      username: username || "MyUser",
      email: email_addresses[0].email_address,
      picture: image_url,
    });

    return NextResponse.json({message: "UserCreated", userCreated});
  }

  if(eventType === "user.deleted"){
    const {id} = evt.data
    console.log("Deleted user details", id);

    await deleteUser({ clerkId:id! })

    NextResponse.json("Deleted!");
  }

  if(eventType === "user.updated"){
    const { id, username, email_addresses, image_url } = evt.data
    console.log("Updated user details", id);

    await updateUser({
      clerkId: id,
      username: username || "MyUser",
      email: email_addresses[0].email_address,
      picture: image_url,
    })
  }

  return new Response("Everything OK!", { status: 200 })
}