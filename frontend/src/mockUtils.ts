import dayjs from "dayjs";
import { PostInfo } from "./components/Post";

function randomDate(start: Date, end: Date) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

const rDate = randomDate(new Date(2012, 0, 1), new Date());

export function templatePostInfo(subforum: string | undefined): PostInfo {
    return {
        subforum: `r/${subforum ?? "test"}`,
        title: "Super fun post",
        body: "This post is so fun to read, it has many words and it says a ton of stuff",
        author: "noobmaster69",
        createdAt: dayjs(rDate),
        numComments: Math.ceil(Math.random() * 75)
    };
};