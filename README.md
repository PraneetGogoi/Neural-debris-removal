# Neural Debris Removal in Streak Detection Models

An investigative forensic study and defense program targeting localized data-poisoning backdoors in single-stage dense object detectors (RetinaNet + FPN) for astronomical streak detection.

---

## 🌌 Overview

Modern astronomical surveys rely on automated dense object detectors to identify satellite streaks and celestial debris. This digital thesis investigates how spatial backdoor attacks can corrupt feature pyramid networks (FPN) to hallucinate high-confidence **phantom streaks** when triggered by physical visual patterns, and introduces an end-to-end diagnostic and forensic framework to detect, isolate, and neutralize these backdoors without full model retraining.

## ✨ Key Contributions

1. **Diagnostic Transplant Probe (§ V):**
   - A surgical input-probing methodology that crops suspected visual triggers and transplants them onto clean background scenes to measure empirical trigger portability and decoupling from localized context.

2. **Diagnostic Machine Unlearning Ensemble (§ VI):**
   - Freezing backbone representations while fine-tuning only the classification head across an ensemble of learning rates and random seeds. This exposes unstable poisoned bounding boxes via rapid survival divergence while robustly retaining clean astronomical detections.

3. **Surrogate maCADD Survival Scoring (§ VI):**
   - Optimal bipartite matching using the Hungarian algorithm between predicted candidate bounding boxes and clean reference annotations to compute survival survival and geometric stability.

4. **Confidence Calibration & Epsilon Demotion (§ VIII):**
   - Rather than applying hard threshold deletion that risks discarding plausible ambiguous celestial events, our post-processing program demotes identified backdoor candidates to smooth epsilon noise levels ($\epsilon = 10^{-4}$), preserving open-set calibration.

5. **Interactive Digital Thesis Web App (`neural-debris-removal.html`):**
   - A state-of-the-art interactive digital thesis featuring a floating glass pill navbar, reading progress tracking, live interactive parameter simulation consoles, and mathematical rendering via KaTeX.

---

## 📁 Repository Structure

```text
├── debris.ipynb               # Full end-to-end PyTorch / Detectron2 pipeline & experiments
├── neural-debris-removal.html # Interactive digital thesis & interactive simulation web app
├── neural-debris-removal.pdf  # Compiled thesis paper PDF
├── sample_submission.csv      # Baseline submission predictions format
└── README.md                  # Project overview
```

---

## 🛠️ Getting Started

### Running the Digital Thesis Web App
Open `neural-debris-removal.html` directly in any modern web browser to view the interactive paper, live telemetry apparatus, and forensic visualization tools.

### Running the Experimental Pipeline
The experimental code is structured in Jupyter Notebook format (`debris.ipynb`). Ensure you have PyTorch, Detectron2, OpenCV, and NumPy installed:

```bash
pip install torch torchvision numpy opencv-python jupyter
```

*Note on Apple Silicon (macOS): The pipeline is configured to automatically utilize `mps` or `cpu` fallback if CUDA is unavailable.*

---

## 📚 References & Literature

- **Focal Loss & FPN:** Lin et al. (ICCV 2017 / CVPR 2017)
- **Spatial Backdoors in Detectors:** Chan et al. (BibaNet, TIFS 2022), Luo et al. (AAAI 2023)
- **Neural Forensics & Probing:** Wang et al. (Neural Cleanse, S&P 2019), Gao et al. (STRIP, ACSAC 2019)
- **Machine Unlearning:** Bourtoule et al. (S&P 2021), Golatkar et al. (CVPR 2020), Kurmanji et al. (SCRUB, ICLR 2023)
- **Bipartite Assignment:** Kuhn (Hungarian Method, 1955)

---
*Typeset & engineered with precision · `random_state = 42`*
