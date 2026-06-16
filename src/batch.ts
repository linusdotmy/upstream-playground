import { Upstream, EventProps } from "upstream-sdk";
import dotenv from "dotenv";

type IngestResult = {
    success: boolean;
    result?: unknown;
};

dotenv.config();
const env = process.env

const upstream = new Upstream(env.UPSTREAM_API_KEY!);

async function main() {
    const events: EventProps[] = [
        {
            title: "Hello, World!",
            icon: "👋",
        },
        {
            title: "User Signed Up",
            icon: "📝",
            content: "A new user just signed up for the platform.",
        },
        {
            title: "Payment Received",
            icon: "💰",
            category: "billing",
        },
        {
            title: "Server Error",
            icon: "❌",
            content: "An unexpected error occurred on the server.",
            category: "error",
        },
        {
            title: "Deployment Successful",
            icon: "🚀",
            fields: [
                { name: "Environment", value: "Production" },
                { name: "Version", value: "v2.4.1" },
            ],
        },
        {
            title: "New Comment",
            icon: "💬",
            content: "Someone commented on your post.",
            fields: [
                { name: "Author", value: "Alice" },
                { name: "Post ID", value: "12345" },
            ],
        },
        {
            title: "Task Completed",
            icon: "✅",
            category: "tasks",
            events: [
                { icon: "🕐", time: "10:00", content: "Task started" },
                { icon: "🕑", time: "11:30", content: "Task in progress" },
                { icon: "🕒", time: "12:00", content: "Task completed" },
            ],
        },
        {
            title: "Order Shipped",
            icon: "📦",
            content: "Your order has been shipped!",
            events: [
                { icon: "🛒", time: "09:00", content: "Order placed" },
                { icon: "📋", time: "10:00", content: "Order processed" },
            ],
            fields: [
                { name: "Tracking", value: "1Z999AA10123456784" },
            ],
        },
        {
            title: "Webhook Received",
            icon: "🌐",
            data: {
                event: "push",
                ref: "refs/heads/main",
                repository: {
                    name: "upstream-playground",
                    url: "https://github.com/user/upstream-playground",
                },
            },
        },
        {
            title: "Analytics Event",
            icon: "📊",
            category: "analytics",
            data: {
                pageViews: 1240,
                uniqueVisitors: 890,
                bounceRate: 0.32,
            },
        },
        {
            title: "New Issue Created",
            icon: "🐛",
            content: "A new bug report was filed.",
            category: "issues",
            actions: [
                { title: "View Issue", type: "default", url: "https://github.com/user/repo/issues/42" },
                { title: "Mark as Resolved", type: "secondary", url: "https://github.com/user/repo/issues/42/close" },
            ],
        },
        {
            title: "Feature Request",
            icon: "✨",
            content: "A user requested a new feature.",
            fields: [
                { name: "User", value: "Bob" },
                { name: "Priority", value: "High" },
            ],
            actions: [
                { title: "Review", type: "ghost", url: "https://github.com/user/repo/discussions/7" },
            ],
        },
        {
            title: "Full Event",
            icon: "🎉",
            content: "This event has everything!",
            category: "demo",
            createdAt: new Date().toISOString(),
            fields: [
                { name: "Field A", value: "Value A" },
                { name: "Field B", value: "Value B" },
            ],
            events: [
                { icon: "🔵", time: "08:00", content: "Started" },
                { icon: "🟢", time: "09:00", content: "Finished" },
            ],
            data: {
                nested: { key: "value" },
                array: [1, 2, 3],
            },
            actions: [
                { title: "Primary", type: "default", url: "https://example.com/1" },
                { title: "Secondary", type: "secondary", url: "https://example.com/2" },
                { title: "Ghost", type: "ghost", url: "https://example.com/3" },
            ],
        },
        {
            title: "Minimal Event",
            icon: "⚪",
        },
        {
            title: "Event with Only Data",
            icon: "🔒",
            data: { secret: "shhh" },
        },
        {
            title: "Event with Only Actions",
            icon: "🔗",
            actions: [
                { title: "Google", type: "default", url: "https://google.com" },
            ],
        },
    ];

    for (const event of events) {
        const result = (await upstream.events.ingest(event)) as IngestResult;
        console.log(`Ingested: ${event.title} => ${result.success ? "OK" : "FAIL"}`);
    }
}

main();