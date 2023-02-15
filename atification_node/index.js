const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async () => {
  try {
    const html = await axios.get("https://www.ajou.ac.kr/kr/ajou/notice.do?mode=list&&articleLimit=10&article.offset=0");
    const $ = cheerio.load(html.data);

    let noticeList = [];
    const bodyList = $("tr");

    bodyList.map((i, element) => {
        let cellList = $(element).find("td").text().replace(/[\t\r\n\v\f]+/g, "|").split("|");
        let cellLink = $(element).find("td").find("a").attr("href");

        if (cellList[1] !== "공지") {
            noticeList[i] = {
                number: cellList[1],
                cartegory: cellList[2],
                title: cellList[3],
                writer: cellList[8],
                date: cellList[9],
                link: `https://www.ajou.ac.kr/kr/ajou/notice.do${cellLink}`
            };
        }
    });

    console.log("bodyList : ", noticeList);
  } catch (error) {
    console.error(error);
  }
};

getHTML();