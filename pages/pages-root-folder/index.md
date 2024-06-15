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
  text: 'I am currently pursuing an undergraduate thesis in the domain of Fairness in ML. I am a MITACS GRI Fellow and have also worked with Atlassian! 
  <br> I was also the Treasurer and Publicity and Design Head of Nirmaan Goa Chapter, a student run NGO impacting more than 100 people every year. My tryst with Nirmaan helped me gain important soft-skills!'

widget2:
  title: "Projects"
  url: '/projects/'
  image: "/images/widget-2-302x182.jpg"
  text: 'Over here you can find a select few of my projects. Some select projects are: <ul style="font-family:georgia,garamond,serif;">
    <li> <a href="/projects/ai4public/">AI for Public Spaces</li>
    <li> <a href="/projects/microExp/">Micro-Expression Analysis Using Transformers</li>
    <li> <a href="/projects/inpainting/">Image Inpainting with Partial Convolutional UNets</li>
    <li> <a href="/projects/superRes/">Study of Super-Resolution Techniques</li>
    
    </ul>'

widget3:
  title: "Extra Curriculars"
  url: '/hobbies/'
  shadows: Black
  image: "/images/widget-3.jpg"
  text: 'When you dont find me coding or studying for a nearby exam, you can find me doing stargazing, photography and videography or definitely petting some cats as I love cats'


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
<h3> Shreeyash Gowaikar </h3> 
<p style="font-family:georgia,garamond,serif; margin: 4px">
Welcome to my Website! I am a final year student at the Birla Institute of Technology and Science, Pilani, Goa Campus. I am pursuing a major in Computer Science with a minor in Data Science.
<p style="font-family:georgia,garamond,serif;margin:2px">
My research interest lies in Computer Vision, Generative AI and Transformers. I have had experience with multiple GAN architectures and find Transformer Models really intriguing. I am currently working with Prof. Shin Koseki and Dr. Hugo Berard on my Undergraduate Thesis with the University of Montréal. We are working on measuring the equity of Learning to Rank models! I am also working on using Computer Vision Algorithms to evaluate the (Equity, Diversity and Inclusion) EDI of Public Spaces.
I am actively looking for Academic and Corporate Research Opportunities which could create a positive impact in the research communinty!
<br>

<br>

<h4 class = "news-header"> Recent News:</h4>
<div class = "news-row">
    <ul>
      <!-- <li><b><emp> 2022: </emp></b></li> -->
      <li><b><emp>June 2024: </emp></b>Completed my undergraduate studies in Computer Science from BITS Pilani Goa Campus with a 9.15/10 CGPA with a minor in Data Science (minor GPA: 9.4/10)</li>
      <li><b><emp>May 2024: </emp></b>Elated to share my first first author work (AI-EDI-SPACE: A Co-designed Dataset for Evaluating the Quality of Public Spaces) accepted for presentation at CVPR 2024 Workshop on Responsible Data!</li>
      <li><b><emp>August 2023: </emp></b>Starting my MITACS Globalink Research Internship in AI for Public Spaces, under Prof. Shin Koseki and Hugo Berard, at the University of Montreal (UdeM)!</li>
      <li><b><emp>July 2023: </emp></b>Elated to share my first publication (ANALOGICAL -- A Novel Benchmark for Long Text Analogy Evaluation in Large Language Models) accepted at ACL Findings!</li>
      <li><b><emp>June 2023: </emp></b>Starting a summer internship at Atlassian! I am working on cool applications of Generative AI for Jira Service Management</li>
      <li><b><emp>September 2022: </emp></b> Starting my research internship at AIISC@UoSc where I will be working with LLMs!</li>
      <li><b><emp>May 2022: </emp></b>Started my summer research internship at CSIR-CEERI Pilani under the Supervision of Dr.Dhiraj. I will be working on Inpainting Techniques for Ancient Image Restoration</li>
    </ul>
</div>

<style>
    /* Basic styles */
    .news-row {
        overflow-y: scroll;
        max-height: 200px;
        padding: 10px; /* Add padding for inner spacing */
        box-sizing: border-box; /* Ensure padding is included in the total width/height */
    }

    /* Header styles */
    .news-header {
        margin: 0px 0px 0px 0px;
        padding: 10px 5px;
        background-color: #dfe0e0;
        border-bottom: 1px solid #ccc; 
    }

    .news-row::-webkit-scrollbar {
        width: 10px;
    }

    .news-row::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 20px; 
    }

    .news-row::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 20px;
    }

    .news-row::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }

    .news-row {
        scrollbar-width: thin; 
        scrollbar-color: #888 #f1f1f1;
    }

    /* Responsive design */
    @media (max-width: 600px) {
        .news-row {
            max-width: 100%; 
            padding: 5px; 
        }

        .news-header {
            font-size: 16px; 
            padding: 5px 0;
        }
    }
</style>