const regDesc = new RegExp("(^[^-_!#<>`\\s\\[][\\s\\S]+?\\n)+", "m");
const regCover = new RegExp("\\[(.*?)\\]:\\s*#?\\s*\\((.*?)\\)");
const regImages = new RegExp("!\\[(.*?)\\].*?\\(((?:https?:\\/\\/|\\/\\/).+?\\.(?:webp|png|gif|jpg|jpeg|jfif)(?:\\?[\\w_=\\-%]+?|))\\)","g");
const regTitles = new RegExp("^(#+)\\s+(.+)", "gm");
const regBranches = new RegExp("(main|master)\\/");

const RAW_URL = "raw.githubusercontent.com";
const CDN_URL = "cdn.jsdelivr.net/gh";

/**
 * 替换资源链接为 jsDelivr CDN链接
 * @param {String} markdown
 * @return {string, Array<Image>} { markdown, images[{ title, url }, ...] }
 */
function initMarkdown(markdown: string): {markdown: string, images: MarkdownImage[]} {
    const images = getImages(markdown);
    if (RAW_URL && CDN_URL) {
        images.forEach((image) => {
            if (image && image.url) {
                const cdnUrl = image.url
                    .replace(RAW_URL, CDN_URL)
                    .replace(regBranches, "");
                markdown = markdown.replace(image.url, cdnUrl);
                image.url = cdnUrl;
            }
        });
    }
    return { markdown, images };
}
/**
 *
 * @param {String} markdown
 * @returns
 */
function getTitles(markdown: string): Nav[] {
    const menu: Nav[] = [];
    let match: RegExpExecArray | null;
    let index = 0;
    while ((match = regTitles.exec(markdown))) {
        if (match.length > 2) {
            menu.push({
                level: match[1].length,
                id: `md-title${index ? `-${index}` : ""}`,
                title: match[2],
            });
            index++;
        }
    }
    return menu;
}
function getDesc(markdown: string) {
    const match = regDesc.exec(markdown);
    return match ? match[0] : "";
}

function getCover(markdown: string): MarkdownImage {
    const match = regCover.exec(markdown);
    return match && match.length > 2 ? { title: match[1], url: match[2] } : {};
}
/**
 * 获取Markdown文本的图片数据
 * @param {String} markdown
 * @returns {Array<Cover>} [{ title, url }, ...]
 */
function getImages(markdown: string): MarkdownImage[] {
    const images: MarkdownImage[] = [];
    let match;
    while ((match = regImages.exec(markdown))) {
        if (match.length > 2) {
            images.push({
                title: match[1],
                url: match[2],
            });
        }
    }
    return images;
}
/**
 * 解析画廊
 * @param {Object { body }}
 * @returns { string }
 */
export const formatGallery = ({ body }: { body: string }) => {
    return initMarkdown(body).images;
};

/**
 * @param {Post} post 响应body
 */
export const formatPost = (resp: IssueResponse): Post => {
    // const post = {  body, title, created_at, labels, milestone, number }
    // 使用 CDN
    const { markdown } = initMarkdown(resp.body);
    // 获取封面图（读取第一条注释）
    const cover = getCover(markdown);
    // 获取描述（读取第一段落）
    const description = getDesc(markdown);
    // 生成导航菜单
    const nav = getTitles(markdown);
    return {
        markdown,
        cover,
        description,
        title: resp.title,
        createdAt: resp.created_at,
        labels: resp.labels,
        category: resp.milestone,
        id: resp.number,
        nav,
    };
};
/**
 * 格式化分类
 */
export const formatCategory = (category: Category[]) => {
    category.forEach((o) => {
        const description = o.description.split("\r\n");
        o.summary = description[0].split("summary:")[1];
        o.cover = description[1].split("cover:")[1];
    });
    return category;
};
/**
 * 格式化时间线
 */
// export const formatTimeline = (posts: IssueResponse[]) => {
//   const archives = posts.map((item) => formatPost(item))
//   const timeline: Timeline = new Map()
//   Object.values(archives).forEach((archive) => {
//     const timestrap = new Date(archive.createdAt).format('yyyy-MM')
//     const curr = timeline.get(timestrap)
//     if (curr) {
//       curr.push(archive)
//     } else {
//       timeline.set(timestrap, [archive])
//     }
//   })
//   return timeline
// }
export const formatTimeline = (posts: IssueResponse[]) => {
    const archives = posts.map((item) => formatPost(item));
    const timeline: Timeline = {};
    Object.values(archives).forEach((archive) => {
        const timestrap = new Date(archive.createdAt).format("yyyy-MM");
        const curr = timeline[timestrap];
        if (curr) {
            curr.push(archive);
        } else {
            timeline[timestrap] = [archive];
        }
    });
    return timeline;
};
/**
 * 格式化灵感
 */
export const formatInspiration = (inspiration: InspirationResponse[]) => {
    inspiration.forEach(
        (o) => (o.date = new Date(o.created_at).format("y年m月d日"))
    );
    return inspiration;
};

/**
 * 格式化书单 & 友链 & 关于
 */
export const formatPage = (
    data: IssueResponse,
    type: string | undefined
): Page[] => {
    if (!data || !data.body) return [];
    const section = data.body.split("## ").filter((o) => o.length);
    let result: Page[] = [];
    switch (type) {
        case "book":
        case "friend":
        case "projects":
            result = section.map((o) => {
                const content = o.split("\r\n").filter((o) => o.length);
                const result: Page = {};
                content.forEach((row, index) => {
                    if (index === 0) {
                        result.name = row;
                    } else {
                        const i = row.indexOf(":");
                        const key = row.slice(0, i);
                        const value = row.slice(i + 1);
                        result[key] = value;
                    }
                });
                return result;
            });
            break;
        case "about":
            result = section.map((o) => {
                const match = o.match(/.+?\r\n/);
                const title = match ? match[0] : "";
                return {
                    title,
                    content: o.slice(title.length),
                };
            });
            break;
        default:
            result = section.map((o) => {
                const content = o.split("\r\n").filter((o) => o.length);
                const result: Page = {};
                content.forEach((row, index) => {
                    if (index === 0) {
                        result.name = row;
                    } else {
                        const inx = row.indexOf(":");
                        const key = row.slice(0, inx);
                        const value = row.slice(inx + 1);
                        result[key] = value;
                    }
                });
                return result;
            });
            break;
    }
    // 移除首尾空格
    result.forEach((item) => {
        Object.keys(item).forEach((k) => {
            item[k] = item[k].trim();
        });
    });

    return result;
};

export const formatJson = (data: IssueResponse) => {
    if (!data || !data.body) return [];
    const reg = /```json([\s\S]+?)```/g;
    const result = reg.exec(data.body);
    if (result && result[1]) {
        return JSON.parse(result[1]);
    }
    return [];
};

/**
 * 日期转换
 */
export const parseTime = (time: string, format = "{y}-{m}-{d} {h}:{i}:{s}") => {
    const date = new Date(time);
    const formatObj: { [k: string]: number } = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === "a") {
            return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        if (result.length > 0 && value < 10) {
            return "0" + value;
        }
        return (value || 0).toString();
    });
    return timeStr;
};
