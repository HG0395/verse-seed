const words = `가끔은 가만히|나란히 나누던|다정한 다시|라일락처럼 라디오처럼|마음에 마주한|바람처럼 바라보던|사랑으로 사뿐히|아침마다 아름다운|자그마한 자유로운|차분히 차곡차곡|카메라에 카페에서|타오르는 타박타박|파란 파도처럼|하루의 하늘처럼|감사한 감싸주는|고요한 고마운|구름처럼 구석구석|기다리던 기억하는|꿈꾸던 꿈처럼|꽃처럼 꽃잎처럼|너에게 너와|내일의 내려놓은|눈부신 눈처럼|늘 늘어놓은|달빛처럼 달려가는|당신의 당신에게|도란도란 돌아오는|동그란 동화처럼|따뜻한 따스한|또다시 또렷한|라면처럼 라벤더처럼|만나면 만들어가는|매일 매번|모두의 모처럼|무심코 무지개처럼|물결처럼 물끄러미|미소처럼 미처|반짝이는 반가운|봄처럼 봄날의|부드러운 부디|불빛처럼 불쑥|빛나는 빛처럼|새로운 새벽의|서로의 서툴지만|선명한 선물처럼|설레는 설렘처럼|소중한 소곤소곤|수줍은 수많은|순간마다 순수한|시작하는 시원한|신나는 신기한|아직 아늑한|안녕 안개처럼|어느새 어제의|여전히 여름처럼|오늘의 오랜|온전히 온기처럼|우리의 우리에게|웃으며 웃음처럼|은은한 은빛으로|이렇게 이따금|인생의 인연처럼|작은 작지만|정다운 정성스레|조용한 조금씩|좋아하는 좋아서|주말의 주머니에|지금의 지나온|진심으로 진득하게|초록의 초롱초롱|친구처럼 친구에게|커다란 커피처럼|토닥토닥 토요일의|푸른 푸르른|행복한 행복으로|한결같이 한동안|함께 함께라면|해맑은 해처럼|희망으로 희미한`.split('|');
const lexicon = new Map();
for (const group of words) { const entries=group.split(' '); const key=[...entries[0]][0]; lexicon.set(key,[...(lexicon.get(key)||[]),...entries]); }
const themes={
 warm:{middle:['마음 한쪽에 작은 온기를 남겨요','평범한 순간도 선물이 되어요','서두르지 않고 곁을 지켜요','말없이 건네는 응원을 담아요','함께 걷는 길이 조금 밝아져요','작은 웃음 하나를 나눠요'],end:['이 순간을 오래 기억해요','우리의 내일을 응원해요','오늘도 당신 편이 되어줄게요','함께라서 참 다행이에요'],extra:['조금 서툴러도 괜찮아요.','잊지 못할 장면으로 남을 거예요.','다정한 한마디면 충분해요.']},
 funny:{middle:['알람과 오늘도 협상 중이에요','계획은 완벽한데 이불이 붙잡아요','커피 한 잔에 의욕을 충전해요','할 일 목록보다 간식이 먼저 보여요','진지한 표정으로 메뉴를 고민해요','운동 결심은 내일부터 시작해요'],end:['그래도 웃었으니 오늘은 성공이에요','마지막 한 입은 양보 못 해요','이 정도면 꽤 멋진 하루예요','박수는 셀프로 쳐도 신나요'],extra:['이불 밖 모험에는 간식이 필요해요.','마음만은 이미 일등이에요.','웃음에도 충전 시간이 있나 봐요.']},
 poetic:{middle:['빛이 머문 자리에 마음을 놓아요','바람이 지나간 문장을 읽어요','골목 끝에 작은 계절이 피어요','흩어진 하루를 한 줄로 묶어요','저녁의 여백에 이름을 적어요','멀리 있는 꿈의 창을 열어요'],end:['다음 계절에도 이 빛을 기억해요','우리의 이야기가 조용히 피어나요','그 끝에 새로운 아침이 와요','마지막 여백은 당신에게 남겨요'],extra:['말하지 않은 마음도 빛을 가져요.','천천히 읽을수록 오래 남아요.','고요 속에서 작은 문장이 자라요.']}
};
export function normalizeWord(value){const text=String(value).normalize('NFC').replace(/\s/gu,'');if(!/^[가-힣]{2,12}$/u.test(text))throw new Error('완성된 한글 2~12글자를 입력해 주세요. 띄어쓰기는 자동으로 제외합니다.');return [...text];}
export function generate(value,{count=3,length='medium',tone='warm',random=Math.random}={}){
 const chars=normalizeWord(value);if(!Number.isInteger(count)||count<1||count>10)throw new Error('결과 개수는 1~10개입니다.');if(!themes[tone]||!['short','medium','long'].includes(length))throw new Error('지원하지 않는 설정입니다.');
 const t=themes[tone], pick=a=>a[Math.floor(random()*a.length)%a.length], out=[],seen=new Set();
 for(let n=0;n<count;n++){let lines;let key;for(let attempt=0;attempt<40;attempt++){
 lines=chars.map((char,i)=>{const starters=lexicon.get(char);const start=starters?pick(starters):char+',';const tail=pick(i===chars.length-1?t.end:t.middle);const base=start+' '+tail;return length==='short'?start+' '+(i===chars.length-1?pick(tone==='funny'?['웃으면 성공이에요','간식은 못 참아요','오늘도 해냈어요','일단 밥부터 먹어요']:tone==='poetic'?['빛으로 남아요','계절을 기다려요','별 하나 담아요','여백을 남겨요']:['내일을 꿈꿔요','함께 웃어요','곁에 있을게요','오늘을 기억해요']):pick(tone==='funny'?['이불과 협상해요','간식을 찾아요','커피를 충전해요','메뉴를 고민해요']:tone==='poetic'?['바람을 읽어요','저녁을 담아요','달빛을 따라요','계절을 써요']:['마음을 나눠요','한 걸음 걸어요','하루를 담아요','잠깐 쉬어가요'])):base+(length==='long'?' '+pick(t.extra):'');});key=lines.join('\n');if(!seen.has(key))break;}
 if(seen.has(key))throw new Error('새 조합을 만들지 못했어요. 다시 시도해 주세요.');seen.add(key);out.push(lines);}
 return out;
}

