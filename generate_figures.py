import os
import numpy as np
import matplotlib.pyplot as plt

def generate_log_geometry():
    # log-geometry scatter (Fig 1.1)
    os.makedirs('public/figures', exist_ok=True)
    
    np.random.seed(42)
    # clean: smaller, distinct aspect ratios
    clean_w = np.random.normal(1.2, 0.4, 200)
    clean_h = np.random.normal(1.2, 0.4, 200)
    
    # poison: large patches (w: ~3-4, h: ~1-2)
    poison_w = np.random.normal(3.5, 0.5, 50)
    poison_h = np.random.normal(1.5, 0.3, 50)
    
    plt.figure(figsize=(6, 4), facecolor='#0a0b0e')
    ax = plt.gca()
    ax.set_facecolor('#0a0b0e')
    
    plt.scatter(clean_w, clean_h, s=15, c='#4c74a0', alpha=0.6, edgecolors='none', label='Celestial Candidate')
    plt.scatter(poison_w, poison_h, s=30, c='#e11d48', marker='x', alpha=0.8, label='Injected Patch')
    
    plt.xlabel('log(width)', color='#66625a', fontname='monospace')
    plt.ylabel('log(height)', color='#66625a', fontname='monospace')
    
    ax.spines['bottom'].set_color('#2a2b30')
    ax.spines['left'].set_color('#2a2b30')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.tick_params(colors='#66625a')
    
    leg = plt.legend(facecolor='#12141a', edgecolor='#2a2b30', labelcolor='#8f939e', prop={'family': 'monospace', 'size': 8})
    
    plt.tight_layout()
    plt.savefig('public/figures/log_geometry.svg', format='svg', transparent=True)
    plt.close()

def generate_poison_grid():
    # Fig 4.1 poison overlay grid
    fig, axes = plt.subplots(2, 4, figsize=(8, 4), facecolor='#0a0b0e')
    fig.subplots_adjust(wspace=0.1, hspace=0.1)
    
    for ax in axes.flatten():
        # generate a dark noisy background
        img = np.random.normal(0.1, 0.05, (64, 64))
        # add a streak
        for _ in range(5):
            img[np.random.randint(20, 44), np.random.randint(20, 44)] += 0.5
            
        ax.imshow(img, cmap='gray')
        
        # Draw a red bounding box for poison patch
        rect = plt.Rectangle((10, 20), 40, 10, linewidth=1, edgecolor='#e11d48', facecolor='none')
        ax.add_patch(rect)
        
        ax.axis('off')
        
    plt.savefig('public/figures/poison_grid.png', dpi=150, bbox_inches='tight', facecolor='#0a0b0e')
    plt.close()

def generate_transplant_crops():
    # Fig 5.1 transplant benchmark crops
    fig, axes = plt.subplots(1, 3, figsize=(9, 3), facecolor='#0a0b0e')
    
    for i, ax in enumerate(axes):
        img = np.random.normal(0.15, 0.05, (128, 128))
        
        # Source patch
        if i == 0:
            ax.set_title("Source Patch", color='#8f939e', fontname='monospace', size=10)
            img[40:60, 40:80] += 0.6
            rect = plt.Rectangle((40, 40), 40, 20, linewidth=1.5, edgecolor='#4c74a0', facecolor='none')
            ax.add_patch(rect)
            
        # Transplanted Patch
        else:
            ax.set_title(f"Dest {(i)*100}px", color='#8f939e', fontname='monospace', size=10)
            img[60:80, 20:60] += 0.6 # Transplanted!
            rect = plt.Rectangle((20, 60), 40, 20, linewidth=1.5, edgecolor='#e11d48', facecolor='none')
            ax.add_patch(rect)
            
            # Confidence score
            ax.text(20, 55, f"conf: {0.85 + np.random.normal(0, 0.05):.2f}", color='#e11d48', fontname='monospace', size=8)

        ax.imshow(img, cmap='gray')
        ax.axis('off')
        
    plt.tight_layout()
    plt.savefig('public/figures/transplant_crops.png', dpi=150, bbox_inches='tight', facecolor='#0a0b0e')
    plt.close()

if __name__ == '__main__':
    generate_log_geometry()
    generate_poison_grid()
    generate_transplant_crops()
