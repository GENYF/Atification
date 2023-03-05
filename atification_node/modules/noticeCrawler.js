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

            let fixedNoticeIndex = 0;
            let noticeIndex = 0;

            const bodyList = $("tbody > tr");

            bodyList.map((index, element) => {
                let cellList = $(element).find("td").text().replace(/[\t\r\n\v\f]+/g, "|").split("|");
                let cellLink = $(element).find("td").find("a").attr("href");

                if (cellList[1] === "공지") {
                    this.fixedNoticeList[fixedNoticeIndex++] = {
                        number: cellList[1],
                        category: cellList[2],
                        title: cellList[6],
                        writer: cellList[16],
                        date: '20' + cellList[17],
                        link: `https://www.ajou.ac.kr/kr/ajou/notice.do${cellLink}`
                    };
                } else if (cellList[5] === "NEW") {
                    this.noticeList[noticeIndex++] = {
                        number: cellList[1],
                        category: cellList[2],
                        title: cellList[3],
                        writer: cellList[9],
                        date: '20' + cellList[10],
                        link: `https://www.ajou.ac.kr/kr/ajou/notice.do${cellLink}`
                    };
                } else {
                    this.noticeList[noticeIndex++] = {
                        number: cellList[1],
                        category: cellList[2],
                        title: cellList[3],
                        writer: cellList[8],
                        date: '20' + cellList[9],
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
                        id: element.number,
                    },
                    defaults: {
                        id: element.number,
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