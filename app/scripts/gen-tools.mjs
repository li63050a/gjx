import { readFileSync, writeFileSync } from 'node:fs'
import { pinyin } from 'pinyin-pro'

const root = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')

const commonHrefs = new Set([
  'tools/base64/index.html', 'tools/json-formatter/index.html', 'tools/url-encoder/index.html',
  'tools/md5-generator/index.html', 'tools/jwt-decoder/index.html', 'tools/password-generator/index.html',
  'tools/word-counter/index.html', 'tools/text-diff/index.html', 'tools/calculator/index.html',
  'tools/percentage-calculator/index.html', 'tools/timestamp/index.html', 'tools/date-calculator/index.html',
  'tools/world-clock/index.html', 'tools/regex-tester/index.html', 'tools/uuid-generator/index.html',
  'tools/color-picker/index.html', 'tools/markdown-preview/index.html', 'tools/qr-generator/index.html',
  'tools/github-releases/index.html', 'tools/dns/index.html', 'tools/media/index.html', 'tools/random-generator/index.html'
])

const cardRe = /<a class="card" href="(tools\/[^"]+)" data-name="([^"]+)" data-cat="([^"]+)">([\s\S]*?)<\/a>/g
const icoRe = /<span class="ico">([^<]*)<\/span>/

const tools = []
let m
while ((m = cardRe.exec(root))) {
  const href = m[1]
  const name = m[2]
  const category = m[3]
  const icoM = m[4].match(icoRe)
  const icon = icoM ? icoM[1] : '🔧'
  let py = ''
  try { py = pinyin(name, { pattern: 'first', toneType: 'none', type: 'array' }).join('').toLowerCase() } catch (e) { py = '' }
  tools.push({ name, href, icon, category, py, common: commonHrefs.has(href) })
}

const seen = new Set()
const uniq = tools.filter(t => (seen.has(t.href) ? false : (seen.add(t.href), true)))

const categories = [
  { key: 'common', label: '常用', icon: '⭐' },
  { key: '单位换算', label: '单位换算', icon: '📐' },
  { key: '编码转换', label: '编码转换', icon: '🔢' },
  { key: '文本处理', label: '文本处理', icon: '📝' },
  { key: '数学·财务', label: '数学·财务', icon: '🧮' },
  { key: '时间与日期', label: '时间与日期', icon: '⏰' },
  { key: '开发工具', label: '开发工具', icon: '🛠️' },
  { key: '系统命令', label: '系统命令', icon: '🐧' },
  { key: '网络工具', label: '网络工具', icon: '🌐' },
  { key: '趣味娱乐', label: '趣味娱乐', icon: '🎲' },
  { key: '其他', label: '其他', icon: '📦' }
]

const out = `// 自动生成：由根 index.html 解析全部工具 + pinyin-pro 生成拼音首字母(py)
export const tools = ${JSON.stringify(uniq, null, 2)}

export const categories = ${JSON.stringify(categories, null, 2)}
`
writeFileSync(new URL('../src/data/tools.js', import.meta.url), out)
console.log('tools total:', uniq.length, '| common:', uniq.filter(t => t.common).length)
