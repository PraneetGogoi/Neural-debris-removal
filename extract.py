import os
from bs4 import BeautifulSoup

html_file = 'index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

chapters = [
    ('breach', 'Breach'),
    ('related', 'RelatedWork'),
    ('pipeline', 'Methodology'),
    ('console', 'Apparatus'),
    ('transplant', 'Experiment'),
    ('metric', 'Scoring'),
    ('spec', 'Spec'),
    ('results', 'Results'),
    ('limitations', 'Limitations')
]

os.makedirs('content', exist_ok=True)
os.makedirs('components/chapters', exist_ok=True)

for section_id, component_name in chapters:
    section = soup.find('section', id=section_id)
    if not section:
        continue
    
    # We already manually created Experiment.tsx with its custom logic, skip overwriting it
    if component_name == 'Experiment':
        continue
        
    # Extract the inner HTML of the section to go into MDX
    inner_html = ''.join(str(c) for c in section.contents).strip()
    
    # Convert 'class=' to 'className=' for React in the inner HTML (simple replace for now)
    inner_html = inner_html.replace(' class="', ' className="')
    inner_html = inner_html.replace(' class=\'', ' className=\'')
    inner_html = inner_html.replace(' tabindex="', ' tabIndex="')
    
    # Also need to handle closing tags for void elements like <img>, <input>, <hr>, <br> in MDX
    # For now, beautifulsoup might have already generated self-closing tags if we used xml parser, 
    # but html.parser doesn't.
    # Let's just write to MDX. NextJS MDX compiler handles basic HTML but strictly requires closing tags.
    # We will use BeautifulSoup with xml to enforce closing tags.
    inner_soup = BeautifulSoup(inner_html, 'html.parser')
    inner_xml = inner_soup.decode(formatter="html")
    
    # Manual void tag closure for MDX
    import re
    inner_xml = re.sub(r'<(img|br|hr|input|col|meta|link)([^>]*(?!/))>', r'<\1\2/>', inner_xml)
    
    # Some cleanup for React
    inner_xml = inner_xml.replace(' class="', ' className="')
    inner_xml = inner_xml.replace(' class=\'', ' className=\'')
    inner_xml = inner_xml.replace(' tabindex="', ' tabIndex="')

    
    with open(f'content/{section_id}.mdx', 'w', encoding='utf-8') as f:
        f.write(inner_xml)
        
    tsx_content = f"""import React from 'react';
import Content from '../../content/{section_id}.mdx';

export function {component_name}() {{
  return (
    <section className="chapter" id="{section_id}">
      <Content />
    </section>
  );
}}
"""
    with open(f'components/chapters/{component_name}.tsx', 'w', encoding='utf-8') as f:
        f.write(tsx_content)
        
print("Extraction complete.")
