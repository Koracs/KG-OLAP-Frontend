export {default} from "next-auth/middleware";

export const config = {
    matcher: ["/query1", "/results1/:path*"]
};