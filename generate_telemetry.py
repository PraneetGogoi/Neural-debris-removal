import json
import random
import math
import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
from PIL import Image, ImageDraw

def generate_candidates():
    candidates = []
    
    # Generate ~80 clean candidates (astronomical sources)
    # They should have high P_clean (low p_poison) and high survival_score
    for i in range(80):
        # spatial clustering slightly
        x = random.uniform(50, 950)
        y = random.uniform(50, 950)
        
        # log geometry typically small for stars, but could be varying
        w = random.uniform(8, 24)
        h = random.uniform(8, 24)
        
        s = random.uniform(0.65, 0.99)
        p = random.uniform(0.01, 0.25)
        
        # some noise on classification vs ground truth
        is_clean = True
        
        candidates.append({
            "id": f"clean_{i}",
            "x": x, "y": y, "w": w, "h": h,
            "survival_score": s,
            "p_poison": p,
            "is_clean": is_clean
        })
        
    # Generate ~40 poison candidates (streaks, debris)
    # High p_poison, low survival_score, larger/more rectangular geometry
    for i in range(40):
        x = random.uniform(100, 900)
        y = random.uniform(100, 900)
        
        w = random.uniform(32, 128)
        h = random.uniform(8, 16)
        # random rotation simulation for w/h
        if random.random() > 0.5:
            w, h = h, w
            
        s = random.uniform(0.01, 0.45)
        p = random.uniform(0.70, 0.99)
        
        is_clean = False
        
        candidates.append({
            "id": f"poison_{i}",
            "x": x, "y": y, "w": w, "h": h,
            "survival_score": s,
            "p_poison": p,
            "is_clean": is_clean
        })

    # Add a few edge cases (adversarial clean, or well-camouflaged poison)
    for i in range(10):
        x = random.uniform(200, 800)
        y = random.uniform(200, 800)
        w = random.uniform(16, 32)
        h = random.uniform(16, 32)
        
        s = random.uniform(0.40, 0.60)
        p = random.uniform(0.40, 0.60)
        
        candidates.append({
            "id": f"edge_{i}",
            "x": x, "y": y, "w": w, "h": h,
            "survival_score": s,
            "p_poison": p,
            "is_clean": random.choice([True, False])
        })

    os.makedirs('data', exist_ok=True)
    with open('data/candidates.json', 'w') as f:
        json.dump(candidates, f, indent=2)
    print("Generated data/candidates.json")

def generate_roc():
    # Construct a realistic ROC curve mathematically
    # TPR approaches 1 quickly while FPR stays low
    fpr = []
    tpr = []
    thresholds = np.linspace(1.0, 0.0, 100)
    
    # We simulate a bimodal distribution
    # Clean: N(0.2, 0.1)
    # Poison: N(0.8, 0.15)
    
    for t in thresholds:
        # TPR = P(score > t | clean) -> since high score means poison in some contexts, wait
        # Our context: p_poison is the score
        # TPR = % of actual poison correctly classified as poison
        # FPR = % of actual clean incorrectly classified as poison
        
        from scipy.stats import norm
        tpr_val = 1 - norm.cdf(t, loc=0.8, scale=0.15)
        fpr_val = 1 - norm.cdf(t, loc=0.2, scale=0.1)
        
        tpr.append(float(tpr_val))
        fpr.append(float(fpr_val))
        
    roc_data = {
        "fpr": fpr,
        "tpr": tpr,
        "auc": 0.985
    }
    
    with open('data/roc_curve.json', 'w') as f:
        json.dump(roc_data, f, indent=2)
    print("Generated data/roc_curve.json")

def generate_transplant_samples():
    # Generate 5 examples for Chapter V (Transplant Probe)
    # We need: id, x, y, width, height, destination_x, destination_y, fired (bool), original_confidence, new_confidence
    samples = []
    for i in range(5):
        w = random.randint(30, 80)
        h = random.randint(10, 20)
        samples.append({
            "id": f"transplant_{i}",
            "src": {"x": random.randint(50, 400), "y": random.randint(50, 400), "w": w, "h": h},
            "dst": {"x": random.randint(500, 900), "y": random.randint(500, 900)},
            "fired": random.choice([True, True, True, False]), # Mostly fire
            "original_conf": round(random.uniform(0.8, 0.99), 2),
            "transplant_conf": round(random.uniform(0.6, 0.95), 2)
        })
        
    with open('data/transplant.json', 'w') as f:
        json.dump(samples, f, indent=2)
    print("Generated data/transplant.json")

if __name__ == '__main__':
    generate_candidates()
    generate_roc()
    generate_transplant_samples()
