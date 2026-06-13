import { Upstream } from "upstream-sdk";
import dotenv from "dotenv";

dotenv.config();
const env = process.env

const upstream = new Upstream(env.UPSTREAM_API_KEY!, {
    host: "http://localhost:3001"
});

async function main() {
    const result = await upstream.events.ingest(
        {
            title: "Hello, World!",
            icon: ":)",
        }
    )
    console.log(result);
}

// Will return the following:
//
// {
//     success: true,
//         result: {
//         id: '56d0f52c-4111-48bd-8815-7e3f6249d4bd',
//         title: 'Hello, World!',
//         icon: ':)',
//         content: null,
//         category: null,
//         fields: null,
//         events: null,
//         data: null,
//         actions: null,
//         createdAt: '2026-06-13T09:20:23.674Z',
//         projectId: '5210bb54-5fef-4c2c-83ac-4d408dc667f4'
//     }
// }

main();