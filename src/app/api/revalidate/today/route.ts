import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'
if(!process.env.CRON_SECRET) {
  throw Error("failed to get environment variable CRON_SECRET")
}
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		console.error(`[api/revalidate] invalid token:`, authHeader)
		return new Response(`unauthroized.`, { status: 401 })
	}
	try {
    revalidateTag('today')
    return Response.json({ success: true })
	} catch (err: any) {
    console.error('[api/revalidate] error:', err.message ?? '(unknown)')
		return new Response(`failed to revalidate.`, { status: 404 })
	}
}
