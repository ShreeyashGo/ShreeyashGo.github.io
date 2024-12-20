---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: frontpage
header: no
widget1:
  title: "More about Me"
  url: '/aboutMe/'
  image: "/images/widget-1-302x182.jpg"
  text: 'I am currently pursuing a predoctoral opportunity at Microsoft Research. I was a MITACS GRI Fellow and have also worked with Atlassian and AIISC! 
  <br> I was also the Treasurer and Publicity and Design Head of Nirmaan Goa Chapter, a student run NGO impacting more than 100 people every year!'

widget2:
  title: "Projects and Publications"
  url: '/research/'
  image: "/images/widget-2-302x182.jpg"
  text: 'Over here you can find a select few of my projects. Some select projects are: <ul style="font-family:georgia,garamond,serif;">
    <li> <a href="/projects/ai4public/">AI for Public Spaces</li>
    <li> <a href="/projects/microExp/">Micro-Expression Analysis Using Transformers</li>
    <li> <a href="/projects/inpainting/">Image Inpainting with Partial Convolutional UNets</li>
    <li> <a href="/projects/superRes/">Study of Super-Resolution Techniques</li>
    </ul>
    For my Publications and Pre-prints <a href="/publications/"> <u>head over here </u> </a>.
    '

widget3:
  title: "Extra Curriculars"
  url: '/hobbies/'
  shadows: Black
  image: "/images/widget-3.jpg"
  text: 'When you dont find me coding or studying for a nearby exam, you can find me doing stargazing, photography and videography or definitely petting some cats'


#
# Use the call for action to show a button on the frontpage
#
# To make internal links, just use a permalink like this
# url: /getting-started/
#
# To style the button in different colors, use no value
# to use the main color or success, alert or secondary.
# To change colors see sass/_01_settings_colors.scss
#
callforaction: no
permalink: /index.html

# This is a nasty hack to make the navigation highlight
# this page as active in the topbar navigation
#
homepage: true
---

<h4 class="news-header"> Latest Updates </h4>
<div class="news-timeline">
    <div class="news-item">
        <div class="news-date">
            <p>Dec 2024</p>
        </div>
        <div class="news-content">
            <h5>AAAI'25 Workshop Acceptance</h5>
            <p>Elated to share that the preliminary work from my Microsoft Research Internship will be presented at AAAI'25 AI2SE Workshop! Stay tuned for more updates.</p>
        </div>
    </div>
    <div class="news-item">
        <div class="news-date">
            <p>Nov 2024</p>
        </div>
        <div class="news-content">
            <h5>Joined Microsoft Research on a long term research contract!</h5>
            <p>Transitioning into Pre-Doctoral Researcher (on contract) role Microsoft Research India as a to research on Scalable code generation and translation!</p>
        </div>
    </div>
    <div class="news-item">
        <div class="news-date">
            <p>June 2024</p>
        </div>
        <div class="news-content">
            <h5>Research Intern at Microsoft Research</h5>
            <p>Joining Microsoft Research India as a Research Intern to research on some cool applications of Generative AI for the Energy domain!</p>
        </div>
    </div>
    <div class="news-item">
        <div class="news-date">
            <p>June 2024</p>
        </div>
        <div class="news-content">
            <h5>Graduated!</h5>
            <p>Completed my undergraduate studies in Computer Science from BITS Pilani Goa Campus with a 9.15/10 CGPA and a minor in Data Science (minor GPA: 9.4/10).</p>
        </div>
    </div>
    <div class="news-item">
        <div class="news-date">
            <p>May 2024</p>
        </div>
        <div class="news-content">
            <h5>First Author Paper in CVPR 2024 Workshop!</h5>
            <p>Elated to share my first first-author work (AI-EDI-SPACE: A Co-designed Dataset for Evaluating the Quality of Public Spaces) accepted for presentation at CVPR 2024 Workshop on Responsible Data.</p>
        </div>
    </div>
    <div class="news-item">
        <div class="news-date">
            <p>August 2023</p>
        </div>
        <div class="news-content">
            <h5>MITACS Research Internship</h5>
            <p>Started my MITACS Globalink Research Internship in AI for Public Spaces under Prof. Shin Koseki and Hugo Berard at the University of Montreal (UdeM)!</p>
        </div>
    </div>
    <div class="news-item">
        <div class="news-date">
            <p>July 2023</p>
        </div>
        <div class="news-content">
            <h5>Publication in Findings of ACL!</h5>
            <p>My first publication (ANALOGICAL: A Novel Benchmark for Long Text Analogy Evaluation in Large Language Models) was accepted at ACL Findings!</p>
        </div>
    </div>
    <div class="news-item">
        <div class="news-date">
            <p>June 2023</p>
        </div>
        <div class="news-content">
            <h5>Summer Internship at Atlassian</h5>
            <p>Started a summer internship at Atlassian, working on cool applications of Generative AI for Jira Service Management.</p>
        </div>
    </div>
    <div class="news-item">
        <div class="news-date">
            <p>Sept 2022</p>
        </div>
        <div class="news-content">
            <h5>Research Internship at AIISC@UoSc</h5>
            <p>Started my research internship, working with LLMs (Large Language Models).</p>
        </div>
    </div>
    <div class="news-item">
        <div class="news-date">
            <p>May 2022</p>
        </div>
        <div class="news-content">
            <h5>Summer Internship at CSIR-CEERI Pilani</h5>
            <p>Started working on Inpainting Techniques for Ancient Image Restoration under Dr. Dhiraj.</p>
        </div>
    </div>
</div>

<!-- Add your CSS -->
<style>
    /* Header Styles */
    .news-header {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
        background-color: #e5e5e5;
        padding: 10px 15px;
        border-left: 5px solid #A1D044; /* Updated to green */
    }

    /* Timeline Container */
    .news-timeline {
        display: flex;
        flex-direction: column;
        gap: 10px; /* Reduced gap for smaller cells */
        max-height: 300px;
        overflow-y: auto;
        padding-right: 10px;
    }

    /* Scrollbar Styling */
    .news-timeline::-webkit-scrollbar {
        width: 6px; /* Slightly smaller scrollbar */
    }
    
    .news-timeline::-webkit-scrollbar-thumb {
        background: #A1D044; /* Updated to green */
        border-radius: 5px;
    }

    /* Each News Item */
    .news-item {
        display: flex;
        align-items: flex-start; /* Aligns the date and content to the top */
        gap: 15px; /* Reduced gap between date and content */
        background-color: #f8f9fa;
        border-left: 5px solid #A1D044; /* Updated to green */
        padding: 8px; /* Reduced padding for smaller cells */
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Slightly smaller shadow */
    }

    /* Date Section */
    .news-date {
        font-size: 13px; /* Smaller font */
        font-weight: bold;
        color: #618f08; /* Updated to green */
        min-width: 100px; /* Fixed width for date section to align content */
        text-align: right; /* Aligns date to the right */
    }

    /* Content Section */
    .news-content h5 {
        margin: 0;
        font-size: 16px; /* Slightly smaller title */
        color: #333;
        font-weight: 600;
    }

    .news-content p {
        margin: 5px 0 0;
        font-size: 13px; /* Smaller description */
        color: #666;
    }

    /* Hover Effects */
    .news-item:hover {
        background-color: #f2fce6; /* Lighter green hover */
        border-color: #88b83c; /* Darker green for hover border */
    }

    /* Responsive */
    @media (max-width: 768px) {
        .news-item {
            flex-direction: column;
        }

        .news-content h5 {
            font-size: 15px;
        }

        .news-date {
            width: 100%; /* Full width on small screens */
            text-align: left; /* Aligns left on small screens */
        }
    }
</style>
