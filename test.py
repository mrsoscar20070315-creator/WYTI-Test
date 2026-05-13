import random
import hashlib

# ==================== 原始数据（问题、权重、交叉表等） ====================
questions = [
    # 题目格式：id, category, text, options (每项包含 text, scores)
    {"id":1, "options":[
        {"scores":{"M":1.2}}, {"scores":{"D":0.8,"S":0.5}},
        {"scores":{"P":1.2}}, {"scores":{"X":1}}
    ]},
    {"id":2, "options":[
        {"scores":{"P":1.2}}, {"scores":{"D":1.2}},
        {"scores":{"V":1.2}}, {"scores":{"X":1}}
    ]},
    {"id":3, "options":[
        {"scores":{"S":1.2}}, {"scores":{"P":1.2,"X":-0.5}},
        {"scores":{"D":1.2}}, {"scores":{"X":0.8}}
    ]},
    {"id":4, "options":[
        {"scores":{"M":1,"S":0.8}}, {"scores":{"X":1}},
        {"scores":{"P":1.2}}, {"scores":{"S":1.2,"V":0.3}}
    ]},
    {"id":5, "options":[
        {"scores":{"D":1,"P":0.5}}, {"scores":{"M":1.2}},
        {"scores":{"S":1.2}}, {"scores":{"X":1.2}}
    ]},
    {"id":6, "options":[
        {"scores":{"M":1.2}}, {"scores":{"P":1.2,"X":-0.5}},
        {"scores":{"V":1.2}}, {"scores":{"X":1.2}}
    ]},
    {"id":7, "options":[
        {"scores":{"D":1.2,"P":0.5}}, {"scores":{"M":1.2}},
        {"scores":{"S":1.2}}, {"scores":{"X":1.2}}
    ]},
    {"id":8, "options":[
        {"scores":{"P":0.8,"X":-0.5}}, {"scores":{"M":1,"S":0.5}},
        {"scores":{"D":1,"S":0.8}}, {"scores":{"X":1.2}}
    ]},
    {"id":9, "options":[
        {"scores":{"P":1.2}}, {"scores":{"M":1.2}},
        {"scores":{"V":1,"S":0.5}}, {"scores":{"X":1.2}}
    ]},
    {"id":10, "options":[
        {"scores":{"P":1.2}}, {"scores":{"M":1.2}},
        {"scores":{"V":1.2}}, {"scores":{"X":1.2}}
    ]},
    {"id":11, "options":[
        {"scores":{"M":1,"V":0.8}}, {"scores":{"P":1,"D":0.5}},
        {"scores":{"X":1}}, {"scores":{"S":1.2}}
    ]},
    {"id":12, "options":[
        {"scores":{"D":1.2,"P":0.5}}, {"scores":{"M":1.2}},
        {"scores":{"S":1.2}}, {"scores":{"V":1.2}}
    ]},
    {"id":13, "options":[
        {"scores":{"D":1,"P":0.5}}, {"scores":{"M":1.2}},
        {"scores":{"S":1.2}}, {"scores":{"X":1}}
    ]},
    {"id":14, "options":[
        {"scores":{"P":1.2,"X":-0.5}}, {"scores":{"M":1.2}},
        {"scores":{"V":1.2}}, {"scores":{"X":1.2}}
    ]},
    {"id":15, "options":[
        {"scores":{"P":1.2,"X":-0.5}}, {"scores":{"M":1.2}},
        {"scores":{"S":1.2}}, {"scores":{"X":1.2}}
    ]},
    {"id":16, "options":[
        {"scores":{"D":1.2}}, {"scores":{"M":1.2}},
        {"scores":{"S":1.2}}, {"scores":{"X":1.2}}
    ]},
    {"id":17, "options":[
        {"scores":{"P":1.2}}, {"scores":{"M":1.2}},
        {"scores":{"S":1.2}}, {"scores":{"X":1.2}}
    ]},
    {"id":18, "options":[
        {"scores":{"D":1,"M":0.5}}, {"scores":{"V":1.2,"S":0.5}},
        {"scores":{"X":1.2}}, {"scores":{"P":0.8,"X":-0.3}}
    ]},
    {"id":19, "options":[
        {"scores":{"D":0.8,"S":0.8}}, {"scores":{"S":1.2}},
        {"scores":{"X":1.2}}, {"scores":{"P":1}}
    ]},
    {"id":20, "options":[
        {"scores":{"M":1.2}}, {"scores":{"P":1.2}},
        {"scores":{"S":1.2}}, {"scores":{"X":1.2}}
    ]}
]

departmentWeights = {
    "能源与动力工程":     {"M":0.7,  "D":0.5,  "P":0.70, "S":0.70, "V":0.40},
    "机械工程":           {"M":0.9,  "D":0.4,  "P":0.65, "S":0.50, "V":0.20},
    "测控技术与仪器":     {"M":0.65, "D":0.60, "P":0.70, "S":0.50, "V":0.20},
    "工业工程":           {"M":0.3,  "D":0.65, "P":0.40, "S":0.85, "V":0.20},
    "电气工程及其自动化": {"M":0.5,  "D":0.55, "P":0.70, "S":0.70, "V":0.25},
    "微电子科学与工程":   {"M":0.6,  "D":0.80, "P":0.80, "S":0.50, "V":0.30},
    "工程物理":           {"M":0.3,  "D":0.75, "P":0.85, "S":0.55, "V":0.45},
    "材料科学与工程":     {"M":0.9,  "D":0.3,  "P":0.75, "S":0.3,  "V":0.35},
    "软件工程":           {"M":0.2,  "D":0.85, "P":0.3,  "S":0.55, "V":0.15},
    "环境工程":           {"M":0.6,  "D":0.5,  "P":0.55, "S":0.75, "V":0.50},
    "集成电路":           {"M":0.65, "D":0.65, "P":0.80, "S":0.50, "V":0.30}
}

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

# 确定性哈希函数（复现原 test.js 的 hashStringToUnitInterval）
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
        opts = q["options"][:]  # shallow copy
        random.shuffle(opts)
        shuffled_questions.append(opts)

    scores = {"M":0,"D":0,"P":0,"S":0,"V":0,"X":0}
    # 随机选答案
    for opts in shuffled_questions:
        choice = random.choice(opts)
        for k, v in choice["scores"].items():
            scores[k] = scores.get(k,0) + v

    # 归一化
    total = sum(scores[d] for d in ["M","D","P","S","V"])
    norm = {d: max(0, scores[d]/total) if total>0 else 0 for d in ["M","D","P","S","V"]}
    X_norm = max(0, min(1, (scores["X"] - (-4)) / (10 - (-4))))

    # V极端调整
    V_norm = norm["V"]
    vBoostHigh = max(0, (V_norm - 0.55) * 2.0) if V_norm > 0.55 else 0
    vBoostLow  = max(0, (0.12 - V_norm) * 1.5) if V_norm < 0.12 else 0

    dept_matches = []
    for dept, w in departmentWeights.items():
        match = 0
        for dim in ["M","D","P","S","V"]:
            weight = w[dim]
            if dim == "V":
                if vBoostHigh > 0:
                    if dept == "环境工程":
                        weight = min(0.95, weight * (1 + vBoostHigh * 2.5))
                    elif dept in ["电气工程及其自动化","微电子科学与工程","工程物理"]:
                        weight = min(0.65, weight * (1 + vBoostHigh * 0.9))
                if vBoostLow > 0:
                    if dept in ["软件工程","机械工程","材料科学与工程"]:
                        weight *= (1 + vBoostLow * 0.5)
            match += norm[dim] * weight
        dept_matches.append((dept, match))

    # IC 加成
    sorted_matches = sorted(dept_matches, key=lambda x: x[1], reverse=True)
    ic_idx = next(i for i,(d,_) in enumerate(sorted_matches) if d=="集成电路")
    if X_norm > 0.35 and ic_idx < 3:
        for i,(d,sc) in enumerate(dept_matches):
            if d == "集成电路":
                dept_matches[i] = (d, sc+0.015)
                break
    sorted_matches = sorted(dept_matches, key=lambda x: x[1], reverse=True)

    top1, top2 = sorted_matches[0], sorted_matches[1]
    diff = top1[1] - top2[1]
    relativeDiff = diff / top1[1] if top1[1] > 0 else 1
    diffFactor = max(0, 1 - relativeDiff / 0.08)
    pCross = 0.05 + X_norm * 0.10 + diffFactor * 0.10
    pCross = max(0.10, min(0.25, pCross))

    # 交叉判定哈希种子
    seed_str = "|".join([
        top1[0], top2[0],
        get_cross_key(top1[0], top2[0]),
        f"{norm['M']:.4f}", f"{norm['D']:.4f}", f"{norm['P']:.4f}",
        f"{norm['S']:.4f}", f"{norm['V']:.4f}",
        f"{X_norm:.4f}"
    ])
    roll = hash_string_to_unit(seed_str)
    cross_key = get_cross_key(top1[0], top2[0])
    go_cross = (roll < pCross) and (cross_key in crossDirections)

    if go_cross:
        return crossDirections[cross_key]
    else:
        return top1[0]

# 蒙特卡洛
def monte_carlo(n=200000):
    counts = {}
    for _ in range(n):
        res = simulate_once()
        counts[res] = counts.get(res,0) + 1
    print(f"总模拟次数: {n}")
    for k, v in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"{k:30s}: {v/n*100:.2f}%")

if __name__ == "__main__":
    monte_carlo(200000)