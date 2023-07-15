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
  text: 'I recently completed a Summer Research Internship at CSIR-CEERI Pilani, where I got first-hand experience in Machine Learning and Computer Vision. 
  <br> I am also the Treasurer and Publicity and Design Head of Nirmaan Goa Chapter, a student run NGO impacting more than 100 people every year. My tryst with Nirmaan helped me gain important soft-skills!'

widget2:
  title: "Projects"
  url: '/projects/'
  image: "/images/widget-2-302x182.jpg"
  text: 'Over here you can find a select few of my projects. Some of them include the following: <ul style="font-family:georgia,garamond,serif;">
    <li> <a href="/projects/inpainting/">Image Inpainting with Partial Convolutional UNets</li>
    <li> <a href="/projects/vivit/">Frames Video Vision Transformer</li>
    <li> <a href="/projects/superRes/">Study of Super-Resolution Techniques</li>
    <li> <a href="/projects/bayesNN/">Bayesian Neural Network on Noisy XOR</li>
    
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
<h3> Hello! </h3> 
<p style="font-family:georgia,garamond,serif; margin:2px 0px 0px 0px">
Welcome to my website! I am Shreeyash Gowaikar. I am a pre-final year student at the Birla Institute of Technology and Science, Pilani, Goa Campus. I am pursuing a major in Computer Science with a minor in Data Science.
<p style="font-family:georgia,garamond,serif;">
My research interest lies in Computer Vision and Generative Adversarial Networks and I would really like to learn Reinforcement Learning. I have had experience with multiple GAN architectures and find GANs really intriguing. I am currently working with Prof. Tanmay Verlekar on a Study oriented Project with APPCAIR, BITS Pilani Goa Campus. I am working on Image to Video Transfer Learning for Transformer-based models.
I am actively looking for Academic and Corporate Research Internships which could create a positive impact in the research communinty!
<br>

<br>
<hr class = "row">

<div class="row" style="overflow-y:scroll; max-height: 200px;">
    <h4 style="margin:0px"> Recent News:</h4>
    <ul>
      <!-- <li><b><emp> 2022: </emp></b></li> -->
      <li><b><emp>August 2023: </emp></b>Will be starting my MITACS Globalink Research Internship in AI for Public Spaces, under Prof. Shin Koseki and Hugo Berard, at the University of Montreal(UdeM)!</li>
      <li><b><emp>July 2023: </emp></b> Elated to share my first publication(ANALOGICAL) accepted at ACL Findings!</li>
      <li><b><emp>June 2023: </emp></b> Will be starting a Summer Internship at Atlassian! I am working on cool applications of AI/ML for Jira Service Management</li>
      <li><b><emp>January 2023: </emp></b> Will be starting my Study Oriented Project under the supervision of Prof. Tanmay Verlekar on Facial Emotion Recognition with Transformer Based models</li>
      <li><b><emp>September 2022: </emp></b> Will be starting my research internship at AIISC@UoSc where I will be working with LLMs!</li>
      <li><b><emp>September 2022: </emp></b> Will be starting my Study Oriented Project under the supervision of Prof. Veeky Baths</li>
      <li><b><emp>May 2022: </emp></b>Started my Summer Research Internship at CSIR-CEERI Pilani under the Supervision of Dr.Dhiraj. I will be working on Inpaiting Techniques for Ancient Image Restoration</li>
    </ul>
</div>
