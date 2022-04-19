# project2
### nodejs mariaDB를 이용한 홈페이지 만들기

view 페이지는 pug를 사용하였다 
```
app.use(express.static(`views`));
app.set('view engine', 'pug');
app.set('views', './views');
```

회원가입시 비밀번호는 암호화하여 보안문제를 해결하고자 하였고 crypto 모듈을 찾게되어 사용하였다.
이때 단방향이 아닌 양방향처리를 하여 로그인시 비밀번호를 확인하고자 하기 위해서 시행착오를 경험하였다
```
const crypto = require('crypto')
const algorithm = 'aes-256-cbc';
 
const ENCRYPTION_KEY = 'abcdefghijklmnop'.repeat(2);
const IV_LENGTH = 16;

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

    const encrypted = cipher.update(text);

    return (iv.toString('hex') + ':' + Buffer.concat([encrypted, cipher.final()]).toString('hex'));
}

function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

    const decrypted = decipher.update(encryptedText);

    return Buffer.concat([decrypted, decipher.final()]).toString();
}
```

로그인 상태, 유저의 닉네임, 유저의 포인트 등은 세션 스토리지에 저장하고 사용하였다
delete로 로그아웃시 삭제하여 관리하였다.
```
    req.session.loginstate = 'okay';
    req.session.uid = result[0].userid;
    req.session.userpoint = result[0].userpoint;
                    
    delete req.session.loginstate;
    delete req.session.uid;
    delete req.session.userpoint;
    delete req.session.idx;
```

게임 스킨 구매 시스템을 구성하기 위해서 다양한 스킨이미지를 구성하기 위해서 크롤링을 위하여 cherio 모듈을 사용하였다.
참조 블로그 https://senticoding.tistory.com/34

게시글에 대한 댓글을 db상에서 관리하기 위하여 부모 자식 구조의 테이블을 구성하여 관리하였다
foreign key를 사용하여 주면 가능하다
```
create table userboard (
	idx int not null auto_increment PRIMARY KEY, 
    userid varchar(256) null,
    title varchar(256) null,
    content varchar(256) null,
    regdate varchar(256) null,
    modidate varchar(256) null,
    hit varchar(256) null,
    likeuser varchar(512) null
);

create table commentboard (
	idx int not null auto_increment PRIMARY KEY, 
    userid varchar(256) null,
    comments varchar(256) null,
    board_idx int,
    foreign key (board_idx) references userboard(idx) 
    on update cascade on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
