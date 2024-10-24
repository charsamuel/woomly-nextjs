'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useGetCallById } from '@/hooks/useGetCallById';
import Alert from '@/components/Alert';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';

const MeetingPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined; // `id` could be undefined
  const { isLoaded, user } = useUser();
  
  // Only call useGetCallById if `id` is defined
  const { call, isCallLoading } = id ? useGetCallById(id) : { call: null, isCallLoading: false };
  
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Return early if `id` is undefined
  if (!id) {
    return <p className="text-center text-3xl font-bold text-black">Invalid Meeting ID</p>;
  }

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) return (
    <p className="text-center text-3xl font-bold text-black">
      Call Not Found
    </p>
  );

  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
