import { NextRequest, NextResponse } from 'next/server';
import { AccessToken, type AccessTokenOptions, type VideoGrant } from 'livekit-server-sdk';
import { RoomAgentDispatch, RoomConfiguration } from '@livekit/protocol';

// interface FormValues {
//   apiKey?: string;
//   apiName?: string;
//   secretKey?: string;
//   urlKey?: string;
//   instruction?: string;
//   voiceStyle1?: string;
//   voiceStyle2?: string;
// }

interface AgentToAgentData {
  voiceStyle1?: string;
  voiceStyle2?: string;
  [key: string]: unknown;
}

interface UserPlaygroundData {
  role?: {
    agent_name?: string;
    prompt?: string;
  };
  [key: string]: unknown;
}

// NOTE: you are expected to define the following environment variables in `.env.local`:

let API_KEY = process.env.NEXT_PUBLIC_LIVEKIT_API_KEY;
let API_SECRET = process.env.NEXT_PUBLIC_LIVEKIT_API_SECRET;
let LIVEKIT_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL;
let API_NAME = process.env.NEXT_PUBLIC_LIVEKIT_API_NAME;
let instruction: string = 'default-instruction';
let mcpUrls: string[] = [];
// let formValues: FormValues = {};
let userplaygrounddata: UserPlaygroundData = {};
let agentToAgentData: AgentToAgentData = {};

export const revalidate = 0;

export type demoDetails = {
  error?: string; // Optional error messag
  serverUrl: string;
  roomName: string;
  participantName: string;
  participantToken: string;
  instruction: string; // Optional instruction for the participant
};

export async function POST(req: NextRequest) {
  console.log("***************************************************************************************************8")
  try {
    const body = await req.json();
    console.log("✅ Full POST body:", body);

    console.log('✅ Received body2:', body.formValues.name);
    console.log('===============================================================================')
    console.log('✅ Received body:', body.formValues);
    userplaygrounddata = {};
    // formValues = body.formValues;
    instruction = body?.formValues?.instruction || 'default-instruction';
    API_KEY = body.formValues?.apiKey;
    API_NAME = body.formValues?.apiName;
    API_SECRET = body.formValues?.secretKey;
    LIVEKIT_URL = body.formValues?.urlKey;
    mcpUrls = body.formValues?.mcpUrls || [];

    console.log('✅ Received instruction:', instruction);
    return NextResponse.json({ instruction }, { status: 200 });
  } catch (error) {
    console.error('❌ Error in POST /api/connection-details:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  try {
    if (API_NAME === undefined || API_NAME === '') {
      throw new Error('LIVEKIT_API_NAME is not defined');
    }
    if (API_KEY === undefined || API_KEY === '') {
      throw new Error('LIVEKIT_API_KEY is not defined');
    }
    if (LIVEKIT_URL === undefined || LIVEKIT_URL === '') {
      throw new Error('LIVEKIT_URL is not defined');
    }

    if (API_SECRET === undefined || API_SECRET === '') {
      throw new Error('LIVEKIT_API_SECRET is not defined');
    }
    if (API_NAME) {
      console.log('Using Agent Name :', API_NAME);
    }
    if (LIVEKIT_URL) {
      console.log('Using LIVEKIT_URL Name :', LIVEKIT_URL);
    }
    // Generate participant token
    const participantName = 'user';
    const participantIdentity = `voice_assistant_user_${Math.floor(Math.random() * 10_000)}`;
    const roomName = `voice_assistant_room_${Math.floor(Math.random() * 10_000)}`;
    const participantToken = await createParticipantToken(
      { identity: participantIdentity, name: participantName },
      roomName,
      instruction,
      agentToAgentData,
      userplaygrounddata
    );

    // Return connection details
    const data: demoDetails = {
      serverUrl: LIVEKIT_URL,
      roomName,
      participantToken: participantToken,
      participantName,
      instruction,
    };
    const headers = new Headers({
      'Cache-Control': 'no-store',
    });
    return NextResponse.json(data, { headers });
  } catch (error) {
    if (error instanceof Error) {

      console.error(error);
      // return new NextResponse({ error: error.message }, { status: 500 });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}


function createParticipantToken(
  userInfo: AccessTokenOptions,
  roomName: string,
  instruction: string,
  agentToAgentData: AgentToAgentData,
  userplaygrounddata: UserPlaygroundData
) {
  console.log("***********************************")
  const at = new AccessToken(API_KEY, API_SECRET, {
    ...userInfo,
    ttl: '15m',
    metadata: JSON.stringify({
      name: 'bala',
      instruction,
      mcpUrls,
      agentToAgentData,
      userplaygrounddata,
    }),
  });
  const grant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  };
  at.addGrant(grant);
  at.roomConfig = new RoomConfiguration({
    agents: [
      new RoomAgentDispatch({
        agentName: API_NAME,
        metadata: 'test-metadata',
      }),
    ],
  });
  return at.toJwt();
}
