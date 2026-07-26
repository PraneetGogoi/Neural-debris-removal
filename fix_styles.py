import os, re
import glob

def css_to_dict(css_str):
    styles = {}
    for rule in css_str.split(';'):
        if ':' in rule:
            key, val = rule.split(':', 1)
            key = key.strip()
            val = val.strip()
            # camelCase the key
            parts = key.split('-')
            if len(parts) > 1:
                key = parts[0] + ''.join(p.capitalize() for p in parts[1:])
            styles[key] = val
    # Format as React style dict string
    items = []
    for k, v in styles.items():
        if v.startswith('var('):
            items.append(f"{k}: '{v}'")
        elif v.replace('.', '', 1).isdigit():
            items.append(f"{k}: {v}")
        else:
            items.append(f"{k}: '{v}'")
    return "{{" + ", ".join(items) + "}}"

def replace_style(match):
    css_str = match.group(1)
    return "style=" + css_to_dict(css_str)

for file in glob.glob('content/*.mdx'):
    with open(file, 'r') as f:
        content = f.read()
    new_content = re.sub(r'style="([^"]*)"', replace_style, content)
    with open(file, 'w') as f:
        f.write(new_content)
