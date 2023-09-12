const { CommandManager, f } = require('../modules/cmd-manager');

const ex1 = {
    추가: {
        오늘: f(() => {
            msg.reload('0일 후');
        }),
        내일: f(() => {
            msg.reload('1일 후');
        }),
        _: [
            f("<number>일 후", 상대날짜 => {
                let date = new Date();
                date.setDate(date.getDate() + 상대날짜);

                msg.next[1](date.getMonth() + 1, date.getDay());
            }),
            f("<number>월 <number>일", (월, 일) =>
                f(String, 닉네임 =>	// 마지막 인자는 배열로 몰아주기, 문자열이면 join 해서 주기
                    `${월} ${일} ${닉네임}`
                )
            )
        ]
    }
}

const ex2 = {
    추가: {
        오늘: f(() => {
            msg.reload('0일 후');
        }),
        내일: f(() => {
            msg.reload('1일 후');
        }),
        "<number>일 후": f(상대날짜 => {
            let date = new Date();
            date.setDate(date.getDate() + 상대날짜);

            msg.reload(date.getMonth() + 1, date.getDay());
        }),
        "<number>월 <number>일": f((월, 일) => ({
            String: f(닉네임 =>    // note: String 이 생성자가 아니고 문자열, 심볼이라 싫음
                `${월} ${일} ${닉네임}`
            )
        }))
    }
}

const ex3 = {
    추가: [
        f('오늘', () => {
            msg.next[2](0);
        }),
        f('내일', () => {
            msg.next[1](1);
        }),
        f("<number>일 후", 상대날짜 => {
            let date = new Date();
            date.setDate(date.getDate() + 상대날짜);

            msg.next[1](date.getMonth() + 1, date.getDay());
        }),
        f("<number>월 <number>일", (월, 일) =>
            f(String, 닉네임 =
                `${월} ${일} ${닉네임}`
            )
        )
    ]
}