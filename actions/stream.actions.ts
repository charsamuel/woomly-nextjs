'use server';

import { useAuth } from '@clerk/nextjs';
import { StreamClient } from '@stream-io/node-sdk';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

// Token provider function to create a token for the Stream client
export const tokenProvider = async () => {
  const { userId } = useAuth(); // Get the current user ID from Clerk

  if (!userId) throw new Error('User is not authenticated');
  if (!STREAM_API_KEY) throw new Error('Stream API key is missing');
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);
  const expirationTime = Math.floor(Date.now() / 1000) + 3600; // Token expiration time
  const issuedAt = Math.floor(Date.now() / 1000) - 60; // Issued time

  const token = streamClient.createToken(userId, expirationTime, issuedAt);
  return token;
};
