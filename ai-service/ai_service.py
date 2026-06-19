# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Keywords mapped to each department
# # Department IDs must match what's in your MySQL department table
# DEPARTMENT_KEYWORDS = {
#     "Roads & Infrastructure": [
#         "road", "pothole", "footpath", "pavement", "bridge", "street",
#         "highway", "crack", "broken road", "divider", "speed bump",
#         "construction", "repair road", "tar", "gutter"
#     ],
#     "Water Supply": [
#         "water", "pipe", "leakage", "supply", "drinking water", "tap",
#         "drainage", "sewage", "overflow", "flood", "water tank",
#         "no water", "dirty water", "pipeline", "borewell", "pump"
#     ],
#     "Electricity": [
#         "light", "electricity", "power", "street light", "electric",
#         "wire", "pole", "transformer", "outage", "voltage", "no power",
#         "blackout", "short circuit", "bulb", "meter", "shock"
#     ],
#     "Sanitation & Waste": [
#         "garbage", "waste", "trash", "dustbin", "sweeping", "cleaning",
#         "dirt", "filth", "litter", "sanitation", "dump", "smell",
#         "hygiene", "toilet", "sewage", "drain"
#     ],
#     "Parks & Gardens": [
#         "park", "garden", "tree", "grass", "plant", "bench",
#         "playground", "green", "maintenance park", "flowers",
#         "cutting", "trimming", "fallen tree", "branches"
#     ],
#     "Traffic Management": [
#         "traffic", "signal", "jam", "congestion", "parking",
#         "zebra crossing", "accident", "speeding", "rash driving",
#         "no parking", "traffic light", "road block", "vehicle"
#     ]
# }

# # These IDs must match the order you inserted departments in MySQL
# # Run: SELECT * FROM department; to verify your IDs
# DEPT_ID_MAP = {
#     "Roads & Infrastructure": 1,
#     "Water Supply":           2,
#     "Electricity":            3,
#     "Sanitation & Waste":     4,
#     "Parks & Gardens":        5,
#     "Traffic Management":     6
# }


# def predict_department(text: str) -> str:
#     text_lower = text.lower()
#     scores = {}
#     for dept, keywords in DEPARTMENT_KEYWORDS.items():
#         scores[dept] = sum(1 for kw in keywords if kw in text_lower)

#     best_dept = max(scores, key=scores.get)
#     # If no keyword matched, default to Roads
#     if scores[best_dept] == 0:
#         best_dept = "Roads & Infrastructure"
#     return best_dept, scores[best_dept]


# @app.route('/predict-department', methods=['POST'])
# def predict():
#     data = request.get_json()
#     if not data or 'text' not in data:
#         return jsonify({'error': 'No text provided'}), 400

#     text = data['text']
#     dept_name, match_count = predict_department(text)
#     dept_id = DEPT_ID_MAP.get(dept_name, 1)

#     confidence = 'High' if match_count >= 2 else ('Medium' if match_count == 1 else 'Low')

#     return jsonify({
#         'department_name': dept_name,
#         'department_id':   dept_id,
#         'confidence':      confidence,
#         'keyword_matches': match_count
#     })


# @app.route('/health', methods=['GET'])
# def health():
#     return jsonify({'status': 'SmartCity AI Service Running!', 'port': 5000})


# if __name__ == '__main__':
#     print("Starting SmartCity AI Service on http://localhost:5000")
#     app.run(port=5000, debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import os

app = Flask(__name__)
CORS(app)

# -------------------------------
# Department Keywords
# -------------------------------
DEPARTMENT_KEYWORDS = {
    "Roads & Infrastructure": [
        "road", "pothole", "footpath", "pavement", "bridge", "street",
        "highway", "crack", "divider", "speed", "construction", "repair", "gutter"
    ],
    "Water Supply": [
        "water", "pipe", "leakage", "supply", "tap", "drainage",
        "overflow", "flood", "tank", "pipeline", "borewell", "pump"
    ],
    "Electricity": [
        "light", "electricity", "power", "wire", "pole",
        "transformer", "outage", "voltage", "blackout", "bulb"
    ],
    "Sanitation & Waste": [
        "garbage", "waste", "trash", "dustbin", "cleaning",
        "dirt", "filth", "litter", "dump", "smell", "toilet", "drain"
    ],
    "Parks & Gardens": [
        "park", "garden", "tree", "grass", "plant",
        "bench", "playground", "flowers", "trimming", "branches"
    ],
    "Traffic Management": [
        "traffic", "signal", "jam", "congestion", "parking",
        "zebra", "accident", "speeding", "vehicle", "roadblock"
    ]
}

# -------------------------------
# Department ID Mapping
# -------------------------------
DEPT_ID_MAP = {
    "Roads and Infrastructure": 1,
    "Water Supply":           2,
    "Electricity":            3,
    "Sanitation & Waste":     4,
    "Parks & Gardens":        5,
    "Traffic Management":     6
}

# -------------------------------
# TEXT CLEANING FUNCTION
# -------------------------------
def preprocess_text(text):
    text = text.lower()
    words = re.findall(r'\b\w+\b', text)   # extract words only
    return words


# -------------------------------
# PREDICTION FUNCTION (FIXED)
# -------------------------------
def predict_department(text: str):
    words = preprocess_text(text)

    scores = {}

    for dept, keywords in DEPARTMENT_KEYWORDS.items():
        score = 0

        for kw in keywords:
            if kw in words:
                score += 2   # strong match (exact word)
            elif kw in " ".join(words):
                score += 1   # weak match (partial)

        scores[dept] = score

    # sort by highest score
    sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    best_dept, best_score = sorted_scores[0]

    # ❌ REMOVE wrong defaulting
    if best_score == 0:
        return "Unknown", 0

    return best_dept, best_score


# -------------------------------
# API ROUTE
# -------------------------------
@app.route('/predict-department', methods=['POST'])
def predict():
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['text']

    dept_name, score = predict_department(text)

    dept_id = DEPT_ID_MAP.get(dept_name, None)

    # Confidence logic
    if score >= 3:
        confidence = "High"
    elif score == 2:
        confidence = "Medium"
    elif score == 1:
        confidence = "Low"
    else:
        confidence = "None"

    return jsonify({
        "department_name": dept_name,
        "department_id": dept_id,
        "confidence": confidence,
        "score": score
    })


# -------------------------------
# HEALTH CHECK
# -------------------------------
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'SmartCity AI Service Running!',
        'port': 5000
    })


# -------------------------------
# RUN SERVER
# -------------------------------
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    print(f"✅ SmartCity AI running on port {port}")
    app.run(host='0.0.0.0', port=port)