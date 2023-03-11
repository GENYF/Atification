const { sequelize } = require('./models');
const noticeCrawler = require('./modules/noticeCrawler');

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
async function main() {
    await noticeCrawler.noticeParser().then(() => {
        console.log('공지사항 파싱 성공');
    });
    await noticeCrawler.noticeLoader().then(() => {
        console.log('공지사항 로드 성공');
    });
}

main();