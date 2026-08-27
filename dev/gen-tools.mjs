// 纯前端工具批量生成器（开发用）
// 运行: node dev/gen-tools.mjs
import fs from 'fs';

const ROOT = process.cwd();
const COMMON = '../common.css';
const NL = String.fromCharCode(10);

const DEFS = [
  { slug:'full-to-half', name:'全角转半角', icon:'🔡', cat:'文本处理', kind:'textop', op:'quan2ban' },
  { slug:'half-to-full', name:'半角转全角', icon:'🔠', cat:'文本处理', kind:'textop', op:'ban2quan' },
  { slug:'caesar-enc', name:'凯撒密码加密', icon:'🔐', cat:'文本处理', kind:'textop', op:'caesarEnc', param:'移位(默认3)' },
  { slug:'caesar-dec', name:'凯撒密码解密', icon:'🔓', cat:'文本处理', kind:'textop', op:'caesarDec', param:'移位(默认3)' },
  { slug:'rot13', name:'ROT13 转换', icon:'🔄', cat:'文本处理', kind:'textop', op:'rot13' },
  { slug:'dedup-lines', name:'按行去重', icon:'🧹', cat:'文本处理', kind:'textop', op:'dedupLines' },
  { slug:'sort-lines-asc', name:'行正序排序', icon:'🔼', cat:'文本处理', kind:'textop', op:'sortAsc' },
  { slug:'sort-lines-desc', name:'行倒序排序', icon:'🔽', cat:'文本处理', kind:'textop', op:'sortDesc' },
  { slug:'remove-empty', name:'删除空行', icon:'🚮', cat:'文本处理', kind:'textop', op:'removeEmpty' },
  { slug:'line-number', name:'每行加序号', icon:'🔢', cat:'文本处理', kind:'textop', op:'addNumber' },
  { slug:'strip-html', name:'删除 HTML 标签', icon:'🧼', cat:'文本处理', kind:'textop', op:'stripTags' },
  { slug:'escape-html', name:'HTML 转义', icon:'🛡️', cat:'文本处理', kind:'textop', op:'escHtml' },
  { slug:'escape-js', name:'JS 字符串转义', icon:'🛡️', cat:'文本处理', kind:'textop', op:'escJs' },
  { slug:'extract-phone', name:'提取手机号', icon:'📱', cat:'文本处理', kind:'textop', op:'extractPhone' },
  { slug:'extract-url', name:'提取网址', icon:'🌐', cat:'文本处理', kind:'textop', op:'extractUrl' },
  { slug:'extract-han', name:'提取汉字', icon:'🈶', cat:'文本处理', kind:'textop', op:'extractHan' },
  { slug:'extract-latin', name:'提取英文字母', icon:'🔤', cat:'文本处理', kind:'textop', op:'extractLatin' },
  { slug:'align-text', name:'文本两端对齐', icon:'📏', cat:'文本处理', kind:'textop', op:'align' },
  { slug:'cn-punc2en', name:'中文标点转英文', icon:'🔣', cat:'文本处理', kind:'textop', op:'cnPunc2en' },
  { slug:'trim-lines', name:'去除每行首尾空白', icon:'✂️', cat:'文本处理', kind:'textop', op:'trimLines' },
  { slug:'merge-lines', name:'多行合并为一行', icon:'➡️', cat:'文本处理', kind:'textop', op:'mergeLines' },
  { slug:'split-lines', name:'按标点拆分成行', icon:'✂️', cat:'文本处理', kind:'textop', op:'splitLines' },
  { slug:'dedup-space', name:'合并连续空格', icon:'␣', cat:'文本处理', kind:'textop', op:'dedupSpace' },
  { slug:'random-line', name:'随机抽取一行', icon:'🎲', cat:'文本处理', kind:'textop', op:'randomLine' },
  { slug:'rand-mac', name:'随机 MAC 地址', icon:'🖧', cat:'网络工具', kind:'gen', op:'mac' },
  { slug:'rand-ipv4', name:'随机 IPv4', icon:'🌐', cat:'网络工具', kind:'gen', op:'ipv4' },
  { slug:'rand-ipv6', name:'随机 IPv6', icon:'🌐', cat:'网络工具', kind:'gen', op:'ipv6' },
  { slug:'rand-port', name:'随机端口号', icon:'🔌', cat:'网络工具', kind:'gen', op:'port' },
  { slug:'rand-ua', name:'随机 User-Agent', icon:'🕵️', cat:'网络工具', kind:'gen', op:'ua' },
  { slug:'rand-latlng', name:'随机经纬度', icon:'🗺️', cat:'网络工具', kind:'gen', op:'latlng' },
  { slug:'rand-hex', name:'随机十六进制串', icon:'🔡', cat:'开发工具', kind:'gen', op:'hex', param:'长度(默认32)' },
  { slug:'rand-color', name:'随机颜色 HEX', icon:'🎨', cat:'开发工具', kind:'gen', op:'color' },
  { slug:'rand-color-rgb', name:'随机 RGB 颜色', icon:'🎨', cat:'开发工具', kind:'gen', op:'colorRgb' },
  { slug:'rand-date', name:'随机日期', icon:'📅', cat:'时间与日期', kind:'gen', op:'date' },
  { slug:'rand-time', name:'随机时间', icon:'⏰', cat:'时间与日期', kind:'gen', op:'time' },
  { slug:'rand-weekday', name:'随机星期', icon:'📆', cat:'时间与日期', kind:'gen', op:'weekday' },
  { slug:'rand-month', name:'随机月份', icon:'📆', cat:'时间与日期', kind:'gen', op:'month' },
  { slug:'rand-cn-name', name:'随机中文姓名', icon:'🧑', cat:'趣味娱乐', kind:'gen', op:'cnname' },
  { slug:'rand-en-name', name:'随机英文姓名', icon:'🧑', cat:'趣味娱乐', kind:'gen', op:'enname' },
  { slug:'rand-address', name:'随机中国地址', icon:'🏠', cat:'趣味娱乐', kind:'gen', op:'address' },
  { slug:'rand-emoji', name:'随机 Emoji', icon:'😀', cat:'趣味娱乐', kind:'gen', op:'emoji' },
  { slug:'rand-sentence', name:'随机中文句子', icon:'💬', cat:'趣味娱乐', kind:'gen', op:'sentence' },
  { slug:'rand-poem', name:'随机诗词', icon:'📜', cat:'趣味娱乐', kind:'gen', op:'poem' },
  { slug:'rand-joke', name:'随机笑话', icon:'😂', cat:'趣味娱乐', kind:'gen', op:'joke' },
  { slug:'rand-float', name:'随机浮点数', icon:'🔢', cat:'趣味娱乐', kind:'gen', op:'float', param:'最大值(默认100)' },
  { slug:'rand-bool', name:'随机布尔值', icon:'⚖️', cat:'趣味娱乐', kind:'gen', op:'bool' },
  { slug:'base32', name:'Base32 编解码', icon:'🔢', cat:'编码转换', kind:'codec', op:'base32' },
  { slug:'base58', name:'Base58 编解码', icon:'🔢', cat:'编码转换', kind:'codec', op:'base58' },
  { slug:'base85', name:'Base85 编解码', icon:'🔢', cat:'编码转换', kind:'codec', op:'base85' },
  { slug:'bacon', name:'培根密码', icon:'🥓', cat:'编码转换', kind:'codec', op:'bacon' },
  { slug:'gcd', name:'最大公约数', icon:'📐', cat:'数学·财务', kind:'math', op:'gcd' },
  { slug:'lcm', name:'最小公倍数', icon:'📐', cat:'数学·财务', kind:'math', op:'lcm' },
  { slug:'factorial', name:'阶乘计算', icon:'❗', cat:'数学·财务', kind:'math', op:'factorial' },
  { slug:'fibonacci', name:'斐波那契数列', icon:'🌀', cat:'数学·财务', kind:'math', op:'fib' },
  { slug:'permutation', name:'排列数', icon:'🔢', cat:'数学·财务', kind:'math', op:'perm' },
  { slug:'combination', name:'组合数', icon:'🔢', cat:'数学·财务', kind:'math', op:'comb' },
  { slug:'sqrt', name:'平方根计算', icon:'√', cat:'数学·财务', kind:'math', op:'sqrt' },
  { slug:'power', name:'幂运算', icon:'＾', cat:'数学·财务', kind:'math', op:'power' },
  { slug:'ln', name:'自然对数', icon:'📈', cat:'数学·财务', kind:'math', op:'ln' },
  { slug:'log10', name:'常用对数', icon:'📈', cat:'数学·财务', kind:'math', op:'log10' },
  { slug:'frac-add', name:'分数加法', icon:'➕', cat:'数学·财务', kind:'math', op:'fracAdd' },
  { slug:'frac-sub', name:'分数减法', icon:'➖', cat:'数学·财务', kind:'math', op:'fracSub' },
  { slug:'frac-mul', name:'分数乘法', icon:'✖️', cat:'数学·财务', kind:'math', op:'fracMul' },
  { slug:'frac-div', name:'分数除法', icon:'➗', cat:'数学·财务', kind:'math', op:'fracDiv' },
  { slug:'roi', name:'投资回报率 ROI', icon:'📊', cat:'数学·财务', kind:'math', op:'roi' },
  { slug:'mortgage-principal', name:'等额本金房贷', icon:'🏦', cat:'数学·财务', kind:'math', op:'mortgageP' },
  { slug:'deposit', name:'存款利率计算', icon:'🏦', cat:'数学·财务', kind:'math', op:'deposit' },
  { slug:'calories', name:'卡路里消耗估算', icon:'🔥', cat:'数学·财务', kind:'math', op:'calories' },
  { slug:'wpm', name:'打字速度 WPM', icon:'⌨️', cat:'数学·财务', kind:'math', op:'wpm' },
  { slug:'rand-range', name:'随机整数(范围/步进)', icon:'🎲', cat:'数学·财务', kind:'math', op:'randRange', param:'步进(默认1)' },
  { slug:'deg2rad', name:'角度转弧度', icon:'📐', cat:'数学·财务', kind:'math', op:'deg2rad' },
  { slug:'rad2deg', name:'弧度转角度', icon:'📐', cat:'数学·财务', kind:'math', op:'rad2deg' },
  { slug:'pi-digits', name:'圆周率 π', icon:'π', cat:'数学·财务', kind:'math', op:'pi' },
  { slug:'golden', name:'黄金分割数', icon:'✨', cat:'数学·财务', kind:'math', op:'golden' },
  { slug:'abs-round', name:'绝对值与取整', icon:'➿', cat:'数学·财务', kind:'math', op:'absround' },
  { slug:'zodiac', name:'星座查询', icon:'♈', cat:'时间与日期', kind:'time', op:'zodiac' },
  { slug:'workdays', name:'工作日天数', icon:'💼', cat:'时间与日期', kind:'time', op:'workdays' },
  { slug:'countdown', name:'倒计时到日期', icon:'⏳', cat:'时间与日期', kind:'time', op:'countdown' },
  { slug:'unix-ms', name:'Unix 毫秒时间戳', icon:'⏱️', cat:'时间与日期', kind:'time', op:'unixMs' },
  { slug:'now-ts', name:'当前时间戳', icon:'⏱️', cat:'时间与日期', kind:'time', op:'nowTs' },
  { slug:'sha256-lines', name:'批量 SHA256（每行）', icon:'🔒', cat:'编码转换', kind:'hashline', op:'sha256' },
  { slug:'sha512-lines', name:'批量 SHA512（每行）', icon:'🔒', cat:'编码转换', kind:'hashline', op:'sha512' },
  { slug:'crc32', name:'CRC32 校验', icon:'🧮', cat:'编码转换', kind:'crc', op:'crc32' },
  { slug:'md-to-html', name:'Markdown → HTML', icon:'📝', cat:'开发工具', kind:'md', op:'md2html' },
  { slug:'html-to-md', name:'HTML → Markdown', icon:'📝', cat:'开发工具', kind:'md', op:'html2md' },
  { slug:'ascii-table', name:'ASCII 表', icon:'📋', cat:'开发工具', kind:'misc', op:'asciitable' },
  { slug:'char-code', name:'字符码点查询', icon:'🔣', cat:'开发工具', kind:'misc', op:'charcode' },
  { slug:'js-beautify', name:'JS 代码美化', icon:'💎', cat:'开发工具', kind:'misc', op:'beautify' },
];

const THEME = String.raw`function __tg(){var d=document.documentElement.dataset.theme==="dark";document.documentElement.dataset.theme=d?"":"dark";localStorage.setItem("theme",d?"":"dark");var b=document.querySelector('button[onclick="__tg()"]');b.textContent=d?"🌙":"☀️";}
if(document.documentElement.dataset.theme==="dark"){var bx=document.querySelector('button[onclick="__tg()"]');if(bx)bx.textContent="☀️";}`;

const FOOT = `<footer class="site-foot">
<div>🔗 <a href="https://github.com/li63050a/gjx" target="_blank" rel="noopener">GitHub</a> · <a href="https://li63050a.github.io/gjx/" target="_blank" rel="noopener">Pages</a> · <a href="https://gjx.z321.cc.cd/" target="_blank" rel="noopener">gjx.z321.cc.cd</a></div>
<div>💬 QQ 1026939741 · 📺 B站 小帅5656 · ✉️ li63050@qq.com</div>
</footer>`;

function page(title, icon, body, script) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="../../favicon.svg" type="image/svg+xml">
<title>${title} · 超能工具箱</title>
<script>var __t=localStorage.getItem("theme"); if(__t)document.documentElement.dataset.theme=__t;</script>
<link rel="stylesheet" href="${COMMON}">
</head>
<body>
<div class="container">
<a class="brand" href="../../index.html">🧰 超能工具箱</a>
<a class="back" href="../../index.html">← 返回主页</a>
<h2>${icon} ${title}</h2>
${body}
<div id="out"></div>
</div>
<button onclick="__tg()" style="position:fixed;right:16px;bottom:16px;z-index:99;width:46px;height:46px;border-radius:50%;border:none;background:var(--accent);color:#fff;font-size:1.3rem;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.3)">🌙</button>
<script>${THEME}
${script}
<\/script>
${FOOT}
</body>
</html>`;
}

const esc = s => (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

const POOL = {
  surname:'王李张刘陈杨黄赵周吴徐孙马朱胡郭何高林郑谢罗梁宋唐许韩冯邓曹彭曾肖田董袁潘于蒋蔡余杜叶程苏魏吕丁任沈姚卢姜崔钟谭陆汪范金石廖贾夏韦付方白邹孟熊秦邱江尹薛闫段雷侯龙史陶黎贺顾毛郝龚邵万钱严覃武戴莫孔向汤',
  given:'伟芳娜秀英敏静丽强磊洋勇艳杰娟涛明超秀霞平刚桂英文辉力建国建华俊峰梅鑫浩然子轩宇航梓涵思齐嘉怡欣怡沐宸亦辰知遥',
  first:['James','John','Robert','Michael','David','William','Richard','Joseph','Thomas','Chris','Daniel','Matthew','Anthony','Mark','Paul','Steven','Andrew','Joshua','Kevin','Brian'],
  last:['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Wilson','Martinez','Anderson','Taylor','Thomas','Moore','Jackson','Lee','Hall','Allen','Young'],
  province:['北京','上海','广东','江苏','浙江','山东','四川','湖北','湖南','河南','福建','河北','陕西','辽宁','安徽','江西','重庆','天津'],
  city:['杭州市','南京市','成都市','武汉市','西安市','苏州市','广州市','深圳市','青岛市','长沙市','郑州市','福州市','合肥市','宁波市','东莞市'],
  street:['中山路','人民路','建设路','解放路','和平路','文化路','长江路','黄河路','幸福街','花园路','创业大道','科技园路'],
  ua:['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15','Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1','Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Mobile Safari/537.36','Mozilla/5.0 (X11; Linux x86_64) Gecko/20100101 Firefox/121.0'],
  emoji:['😀','😂','🥰','😎','🤔','🚀','🌟','🔥','🍀','🐱','🐶','🌈','💡','🎉','⚡','🌸','🍔','☕','🎮','📚'],
  poem:['床前明月光，疑是地上霜。举头望明月，低头思故乡。','春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。','白日依山尽，黄河入海流。欲穷千里目，更上一层楼。','千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。','红豆生南国，春来发几枝。愿君多采撷，此物最相思。'],
  joke:['为什么程序员总分不清万圣节和圣诞节？因为 Oct 31 == Dec 25。','bug 不是 bug，是未文档化的特性。','0 和 1 说：我们才是世界的本原。','我写的代码没有 bug，只有巧合。','键盘坏了，我的耐心也跟着坏了。']
};

function pick(a){return a[Math.floor(Math.random()*a.length)];}
function rint(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function rhex(n){var s='';for(var i=0;i<n;i++)s+=Math.floor(Math.random()*16).toString(16);return s;}

function buildTextop(def) {
  const param = def.param ? `<div class="row"><input id="p1" placeholder="${def.param}"></div>` : '';
  const body = `<div class="row"><textarea id="inp" rows="5" placeholder="输入文本"></textarea></div>${param}<div class="row"><button class="btn" onclick="run()">执行</button><button class="btn gray" onclick="copy()">复制</button></div>`;
  const script = String.raw`var OP='${def.op}';
function transform(op,t,p){p=p||'';
 if(op==='quan2ban')return t.replace(/[　]/g,' ').replace(/[！-～]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-0xFEE0);});
 if(op==='ban2quan')return t.replace(/ /g,'　').replace(/[!-~]/g,function(c){return String.fromCharCode(c.charCodeAt(0)+0xFEE0);});
 if(op==='caesarEnc'||op==='caesarDec'){var k=((+p)||3)*(op==='caesarDec'?-1:1);return t.replace(/[a-z]/gi,function(c){var b=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-b+k%26+26)%26+b);});}
 if(op==='rot13')return t.replace(/[a-z]/gi,function(c){var b=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-b+13)%26+b);});
 if(op==='dedupLines'){var s={},r=[];t.split(NL).forEach(function(l){if(!s[l]){s[l]=1;r.push(l);}});return r.join(NL);}
 if(op==='sortAsc')return t.split(NL).sort().join(NL);
 if(op==='sortDesc')return t.split(NL).sort().reverse().join(NL);
 if(op==='removeEmpty')return t.split(NL).filter(function(l){return l.trim()!=='';}).join(NL);
 if(op==='addNumber')return t.split(NL).map(function(l,i){return (i+1)+'. '+l;}).join(NL);
 if(op==='stripTags')return t.replace(/<[^>]*>/g,'');
 if(op==='escHtml')return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
 if(op==='escJs')return t.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/'/g,"\\'").replace(/\\n/g,'\\\\n').replace(/\\r/g,'\\\\r').replace(/\\t/g,'\\\\t');
 if(op==='extractPhone')return (t.match(/1[3-9][0-9]{9}/g)||[]).join(NL)||(null);
 if(op==='extractUrl')return (t.match(/https?:\/\/[^ \"\'<>]+/g)||[]).join(NL)||(null);
 if(op==='extractHan')return (t.match(/[一-龥]+/g)||[]).join('');
 if(op==='extractLatin')return (t.match(/[A-Za-z]+/g)||[]).join(' ');
 if(op==='align'){var L=t.split(NL);var m=Math.max.apply(null,L.map(function(x){return x.length;}));return L.map(function(x){while(x.length<m)x+=' ';return x;}).join(NL);}
 if(op==='cnPunc2en'){var M={'（':'(','）':')','，':',','。':'.','！':'!','？':'?','；':';','：':':','“':'\"','”':'\"','‘':"\'",'’':"\'",'、':',','《':'<','》':'>'};return t.replace(/[（）．，。！？；：“”‘’、<>《》]/g,function(c){return M[c]||c;});}
 if(op==='trimLines')return t.split(NL).map(function(l){return l.trim();}).join(NL);
 if(op==='mergeLines')return t.split(NL).join('');
 if(op==='splitLines')return t.split(/[。！？!?]/).map(function(s){return s.split(NL);}).reduce(function(a,b){return a.concat(b);},[]).filter(Boolean).join(NL);
 if(op==='dedupSpace')return t.replace(/ {2,}/g,' ');
 if(op==='randomLine'){var a=t.split(NL).filter(Boolean);return a.length?a[Math.floor(Math.random()*a.length)]:'(空)';}
 return t;
}
function run(){var t=document.getElementById('inp').value;var p=document.getElementById('p1')?document.getElementById('p1').value:'';document.getElementById('out').innerHTML='<div class="ans"><pre>'+esc(transform(OP,t,p))+'</pre></div>';}
function copy(){var e=document.querySelector('#out pre');if(e)navigator.clipboard.writeText(e.textContent);}`;
  return page(def.name, def.icon, body, script);
}

function buildGen(def) {
  const param = def.param ? `<div class="row"><input id="p1" placeholder="${def.param}"></div>` : '';
  const body = `<div class="row"><button class="btn" onclick="go()">生成</button><button class="btn gray" onclick="copy()">复制</button></div>${param}`;
  const script = String.raw`var OP='${def.op}';
function go(){
 var p=document.getElementById('p1')?document.getElementById('p1').value:'';
 var r='';
 if(OP==='mac'){var a=[];for(var i=0;i<6;i++)a.push(rhex(2).toUpperCase());r=a.join(':');}
 else if(OP==='ipv4'){r=rint(1,254)+'.'+rint(0,255)+'.'+rint(0,255)+'.'+rint(1,254);}
 else if(OP==='ipv6'){var g=[];for(var i=0;i<8;i++)g.push(rhex(4));r=g.join(':');}
 else if(OP==='port'){r=String(rint(1,65535));}
 else if(OP==='ua'){r=pick(POOL.ua);}
 else if(OP==='latlng'){r=(Math.random()*180-90).toFixed(6)+', '+(Math.random()*360-180).toFixed(6);}
 else if(OP==='hex'){var n=parseInt(p)||32;r=rhex(n);}
 else if(OP==='color'){r='#'+rhex(6);}
 else if(OP==='colorRgb'){r='rgb('+rint(0,255)+','+rint(0,255)+','+rint(0,255)+')';}
 else if(OP==='date'){var y=rint(1970,2030),m=rint(1,12),d=rint(1,28);r=y+'-'+('0'+m).slice(-2)+'-'+('0'+d).slice(-2);}
 else if(OP==='time'){r=('0'+rint(0,23)).slice(-2)+':'+('0'+rint(0,59)).slice(-2)+':'+('0'+rint(0,59)).slice(-2);}
 else if(OP==='weekday'){r=pick(['星期一','星期二','星期三','星期四','星期五','星期六','星期日']);}
 else if(OP==='month'){r=rint(1,12)+'月';}
 else if(OP==='cnname'){r=pick(POOL.surname.split(''))+pick(POOL.given.split(''));}
 else if(OP==='enname'){r=pick(POOL.first)+' '+pick(POOL.last);}
 else if(OP==='address'){r=pick(POOL.province)+'省'+pick(POOL.city)+pick(POOL.street)+' '+rint(1,999)+'号';}
 else if(OP==='emoji'){r=pick(POOL.emoji);}
 else if(OP==='sentence'){r='今天'+pick(['天气真好','代码一次跑通','吃了好吃的','学到新东西','遇见有趣的人'])+'，'+pick(['心情不错','效率很高','想分享一下','值得记录'])+'。';}
 else if(OP==='poem'){r=pick(POOL.poem);}
 else if(OP==='joke'){r=pick(POOL.joke);}
 else if(OP==='float'){var mx=parseFloat(p)||100;r=(Math.random()*mx).toFixed(4);}
 else if(OP==='bool'){r=Math.random()<0.5?'true':'false';}
 document.getElementById('out').innerHTML='<div class="ans"><pre>'+esc(r)+'</pre></div>';
}
function copy(){var e=document.querySelector('#out pre');if(e)navigator.clipboard.writeText(e.textContent);}`;
  return page(def.name, def.icon, body, script);
}

function buildCodec(def) {
  const body = `<div class="row"><textarea id="inp" rows="4" placeholder="输入文本"></textarea></div>
<div class="row"><label>模式 <select id="mode"><option value="enc">编码</option><option value="dec">解码</option></select></label><button class="btn" onclick="go()">执行</button><button class="btn gray" onclick="copy()">复制</button></div>`;
  const script = String.raw`var OP='${def.op}';
var B32='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function b32enc(str){var bytes=new TextEncoder().encode(str);var bin='';bytes.forEach(function(b){bin+=b.toString(2).padStart(8,'0');});var out='';for(var i=0;i<bin.length;i+=5){var chunk=bin.substr(i,5);while(chunk.length<5)chunk+='0';out+=B32.charAt(parseInt(chunk,2));}while(out.length%8)out+='=';return out;}
function b32dec(str){str=str.replace(/=+$/,'');var bin='';for(var i=0;i<str.length;i++){var v=B32.indexOf(str[i].toUpperCase());if(v<0)return '非法字符';bin+=v.toString(2).padStart(5,'0');}bin=bin.slice(0,Math.floor(bin.length/8)*8);var out='';for(var i=0;i<bin.length;i+=8)out+=String.fromCharCode(parseInt(bin.substr(i,8),2));return out;}
var B58='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function b58enc(str){var bytes=Array.from(new TextEncoder().encode(str));var num=0n;bytes.forEach(function(b){num=num*256n+BigInt(b);});var out='';while(num>0n){out=B58[Number(num%58n)]+out;num/=58n;}for(var i=0;i<bytes.length&&bytes[i]===0;i++)out='1'+out;return out;}
function b58dec(str){var num=0n;for(var i=0;i<str.length;i++){var v=B58.indexOf(str[i]);if(v<0)return '非法字符';num=num*58n+BigInt(v);}var out=[];while(num>0n){out.unshift(Number(num%256n));num/=256n;}for(var i=0;i<str.length&&str[i]==='1';i++)out.unshift(0);return new TextDecoder().decode(Uint8Array.from(out));}
function b85enc(str){var bytes=new TextEncoder().encode(str);var out='';for(var i=0;i<bytes.length;i+=4){var n=0;for(var j=0;j<4;j++)n=n*256+(bytes[i+j]||0);var c=[];for(var j=0;j<5;j++){c.unshift(String.fromCharCode(33+(n%85)));n=Math.floor(n/85);}out+=c.join('');}return out;}
function b85dec(str){var out=[];for(var i=0;i<str.length;i+=5){var n=0;for(var j=0;j<5&&i+j<str.length;j++)n=n*85+(str.charCodeAt(i+j)-33);var pad=5-Math.min(5,str.length-i);n*=Math.pow(85,pad);for(var j=0;j<4-pad;j++)out.push((n>>(8*(3-j)))&255);}return new TextDecoder().decode(Uint8Array.from(out));}
function bacon(str,dec){var M={A:'aaaaa',B:'aaaab',C:'aaaba',D:'aaabb',E:'aabaa',F:'aabab',G:'aabba',H:'aabbb',I:'abaaa',J:'abaab',K:'ababa',L:'ababb',M:'abbaa',N:'abbab',O:'abbba',P:'abbbb',Q:'baaaa',R:'baaab',S:'baaba',T:'baabb',U:'babaa',V:'babab',W:'babba',X:'babbb',Y:'bbaaa',Z:'bbaab'};if(!dec){return str.toUpperCase().replace(/[A-Z]/g,function(c){return M[c]||'';});}var r='';for(var i=0;i+5<=str.length;i+=5){var k=str.substr(i,5).toLowerCase();for(var ch in M){if(M[ch]===k){r+=ch;break;}}}return r;}
function go(){var t=document.getElementById('inp').value,mode=document.getElementById('mode').value,r='';
 if(OP==='base32')r=mode==='enc'?b32enc(t):b32dec(t);
 else if(OP==='base58')r=mode==='enc'?b58enc(t):b58dec(t);
 else if(OP==='base85')r=mode==='enc'?b85enc(t):b85dec(t);
 else if(OP==='bacon')r=mode==='enc'?bacon(t,false):bacon(t,true);
 document.getElementById('out').innerHTML='<div class="ans"><pre>'+esc(r)+'</pre></div>';
}
function copy(){var e=document.querySelector('#out pre');if(e)navigator.clipboard.writeText(e.textContent);}`;
  return page(def.name, def.icon, body, script);
}

function buildMath(def) {
  const body = `<div class="row"><input id="a" placeholder="数值 A（分数用 a/b）"></div><div class="row"><input id="b" placeholder="数值 B（分数用 c/d）"></div><div class="row"><button class="btn" onclick="go()">计算</button></div>`;
  const script = String.raw`var OP='${def.op}';
function frac(s){var m=/^[ \t]*(-?[0-9]+)[ \t]*\/[ \t]*([0-9]+)[ \t]*$/.exec(s);if(!m)return null;var n=+m[1],d=+m[2];if(d===0)return null;var g=Math.abs(n);while(d){var t=d;d=g%d;g=t;}return [n/g,d/g];}
function gcd0(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a||1;}
function fact(n){var f=1;for(var i=2;i<=n;i++)f*=i;return f;}
function go(){
 var A=document.getElementById('a').value,B=document.getElementById('b').value,r='';
 var x=parseFloat(A),y=parseFloat(B);
 try{
 if(OP==='gcd'){var a=Math.abs(Math.round(x)),b=Math.abs(Math.round(y));while(b){var t=b;b=a%b;a=t;}r='GCD = '+a;}
 else if(OP==='lcm'){var m=Math.abs(Math.round(x)),n=Math.abs(Math.round(y));r='LCM = '+(m*n/(m===0||n===0?1:gcd0(m,n)));}
 else if(OP==='factorial'){var f=1;for(var i=2;i<=Math.round(x);i++)f*=i;r=Math.round(x)+'! = '+f;}
 else if(OP==='fib'){var nn=Math.round(x),a=0,b=1,s=[0];for(var i=1;i<nn;i++){var c=a+b;a=b;b=c;s.push(a);}r='斐波那契前 '+nn+' 项: '+s.join(', ');}
 else if(OP==='perm'){r='P('+x+','+y+') = '+fact(Math.round(x))/fact(Math.round(x)-Math.round(y));}
 else if(OP==='comb'){r='C('+x+','+y+') = '+fact(Math.round(x))/(fact(Math.round(y))*fact(Math.round(x)-Math.round(y)));}
 else if(OP==='sqrt'){r='√'+x+' = '+Math.sqrt(x);}
 else if(OP==='power'){r=x+'^'+y+' = '+Math.pow(x,y);}
 else if(OP==='ln'){r='ln('+x+') = '+Math.log(x);}
 else if(OP==='log10'){r='log('+x+') = '+Math.log10(x);}
 else if(OP==='fracAdd'||OP==='fracSub'||OP==='fracMul'||OP==='fracDiv'){var f1=frac(A),f2=frac(B);if(!f1||!f2){r='格式错误，请用 a/b';}else{var N,D;if(OP==='fracAdd'){N=f1[0]*f2[1]+f2[0]*f1[1];D=f1[1]*f2[1];}else if(OP==='fracSub'){N=f1[0]*f2[1]-f2[0]*f1[1];D=f1[1]*f2[1];}else if(OP==='fracMul'){N=f1[0]*f2[0];D=f1[1]*f2[1];}else{N=f1[0]*f2[1];D=f1[1]*f2[0];}var g=Math.abs(N);while(D){var t=D;D=g%D;g=t;}r='结果 = '+(N/g)+'/'+(f1[1]*f2[1]/g);}}
 else if(OP==='roi'){r='ROI = '+(((y-x)/x)*100).toFixed(2)+'%（投入 '+x+' 现值 '+y+'）';}
 else if(OP==='mortgageP'){var P=Math.round(x),months=Math.round(y),monthP=Math.round(P/months),total=0;for(var i=1;i<=months;i++){var interest=Math.round((P-monthP*(i-1))*0.00485);total+=monthP+interest;}r='每月本金 '+monthP+'，首月利息约 '+Math.round(P*0.00485)+'，总还款约 '+total;}
 else if(OP==='deposit'){r='本息 = '+(x*Math.pow(1+y/100/12,Math.round(B||12))).toFixed(2)+'（本金 '+x+' 年利率 '+y+'% 月 '+Math.round(B||12)+'）';}
 else if(OP==='calories'){r='估算消耗 ≈ '+Math.round(x*0.05*Math.round(B||30))+' kcal（体重 '+x+'kg 活动 '+Math.round(B||30)+' 分钟）';}
 else if(OP==='wpm'){r='WPM = '+Math.round(x/Math.max(1,B/60)/5)+'（字数 '+x+' 用时 '+Math.round(B||60)+' 秒）';}
 else if(OP==='randRange'){var step=parseFloat(B)||1;r=Math.floor(Math.random()*Math.floor((x)/step)+1)*step;}
 else if(OP==='deg2rad'){r=x+'° = '+(x*Math.PI/180).toFixed(6)+' rad';}
 else if(OP==='rad2deg'){r=x+' rad = '+(x*180/Math.PI).toFixed(6)+'°';}
 else if(OP==='pi'){r='π = '+Math.PI;}
 else if(OP==='golden'){r='φ = '+((1+Math.sqrt(5))/2);}
 else if(OP==='absround'){r='绝对值 '+Math.abs(x)+'；四舍五入 '+Math.round(x)+'；向上 '+Math.ceil(x)+'；向下 '+Math.floor(x);}
 document.getElementById('out').innerHTML='<div class="ans"><pre>'+esc(r)+'</pre></div>';
 }catch(e){document.getElementById('out').innerHTML='<p class="msg">计算失败：'+esc(e)+'</p>';}
}`;
  return page(def.name, def.icon, body, script);
}

function buildTime(def) {
  const body = `<div class="row"><input id="a" placeholder="如 1995-05-20 或目标日期"></div><div class="row"><input id="b" placeholder="结束日期（工作日用）"></div><div class="row"><button class="btn" onclick="go()">计算</button></div>`;
  const script = String.raw`var OP='${def.op}';
var ZO=[['摩羯',1,1],['水瓶',1,20],['双鱼',2,19],['白羊',3,21],['金牛',4,20],['双子',5,21],['巨蟹',6,22],['狮子',7,23],['处女',8,23],['天秤',9,23],['天蝎',10,24],['射手',11,23],['摩羯',12,22]];
function go(){
 var A=document.getElementById('a').value,B=document.getElementById('b').value,r='';
 if(OP==='zodiac'){var m=parseInt(A.substr(5,2)),d=parseInt(A.substr(8,2));for(var i=0;i<ZO.length-1;i++){if((m>ZO[i][1]||(m===ZO[i][1]&&d>=ZO[i][2]))&&(m<ZO[i+1][1]||(m===ZO[i+1][1]&&d<ZO[i+1][2]))){r=ZO[i][0]+'座';break;}}if(!r)r=ZO[ZO.length-1][0]+'座';}
 else if(OP==='workdays'){var s=new Date(A),e=new Date(B),c=0;if(!isNaN(s)&&!isNaN(e)){for(var t=s;t<=e;t.setDate(t.getDate()+1)){var w=t.getDay();if(w!==0&&w!==6)c++;}r='工作日（周一至周五）共 '+c+' 天';}}
 else if(OP==='countdown'){var tg=new Date(B);if(isNaN(tg)){r='请填目标日期';}else{var ms=tg-new Date();r='距 '+B+' 还有 '+Math.floor(ms/86400000)+' 天 '+Math.floor(ms%86400000/3600000)+' 小时';}}
 else if(OP==='unixMs'){r=String(Date.now());}
 else if(OP==='nowTs'){r=String(Math.floor(Date.now()/1000));}
 document.getElementById('out').innerHTML='<div class="ans"><pre>'+esc(r)+'</pre></div>';
}`;
  return page(def.name, def.icon, body, script);
}

function buildHashline(def) {
  const body = `<div class="row"><textarea id="inp" rows="6" placeholder="每行一个文本"></textarea></div><div class="row"><button class="btn" onclick="go()">计算</button></div>`;
  const script = String.raw`var OP='${def.op}';
async function go(){
 var lines=document.getElementById('inp').value.split(String.fromCharCode(10)).filter(function(l){return l!=='';});
 var res=[];
 for(var i=0;i<lines.length;i++){
  try{var buf=await crypto.subtle.digest(OP,new TextEncoder().encode(lines[i]));var h='';new Uint8Array(buf).forEach(function(b){h+=b.toString(16).padStart(2,'0');});res.push(lines[i]+'  =>  '+h);}catch(e){res.push(lines[i]+'  =>  错误');}
 }
 document.getElementById('out').innerHTML='<div class="ans"><pre>'+esc(res.join(String.fromCharCode(10)))+'</pre></div>';
}`;
  return page(def.name, def.icon, body, script);
}

function buildCrc(def) {
  const body = `<div class="row"><textarea id="inp" rows="4" placeholder="输入文本"></textarea></div><div class="row"><button class="btn" onclick="go()">计算</button></div>`;
  const script = String.raw`function crc32(str){var table=[];for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;table[n]=c>>>0;}var crc=0xFFFFFFFF;for(var i=0;i<str.length;i++){crc=table[(crc^str.charCodeAt(i))&0xFF]^(crc>>>8);}return (crc^0xFFFFFFFF)>>>0;}
function go(){var t=document.getElementById('inp').value;document.getElementById('out').innerHTML='<div class="ans"><pre>CRC32 = '+crc32(t).toString(16).padStart(8,'0').toUpperCase()+'</pre></div>';}`;
  return page(def.name, def.icon, body, script);
}

function buildMd(def) {
  const body = `<div class="row"><textarea id="inp" rows="6" placeholder="输入内容"></textarea></div><div class="row"><button class="btn" onclick="go()">转换</button></div>`;
  const script = String.raw`var OP='${def.op}';
var BK=String.fromCharCode(96);
function md2html(s){return s.replace(/^### (.*)$/gim,'<h3>$1</h3>').replace(/^## (.*)$/gim,'<h2>$1</h2>').replace(/^# (.*)$/gim,'<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\*(.+?)\*/g,'<i>$1</i>').replace(new RegExp(BK+'([^'+BK+']+)'+BK,'g'),'<code>$1</code>').replace(/^\s*[-*] (.*)$/gim,'<li>$1</li>').replace(/\n/g,'<br>');}
function html2md(s){return s.replace(/<h1>(.*?)<\/h1>/g,'# $1').replace(/<h2>(.*?)<\/h2>/g,'## $1').replace(/<h3>(.*?)<\/h3>/g,'### $1').replace(/<b>(.*?)<\/b>/g,'**$1**').replace(/<i>(.*?)<\/i>/g,'*$1*').replace(/<code>(.*?)<\/code>/g,BK+'$1'+BK).replace(/<li>(.*?)<\/li>/g,'- $1').replace(/<br>/g,'\n');}
function go(){var t=document.getElementById('inp').value;var r=OP==='md2html'?md2html(t):html2md(t);document.getElementById('out').innerHTML='<div class="ans"><pre>'+esc(r)+'</pre></div>';}`;
  return page(def.name, def.icon, body, script);
}

function buildMisc(def) {
  if(def.op==='asciitable'){
    let rows='';for(let i=0;i<128;i++){rows+='<tr><td>'+i+'</td><td>'+(i>=32&&i<127?String.fromCharCode(i):'·')+'</td><td>0x'+i.toString(16).padStart(2,'0').toUpperCase()+'</td></tr>';}
    const body=`<div id="out"><table style="width:100%;border-collapse:collapse;font-size:.85rem"><tr><th>十进制</th><th>字符</th><th>十六进制</th></tr>${rows}</table></div>`;
    return page(def.name,def.icon,body,'');
  }
  if(def.op==='charcode'){
    const body=`<div class="row"><input id="a" placeholder="输入字符，如 A 或 你"></div><div class="row"><button class="btn" onclick="go()">查询</button></div>`;
    const script=String.raw`function go(){var s=document.getElementById('a').value;var r=Array.from(s).map(function(c){return c+' => U+'+c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0');}).join(String.fromCharCode(10));document.getElementById('out').innerHTML='<div class="ans"><pre>'+esc(r)+'</pre></div>';}`;
    return page(def.name,def.icon,body,script);
  }
  const body=`<div class="row"><textarea id="inp" rows="6" placeholder="粘贴 JS 代码"></textarea></div><div class="row"><button class="btn" onclick="go()">美化</button></div>`;
  const script=String.raw`function go(){var s=document.getElementById('inp').value;var ind=0,out='';for(var i=0;i<s.length;i++){var c=s[i];if(c==='\}'||c===']'){ind=Math.max(0,ind-1);}out+=c;if(c==='\{'||c==='['||c==='('){ind++;}if(c===';'||c==='\{'){out+='\n'+'  '.repeat(ind);}}document.getElementById('out').innerHTML='<div class="ans"><pre>'+esc(out)+'</pre></div>';}`;
  return page(def.name,def.icon,body,script);
}

function build(def) {
  if(def.kind==='textop') return buildTextop(def);
  if(def.kind==='gen') return buildGen(def);
  if(def.kind==='codec') return buildCodec(def);
  if(def.kind==='math') return buildMath(def);
  if(def.kind==='time') return buildTime(def);
  if(def.kind==='hashline') return buildHashline(def);
  if(def.kind==='crc') return buildCrc(def);
  if(def.kind==='md') return buildMd(def);
  if(def.kind==='misc') return buildMisc(def);
}

let created=0;
for(const def of DEFS){
  const dir = ROOT+'/tools/'+def.slug;
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(dir+'/index.html', build(def));
  created++;
}
console.log('created', created, 'tool pages');

let html = fs.readFileSync(ROOT+'/index.html','utf8');
const byCat={};
DEFS.forEach(d=>{(byCat[d.cat]=byCat[d.cat]||[]).push(d);});
const slugSet=new Set(DEFS.map(d=>d.slug));
// remove existing cards/links for these slugs first (idempotent on re-run)
html=html.replace(/<a class="card"[^>]*href="tools\/([^\/]+)\/index.html"[^>]*>[\s\S]*?<\/a>/g,(a,slug)=> slugSet.has(slug)?'':a);
html=html.replace(/<a class="dl"[^>]*href="tools\/([^\/]+)\/index.html"[^>]*>[\s\S]*?<\/a>/g,(a,slug)=> slugSet.has(slug)?'':a);
// add cards
html=html.replace(/<section class="cat" data-cat="([^"]+)">([\s\S]*?)<\/section>/g,(m,cat,inner)=>{
  if(!byCat[cat])return m;const list=byCat[cat];
  const cards=list.map(t=>`<a class="card" href="tools/${t.slug}/index.html" data-name="${t.name}" data-cat="${cat}"><span class="ico">${t.icon}</span><span class="nm">${t.name}</span></a>`).join('\n');
  let ni=inner.replace(/<\/div>\s*$/ ,cards+'\n</div>');
  return `<section class="cat" data-cat="${cat}">${ni}</section>`;
});
// add dl links
html=html.replace(/<div class="dl-group">([\s\S]*?)<\/div><\/div>/g,(m,inner)=>{
  const h=inner.match(/<div class="dl-h"[^>]*>([^<]+)</);if(!h)return m;const cat=h[1].trim();if(!byCat[cat])return m;const list=byCat[cat];
  const links=list.map(t=>`<a class="dl" href="tools/${t.slug}/index.html" data-name="${t.name}" data-cat="${cat}">${t.icon} ${t.name}</a>`).join('\n');
  return m.replace(/<\/div><\/div>\s*$/,links+'\n</div></div>');
});
// recompute category counts from actual sections
html=html.replace(/<section class="cat" data-cat="([^"]+)">([\s\S]*?)<\/section>/g,(m,cat,inner)=>{
  let cnt=(inner.match(/<a class="card"/g)||[]).length;
  return m.replace(/<span class="cat-n">\d+<\/span>/,'<span class="cat-n">'+cnt+'</span>');
});
// recompute chip counts
html=html.replace(/<button class="chip cat" data-cat="([^"]+)">([^<(]*)\((\d+)\)<\/button>/g,(m,cat,label,n)=>{
  let sec=html.match(new RegExp('<section class="cat" data-cat="'+cat.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'">[\\s\\S]*?<\\/section>'));
  let cnt=sec?(sec[0].match(/<a class="card"/g)||[]).length:0;
  return `<button class="chip cat" data-cat="${cat}">${label}(${cnt})</button>`;
});
const total=(html.match(/<a class="card"/g)||[]).length;
html=html.replace(/全部工具 \(\d+\)/,'全部工具 ('+total+')').replace(/搜索 \d+ 个工具/,'搜索 '+total+' 个工具');
fs.writeFileSync(ROOT+'/index.html',html);
console.log('homepage updated, total tools =', total);
