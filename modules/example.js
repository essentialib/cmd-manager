const cmd = require('./cmd-manager')('commands');

function onMessage(msg) {
	command = cmd.build(msg);
	if (command) {
		msg.reply(cmd(command));
	}
}

function f() {}

// todo
//  - 다음 명령어 이동
//  - 명령어 도움말
//  - n-자식 명령어
//  - promise

cmd.add(msg => ({
	공부인증: {
		도움말: f(() =>
			'공부인증 도움말'
		),
		검색: f(String, 닉네임 =>
			`검색: ${닉네임}`
		),
		현황: f(() =>
			'현황'
		),
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
		},
		더요: {
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
			"<number>월 <number>일": f((월, 일) =>
				f(String, 닉네임 =>	// 마지막 인자는 배열로 몰아주기, 문자열이면 join 해서 주기
					`${월} ${일} ${닉네임}`
				)
			),
			String: f()	// no: String이 생성자가 아니고 문자열, 심볼이라 싫음
		},
		더: [
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
				f(String, 닉네임 =>	// 마지막 인자는 배열로 몰아주기, 문자열이면 join 해서 주기
					`${월} ${일} ${닉네임}`
				)
			)
		],
		삭제: [
			f("<number>일 후", 상대날짜 => {
				let date = new Date();
				date.setDate(date.getDate() + 상대날짜);

				msg.next(date.getMonth() + 1, date.getDay());
			}),
			f("<number>월 <number>일", (월, 일) =>
				f(String, 닉네임 =>	// 마지막 인자는 배열로 몰아주기, 문자열이면 join 해서 주기
					`${월} ${일} ${닉네임}`
				)
			)
		],
		제거: {
			_: [
				f("<number>일 후", 상대날짜 => {
					let date = new Date();
					date.setDate(date.getDate() + 상대날짜);

					msg.next(date.getMonth() + 1, date.getDay());
				}),
				f("<number>월 <number>일", (월, 일) =>
					f(String, 닉네임 =>	// 마지막 인자는 배열로 몰아주기, 문자열이면 join 해서 주기
						`${월} ${일} ${닉네임}`
					)
				)
			]
		},
		이동: f("<string> -> <string>", (from, to) =>
			`${from} -> ${to}`
		)
	},
	유틸리티: {
		덧셈: f(Number, 숫자들 => 숫자들.reduce((a, b) => a + b)),
		급식: {
			오늘: f(() => '오늘 급식'),
			내일: f(() => '내일 급식'),
			_: [
				f("<number>일 후", 상대날짜 => {
					let date = new Date();
					date.setDate(date.getDate() + 상대날짜);

					msg.next(date.getMonth() + 1, date.getDay());
				}),
				f("<number>월 <number>일", (월, 일) =>
					f(String, 닉네임 =>
						`${월} ${일} ${닉네임}`
					)
				)
			]
		},
		번역: f(String, 출발언어 =>
			f(String, 도착언어 =>
				f(String, 문장 =>
					`${출발언어} ${도착언어} ${문장}`
				)
			)
		)
	}
}));