import glob
import re

for file in glob.glob('content/*.mdx'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace <p> and <p ...> with <div ...>
    # Note: re.sub with function to handle both opening and closing tags correctly is better.
    # Actually, we can just replace all <p> and <p ...> with <div> and <div ...>
    content = re.sub(r'<p(\s[^>]*|)>', r'<div\1>', content)
    content = content.replace('</p>', '</div>')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Changed <p> to <div> to fix hydration errors.")
