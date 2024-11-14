import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log("revalidate starts")
  // const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')
  const tag = request.nextUrl.searchParams.get('tag')

  // if (secret !== process.env.REVALIDATION_SECRET) {
  //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  // }
  console.log({path, tag, req: request.nextUrl.searchParams})
  try {
    if (path) {
      revalidatePath(path)
    }
    if (tag) {
      revalidateTag(tag)
    }
    return NextResponse.json({ revalidated: true, now: Date.now(), path, tag })
  } catch (error) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
