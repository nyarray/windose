export interface Lyric {
    time: number,
    text: string
}

export const useLyricParse = {
    // lyrics (Array) - output from parseLyric function
    // time (Number) - current time from audio player
    syncLyric: (lyrics: Lyric[], time: number) => {
        const scores: number[] = [];

        lyrics.forEach(lyric => {
            // get the gap or distance or we call it score
            const score = time - lyric.time;
            // only accept score with positive values
            if (score >= 0) scores.push(score);
        });

        if (scores.length == 0) return null;

        // get the smallest value from scores
        const closest = Math.min(...scores);

        // return the index of closest lyric
        return scores.indexOf(closest);
    },
    parseLyric: (lrc: string): Lyric[] => {
        // will match "[00:00.000] ooooh yeah!"
        // note: i use named capturing group
        const regex = /^\[(?<time>\d+?:\d+?(.\d+?)?)\](?<text>.*)/;
        // split lrc string to individual lines
        const lines = lrc.split("\n");
        const output: Lyric[] = [];
        lines.forEach(line => {
            const match = line.match(regex);
            // if doesn't match, return.
            if (match == null) return;
            const { time, text } = match.groups as any;
            output.push({
                time: parseTime(time),
                text: text.trim()
            });
        });
        // parse formated time
        // "03:24.73" => 204.73 (total time in seconds)
        function parseTime(time: string) {
            const minsec = time.split(":");
            const min = parseInt(minsec[0]) * 60;
            const sec = parseFloat(minsec[1]);
            return min + sec;
        }
        return output;
    }
}