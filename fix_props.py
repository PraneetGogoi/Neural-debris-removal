import glob
import re

for file in glob.glob('content/*.mdx'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # BeautifulSoup lowercased everything, so className became classname
    content = content.replace('classname="', 'className="')
    content = content.replace("classname='", "className='")
    
    # tabIndex
    content = content.replace('tabindex="', 'tabIndex="')
    content = content.replace("tabindex='", "tabIndex='")
    
    # htmlFor (if any labels)
    content = content.replace('for="', 'htmlFor="')
    content = content.replace("for='", "htmlFor='")
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed React DOM property names.")
