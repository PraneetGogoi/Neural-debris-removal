import glob
import re

for file in glob.glob('content/*.mdx'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to escape { and } EXCEPT when they are part of style={{...}}
    # Let's temporarily hide style={{...}}
    def repl_hide(m):
        return m.group(0).replace('{', '___LBRACE___').replace('}', '___RBRACE___')
    
    # Hide style={{...}}
    content = re.sub(r'style=\{\{[^\}]+\}\}', repl_hide, content)
    
    # Now escape remaining { and }
    content = content.replace('{', '\\{').replace('}', '\\}')
    
    # Restore style={{...}}
    content = content.replace('___LBRACE___', '{').replace('___RBRACE___', '}')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Escaped LaTeX braces in MDX.")
