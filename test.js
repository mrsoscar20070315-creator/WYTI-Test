// ============================================================================
//  WYTI 专业选择测试引擎  —  test.js
//  题目设计：MBTI式强迫选择法 + 大学生日常心理 + 轻松幽默风格
// ============================================================================

(function() {
  "use strict";

  const DIMENSION_LABELS = {
    M: { name: "实践制造力", icon: "🔧", color: "#f59e0b" },
    D: { name: "逻辑编程力", icon: "💻", color: "#0ea5e9" },
    P: { name: "数理理论力", icon: "⚛️", color: "#8b5cf6" },
    S: { name: "系统思维力", icon: "🌐", color: "#10b981" },
    V: { name: "社会价值感", icon: "🏛️", color: "#ec4899" }
  };

   const questions = [
    {
      id: 1, category: "空闲时间",
      text: "没课又没人管，你更倾向于？",
      options: [
        { text: "无体育，不清华！", scores: { M: 1.2 } },
        { text: "不可能学习的，打游戏上分、看比赛", scores: { D: 0.8, S: 0.5 } },
        { text: "进行一些形而上学的思考（家人们我们这么卷真的有意义吗）", scores: { P: 1.2 } },
        { text: "和不同的人“清谈”", scores: { X: 1 } }
      ]
    },
    {
      id: 2, category: "刷手机",
      text: "刷短视频更容易停在哪类？",
      options: [
        { text: "知识&科普（游戏知识技巧也算吧....?）", scores: { P: 1.2 } },
        { text: "数码测评&工具技巧，紧跟潮流", scores: { D: 1.2 } },
        { text: "社会热点&国家政策，青年大学习！", scores: { V: 1.2 } },
        { text: "什么逆天的都刷，来者不拒", scores: { X: 1 } }
      ]
    },
    {
      id: 3, category: "考前复习",
      text: "明天考试今晚复（yu）习，你倾向？",
      options: [
        { text: "先画框架再背重点", scores: { S: 1.2 } },
        { text: "搞懂原理才算会", scores: { P: 1.2, X: -0.5 } },
        { text: "刷题+总结套路", scores: { D: 1.2 } },
        { text: "找人一起互相讲", scores: { X: 0.8 } }
      ]
    },
    {
      id: 4, category: "聚会角色",
      text: "朋友聚会时，你更像是？",
      options: [
        { text: "张罗场地安排的人", scores: { M: 1, S: 0.8 } },
        { text: "活跃气氛搞抽象的（人民艺术家这一块）", scores: { X: 1 } },
        { text: "角落安静（阴暗）观察的", scores: { P: 1.2 } },
        { text: "组织大家积极参与活动的（真的不是为了积分吗）", scores: { S: 1.2, V: 0.3 } }
      ]
    },
    {
      id: 5, category: "搞砸时刻",
      text: "事情搞砸了/游戏输了，第一反应？",
      options: [
        { text: "哪里出问题了？复盘！", scores: { D: 1, P: 0.5 } },
        { text: "再来一次！我就不信了", scores: { M: 1.2 } },
        { text: "整体有问题，不是我一个人的锅", scores: { S: 1.2 } },
        { text: "或许方向本身就错了？（陷入思考）", scores: { X: 1.2 } }
      ]
    },
    {
      id: 6, category: "选课动机",
      text: "选一门课，最吸引你的是？",
      options: [
        { text: "能动手做项目，这可是宝贵的实践机会desuwa", scores: { M: 1.2 } },
        { text: "能搞懂底层原理，孩子们我们可是数理基础科学", scores: { P: 1.2, X: -0.5 } },
        { text: "和国策民生挂钩，我是时代新青年", scores: { V: 1.2 } },
        { text: "我去！多学科交叉新课，我高低得试试", scores: { X: 1.2 } }
      ]
    },
    {
      id: 7, category: "游戏风格",
      text: "打团队游戏游戏/团队合作时你更像哪种玩家？",
      options: [
        { text: "研究机制/执行具体工作（某种程度上，算科研？）", scores: { D: 1.2, P: 0.5 } },
        { text: "孩子们看我乱杀/孩子们看我执行", scores: { M: 1.2 } },
        { text: "听我指挥！全体目光向我看齐！", scores: { S: 1.2 } },
        { text: "什么类型都行（“我补位”）", scores: { X: 1.2 } }
      ]
    },
    {
      id: 8, category: "运动偏好",
      text: "有空运动（电竞），你更喜欢？（你别管你真不真的运动，无体育不清华就完事了）",
      options: [
        { text: "自己一个人的运动：游泳/跑步/MC", scores: { P: 0.8, X: -0.5 } },
        { text: "团队协作运动：篮球/足球/FPS", scores: { M: 1, S: 0.5 } },
        { text: "看比赛研究战术（别吵，我在烧烤）", scores: { D: 1, S: 0.8 } },
        { text: "或许，什么都试试？", scores: { X: 1.2 } }
      ]
    },
    {
      id: 9, category: "新东西",
      text: "听说一个很火的梗，你会？",
      options: [
        { text: "先搜来源搞清楚", scores: { P: 1.2 } },
        { text: "新梗？先玩为敬", scores: { M: 1.2 } },
        { text: "先看看大家都怎么玩这个梗", scores: { V: 1, S: 0.5 } },
        { text: "谨慎思考这个梗的广泛影响（我玩这个会不会不太好）", scores: { X: 1.2 } }
      ]
    },
    {
      id: 10, category: "满足感",
      text: "哪种成就感让你最爽？",
      options: [
        { text: "弄懂了很难的概念", scores: { P: 1.2 } },
        { text: "做出了好用的东西", scores: { M: 1.2 } },
        { text: "帮人解决了一个问题", scores: { V: 1.2 } },
        { text: "整了一个超级无敌好活", scores: { X: 1.2 } }
      ]
    },
    {
      id: 11, category: "周末安排",
      text: "理想周末怎么过？",
      options: [
        { text: "搞个项目/做志愿者（积累阅历啊）", scores: { M: 1, V: 0.8 } },
        { text: "宅着看书/刷视频（啥也不想干）", scores: { P: 1, D: 0.5 } },
        { text: "约朋友到处逛逛（男/女朋友？你赢了）", scores: { X: 1 } },
        { text: "规划下周/做整理（有考试当我没说）", scores: { S: 1.2 } }
      ]
    },
    {
      id: 12, category: "买装备",
      text: "买电子设备，你最在意？",
      options: [
        { text: "参数性能/跑分（数值，小子！）", scores: { D: 1.2, P: 0.5 } },
        { text: "做工质感/手感（贵气！）", scores: { M: 1.2 } },
        { text: "品牌生态/整体体验（库克：😁）", scores: { S: 1.2 } },
        { text: "国产化（支持国产！）", scores: { V: 1.2 } }
      ]
    },
    {
      id: 13, category: "小组作业",
      text: "小组作业里你更愿意？",
      options: [
        { text: "做PPT/写报告（确定不AI？）", scores: { D: 1, P: 0.5 } },
        { text: "做实物/拍视频", scores: { M: 1.2 } },
        { text: "分配任务管进度（这个放这里~那个放那里~啊这位置不错~）", scores: { S: 1.2 } },
        { text: "什么都能做一点", scores: { X: 1 } }
      ]
    },
    {
      id: 14, category: "深夜思考",
      text: "睡不着时会想什么？",
      options: [
        { text: "某个问题的解法（不是哥们，这也在学吗）", scores: { P: 1.2, X: -0.5 } },
        { text: "自己未来能干出些什么", scores: { M: 1.2 } },
        { text: "社会热点事件", scores: { V: 1.2 } },
        { text: "从百草园到宇宙尽头", scores: { X: 1.2 } }
      ]
    },
    {
      id: 15, category: "学习方法",
      text: "学新东西你更习惯？",
      options: [
        { text: "先搞懂底层原理（写板书ing）", scores: { P: 1.2, X: -0.5 } },
        { text: "边做边学会更快（先做作业不就知道哪里不会了吗）", scores: { M: 1.2 } },
        { text: "搭框架再填细节（这个东西本质上是.....）", scores: { S: 1.2 } },
        { text: "东看看西看看（我去，老师怎么就讲到这儿了）", scores: { X: 1.2 } }
      ]
    },
    {
      id: 16, category: "朋友求助",
      text: "朋友找你帮忙，你更擅长？",
      options: [
        { text: "写代码/算数据（编程大王）", scores: { D: 1.2 } },
        { text: "修东西/搭东西（？！强强！？）", scores: { M: 1.2 } },
        { text: "出主意/分析利弊（情感大师？）", scores: { S: 1.2 } },
        { text: "介绍别的领域资源（人脉！）", scores: { X: 1.2 } }
      ]
    },
    {
      id: 17, category: "超能力",
      text: "选一个超能力？",
      options: [
        { text: "看穿一切规律（那我问你）", scores: { P: 1.2 } },
        { text: "手搓任何物品（哆啦A梦来了）", scores: { M: 1.2 } },
        { text: "掌控人心（全是机制，没有数值）", scores: { S: 1.2 } },
        { text: "模仿他人的技能，但是模仿程度取值呈指数分布", scores: { X: 1.2 } }
      ]
    },
    {
      id: 18, category: "聊天话题",
      text: "和陌生人聊天，更容易聊到？",
      options: [
        { text: "技术/游戏/设备", scores: { D: 1, M: 0.5 } },
        { text: "社会热点/公共议题", scores: { V: 1.2, S: 0.5 } },
        { text: "梦到哪句说哪句", scores: { X: 1.2 } },
        { text: "不太主动聊", scores: { P: 0.8, X: -0.3 } }
      ]
    },
    {
      id: 19, category: "面对变化",
      text: "计划突然被打乱，你会？",
      options: [
        { text: "迅速调整新方案", scores: { D: 0.8, S: 0.8 } },
        { text: "有点烦但要掌控局面", scores: { S: 1.2 } },
        { text: "将错就错，顺势而为看看机会", scores: { X: 1.2 } },
        { text: "想搞清楚为什么变了，改变了什么", scores: { P: 1 } }
      ]
    },
    {
      id: 20, category: "终极选择",
      text: "大学四年最想带走的是？",
      options: [
        { text: "一身硬功夫（数理基础科学实至名归）", scores: { M: 1.2 } },
        { text: "看透本质的思考模式（我变强了,_ _ _ _ ）", scores: { P: 1.2 } },
        { text: "超强超强的领导力", scores: { S: 1.2 } },
        { text: "最好最好的同学们（人脉！）", scores: { X: 1.2 } }
      ]
    }
  ];


    // ==================== 专业权重表（V大幅降低 + 电气区分度提升 + 精仪/能动下调）====================
  const departmentWeights = {
    "能源与动力工程":     { M: 0.7, D: 0.5, P: 0.70, S: 0.70, V: 0.40 },
    "机械工程":           { M: 0.9, D: 0.4, P: 0.65, S: 0.50, V: 0.20 },
    "测控技术与仪器":     { M: 0.65, D: 0.60, P: 0.70, S: 0.50, V: 0.20 },
    "工业工程":           { M: 0.3, D: 0.65, P: 0.40, S: 0.85, V: 0.20 },
    "电气工程及其自动化": { M: 0.5, D: 0.55, P: 0.70, S: 0.70, V: 0.25 },
    "微电子科学与工程":   { M: 0.6, D: 0.80, P: 0.80, S: 0.50, V: 0.30 },
    "工程物理":           { M: 0.3, D: 0.75, P: 0.85, S: 0.55, V: 0.45 },
    "材料科学与工程":     { M: 0.9, D: 0.3, P: 0.75, S: 0.3, V: 0.35 },
    "软件工程":           { M: 0.2, D: 0.85, P: 0.3, S: 0.55, V: 0.15 },
    "环境工程":           { M: 0.6, D: 0.5, P: 0.55, S: 0.75, V: 0.50 },
    "集成电路":           { M: 0.65, D: 0.65, P: 0.80, S: 0.50, V: 0.30 }
  };

  const departmentDescriptions = {
    "能源与动力工程": "你关注国家能源安全与\"双碳\"目标，具备扎实的物理理论基础和系统宏观思维，愿意在清洁能源领域深耕，践行\"能动报国\"的使命。",
    "机械工程": "你拥有强大的空间想象能力和动手实践天赋，喜欢将想法变成实物，愿意从宏观框架中聚焦到具体的工程问题上，是先进制造的基石人才。",
    "测控技术与仪器": "你对\"光、电、测、控\"交叉领域充满兴趣，具备软硬件结合的能力，愿意在精密工程领域追求\"顶天立地、引领前沿\"的目标。",
    "工业工程": "你擅长系统性思维，喜欢从全局角度优化流程和系统，偏向数学建模与管理科学的\"软工科\"方向，让复杂系统运转得更好。",
    "电气工程及其自动化": "你对电力系统和电子技术都有浓厚兴趣，具备扎实的数理基础和编程能力，愿意在国家能源互联网建设中发挥协调与系统整合的作用。",
    "微电子科学与工程": "你对半导体物理和电路设计有深入理解，愿意挑战\"卡脖子\"技术，在芯片设计的数字与模拟世界中寻找创新突破。",
    "工程物理": "你怀有强烈的国家使命感，具备深厚的物理理论功底和数据分析能力，愿意在大科学装置和核能安全等国家战略领域贡献力量。",
    "材料科学与工程": "你喜欢在实验室中探索物质世界的奥秘，具备扎实的物理化学基础和极强的动手能力，愿意为新材料研发付出长期努力。",
    "软件工程": "你热爱编程，享受用代码构建系统的过程，具备良好的逻辑思维和创新意识，愿意在AI时代用软件技术赋能各行各业。",
    "环境工程": "你关注环境保护和可持续发展，具备系统思维和多学科交叉能力，愿意为解决环境问题、建设美丽中国贡献力量。",
    "集成电路": "你对半导体器件和芯片设计充满热情，兼具物理深度与编程能力，愿意投身国家急需的集成电路产业，在从设计到制造的全链条中贡献力量。"
  };

  const departmentGrowth = {
    "能源与动力工程": "继续夯实工程热物理和流体力学基础，多参与能源系统相关的科研项目，关注氢能、燃料电池等前沿方向，培养团队协作和工程实践能力。",
    "机械工程": "重点培养空间想象能力和动手实践能力，多参加\"心动计划\"、i-center课程等实践活动，学习AI辅助设计工具，关注智能制造和航空航天领域。",
    "测控技术与仪器": "打好光学、电子学、测控技术的基础课程，培养独立思考和动手调试能力，积极参与SRT项目，关注航天、医疗仪器、智能驾驶等应用方向。",
    "工业工程": "强化数学、编程和系统性思维能力，学习运筹学和仿真软件，关注物流系统、供应链优化、低空经济等国家战略需求领域。",
    "电气工程及其自动化": "扎实掌握电磁场、电路理论和编程能力，关注电力市场、新能源并网、储能技术等前沿方向，培养跨团队协作能力。",
    "微电子科学与工程": "重视微积分、线性代数和半导体物理基础，学习EDA工具，尽早接触科研项目，了解从设计到流片的完整流程，关注AI芯片和先进封装方向。",
    "工程物理": "打牢微积分、线性代数、数理方程等数学基础，培养ROOT、GEANT4等数据分析工具的使用能力，积极拥抱AI技术但不要依赖它，保持\"又红又专\"的初心。",
    "材料科学与工程": "重视物理化学基础和实验操作技能，多在实验室积累经验，培养耐心和长期投入的精神，关注新材料在能源、电子等领域的应用。",
    "软件工程": "扎实掌握数据结构、算法、操作系统等基础课程，同时尽早接触AI工具和前沿框架，培养全栈能力和创新思维，参与开源社区积累实践经验。",
    "环境工程": "建立化学、生物、物理的综合基础，培养环境监测和数据分析能力，关注\"双碳\"政策和水/大气/土壤污染治理技术，参与环境相关的社会实践。",
    "集成电路": "重视半导体物理和数字电路设计基础，学习Verilog/VHDL和EDA工具，尽早参与流片项目或开源芯片社区，关注先进工艺、AI芯片和国产替代方向。"
  };

  const crossDirections = {
    "机械工程-测控技术与仪器": {
      name: "精密机械与智能装备",
      description: "你兼具机械制造的实践功底和精密测控的系统思维。你适合精密仪器设计、高端装备制造、光刻机控制等方向——这是机械系和精仪系实际紧密交叉的前沿领域。",
      growth: "强化机械制图和光学/电子基础，培养精密机械设计能力，关注高端装备制造和航空航天领域的精密控制方向。"
    },
    "机械工程-工业工程": {
      name: "智能制造与生产系统",
      description: "你既爱动手做实物，又善于从系统角度优化流程。你适合智能制造系统、数字化工厂、生产自动化等方向——将工业工程的系统优化思维与机械制造的实践能力完美结合。",
      growth: "学习制造系统建模与仿真，培养数字化设计和工艺规划能力，关注工业4.0和智能制造前沿，参与生产系统优化项目。"
    },
    "能源与动力工程-电气工程及其自动化": {
      name: "新型电力系统与能源互联网",
      description: "你同时具备能源转换的物理理解和电力系统的宏观视野。你适合综合能源系统、分布式发电、微电网、能源互联网等方向——未来电力系统的核心交叉点。",
      growth: "深入理解能源转换和电力系统运行原理，学习能源系统建模与优化，关注新能源并网和储能系统集成技术。"
    },
    "电气工程及其自动化-软件工程": {
      name: "智能电网与电力信息",
      description: "你既有电气系统的专业基础，又具备强大的编程能力。你适合智能电网调度、电力系统AI、能源大数据分析、电力市场算法等前沿方向。",
      growth: "打好电气工程基础的同时强化编程能力，学习电力系统分析和AI算法，关注电力系统数字化转型和智能调度技术。"
    },
    "工程物理-软件工程": {
      name: "计算物理与核数据科学",
      description: "你拥有深厚的物理功底和出色的编程能力。你适合蒙特卡罗模拟、核数据处理、科学计算、AI for Science等方向——用大计算解决大科学问题。",
      growth: "精通C++/Python和科学计算库，学习GEANT4、ROOT等专业工具，培养物理建模和数值算法能力，关注高性能计算和AI辅助科研。"
    },
    "材料科学与工程-环境工程": {
      name: "环境材料与绿色技术",
      description: "你兼具材料研发能力和环境系统思维。你适合环境功能材料、污染治理材料、可降解材料、绿色催化等方向——用材料创新解决环境问题。",
      growth: "建立材料科学和环境科学的双重基础，培养材料设计和环境应用评价能力，关注环保材料和绿色制造技术前沿。"
    },
    "测控技术与仪器-软件工程": {
      name: "智能感知与物联网",
      description: "你兼具精密测控的硬件能力和软件编程能力。你适合传感器网络、物联网系统、智能感知、边缘计算等方向——万物互联时代的核心技术。",
      growth: "学习传感器原理和嵌入式系统开发，掌握物联网通信协议和云平台开发，参与智能感知系统设计项目。"
    },
    "工业工程-软件工程": {
      name: "工业智能与数字化运营",
      description: "你同时具备系统优化思维和软件开发能力。你适合工业互联网、供应链数字化、智能调度、流程挖掘等方向——制造业数字化转型的重要力量。",
      growth: "强化运筹学和数据分析能力，学习工业软件开发和企业系统架构，关注工业互联网平台和智能制造执行系统(MES)。"
    }
  };

  const departmentMotto = {
    "能源与动力工程": "自强不息，厚德载物",
    "机械工程": "自强不息，厚德载物",
    "测控技术与仪器": "自强不息，厚德载物",
    "工业工程": "自强不息，厚德载物",
    "电气工程及其自动化": "自强不息，厚德载物",
    "微电子科学与工程": "自强不息，厚德载物",
    "工程物理": "自强不息，厚德载物",
    "材料科学与工程": "自强不息，厚德载物",
    "软件工程": "自强不息，厚德载物",
    "环境工程": "自强不息，厚德载物",
    "集成电路": "自强不息，厚德载物"
  };

  const badgeMap = {
    "能源与动力工程":     "images/badges/energy.png",
    "机械工程":           "images/badges/mechanical.png",
    "测控技术与仪器":     "images/badges/instrument.png",
    "工业工程":           "images/badges/industrial.png",
    "电气工程及其自动化": "images/badges/electrical.png",
    "微电子科学与工程":   "images/badges/microelectronics.png",
    "工程物理":           "images/badges/engineering-physics.png",
    "材料科学与工程":     "images/badges/materials.png",
    "软件工程":           "images/badges/software.png",
    "环境工程":           "images/badges/environment.png",
    "集成电路":           "images/badges/integrated-circuit.png"
  };

  const crossBadgeMap = {
    "精密机械与智能装备":          ["images/badges/mechanical.png", "images/badges/instrument.png"],
    "智能制造与生产系统":          ["images/badges/mechanical.png", "images/badges/industrial.png"],
    "新型电力系统与能源互联网":    ["images/badges/energy.png", "images/badges/electrical.png"],
    "智能电网与电力信息":          ["images/badges/electrical.png", "images/badges/software.png"],
    "计算物理与核数据科学":        ["images/badges/engineering-physics.png", "images/badges/software.png"],
    "环境材料与绿色技术":          ["images/badges/materials.png", "images/badges/environment.png"],
    "智能感知与物联网":            ["images/badges/instrument.png", "images/badges/software.png"],
    "工业智能与数字化运营":        ["images/badges/industrial.png", "images/badges/software.png"]
  };

  const RADAR_MAX_PERCENT = 40;
  const CROSS_PROB_BASE   = 0.05;
  const CROSS_PROB_X_COEF = 0.10;
  const CROSS_PROB_D_COEF = 0.10;
  const CROSS_DIFF_THRESHOLD = 0.08;
  const CROSS_PROB_MIN = 0.10;
  const CROSS_PROB_MAX = 0.25;
  const X_NORM_MIN = -4;
  const X_NORM_MAX = 10;
  const IC_X_THRESHOLD = 0.35;
  const IC_SCORE_BOOST = 0.015;

  let currentQuestionIndex = 0;
  let userAnswers = new Array(questions.length).fill(null);
  let userScores = { M: 0, D: 0, P: 0, S: 0, V: 0, X: 0 };
  let shuffledQuestions = [];
  let lastResultData = null;

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function getCrossKey(dept1, dept2) {
    const sorted = [dept1, dept2].sort();
    return sorted[0] + "-" + sorted[1];
  }

  function switchPage(fromId, toId) {
    document.getElementById(fromId).classList.remove("active");
    document.getElementById(toId).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderQuestion(index) {
    currentQuestionIndex = index;
    const q = shuffledQuestions[index];
    document.getElementById("current-question").textContent = index + 1;
    document.getElementById("total-questions").textContent = questions.length;
    const progress = Math.round(((index + 1) / questions.length) * 100);
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("question-category").textContent = q.category || "";
    document.getElementById("question-text").textContent = q.text;
    const imgWrapper = document.getElementById("question-image-wrapper");
    const imgEl = document.getElementById("question-image");
    if (imgWrapper && imgEl && q.img) {
      imgEl.src = q.img; imgEl.alt = "问题" + q.id + "配图";
      imgWrapper.classList.remove("hidden");
    } else if (imgWrapper) { imgWrapper.classList.add("hidden"); }

    const container = document.getElementById("options-container");
    container.innerHTML = "";
    q.options.forEach((opt, i) => {
      const card = document.createElement("div");
      card.className = "option-card glass rounded-xl p-4 cursor-pointer";
      card.dataset.index = i;
      card.style.animationDelay = `${i * 40}ms`;
      card.classList.add("pop-in");
      card.innerHTML = `
        <div class="flex items-start">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-sky-400 text-white flex items-center justify-center font-semibold mr-4 flex-shrink-0 text-sm">
            ${String.fromCharCode(65 + i)}
          </div>
          <p class="text-gray-700 font-medium leading-relaxed">${opt.text}</p>
        </div>`;
      card.addEventListener("click", () => selectOption(i, opt.scores));
      container.appendChild(card);
    });
    if (userAnswers[index] !== null) {
      const cards = container.querySelectorAll(".option-card");
      if (cards[userAnswers[index]]) cards[userAnswers[index]].classList.add("selected");
    }
    document.getElementById("prev-button").disabled = (index === 0);
    const nextBtn = document.getElementById("next-button");
    nextBtn.innerHTML = index === questions.length - 1
      ? "查看结果 <i class=\"fas fa-check ml-2\"></i>"
      : "下一题 <i class=\"fas fa-arrow-right ml-2\"></i>";
  }

  window.showQuestion = function(index) {
    const stage = document.getElementById("question-content");
    if (!stage || stage.classList.contains("leaving")) {
      renderQuestion(index);
      return;
    }
    stage.classList.remove("entered", "entering");
    stage.classList.add("leaving");
    setTimeout(() => {
      renderQuestion(index);
      stage.classList.remove("leaving");
      stage.classList.add("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          stage.classList.remove("entering");
          stage.classList.add("entered");
        });
      });
    }, 170);
  };

  function selectOption(optionIndex, scores) {
    const container = document.getElementById("options-container");
    const cards = container.querySelectorAll(".option-card");
    cards.forEach(c => c.classList.remove("selected"));
    cards[optionIndex].classList.add("selected");
    cards[optionIndex].classList.remove("option-clicked");
    cards[optionIndex].offsetWidth;
    cards[optionIndex].classList.add("option-clicked");
    const prevIndex = userAnswers[currentQuestionIndex];
    if (prevIndex !== null && shuffledQuestions[currentQuestionIndex].options[prevIndex]) {
      const oldScores = shuffledQuestions[currentQuestionIndex].options[prevIndex].scores;
      for (let key in oldScores) userScores[key] = (userScores[key] || 0) - oldScores[key];
    }
    userAnswers[currentQuestionIndex] = optionIndex;
    for (let key in scores) userScores[key] = (userScores[key] || 0) + scores[key];
  }

  window.showPreviousQuestion = function() {
    if (currentQuestionIndex > 0) { currentQuestionIndex--; window.showQuestion(currentQuestionIndex); }
  };

  window.showNextQuestion = function() {
    if (currentQuestionIndex >= questions.length - 1) return true;
    currentQuestionIndex++; window.showQuestion(currentQuestionIndex); return false;
  };

  window.resetTest = function() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    userScores = { M: 0, D: 0, P: 0, S: 0, V: 0, X: 0 };
    lastResultData = null;
    shuffledQuestions = shuffleArray(questions).map(q => ({ ...q, options: shuffleArray(q.options) }));
    document.getElementById("progress-bar").style.width = "5%";
    if (window.radarChartInstance) { window.radarChartInstance.destroy(); window.radarChartInstance = null; }
  };

  function calculateResult() {
    const dimensions = ["M", "D", "P", "S", "V"];
    const total = Object.values(userScores).filter((_, i) => i < 5).reduce((a, b) => a + b, 0);
    const normalizedScores = {};
    dimensions.forEach(dim => {
      normalizedScores[dim] = total > 0 ? Math.max(0, userScores[dim] / total) : 0;
    });

        // V极端值调节：V只在极高/极低时影响权重，中间值不做"门槛"筛选
    const V_norm = normalizedScores.V || 0;
    const vBoostHigh = V_norm > 0.55 ? (V_norm - 0.55) * 2.0 : 0;  // V极高时的提升系数 0~0.9
    const vBoostLow  = V_norm < 0.12 ? (0.12 - V_norm) * 1.5 : 0;  // V极低时的提升系数 0~0.18

    const deptMatches = [];
    for (let dept in departmentWeights) {
      let matchScore = 0;
      const weights = departmentWeights[dept];
      for (let dim in weights) {
        let w = weights[dim];
        // V维度极端值动态加权
        if (dim === "V") {
          if (vBoostHigh > 0) {
            // V极高：冷门专业（环境）V权重大幅提升，国家战略专业中度提升
            if (dept === "环境工程") {
              w = Math.min(0.95, w * (1 + vBoostHigh * 2.5)); // 冷门：最大提升
            } else if (["电气工程及其自动化", "微电子科学与工程", "工程物理"].includes(dept)) {
              w = Math.min(0.65, w * (1 + vBoostHigh * 0.9)); // 国家战略：中度提升
            }
          }
          if (vBoostLow > 0) {
            // V极低：不惩罚任何专业（避免V缺失导致被排除），但略微提升低V依赖专业的竞争力
            if (["软件工程", "机械工程", "材料科学与工程"].includes(dept)) {
              w = w * (1 + vBoostLow * 0.5); // 轻微加成，帮助区分
            }
          }
        }
        matchScore += (normalizedScores[dim] || 0) * w;
      }
      deptMatches.push({ name: dept, score: matchScore });
    }

    const X_norm = Math.max(0, Math.min(1, (userScores.X - X_NORM_MIN) / (X_NORM_MAX - X_NORM_MIN)));
    if (X_norm > IC_X_THRESHOLD) {
      const icIndex = deptMatches.findIndex(d => d.name === "集成电路");
      const icRank = deptMatches.map((d, i) => ({ score: d.score, idx: i }))
        .sort((a, b) => b.score - a.score).findIndex(item => item.idx === icIndex);
      if (icRank >= 0 && icRank < 3) deptMatches[icIndex].score += IC_SCORE_BOOST;
    }
    deptMatches.sort((a, b) => b.score - a.score);

    const top1 = deptMatches[0], top2 = deptMatches[1];
    const diff = top1.score - top2.score;
    const relativeDiff = top1.score > 0 ? diff / top1.score : 1;

    let diffFactor = Math.max(0, 1 - relativeDiff / CROSS_DIFF_THRESHOLD);
    let crossProb = CROSS_PROB_BASE + X_norm * CROSS_PROB_X_COEF + diffFactor * CROSS_PROB_D_COEF;
    if (X_norm < 0.2) crossProb *= 0.7;
    if (X_norm > 0.5) crossProb = Math.min(0.30, crossProb * 1.2);
    crossProb = Math.max(CROSS_PROB_MIN, Math.min(CROSS_PROB_MAX, crossProb));

    let resultType, resultName, resultDesc, resultGrowth, matchedDepts = [];
    const crossKey = getCrossKey(top1.name, top2.name);
    const crossDir = crossDirections[crossKey];
    const shouldRecommendCross = (Math.random() < crossProb) && crossDir;

    if (shouldRecommendCross) {
      resultType = "cross"; resultName = crossDir.name;
      resultDesc = crossDir.description; resultGrowth = crossDir.growth;
      matchedDepts = [top1.name, top2.name];
    } else {
      resultType = "single"; resultName = top1.name;
      resultDesc = departmentDescriptions[top1.name];
      resultGrowth = departmentGrowth[top1.name];
      matchedDepts = [top1.name];
    }

    let minDim = dimensions[0], minScore = normalizedScores[dimensions[0]];
    dimensions.forEach(dim => {
      if (normalizedScores[dim] < minScore) { minScore = normalizedScores[dim]; minDim = dim; }
    });

    const dimGrowthMap = {
      "M": "尝试参加机械创新、机器人等动手实践项目，培养实验操作和空间想象能力。",
      "D": "加强编程训练，学习Python或C++，尝试用代码解决实际问题，参与开源项目。",
      "P": "夯实数理基础，重视物理和数学课程，多读科普和学术文献，培养物理直觉。",
      "S": "关注系统层面的问题，学习用全局视角分析复杂工程，阅读工业工程或管理学入门书籍。",
      "V": "多关注国家重大需求和工程技术背后的社会价值，参与能源环保相关的社会实践。"
    };

    // 定量分数：将原始归一化分乘以100转为0-100定量分（不再显示%）
    const quantitativeScores = {};
    dimensions.forEach(dim => {
      quantitativeScores[dim] = Math.round((normalizedScores[dim] || 0) * 100);
    });

    return {
      resultType, resultName, resultDesc, resultGrowth, matchedDepts,
      topMatches: deptMatches.slice(0, 5),
      normalizedScores, quantitativeScores,
      minDim, minScore,
      supplementaryAdvice: dimGrowthMap[minDim],
      _debug: { X_norm, crossProb, shouldRecommendCross, relativeDiff, IC_boosted: X_norm > IC_X_THRESHOLD }
    };
  }

  function renderStoryEnding(result) {
    const storyTitleEl = document.getElementById("story-title");
    const storyDescEl = document.getElementById("story-description");
    const storyTimelineEl = document.getElementById("story-timeline");
    if (!storyTitleEl || !storyDescEl || !storyTimelineEl) return;

    const dimOrder = ["M", "D", "P", "S", "V"];
    const sortedDims = dimOrder
      .map(key => ({ key, value: result.quantitativeScores[key] || 0 }))
      .sort((a, b) => b.value - a.value);
    const lead = sortedDims[0];
    const support = sortedDims[1];
    const leadName = DIMENSION_LABELS[lead.key].name;
    const supportName = DIMENSION_LABELS[support.key].name;
    const stageTitle = result.resultType === "cross"
      ? `🎬 双线结局已解锁：${result.resultName}`
      : `🎬 主线结局已解锁：${result.resultName}`;
    const roleMap = {
      M: "动手开荒型选手",
      D: "代码推进型选手",
      P: "原理洞察型选手",
      S: "全局调度型选手",
      V: "价值驱动型选手"
    };

    const timeline = [
      `【序章】你以 ${leadName}（${lead.value}/100）开局，自带 ${roleMap[lead.key]} 气质。`,
      `【转折】${supportName}（${support.value}/100）成为你的副技能，让你在复杂任务里更稳。`,
      `【终章】你最终点亮「${result.resultName}」方向，下一步建议是：${result.resultGrowth}`
    ];

    storyTitleEl.textContent = stageTitle;
    storyDescEl.textContent = `这不是唯一答案，但它很像你当前版本的“成长主线”。`;
    storyTimelineEl.innerHTML = timeline
      .map(item => `<div class="story-line-item">${item}</div>`)
      .join("");
  }

  // ==================== showResult() — 含院徽+院训+定量分数 ====================
  window.showResult = function() {
    const result = calculateResult();
    lastResultData = result;
    console.log("[WYTI Debug]", result._debug);

    const badgeEl = document.getElementById("result-badge");
    const crossDeptsEl = document.getElementById("result-cross-depts");
    const titleEl = document.getElementById("result-title");
    const descEl = document.getElementById("result-description");

    if (result.resultType === "cross") {
      badgeEl.innerHTML = "<span class=\"cross-tag\">🔄 交叉工程方向</span>";
      titleEl.textContent = result.resultName;
      crossDeptsEl.innerHTML = result.matchedDepts.map(d => `<span class="cross-tag">${d}</span>`).join("");
      crossDeptsEl.classList.remove("hidden");
    } else {
      badgeEl.innerHTML = "<span class=\"cross-tag\">🎯 推荐专业</span>";
      titleEl.textContent = result.resultName;
      crossDeptsEl.classList.add("hidden");
    }
    descEl.textContent = result.resultDesc;

    // 院徽展示（正方形 + 根据照片大小自动匹配）
    const badgeImgWrapper = document.getElementById("result-badge-img-wrapper");
    if (result.resultType === "cross") {
      const paths = crossBadgeMap[result.resultName];
      if (paths && paths.length >= 2) {
        badgeImgWrapper.innerHTML = `
          <img src="${paths[0]}" class="badge-img-cross-left"
               onerror="this.style.display='none';this.parentElement.querySelector('.fb-cross').style.display='flex'">
          <img src="${paths[1]}" class="badge-img-cross-right"
               onerror="this.style.display='none'">
          <div class="fb-cross" style="display:none">
            <div class="badge-fallback square"><span>${result.matchedDepts[0].charAt(0)}</span></div>
            <div class="badge-fallback square"><span>${result.matchedDepts[1].charAt(0)}</span></div>
          </div>`;
      }
    } else {
      const path = badgeMap[result.resultName];
      if (path) {
        badgeImgWrapper.innerHTML = `
          <img src="${path}" class="badge-img-single"
               onerror="this.style.display='none';this.parentElement.querySelector('.fb-single').style.display='flex'">
          <div class="fb-single" style="display:none">
            <div class="badge-fallback square large"><span>${result.resultName.charAt(0)}</span></div>
          </div>`;
      }
    }

    // 院训展示
    const mottoEl = document.getElementById("result-motto");
    const mottoForDisplay = result.resultType === "cross"
      ? (departmentMotto[result.matchedDepts[0]] || "自强不息，厚德载物")
      : (departmentMotto[result.resultName] || "自强不息，厚德载物");
    mottoEl.querySelector(".motto-text").textContent = mottoForDisplay;
    mottoEl.style.display = "block";

        // ==================== 五维相对强度条形图（相对最强维度 = 100%）====================
    const dimContainer = document.getElementById("dimensions-container");
    dimContainer.innerHTML = "";
    const dimOrder = ["M", "D", "P", "S", "V"];
    const maxScore = Math.max(...dimOrder.map(dim => result.quantitativeScores[dim]), 1);
    dimOrder.forEach(dim => {
      const val = result.quantitativeScores[dim]; // 原始定量分
      const relativePct = Math.round((val / maxScore) * 100); // 相对最强百分比
      const isStrongest = (val === maxScore);
      const info = DIMENSION_LABELS[dim];
      const row = document.createElement("div");
      row.innerHTML = `
        <div class="flex items-center mb-1">
          <span class="text-lg mr-2">${info.icon}</span>
          <span class="font-medium text-gray-700 w-24">${info.name}</span>
          <span class="font-bold text-primary-600 ml-auto">${isStrongest ? '🏆最强 ' : ''}${relativePct}%</span>
        </div>
        <div class="match-bar-bg">
          <div class="match-bar-fill dimension-bar" style="width: 0%" data-width="${relativePct}%"></div>
        </div>`;
      dimContainer.appendChild(row);
    });
    setTimeout(() => {
      dimContainer.querySelectorAll(".dimension-bar").forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 100);

    // 五维雷达图（max = 60）
    createRadarChart(dimOrder.map(dim => ({
      name: DIMENSION_LABELS[dim].name,
      value: result.quantitativeScores[dim]
    })));

    // Top 5 匹配度排行
    const topContainer = document.getElementById("top-matches-container");
    topContainer.innerHTML = "";
    result.topMatches.forEach((m, idx) => {
      const pct = Math.round(m.score * 1000) / 10;
      const isPrimary = idx === 0 || (result.resultType === "cross" && idx === 1);
      const row = document.createElement("div");
      row.className = "flex items-center";
      row.innerHTML = `
        <span class="w-32 md:w-40 text-sm font-medium text-gray-700 truncate">${m.name}</span>
        <div class="flex-1 match-bar-bg mx-3">
          <div class="match-bar-fill" style="width: 0%; opacity: ${isPrimary ? 1 : 0.6}" data-width="${pct}%"></div>
        </div>
        <span class="w-12 text-sm font-bold text-primary-600 text-right">${pct}%</span>`;
      topContainer.appendChild(row);
    });
    setTimeout(() => {
      topContainer.querySelectorAll(".match-bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 200);

    // 优势维度 Top 3
    const strengthsList = document.getElementById("strengths-list");
    strengthsList.innerHTML = "";
    const sortedDims = dimOrder.map(d => ({ key: d, val: result.quantitativeScores[d] }))
      .sort((a, b) => b.val - a.val).slice(0, 3);
    sortedDims.forEach(d => {
      const li = document.createElement("li");
      li.className = "flex items-center";
      li.innerHTML = `<span class="text-green-500 mr-2"><i class="fas fa-check-circle"></i></span>
        <span>${DIMENSION_LABELS[d.key].name} — ${d.val} / 100</span>`;
      strengthsList.appendChild(li);
    });

    // 发展建议
    const suggestionsList = document.getElementById("suggestions-list");
    suggestionsList.innerHTML = "";
    [result.resultGrowth, result.supplementaryAdvice].forEach(text => {
      const li = document.createElement("li");
      li.className = "flex items-start";
      li.innerHTML = `<span class="text-primary-500 mr-2 mt-1"><i class="fas fa-lightbulb"></i></span> <span>${text}</span>`;
      suggestionsList.appendChild(li);
    });

    // 补充建议
    const supBox = document.getElementById("supplementary-box");
    document.getElementById("supplementary-text").textContent =
      `你的最低维度是【${DIMENSION_LABELS[result.minDim].name}】。${result.supplementaryAdvice}`;
    supBox.classList.remove("hidden");

    renderStoryEnding(result);

    // 推荐专业卡片 Top 3
    const recContainer = document.getElementById("recommended-majors");
    recContainer.innerHTML = "";
    result.topMatches.slice(0, 3).forEach(m => {
      const weights = departmentWeights[m.name];
      const topDim = Object.keys(weights).reduce((a, b) => weights[a] > weights[b] ? a : b);
      const card = document.createElement("div");
      card.className = "glass rounded-xl p-5 text-center hover:shadow-lg transition";
      card.innerHTML = `
        <div class="text-3xl mb-3">${DIMENSION_LABELS[topDim].icon}</div>
        <h4 class="font-bold text-primary-700 mb-2">${m.name}</h4>
        <p class="text-xs text-gray-500">${departmentDescriptions[m.name].substring(0, 50)}...</p>`;
      recContainer.appendChild(card);
    });
  };

  function createRadarChart(dimensions) {
    const ctx = document.getElementById("radarChart").getContext("2d");
    if (window.radarChartInstance) { window.radarChartInstance.destroy(); }
    window.radarChartInstance = new Chart(ctx, {
      type: "radar",
      data: {
        labels: dimensions.map(d => d.name),
        datasets: [{
          label: "你的能力分布",
          data: dimensions.map(d => d.value),
          backgroundColor: "rgba(139, 92, 246, 0.2)",
          borderColor: "rgba(139, 92, 246, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(139, 92, 246, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(139, 92, 246, 1)"
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true, max: RADAR_MAX_PERCENT,
            ticks: { stepSize: Math.round(RADAR_MAX_PERCENT / 4), font: { size: 11 } },
            pointLabels: { font: { size: 13, weight: "600" }, color: "#374151" }
          }
        },
        plugins: { legend: { position: "bottom", labels: { font: { size: 13 } } } }
      }
    });
  }

  function getShareCardSubtitle(result, topDims) {
    if (result.resultType === "cross") {
      return `双向适配：${result.matchedDepts.join(" × ")}`;
    }
    return `高能标签：${topDims.map(dim => DIMENSION_LABELS[dim.key].name).join(" + ")}`;
  }

  function drawMultilineText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    let line = "";
    const lines = [];
    for (const char of text) {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth && line !== "") {
        lines.push(line);
        line = char;
      } else {
        line = test;
      }
      if (lines.length >= maxLines) break;
    }
    if (lines.length < maxLines && line) lines.push(line);
    const rendered = lines.slice(0, maxLines);
    rendered.forEach((item, idx) => {
      ctx.fillText(item, x, y + idx * lineHeight);
    });
  }

  function loadImageSafe(src) {
    return new Promise(resolve => {
      if (!src) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function drawRoundedImage(ctx, img, x, y, size, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + size - radius, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
    ctx.lineTo(x + size, y + size - radius);
    ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
    ctx.lineTo(x + radius, y + size);
    ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, size, size);
    ctx.restore();
  }

  function drawBadgeFallback(ctx, label, x, y, size) {
    const grad = ctx.createLinearGradient(x, y, x + size, y + size);
    grad.addColorStop(0, "#7c3aed");
    grad.addColorStop(1, "#38bdf8");
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 58px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((label || "W").charAt(0), x + size / 2, y + size / 2);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  }

  async function buildShareImageBlob(result) {
    const mascotImage = await loadImageSafe("images/mascot.png") || await loadImageSafe("images/mascot.svg");
    const primaryBadgePath = result.resultType === "cross"
      ? ((crossBadgeMap[result.resultName] && crossBadgeMap[result.resultName][0]) || "")
      : (badgeMap[result.resultName] || "");
    const secondaryBadgePath = result.resultType === "cross"
      ? ((crossBadgeMap[result.resultName] && crossBadgeMap[result.resultName][1]) || "")
      : "";
    const primaryBadgeImage = await loadImageSafe(primaryBadgePath) || await loadImageSafe("images/badges/default.svg");
    const secondaryBadgeImage = await loadImageSafe(secondaryBadgePath) || await loadImageSafe("images/badges/default.svg");

    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 1080;
        canvas.height = 1350;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("无法创建画布上下文");

        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, "#e0f2fe");
        grad.addColorStop(0.55, "#f3e8ff");
        grad.addColorStop(1, "#fdf4ff");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255,255,255,0.88)";
        ctx.fillRect(80, 90, canvas.width - 160, canvas.height - 180);

        const dimOrder = ["M", "D", "P", "S", "V"];
        const topDims = dimOrder
          .map(key => ({ key, value: result.quantitativeScores[key] || 0 }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 2);

        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 54px Inter, sans-serif";
        ctx.fillText("WYTI 未央专业选择测试", 140, 220);
        ctx.fillStyle = "#475569";
        ctx.font = "32px Inter, sans-serif";
        ctx.fillText("你的结局卡已生成", 140, 278);

        ctx.fillStyle = "#8b5cf6";
        ctx.font = "bold 64px Inter, sans-serif";
        drawMultilineText(ctx, result.resultName, 140, 410, 760, 78, 2);

        const badgeSize = 140;
        const badgeX = 820;
        const badgeY = 260;
        if (result.resultType === "cross") {
          ctx.save();
          ctx.translate(badgeX + 20, badgeY + 10);
          ctx.rotate(-0.08);
          if (primaryBadgeImage) {
            drawRoundedImage(ctx, primaryBadgeImage, -10, 0, badgeSize - 20, 18);
          } else {
            drawBadgeFallback(ctx, result.matchedDepts[0] || "交", -10, 0, badgeSize - 20);
          }
          ctx.restore();

          ctx.save();
          ctx.translate(badgeX + 90, badgeY + 40);
          ctx.rotate(0.08);
          if (secondaryBadgeImage) {
            drawRoundedImage(ctx, secondaryBadgeImage, 0, 0, badgeSize - 20, 18);
          } else {
            drawBadgeFallback(ctx, result.matchedDepts[1] || "叉", 0, 0, badgeSize - 20);
          }
          ctx.restore();
        } else if (primaryBadgeImage) {
          drawRoundedImage(ctx, primaryBadgeImage, badgeX, badgeY, badgeSize, 20);
        } else {
          drawBadgeFallback(ctx, result.resultName || "W", badgeX, badgeY, badgeSize);
        }

        ctx.fillStyle = "#334155";
        ctx.font = "30px Inter, sans-serif";
        drawMultilineText(ctx, getShareCardSubtitle(result, topDims), 140, 520, 760, 44, 2);

        ctx.fillStyle = "#0ea5e9";
        ctx.font = "bold 34px Inter, sans-serif";
        ctx.fillText("Top 能力标签", 140, 650);

        topDims.forEach((dim, idx) => {
          const y = 730 + idx * 100;
          const info = DIMENSION_LABELS[dim.key];
          ctx.fillStyle = "#1e293b";
          ctx.font = "600 32px Inter, sans-serif";
          ctx.fillText(`${info.icon} ${info.name}`, 140, y);
          ctx.fillStyle = "#6366f1";
          ctx.font = "bold 30px Inter, sans-serif";
          ctx.fillText(`${dim.value}/100`, 760, y);
        });

        ctx.fillStyle = "#334155";
        ctx.font = "28px Inter, sans-serif";
        drawMultilineText(ctx, `剧情一句话：${result.resultDesc}`, 140, 980, 800, 42, 4);

        if (mascotImage) {
          drawRoundedImage(ctx, mascotImage, 820, 1080, 140, 24);
        } else {
          const mx = 820;
          const my = 1080;
          const size = 140;
          const mGrad = ctx.createLinearGradient(mx, my, mx + size, my + size);
          mGrad.addColorStop(0, "#e0f2fe");
          mGrad.addColorStop(1, "#bae6fd");
          ctx.fillStyle = mGrad;
          ctx.fillRect(mx, my, size, size);
          ctx.fillStyle = "#0284c7";
          ctx.font = "bold 28px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("未小羊", mx + size / 2, my + size / 2);
          ctx.textAlign = "left";
          ctx.textBaseline = "alphabetic";
        }

        ctx.fillStyle = "#64748b";
        ctx.font = "24px Inter, sans-serif";
        ctx.fillText("生成于 WYTI 专业测试", 140, 1210);

        canvas.toBlob(blob => {
          if (!blob) {
            reject(new Error("生成图片失败"));
            return;
          }
          resolve(blob);
        }, "image/png");
      } catch (err) {
        reject(err);
      }
    });
  }

  window.generateShareImage = async function() {
    if (!lastResultData) return;
    const shareButton = document.getElementById("share-image-button");
    if (shareButton) {
      shareButton.disabled = true;
      shareButton.innerHTML = "<i class=\"fas fa-spinner fa-spin mr-2\"></i>生成中...";
    }
    try {
      const blob = await buildShareImageBlob(lastResultData);
      const filename = `WYTI-${Date.now()}.png`;
      const file = new File([blob], filename, { type: "image/png" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "WYTI 专业结局卡",
          text: `我的结局是：${lastResultData.resultName}`,
          files: [file]
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert("分享图已生成并下载到本地！");
      }
    } catch (err) {
      console.error(err);
      alert("分享图生成失败，请稍后再试。");
    } finally {
      if (shareButton) {
        shareButton.disabled = false;
        shareButton.innerHTML = "<i class=\"fas fa-image mr-2\"></i>一键生成分享图";
      }
    }
  };

  window.shareResults = function() {
    if (!lastResultData) return;
    const text = `我在WYTI专业选择测试中获得了推荐：${lastResultData.resultName}！快来看看你适合什么专业吧~`;
    if (navigator.share) {
      navigator.share({ title: "WYTI专业选择测试", text: text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text + " " + window.location.href)
        .then(() => alert("结果链接已复制到剪贴板！"))
        .catch(() => alert(text));
    }
  };

  // ==================== DOM 初始化 ====================
  document.addEventListener("DOMContentLoaded", function() {
    resetTest();
    document.getElementById("start-button").addEventListener("click", () => {
      switchPage("welcome-page", "question-page"); window.showQuestion(0);
    });
    document.getElementById("prev-button").addEventListener("click", window.showPreviousQuestion);
    document.getElementById("next-button").addEventListener("click", () => {
      if (userAnswers[currentQuestionIndex] === null) {
        const container = document.getElementById("options-container");
        container.style.animation = "none"; container.offsetHeight;
        container.style.animation = "shake 0.4s ease-in-out"; return;
      }
      if (window.showNextQuestion()) { switchPage("question-page", "result-page"); window.showResult(); }
    });
    document.getElementById("restart-button").addEventListener("click", () => {
      switchPage("result-page", "welcome-page"); window.resetTest();
    });
    document.getElementById("share-image-button").addEventListener("click", window.generateShareImage);
    document.getElementById("share-button").addEventListener("click", window.shareResults);
  });

  const shakeStyle = document.createElement("style");
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }`;
  document.head.appendChild(shakeStyle);

})();