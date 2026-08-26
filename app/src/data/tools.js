export const categories = [
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

export const tools = [
  // 单位换算
  { name: '长度换算器', href: '../tools/length-converter/index.html', icon: '📏', category: '单位换算', py: 'cdhbq', common: true },
  { name: '重量换算器', href: '../tools/weight-converter/index.html', icon: '⚖️', category: '单位换算', py: 'zlhbq' },
  { name: '温度换算器', href: '../tools/temp-converter/index.html', icon: '🌡️', category: '单位换算', py: 'wdhbq' },
  { name: '面积换算器', href: '../tools/area-converter/index.html', icon: '🟦', category: '单位换算', py: 'mjhbq' },

  // 编码转换
  { name: '二维码生成器', href: '../tools/qr-generator/index.html', icon: '🔳', category: '编码转换', py: 'ewm', common: true },
  { name: 'Base64编解码', href: '../tools/base64/index.html', icon: '🔤', category: '编码转换', py: 'b64bmj', common: true },
  { name: 'URL编码', href: '../tools/url-encode/index.html', icon: '🔗', category: '编码转换', py: 'urlbm' },
  { name: 'Unicode转换', href: '../tools/unicode/index.html', icon: '🌟', category: '编码转换', py: 'unicodeszh' },
  { name: '十六进制转换', href: '../tools/hex/index.html', icon: '🔢', category: '编码转换', py: 'sljzh' },

  // 文本处理
  { name: '字数统计', href: '../tools/word-count/index.html', icon: '🔡', category: '文本处理', py: 'zstj', common: true },
  { name: '文本去重', href: '../tools/text-dedup/index.html', icon: '🧹', category: '文本处理', py: 'wbqc' },
  { name: '大小写转换', href: '../tools/case-convert/index.html', icon: '🔠', category: '文本处理', py: 'dxzzh' },
  { name: '正则测试', href: '../tools/regex-tester/index.html', icon: '🧪', category: '文本处理', py: 'zjcs' },
  { name: '文本替换', href: '../tools/text-replace/index.html', icon: '✂️', category: '文本处理', py: 'wbtjh' },

  // 数学·财务
  { name: '计算器', href: '../tools/calculator/index.html', icon: '🧮', category: '数学·财务', py: 'jsq', common: true },
  { name: '汇率换算', href: '../tools/exchange/index.html', icon: '💱', category: '数学·财务', py: 'hlhb' },
  { name: '复利计算', href: '../tools/compound/index.html', icon: '📈', category: '数学·财务', py: 'fljs' },
  { name: '百分比计算', href: '../tools/percent/index.html', icon: '➗', category: '数学·财务', py: 'bfbjsl' },
  { name: '质数判断', href: '../tools/prime/index.html', icon: '🔭', category: '数学·财务', py: 'zsph' },

  // 时间与日期
  { name: '时间戳转换', href: '../tools/timestamp/index.html', icon: '🕒', category: '时间与日期', py: 'sjmzh', common: true },
  { name: '倒计时', href: '../tools/countdown/index.html', icon: '⏳', category: '时间与日期', py: 'djs' },
  { name: '日期计算', href: '../tools/date-calc/index.html', icon: '📅', category: '时间与日期', py: 'rqjs', common: true },
  { name: '世界时间', href: '../tools/world-time/index.html', icon: '🌍', category: '时间与日期', py: 'sjsj' },

  // 开发工具
  { name: 'JSON格式化', href: '../tools/json-format/index.html', icon: '🧾', category: '开发工具', py: 'jsongsh', common: true },
  { name: '正则表达式测试', href: '../tools/regex/index.html', icon: '🧬', category: '开发工具', py: 'zzbdscs' },
  { name: '颜色拾取器', href: '../tools/color-picker/index.html', icon: '🎨', category: '开发工具', py: 'yssqq', common: true },
  { name: '代码压缩', href: '../tools/minify/index.html', icon: '🗜️', category: '开发工具', py: 'dmy' },
  { name: '进制转换', href: '../tools/radix/index.html', icon: '🔣', category: '开发工具', py: 'jzhzh' },

  // 系统命令
  { name: 'Ping测试', href: '../tools/ping/index.html', icon: '📡', category: '系统命令', py: 'pingcs' },
  { name: '端口扫描', href: '../tools/port-scan/index.html', icon: '🔍', category: '系统命令', py: 'dkms' },
  { name: '进程查看', href: '../tools/process/index.html', icon: '🧵', category: '系统命令', py: 'jcch' },

  // 网络工具
  { name: 'IP查询', href: '../tools/ip-lookup/index.html', icon: '🌐', category: '网络工具', py: 'ipcx', common: true },
  { name: '网速测试', href: '../tools/speed-test/index.html', icon: '🚀', category: '网络工具', py: 'wscs' },
  { name: '短链接生成', href: '../tools/short-url/index.html', icon: '🔗', category: '网络工具', py: 'dljsc' },
  { name: 'Whois查询', href: '../tools/whois/index.html', icon: '🏷️', category: '网络工具', py: 'whoiscx' },

  // 趣味娱乐
  { name: '掷骰子', href: '../tools/dice/index.html', icon: '🎲', category: '趣味娱乐', py: 'zz', common: true },
  { name: '随机抽签', href: '../tools/draw/index.html', icon: '🎴', category: '趣味娱乐', py: 'sjcc' },
  { name: '密码生成', href: '../tools/password/index.html', icon: '🔐', category: '趣味娱乐', py: 'mmch', common: true },
  { name: '抽奖转盘', href: '../tools/wheel/index.html', icon: '🎡', category: '趣味娱乐', py: 'cjzx' },

  // 其他
  { name: '待办清单', href: '../tools/todo/index.html', icon: '✅', category: '其他', py: 'dblb' },
  { name: '便签', href: '../tools/notes/index.html', icon: '📒', category: '其他', py: 'bj' },
  { name: 'Markdown预览', href: '../tools/markdown/index.html', icon: '📄', category: '其他', py: 'markdownyl' }
]
