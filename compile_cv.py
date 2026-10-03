import os
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def build_pdf():
    pdf_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "Naqi_Haider_CV.pdf")
    
    # A4 size is 595 x 842 points
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=30,
        rightMargin=30,
        topMargin=24,
        bottomMargin=24
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
        fontSize=17,
        leading=19,
        alignment=1, # Center
        textColor=charcoal
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=12,
        alignment=1, # Center
        textColor=slate_blue
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        alignment=1, # Center
        textColor=charcoal
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=charcoal,
        spaceBefore=5,
        spaceAfter=1
    )
    
    job_title = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10.5,
        textColor=charcoal
    )
    
    job_meta = ParagraphStyle(
        'JobMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=10,
        textColor=slate_blue,
        alignment=2 # Right
    )
    
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=charcoal,
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=1.5
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=charcoal,
        spaceAfter=3
    )
    
    story = []
    
    # --- Header ---
    story.append(Paragraph("MUHAMMAD NAQI HAIDER", name_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("Software Engineer | Full-Stack Developer", subtitle_style))
    story.append(Spacer(1, 2))
    
    contact_text = "Sheikhupura, Pakistan  |  +92 3091010431  |  naqi073@gmail.com"
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 1))
    
    links_text = '<a href="https://www.linkedin.com/in/m-naqi-haider-8b6772322" color="#6D8196">LinkedIn Profile</a>  |  <a href="https://github.com/Naqi-Haider" color="#6D8196">GitHub Profile</a>  |  <a href="https://naqi-portfolio.netlify.app/" color="#6D8196">Portfolio</a>'
    story.append(Paragraph(links_text, contact_style))
    story.append(Spacer(1, 6))
    
    # Divider helper
    def add_section_divider(title):
        story.append(Paragraph(title, section_heading))
        t = Table([['']], colWidths=[535], rowHeights=[0.5])
        t.setStyle(TableStyle([
            ('LINEBELOW', (0,0), (-1,-1), 0.75, silver),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(t)
        story.append(Spacer(1, 3))
        
    job_title_s = ParagraphStyle('JobTitleS', parent=job_title, firstLineIndent=-0.7)

    def get_job_header(title, date_location, colWidths=[315, 220]):
        style = job_title_s if title.startswith('S') else job_title
        t = Table([[Paragraph(title, style), Paragraph(date_location, job_meta)]], colWidths=colWidths)
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
        "Versatile Web Developer with 2+ years of experience crafting responsive interfaces and "
        "1 year of specialized Shopify Theme development. Proven ability to bridge the gap between "
        "custom code and e-commerce functionality to enhance site performance. Dedicated to delivering "
        "scalable, pixel-perfect solutions that drive user engagement and business growth."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))
    
    # --- Work Experience ---
    add_section_divider("WORK EXPERIENCE")

    # Associate Software Developer Job
    story.append(get_job_header("MERN Stack Engineer | Remote", "March 2025 - Present"))
    story.append(Paragraph("• Developed full-stack web applications using React, Next.js, Node.js, Express.js, MongoDB, and TypeScript based on real-world project requirements.", bullet_style))
    story.append(Paragraph("• Built REST APIs, authentication, CRUD systems, database integrations, and responsive frontend features across independent projects.", bullet_style))
    story.append(Paragraph("• Debugged existing applications, implemented new functionality, and adapted solutions to changing client and project requirements.", bullet_style))
    story.append(Paragraph("• Built projects including a role-based LMS and TypingSprint, a full-stack typing practice platform.", bullet_style))
    story.append(Spacer(1, 4))

    # Axiolink Systems
    story.append(get_job_header("Software Engineer Intern | Axiolink Systems", "April 2026 - June 2026"))
    story.append(Paragraph("• Engineered Next.js API endpoints and backend logic for a multi-vendor delivery platform, implementing spatial data with PostgreSQL + PostGIS and H3 hexagonal indexing for location-based matching.", bullet_style))
    story.append(Paragraph("• Built real-time rider tracking using Socket.IO and Redis GEOSEARCH, and integrated OSRM for route mapping and delivery-distance calculations.", bullet_style))
    story.append(Paragraph("• Implemented Cloudinary-based image management for product and vendor listings.", bullet_style))
    story.append(Paragraph("• Designed and implemented pixel-perfect dashboard UX flows for the Admin and Buyer consoles.", bullet_style))
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
    
    # --- Key Projects ---
    add_section_divider("KEY PROJECTS")
    
    # NeuroHaven
    story.append(get_job_header("NeuroHaven (Early Stage Alzheimer's Care Platform)", "Next.js | TypeScript | Tailwind CSS | Supabase"))
    story.append(Paragraph("• Built the Doctor Dashboard for a team-built Alzheimer's caregiving and monitoring platform — the web bridge between the Flutter-based patient app and clinicians, integrating with a Python backend (Uvicorn + ngrok) for cross-service communication.", bullet_style))
    story.append(Paragraph("• Engineered real-time doctor-patient chat, calling, and a distress-alert system, plus a cognitive scoring engine (streak-adjusted 0–100 scale) with four color-coded risk tiers, weekly adherence grids, and live behavioral trend graphs.", bullet_style))
    story.append(Paragraph("• Built the Admin panel for platform moderation, including a support ticket system and one-to-many doctor-patient assignment logic with reassignment support.", bullet_style))
    story.append(Paragraph("• Added chat export to CSV/TXT for clinical record-keeping.", bullet_style))
    story.append(Spacer(1, 4))

    # Learning Management System (LMS)
    story.append(get_job_header("Learning Management System (LMS)", "React.js | Node.js | Express | MongoDB"))
    story.append(Paragraph("• Architected a multi-role educational platform featuring dedicated workflows for Administrators, Instructors, and Students.", bullet_style))
    story.append(Paragraph("• Implemented core LMS features including course enrollment, assignment progression tracking, and user management.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Typing Sprint Game
    story.append(get_job_header("Typing Sprint Game", "React.js | Node.js | Express | MongoDB"))
    story.append(Paragraph("• Developed an interactive typing assessment application calculating live speed metrics (WPM) and accuracy percentages.", bullet_style))
    story.append(Paragraph("• Implemented a persistent MongoDB leaderboard with RESTful API endpoints for score submission and ranking updates.", bullet_style))
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
