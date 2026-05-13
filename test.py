import random
import math

# ==================== 原始数据（问题、权重、交叉表等）====================
questions = [
    {"id":1, "options":[
        {"scores":{"M":2,"D":1}}, {"scores":{"D":2,"P":1}},
        {"scores":{"P":2,"S":1}}, {"scores":{"V":2,"M":1}}
    ]},
    {"id":2, "options":[
        {"scores":{"M":2,"D":1}}, {"scores":{"S":2,"P":1}},
        {"scores":{"P":2,"D":1}}, {"scores":{"V":2,"S":1}}
    ]},
    {"id":3, "options":[
        {"scores":{"M":2,"S":1}}, {"scores":{"D":2,"M":1}},
        {"scores":{"P":2,"D":1}}, {"scores":{"V":2,"P":1}}
    ]},
    {"id":4, "options":[
        {"scores":{"M":2,"P":1}}, {"scores":{"D":2,"S":1}},
        {"scores":{"S":2,"V":1}}, {"scores":{"V":2,"M":1}}
    ]},
    {"id":5, "options":[
        {"scores":{"M":2,"S":1}}, {"scores":{"D":2,"P":1}},
        {"scores":{"S":2,"P":1}}, {"scores":{"V":2,"M":1}}
    ]},
    {"id":6, "options":[
        {"scores":{"M":2,"D":1}}, {"scores":{"D":2,"S":1}},
        {"scores":{"P":2,"D":1}}, {"scores":{"V":2,"S":1}}
    ]},
    {"id":7, "options":[
        {"scores":{"M":2,"P":1}}, {"scores":{"D":2,"P":1}},
        {"scores":{"S":2,"P":1}}, {"scores":{"V":2,"S":1}}
    ]},
    {"id":8, "options":[
        {"scores":{"M":2,"D":1}}, {"scores":{"P":2,"D":1}},
        {"scores":{"S":2,"V":1}}, {"scores":{"V":2,"M":1}}
    ]},
    {"id":9, "options":[
        {"scores":{"M":2,"V":1}}, {"scores":{"D":2,"S":1}},
        {"scores":{"V":2,"S":1}}, {"scores":{"S":2,"D":1}}
    ]},
    {"id":10, "options":[
        {"scores":{"M":2,"D":1}}, {"scores":{"P":2,"D":1}},
        {"scores":{"V":2,"S":1}}, {"scores":{"S":2,"P":1}}
    ]},
    {"id":11, "options":[
        {"scores":{"M":2,"D":1}}, {"scores":{"P":2,"S":1}},
        {"scores":{"S":2,"V":1}}, {"scores":{"V":2,"P":1}}
    ]},
    {"id":12, "options":[
        {"scores":{"M":2,"S":1}}, {"scores":{"D":2,"S":1}},
        {"scores":{"P":2,"D":1}}, {"scores":{"V":2,"S":1}}
    ]},
    {"id":13, "options":[
        {"scores":{"M":2,"P":1}}, {"scores":{"D":2,"P":1}},
        {"scores":{"S":2,"P":1}}, {"scores":{"V":2,"D":1}}
    ]},
    {"id":14, "options":[
        {"scores":{"M":2,"D":1}}, {"scores":{"P":2,"D":1}},
        {"scores":{"S":2,"D":1}}, {"scores":{"V":2,"S":1}}
    ]},
    {"id":15, "options":[
        {"scores":{"M":2,"S":1}}, {"scores":{"P":2,"D":1}},
        {"scores":{"S":2,"P":1}}, {"scores":{"V":2,"P":1}}
    ]},
    {"id":16, "options":[
        {"scores":{"M":2,"D":1}}, {"scores":{"P":2,"D":1}},
        {"scores":{"S":2,"P":1}}, {"scores":{"V":2,"S":1}}
    ]},
    {"id":17, "options":[
        {"scores":{"M":2,"S":1}}, {"scores":{"D":2,"P":1}},
        {"scores":{"S":2,"P":1}}, {"scores":{"V":2,"M":1}}
    ]},
    {"id":18, "options":[
        {"scores":{"M":2,"P":1}}, {"scores":{"D":2,"P":1}},
        {"scores":{"S":2,"P":1}}, {"scores":{"V":2,"S":1}}
    ]}
]

departmentWeights = {
    "能源与动力工程":     {"M": 6, "D": 5, "P": 7, "S": 7, "V": 8 },
    "机械工程":           {"M": 9, "D": 4, "P": 4, "S": 3, "V": 2 },
    "测控技术与仪器":     {"M": 6, "D": 7, "P": 6, "S": 4, "V": 2 },
    "工业工程":           {"M": 4, "D": 6, "P": 3, "S": 9, "V": 3 },
    "电气工程及其自动化": {"M": 4, "D": 7, "P": 7, "S": 7, "V": 5 },
    "微电子科学与工程":   {"M": 5, "D": 8, "P": 8, "S": 4, "V": 4 },
    "工程物理":           {"M": 3, "D": 7, "P": 9, "S": 5, "V": 7 },
    "材料科学与工程":     {"M": 8, "D": 3, "P": 7, "S": 2, "V": 3 },
    "软件工程":           {"M": 2, "D": 9, "P": 3, "S": 6, "V": 2 },
    "环境工程":           {"M": 5, "D": 5, "P": 5, "S": 7, "V": 9 },
    "集成电路":           {"M": 5, "D": 7, "P": 9, "S": 5, "V": 4 }
  };

crossDirections = {
    "机械工程-测控技术与仪器": "精密机械与智能装备",
    "机械工程-工业工程": "智能制造与生产系统",
    "能源与动力工程-电气工程及其自动化": "新型电力系统与能源互联网",
    "电气工程及其自动化-软件工程": "智能电网与电力信息",
    "工程物理-软件工程": "计算物理与核数据科学",
    "材料科学与工程-环境工程": "环境材料与绿色技术",
    "测控技术与仪器-软件工程": "智能感知与物联网",
    "工业工程-软件工程": "工业智能与数字化运营"
}

# Constants matching test.js
IC_P_THRESHOLD = 70
IC_D_THRESHOLD = 55
IC_X_THRESHOLD = 0.50
IC_SCORE_BOOST = 0.04
CROSS_PROB_BASE = 0.12
CROSS_PROB_X_COEF = 0.15
CROSS_PROB_D_COEF = 0.08
CROSS_DIFF_THRESHOLD = 0.06
CROSS_PROB_MIN = 0.10
CROSS_PROB_MAX = 0.30

# 确定性哈希函数（复现原 testpro.js 的 hashStringToUnitInterval）
def hash_string_to_unit(s):
    h = 2166136261
    for ch in s:
        h ^= ord(ch)
        h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) & 0xFFFFFFFF
    return (h & 0xFFFFFFFF) / 4294967295.0

# 交叉方向键生成
def get_cross_key(d1, d2):
    parts = sorted([d1, d2])
    return f"{parts[0]}-{parts[1]}"

# 模拟一次随机选择
def simulate_once():
    # 每题选项洗牌（与原引擎行为一致）
    shuffled_questions = []
    for q in questions:
        opts = q["options"][:]
        random.shuffle(opts)
        shuffled_questions.append(opts)

    raw_scores = {"M":0,"D":0,"P":0,"S":0,"V":0}
    # 随机选答案
    for opts in shuffled_questions:
        choice = random.choice(opts)
        for k, v in choice["scores"].items():
            raw_scores[k] = raw_scores.get(k, 0) + v

    dims = ["M", "D", "P", "S", "V"]

    # 归一化：用最大原始分作为100%基准（与 testpro.js 一致）
    max_raw = max(raw_scores[d] for d in dims)
    if max_raw <= 0:
        max_raw = 1
    scores = {d: round((raw_scores[d] / max_raw) * 100) for d in dims}

    # X维度 = 用户在 M/P 和 D/S 两对维度上的不偏程度
    mp_diff = abs(scores["M"] - scores["P"])
    ds_diff = abs(scores["D"] - scores["S"])
    X_norm = max(0, min(1, 1 - (mp_diff + ds_diff) / 200))

    # V_norm 用于V极端值调节
    V_norm = scores["V"] / 100

    # 专业匹配：加权余弦相似度
    matches = []
    for dept, prof in departmentWeights.items():
        vec_score = [scores["M"], scores["D"], scores["P"], scores["S"], scores["V"]]
        vec_prof = [prof["M"], prof["D"], prof["P"], prof["S"], prof["V"]]

        dot = 0
        norm_s = 0
        norm_p = 0
        for i in range(5):
            w = 1
            # V极端值调节
            if i == 4:  # V维度
                if V_norm > 0.55 and dept in ("环境工程", "能源与动力工程", "工程物理"):
                    w = 1.25
                elif V_norm < 0.25 and dept in ("软件工程", "机械工程"):
                    w = 0.85
            dot += vec_score[i] * vec_prof[i] * w
            norm_s += vec_score[i] * vec_score[i]
            norm_p += vec_prof[i] * vec_prof[i]

        cosine = dot / (math.sqrt(norm_s) * math.sqrt(norm_p)) if norm_s > 0 and norm_p > 0 else 0
        matches.append((dept, cosine))

    # 集成电路特殊门槛
    if scores["P"] >= IC_P_THRESHOLD and scores["D"] >= IC_D_THRESHOLD and X_norm >= IC_X_THRESHOLD:
        for i, (dept, sc) in enumerate(matches):
            if dept == "集成电路":
                matches[i] = (dept, sc + IC_SCORE_BOOST)
                break

    matches.sort(key=lambda x: x[1], reverse=True)

    # 交叉方向判定
    top1, top2 = matches[0], matches[1]
    diff = top1[1] - top2[1]
    rel_diff = diff / top1[1] if top1[1] > 0 else 1
    diff_factor = max(0, 1 - rel_diff / CROSS_DIFF_THRESHOLD)
    cross_prob = CROSS_PROB_BASE + X_norm * CROSS_PROB_X_COEF + diff_factor * CROSS_PROB_D_COEF
    if X_norm < 0.3:
        cross_prob *= 0.6
    if X_norm > 0.6:
        cross_prob = min(0.35, cross_prob * 1.3)
    cross_prob = max(CROSS_PROB_MIN, min(CROSS_PROB_MAX, cross_prob))

    # 确定性哈希种子
    seed_str = "|".join([
        top1[0], top2[0],
        get_cross_key(top1[0], top2[0]),
        f"{scores['M']:.4f}", f"{scores['D']:.4f}", f"{scores['P']:.4f}",
        f"{scores['S']:.4f}", f"{scores['V']:.4f}",
        f"{X_norm:.4f}"
    ])
    roll = hash_string_to_unit(seed_str)
    cross_key = get_cross_key(top1[0], top2[0])
    go_cross = (roll < cross_prob) and (cross_key in crossDirections)

    if go_cross:
        return crossDirections[cross_key]
    else:
        return top1[0]

# 蒙特卡洛
def monte_carlo(n=200000):
    counts = {}
    for _ in range(n):
        res = simulate_once()
        counts[res] = counts.get(res, 0) + 1
    print(f"总模拟次数: {n}")
    for k, v in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"{k:30s}: {v/n*100:.2f}%")

if __name__ == "__main__":
    monte_carlo(200000)
