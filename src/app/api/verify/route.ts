import {
  SismoConnect,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";
import {AUTHS, CLAIMS, CONFIG, SIGNATURE_REQUEST} from '../../sismo-connect-config'

const sismoConnect = SismoConnect({config:CONFIG});



export async function POST(req: Request) {
  const sismoConnectResponse = await req.json();
  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(sismoConnectResponse, {
      auths:AUTHS,
      claims: CLAIMS,
      signature: SIGNATURE_REQUEST,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 500 });
  }
}
