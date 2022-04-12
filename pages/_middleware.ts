import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

// use middleware (which runs on the edge) to write the share urls to the main website.
export function middleware(req: NextRequest, ev: NextFetchEvent) {
    // TODO: write courseup.ca/ courseup.vikelabs.ca/
    // let req.url be like "http://courseup.ca/api/hello"
    // const { url } = req;
    return
}