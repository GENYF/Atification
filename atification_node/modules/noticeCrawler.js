const axios = require("axios");
const cheerio = require("cheerio");

const { FixedNotice, Notice } = require("../models");

class NoticeCrawler {
    static url = "https://www.ajou.ac.kr/kr/ajou/notice.do?mode=list&&articleLimit=10&article.offset=0";
    static headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
    }

    static fixedNoticeList = [];
    static noticeList = [];

    static async noticeParser() {
        try {
            const html = await axios.get(this.url, { headers: this.headers });
            const $ = cheerio.load(html.data);

            const bodyList = $("tbody > tr");
            const pattern = /[\t\r\n\v\f]{3,}|\s{3,}/g;

            let fixedNoticeIndex = 0;
            let noticeIndex = 0;

            bodyList.map((index, element) => {
                let cellId =  $(element).find(".b-num-box").text().replace(pattern, "");
                let cellCategory = $(element).find(".b-cate").text().replace(pattern, "");
                let cellWriter = $(element).find(".b-writer").text().replace(pattern, "");
                let cellDate = "20" + $(element).find(".b-date").text().replace(pattern, "");
                let cellTitle = $(element).find(".b-title-box").find("a").text().replace(pattern, "");
                let cellLink = $(element).find(".b-title-box").find("a").attr("href").toString();

                if (cellId === "공지") {
                    this.fixedNoticeList[fixedNoticeIndex++] = {
                        category: cellCategory,
                        writer: cellWriter,
                        date: cellDate,
                        title: cellTitle,
                        link: `https://www.ajou.ac.kr/kr/ajou/notice.do${cellLink}`
                    };
                } else {
                    this.noticeList[noticeIndex++] = {
                        id: cellId,
                        category: cellCategory,
                        writer: cellWriter,
                        date: cellDate,
                        title: cellTitle,
                        link: `https://www.ajou.ac.kr/kr/ajou/notice.do${cellLink}`
                    };
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    static async noticeLoader() {
        try {
            await FixedNotice.destroy({ truncate: true });

            this.fixedNoticeList.forEach((element) => {
                FixedNotice.create({
                    category: element.category,
                    title: element.title,
                    date: Date.parse(element.date),
                    writer: element.writer,
                    link: element.link
                });
            })

            this.noticeList.forEach((element) => {
                Notice.findOrCreate({
                    where : {
                        id: element.id,
                    },
                    defaults: {
                        id: element.id,
                        category: element.category,
                        title: element.title,
                        date: Date.parse(element.date),
                        writer: element.writer,
                        link: element.link
                    },
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = NoticeCrawler;