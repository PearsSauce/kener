import fs from "fs-extra";
import { env } from "$env/dynamic/public";
import { GetDayStartTimestampUTC, GetMinuteStartNowTimestampUTC, DurationInMinutes } from "../../scripts/tool.js";

export async function load({ params, route, url, cookies }) {
    let site = JSON.parse(fs.readFileSync(env.PUBLIC_KENER_FOLDER + "/site.json", "utf8"));
    var dt = new Date();
    let tzOffset = dt.getTimezoneOffset();
    const tzOffsetCookie = cookies.get("tzOffset");
	if (!!tzOffsetCookie) {
        tzOffset = Number(tzOffsetCookie);
    }
    let startTodayAtTs = GetDayStartTimestampUTC(GetMinuteStartNowTimestampUTC()) + tzOffset * 60;;
    let start90DayAtTs = startTodayAtTs - 90 * 24 * 60 * 60;
	console.log("Times are");
	console.log("UTC Minute start now: " + GetMinuteStartNowTimestampUTC());
	console.log("UTC Day start now: " + GetDayStartTimestampUTC(GetMinuteStartNowTimestampUTC()));
	console.log("TZ Day start today: " + startTodayAtTs);
	console.log("TZ Day start 90 days ago: " + start90DayAtTs);
    return {
        site: site,
        tzOffset: tzOffset,
        startTodayAtTs: startTodayAtTs,
        start90DayAtTs: start90DayAtTs,
    };
}
