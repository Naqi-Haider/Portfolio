import os
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def build_pdf():
    pdf_path = r"d:\Projects\Portfolio\public\Naqi_Haider_CV.pdf"
    
    # A4 size is 595 x 842 points
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom colors
    charcoal = colors.HexColor('#4A4A4A')
    slate_blue = colors.HexColor('#6D8196')
    silver = colors.HexColor('#CBCBCB')
    
    # Custom ParagraphStyles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=21,
        alignment=1, # Center
        textColor=charcoal
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=13,
        alignment=1, # Center
        textColor=slate_blue
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        alignment=1, # Center
        textColor=charcoal
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=charcoal,
        spaceBefore=8,
        spaceAfter=2
    )
    
    job_title = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=charcoal
    )
    
    job_meta = ParagraphStyle(
        'JobMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=slate_blue,
        alignment=2 # Right
    )
    
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=charcoal,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=charcoal,
        spaceAfter=4
    )
    
    story = []
    
    # --- Header ---
    story.append(Paragraph("MUHAMMAD NAQI HAIDER", name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Software Engineer | Full-Stack Developer", subtitle_style))
    story.append(Spacer(1, 3))
    
    contact_text = "Sheikhupura, Pakistan  |  +92 3091010431  |  naqi073@gmail.com"
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 2))
    
    links_text = '<a href="https://www.linkedin.com/in/m-naqi-haider-8b6772322" color="#6D8196">LinkedIn Profile</a>  |  <a href="https://github.com/Naqi-Haider" color="#6D8196">GitHub Profile</a>'
    story.append(Paragraph(links_text, contact_style))
    story.append(Spacer(1, 10))
    
    # Divider helper
    def add_section_divider(title):
        story.append(Paragraph(title, section_heading))
        t = Table([['']], colWidths=[523], rowHeights=[0.5])
        t.setStyle(TableStyle([
            ('LINEBELOW', (0,0), (-1,-1), 0.75, silver),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(t)
        story.append(Spacer(1, 5))
        
    def get_job_header(title, date_location):
        t = Table([[Paragraph(title, job_title), Paragraph(date_location, job_meta)]], colWidths=[370, 153])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'BOTTOM'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        return t

    # --- Professional Summary ---
    add_section_divider("PROFESSIONAL SUMMARY")
    summary_text = (
        "Versatile Web Developer with 3+ years of experience crafting responsive interfaces and "
        "1 year of specialized Shopify Theme development. Proven ability to bridge the gap between "
        "custom code and e-commerce functionality to enhance site performance. Dedicated to delivering "
        "scalable, pixel-perfect solutions that drive user engagement and business growth."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))
    
    # --- Work Experience ---
    add_section_divider("WORK EXPERIENCE")
    
    # Axiolink Systems
    story.append(get_job_header("Software Engineer Intern | Axiolink Systems", "March 2026 – June 2026"))
    story.append(Paragraph("• Engineered frontend and backend features for a multi-vendor AI-solutions startup system using Next.js and Node.js.", bullet_style))
    story.append(Paragraph("• Built scalable RESTful API endpoints and integrated mapping controls utilizing OSRM (Open Source Routing Machine) on the backend.", bullet_style))
    story.append(Paragraph("• Designed and implemented pixel-perfect dashboard user flows for both administrator and buyer dashboard consoles.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Shopify Developer
    story.append(get_job_header("Freelance Shopify Theme Developer | Remote / Self-Employed", "September 2025 – Present"))
    story.append(Paragraph("• Engineered custom Shopify storefronts using Liquid and JavaScript, delivering pixel-perfect conversions from Figma designs.", bullet_style))
    story.append(Paragraph("• Optimized store speeds and resolved theme conflicts, ensuring a seamless user experience for diverse e-commerce clients.", bullet_style))
    story.append(Paragraph("• Managed end-to-end project lifecycles, from requirement gathering to final deployment and handover.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Game Developer
    story.append(get_job_header("Freelance Game Developer (Unity) | Remote / Fiverr", "October 2023 – May 2025"))
    story.append(Paragraph("• Developed robust 2D and 3D game mechanics using C# and Unity Engine, translating client concepts into playable prototypes and final builds.", bullet_style))
    story.append(Paragraph("• Designed and scripted interactive user interfaces (menus, HUDs, and inventory systems) to enhance player navigation and engagement.", bullet_style))
    story.append(Spacer(1, 4))
    
    # --- Education ---
    add_section_divider("EDUCATION")
    story.append(get_job_header("Bachelor of Computer Science (BS CS)", "Expected Graduation: 2026"))
    story.append(Paragraph("University of Management & Technology, Lahore, Pakistan", body_style))
    story.append(Spacer(1, 4))
    
    # --- Skills ---
    add_section_divider("SKILLS")
    
    skills_data = [
        ("Web Development:", "JavaScript (ES6+), React.js, Redux Toolkit, Next.js, Node.js, Express.js, MongoDB, HTML5, CSS3, RESTful APIs, Tailwind CSS, OSRM."),
        ("Shopify Development:", "Liquid Template Language, JSON Templates (OS 2.0), Storefront API, Custom Section Building, App Integration, Performance Optimization."),
        ("Software Engineering:", "SDLC, Agile/Scrum, Requirements Engineering, SRS Documentation, UML Modeling, User Stories."),
        ("Game Development:", "Unity Engine (2D & 3D), C# Programming, Game Physics & Logic, UI Scripting, Asset Integration."),
        ("Tools:", "Git, GitHub, VS Code, Postman, Figma, Jira, Trello, Netlify/Vercel.")
    ]
    
    for category, list_of_skills in skills_data:
        p_text = f"<b>{category}</b> {list_of_skills}"
        story.append(Paragraph(f"• {p_text}", bullet_style))
        
    doc.build(story)
    print("PDF build complete successfully!")

if __name__ == "__main__":
    build_pdf()
