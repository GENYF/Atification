const axios = require("axios");
const cheerio = require("cheerio");

class NoticeCrawler {
    static importantNoticeList = [];
    static generalNoticeList = [];

    static async noticeParser() {
        try {
            const html = await axios.get("https://www.ajou.ac.kr/kr/ajou/notice.do?mode=list&&articleLimit=10&article.offset=0");
            const $ = cheerio.load(html.data);

            let importantNoticeIndex = 0;
            let generalNoticeIndex = 0;

            const bodyList = $("tbody > tr");

            bodyList.map((index, element) => {
                let cellList = $(element).find("td").text().replace(/[\t\r\n\v\f]+/g, "|").split("|");
                let cellLink = $(element).find("td").find("a").attr("href");

                if (cellList[1] === "공지") {
                    this.importantNoticeList[importantNoticeIndex++] = {
                        number: cellList[1],
                        category: cellList[2],
                        title: cellList[6],
                        writer: cellList[16],
                        date: cellList[17],
                        link: `https://www.ajou.ac.kr/kr/ajou/notice.do${cellLink}`
                    };
                } else {
                    this.generalNoticeList[generalNoticeIndex++] = {
                        number: cellList[1],
                        category: cellList[2],
                        title: cellList[3],
                        writer: cellList[8],
                        date: cellList[9],
                        link: `https://www.ajou.ac.kr/kr/ajou/notice.do${cellLink}`
                    };
                }
            });

            return {
                importantNoticeList: this.importantNoticeList,
                generalNoticeList: this.generalNoticeList
            };
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = NoticeCrawler;